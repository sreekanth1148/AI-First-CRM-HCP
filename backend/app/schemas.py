from pydantic import BaseModel


class InteractionCreate(BaseModel):

    hcp_name: str

    hospital: str

    department: str

    specialization: str

    interaction_type: str

    product: str

    visit_date: str

    follow_up_date: str

    notes: str


class InteractionResponse(InteractionCreate):

    id: int

    class Config:

        from_attributes = True