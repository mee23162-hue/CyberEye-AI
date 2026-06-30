from flask import Flask, request, jsonify
from flask_cors import CORS
from database import create_tables
import sqlite3

app = Flask(__name__)

CORS(app)

create_tables()

@app.route("/api/test", methods=["GET"])
def test_api():
    return jsonify({
        "message": "API is working"
    })


@app.route("/api/signup", methods=["POST"])
def signup():

    data = request.json

    name = data["name"]
    email = data["email"]
    password = data["password"]

    conn = sqlite3.connect("phishing_guard.db")
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            (name, email, password)
        )

        conn.commit()

        return jsonify({
            "message": "Signup successful"
        })

    except:
        return jsonify({
            "message": "Email already exists"
        })

    finally:
        conn.close()


@app.route("/api/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    conn = sqlite3.connect("phishing_guard.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (email, password)
    )

    user = cursor.fetchone()

    conn.close()

    if user:
        return jsonify({
            "message": "Login successful"
        })

    else:
        return jsonify({
            "message": "Invalid email or password"
        })

@app.route("/api/scan-email", methods=["POST"])
def scan_email():

    data = request.json

    email = data["email"]

    if "password" in email.lower() or "click" in email.lower():

        result = "🚨 Phishing Detected"
        score = 80
        risk = "High"

    else:

        result = "✅ Safe Email"
        score = 20
        risk = "Low"


    # SAVE SCAN HISTORY
    conn = sqlite3.connect("phishing_guard.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO scans
        (user_email, scan_type, input_data, result, risk_score)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            "Guest",
            "Email",
            email,
            result,
            score
        )
    )

    conn.commit()
    conn.close()


    return jsonify({
        "result": result,
        "score": score,
        "risk": risk
    })
if __name__ == "__main__":
    app.run(debug=True)