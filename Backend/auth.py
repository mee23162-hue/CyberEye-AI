from fastapi import APIRouter
import  sqlite3

router = APIRouter()

@router.get("/test-auth")
def test_auth():
    return {"message": "Auth API Working"}

@router.post("/api/signup")
def signup(user: dict):

    conn = sqlite3.connect("phishing_guard.db")
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            (
                user["name"],
                user["email"],
                user["password"]
            )
        )

        conn.commit()

        return {
            "message": "Signup Successful"
        }

    except:

        return {
            "message": "Email already exists"
        }

    finally:
        conn.close()
@router.post("/api/login")
def login(user: dict):

    conn = sqlite3.connect("phishing_guard.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (
            user["email"],
            user["password"]
        )
    )

    result = cursor.fetchone()
    conn.close()

    if result:
        return {
            "message": "Login Successful"
        }

    return {
        "message": "Invalid Email or Password"
    }