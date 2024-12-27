from flask import Flask, request, jsonify
from flask_cors import CORS
import dns.resolver
import socket
import re
import requests
from fuzzywuzzy import fuzz
from urllib.parse import urlparse, quote, unquote
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# --------- First Flask App Code (PTR lookup) ---------

def extract_ptr_records(ip):
    """Extract PTR records for a given IP address."""
    try:
        reversed_ip = '.'.join(reversed(ip.split('.'))) + '.in-addr.arpa'
        print(f"Reversed IP for PTR: {reversed_ip}")
        answers = dns.resolver.resolve(reversed_ip, 'PTR')
        return [str(rdata) for rdata in answers]
    except dns.resolver.NoAnswer:
        return ["No PTR record found for this IP address."]
    except dns.resolver.NXDOMAIN:
        return ["No PTR record exists for this IP address."]
    except Exception as e:
        return [f"Error during PTR lookup: {str(e)}"]

def validate_ip(ip):
    """Validate IP address format."""
    parts = ip.split('.')
    return len(parts) == 4 and all(part.isdigit() and 0 <= int(part) <= 255 for part in parts)

def validate_domain(domain):
    """Basic domain validation."""
    if not domain or len(domain) > 255:
        return False
    if domain[-1] == '.':  # Allow trailing dot
        domain = domain[:-1]
    return all(0 < len(label) < 64 and label.isalnum() for label in domain.split("."))

@app.route('/api/ptr', methods=['POST'])
def ptr_lookup():
    """Handle the PTR lookup request."""
    data = request.json
    input_value = data.get('input')
    is_ip = data.get('isIp')

    if is_ip:
        # Validate and process IP
        if not input_value or not validate_ip(input_value):
            return jsonify({"message": "Invalid IP address format."}), 400
        result = extract_ptr_records(input_value)
    else:
        # Validate and resolve domain
        if not input_value or not validate_domain(input_value):
            return jsonify({"message": "Invalid domain name format."}), 400
        try:
            ip_address = socket.gethostbyname(input_value)
            result = extract_ptr_records(ip_address)
        except socket.gaierror:
            return jsonify({"message": "Could not resolve the domain."}), 400

    return jsonify({"message": "\n".join(result)})

# --------- Second Flask App Code (Smishing Detection) ---------

MALICIOUS_PATTERNS = {
    "Urgency & Scam": r"urgent",
    "Verify Account": r"verify your account",
    "Financial Smishing": r"bank account",
    "Security Code": r"security code",
    "Login Credentials": r"login",
    "Personal Info Request": r"personal information",
    "Click Here": r"click here",
    "Prize & Rewards": r"won",
    "Prize Scam": r"prize",
    "Congratulations": r"congratulations",
    "Update Details": r"update your details",
    "Secure Account": r"secure your account",
    "Verify Identity": r"verify your identity",
    "URL": r"http[s]?://[^\s]+",
    "Phone Number": r"\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,3}[-.\s]?\d{1,4}",
    "Email": r"[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}",
}

BLACKLISTED_DOMAINS = ["bit.ly", "short.ly", "tinyurl.com", "malicious.com"]

def is_blacklisted_url(url):
    try:
        domain = urlparse(url).netloc
        return domain in BLACKLISTED_DOMAINS
    except Exception:
        return False

def is_smishing_message(message):
    detected_patterns = {key: [] for key in MALICIOUS_PATTERNS}

    for category, pattern in MALICIOUS_PATTERNS.items():
        matches = re.findall(pattern, message, re.IGNORECASE)
        if matches:
            if category == "URL":
                for url in matches:
                    if is_blacklisted_url(url):
                        detected_patterns["URL"].append(url)
            elif category == "Phone Number" or category == "Email":
                detected_patterns["Phone Number"].extend(matches)
                detected_patterns["Email"].extend(matches)
            else:
                detected_patterns[category].extend(matches)

    return detected_patterns

def fuzzy_match(message, target_phrase, threshold=80):
    return fuzz.partial_ratio(message.lower(), target_phrase.lower()) >= threshold

@app.route('/api/smishing_analyse', methods=['POST'])
def analyse():
    data = request.get_json()
    sms_message = data.get('message')

    if sms_message:
        detected = is_smishing_message(sms_message)

        for key, value in MALICIOUS_PATTERNS.items():
            if key not in ["URL", "Phone Number", "Email"]:
                if fuzzy_match(sms_message, value):
                    detected["Urgency & Scam"].append(f"Fuzzy match found for pattern: {key}")

        if any(detected.values()):
            result = {"status": "warning", "detected_patterns": detected}
        else:
            result = {"status": "safe", "message": "The message appears to be safe."}
    else:
        result = {"status": "error", "message": "No message provided."}
    
    return jsonify(result)

# --------- Third Flask App Code (Email Phishing Detection) ---------

PHISHING_KEYWORDS = [
    "urgent", "account", "verify", "suspend", "password", "update", "security", "login",
    "Account Suspended", "Verify Your Account", "Immediate Action Required", "Suspicious Activity",
    "Password Expiry", "Reset Password", "Account Locked", "Unusual Login Attempt", "Security Alert",
    "Limited Time Offer", "Verify Identity", "Click Here",
]

def contains_phishing_keywords(text):
    text = text.lower()
    for keyword in PHISHING_KEYWORDS:
        if keyword in text:
            return True
    return False

def extract_urls(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    return [a_tag['href'] for a_tag in soup.find_all('a', href=True)]

def analyze_email_content(email_text):
    warnings = []
    if contains_phishing_keywords(email_text):
        warnings.append("The email contains potential phishing keywords.")
    
    urls = re.findall(r'http[s]?://\S+', email_text)
    if '<html>' in email_text.lower():
        urls.extend(extract_urls(email_text))

    return {"warnings": warnings, "urls": urls}

@app.route('/api/phishing_analyze', methods=['POST'])
def analyze():
    data = request.json
    email_content = data.get("emailContent", "")
    if not email_content:
        return jsonify({"error": "Email content is empty"}), 400

    result = analyze_email_content(email_content)
    return jsonify(result)

# --------- URL Encode/Decode ---------

@app.route('/')
def home():
    return "Flask backend is running!"

@app.route('/api/encode', methods=['POST'])
def encode():
    data = request.get_json()
    url = data.get('url', '')
    safe_chars = data.get('safe_chars', '')
    encoded_url = quote(url, safe=safe_chars)
    return jsonify({"encoded_url": encoded_url})

@app.route('/api/decode', methods=['POST'])
def decode():
    data = request.get_json()
    url = data.get('url', '')
    decoded_url = unquote(url)
    return jsonify({"decoded_url": decoded_url})


#----------------SOA-------------------

def get_soa_records(domain):
    try:
        answers = dns.resolver.resolve(domain, 'SOA')
        soa_records = []
        for rdata in answers:
            soa_info = {
                "Primary_NS": rdata.mname.to_text(),
                "Responsible_Party": rdata.rname.to_text(),
                "Serial": rdata.serial,
                "Refresh": rdata.refresh,
                "Retry": rdata.retry,
                "Expire": rdata.expire,
                "Minimum": rdata.minimum
            }
            soa_records.append(soa_info)
        return {"status": "success", "SOA_Records": soa_records}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.route('/api/query-soa', methods=['POST'])
def query_soa():
    data = request.json
    domain = data.get('domain')
    if not domain:
        return jsonify({"status": "error", "message": "Domain is required"}), 400
    
    result = get_soa_records(domain)
    return jsonify(result)



#----------------CAA-----------------
resolver = dns.resolver.Resolver()
resolver.nameservers = ['1.1.1.1']  # You can use other public DNS resolvers like Cloudflare (1.1.1.1)

@app.route('/api/query-caa', methods=['POST'])
def query_caa():
    try:
        # Get domain from the POST request body
        data = request.get_json()
        domain = data.get('domain', '').strip()

        if not domain:
            return jsonify({"error": "Domain name is required"}), 400

        # Query CAA records for the domain
        try:
            answers = resolver.resolve(domain, 'CAA')
            if not answers:
                return jsonify({"caaRecords": "No CAA records found."})

            # Process the CAA records
            caa_records = []
            for rdata in answers:
                record = {
                    "flag": rdata.flags.decode('utf-8') if isinstance(rdata.flags, bytes) else rdata.flags,
                    "tag": rdata.tag.decode('utf-8') if isinstance(rdata.tag, bytes) else rdata.tag,
                    "value": rdata.value.decode('utf-8') if isinstance(rdata.value, bytes) else rdata.value
                }
                caa_records.append(record)
            return jsonify({"caaRecords": caa_records})
        except dns.resolver.NoAnswer:
            return jsonify({"error": "No CAA records found."}), 404
        except dns.resolver.NXDOMAIN:
            return jsonify({"error": "Domain does not exist."}), 404
        except dns.resolver.YXDOMAIN:
            return jsonify({"error": "The domain name is invalid."}), 400
        except Exception as e:
            print(f"Backend error while querying CAA records: {str(e)}")
            return jsonify({"error": "Internal server error. Check backend logs."}), 500
    except Exception as e:
        print(f"Unexpected backend error: {str(e)}")
        return jsonify({"error": "Internal server error. Check backend logs."}), 500

# --------- Main Flask App Execution ---------
if __name__ == '__main__':
    app.run(debug=True, port=5000)
