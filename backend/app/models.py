from sqlalchemy import Column, Integer, String, Text

from .database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String(100))

    hospital = Column(String(100))

    department = Column(String(100))

    specialization = Column(String(100))

    interaction_type = Column(String(100))

    product = Column(String(100))

    visit_date = Column(String(100))

    follow_up_date = Column(String(100))

    notes = Column(Text)