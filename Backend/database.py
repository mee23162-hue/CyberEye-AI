import sqlite3

DATABASE = "phishing_guard.db"

def create_connection():
    conn = sqlite3.connect(DATABASE)
    return conn


def create_tables():
    conn = create_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS scans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_email TEXT,
        scan_type TEXT,
        input_data TEXT,
        result TEXT,
        risk_score INTEGER
    )
    """)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    create_tables()
    print("Database created successfully")