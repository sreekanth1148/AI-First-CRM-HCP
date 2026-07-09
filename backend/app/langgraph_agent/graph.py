from typing import TypedDict

from langgraph.graph import StateGraph, END

from .tools import (
    log_interaction_tool,
    edit_interaction_tool,
    get_hcp_profile_tool,
    suggest_next_action_tool,
    generate_followup_email_tool,
)


# =====================================================
# Graph State
# =====================================================
class GraphState(TypedDict):
    input: dict
    output: str


# =====================================================
# Log Interaction
# =====================================================
def log_node(state):
    result = log_interaction_tool(state["input"])
    return {"output": result}


# =====================================================
# Edit Interaction
# =====================================================
def edit_node(state):
    result = edit_interaction_tool(state["input"])
    return {"output": result}


# =====================================================
# Get HCP Profile
# =====================================================
def profile_node(state):

    doctor = (
        state["input"].get("hcp_name")
        or state["input"].get("doctor")
        or state["input"].get("message", "")
    )

    result = get_hcp_profile_tool(doctor)

    return {"output": result}


# =====================================================
# Suggest Next Action
# =====================================================
def next_action_node(state):

    summary = (
        state["input"].get("summary")
        or state["input"].get("notes")
        or state["input"].get("message", "")
    )

    result = suggest_next_action_tool(summary)

    return {"output": result}


# =====================================================
# Generate Follow-up Email
# =====================================================
def email_node(state):

    # Pass the COMPLETE interaction dictionary
    result = generate_followup_email_tool(state["input"])

    return {"output": result}


# =====================================================
# Router
# =====================================================
def router(state):

    message = str(state["input"]).lower()

    if "edit" in message:
        return "edit"

    elif "profile" in message:
        return "profile"

    elif "next" in message:
        return "next_action"

    elif "email" in message:
        return "email"

    else:
        return "log"


# =====================================================
# Build Graph
# =====================================================
workflow = StateGraph(GraphState)

workflow.add_node("log", log_node)
workflow.add_node("edit", edit_node)
workflow.add_node("profile", profile_node)
workflow.add_node("next_action", next_action_node)
workflow.add_node("email", email_node)

workflow.set_conditional_entry_point(
    router,
    {
        "log": "log",
        "edit": "edit",
        "profile": "profile",
        "next_action": "next_action",
        "email": "email",
    },
)

workflow.add_edge("log", END)
workflow.add_edge("edit", END)
workflow.add_edge("profile", END)
workflow.add_edge("next_action", END)
workflow.add_edge("email", END)

graph = workflow.compile()