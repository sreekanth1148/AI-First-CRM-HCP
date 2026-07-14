from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models import Interaction

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    # Total interactions
    total_interactions = db.query(Interaction).count()

    # Total unique HCPs
    total_hcps = (
        db.query(func.count(func.distinct(Interaction.hcp_name)))
        .scalar()
    )

    # Total unique hospitals
    total_hospitals = (
        db.query(func.count(func.distinct(Interaction.hospital)))
        .scalar()
    )

    # Total follow-ups scheduled
    total_followups = (
        db.query(Interaction)
        .filter(Interaction.follow_up_date != "")
        .count()
    )

    return {
        "total_hcps": total_hcps,
        "total_interactions": total_interactions,
        "total_hospitals": total_hospitals,
        "total_followups": total_followups,
    }