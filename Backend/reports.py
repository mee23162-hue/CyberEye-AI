from fastapi import APIRouter

router = APIRouter()

@router.get("/api/history")
def history():
    return {
        "message": "History API Working"
    }

@router.get("/api/reports")
def reports():
    return {
        "total_scans": 120,
        "safe": 85,
        "phishing": 35,
        "accuracy": "91%"
    }