from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app import models, schemas
from app.langgraph_agent.graph import graph

router = APIRouter(
    prefix="/interaction",
    tags=["Interaction"],
)


# =====================================
# Chat Request Model
# =====================================
class ChatRequest(BaseModel):
    message: str


# =====================================
# Log Interaction
# =====================================
@router.post("/log")
def log_interaction(
    interaction: schemas.InteractionCreate,
    db: Session = Depends(get_db),
):

    ai_result = graph.invoke(
        {
            "input": interaction.model_dump()
        }
    )

    print("\n========== AI SUMMARY ==========")
    print(ai_result["output"])
    print("================================\n")

    new_interaction = models.Interaction(
        hcp_name=interaction.hcp_name,
        hospital=interaction.hospital,
        department=interaction.department,
        specialization=interaction.specialization,
        interaction_type=interaction.interaction_type,
        product=interaction.product,
        visit_date=interaction.visit_date,
        follow_up_date=interaction.follow_up_date,
        notes=interaction.notes,
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return {
        "message": "Interaction Logged Successfully",
        "interaction": {
            "id": new_interaction.id,
            "hcp_name": new_interaction.hcp_name,
            "hospital": new_interaction.hospital,
            "department": new_interaction.department,
            "specialization": new_interaction.specialization,
            "interaction_type": new_interaction.interaction_type,
            "product": new_interaction.product,
            "visit_date": new_interaction.visit_date,
            "follow_up_date": new_interaction.follow_up_date,
            "notes": new_interaction.notes,
        },
        "ai_summary": ai_result["output"],
    }


# =====================================
# Interaction History
# =====================================
@router.get(
    "/history",
    response_model=list[schemas.InteractionResponse]
)
def get_history(db: Session = Depends(get_db)):
    return (
        db.query(models.Interaction)
        .order_by(models.Interaction.id.desc())
        .all()
    )


# =====================================
# Update Interaction
# =====================================
@router.put("/{interaction_id}")
def update_interaction(
    interaction_id: int,
    interaction: schemas.InteractionCreate,
    db: Session = Depends(get_db),
):

    existing = (
        db.query(models.Interaction)
        .filter(models.Interaction.id == interaction_id)
        .first()
    )

    if existing is None:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    existing.hcp_name = interaction.hcp_name
    existing.hospital = interaction.hospital
    existing.department = interaction.department
    existing.specialization = interaction.specialization
    existing.interaction_type = interaction.interaction_type
    existing.product = interaction.product
    existing.visit_date = interaction.visit_date
    existing.follow_up_date = interaction.follow_up_date
    existing.notes = interaction.notes

    db.commit()
    db.refresh(existing)

    return {
        "message": "Interaction Updated Successfully",
        "interaction": existing,
    }


# =====================================
# Delete Interaction
# =====================================
@router.delete("/{interaction_id}")
def delete_interaction(
    interaction_id: int,
    db: Session = Depends(get_db),
):

    interaction = (
        db.query(models.Interaction)
        .filter(models.Interaction.id == interaction_id)
        .first()
    )

    if interaction is None:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    db.delete(interaction)
    db.commit()

    return {
        "message": "Interaction Deleted Successfully"
    }


# =====================================
# Dashboard Statistics
# =====================================
@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):

    interactions = db.query(models.Interaction).all()

    total_hcps = len(
        set(i.hcp_name for i in interactions)
    )

    today = str(date.today())

    todays_visits = sum(
        1
        for i in interactions
        if str(i.visit_date) == today
    )

    pending_followups = sum(
        1
        for i in interactions
        if str(i.follow_up_date) >= today
    )

    completed_visits = len(interactions)

    return {
        "total_hcps": total_hcps,
        "todays_visits": todays_visits,
        "pending_followups": pending_followups,
        "completed_visits": completed_visits,
        "ai_suggestions": completed_visits,
    }


# =====================================
# AI Chat
# =====================================
@router.post("/chat")
def chat(request: ChatRequest):

    result = graph.invoke(
        {
            "input": {
                "notes": request.message
            }
        }
    )

    return {
        "reply": result["output"]
    }