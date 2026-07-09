from typing import Dict
from .llm import llm


# =====================================================
# Tool 1 : Log Interaction
# =====================================================
def log_interaction_tool(interaction: Dict):

    prompt = f"""
You are an AI-first CRM Assistant for Pharmaceutical Sales Representatives.

Analyze the following HCP interaction.

If complete interaction details are provided, generate:

• Doctor Name
• Hospital
• Department
• Specialization
• Product Discussed
• Interaction Type
• Visit Date
• Follow-up Date
• Key Summary
• Suggested Next Action

If the user asks a general question or provides only notes,
respond naturally as an AI CRM Assistant.

Interaction:

{interaction}
"""

    response = llm.invoke(prompt)

    return response.content


# =====================================================
# Tool 2 : Edit Interaction
# =====================================================
def edit_interaction_tool(interaction: Dict):

    prompt = f"""
You are an AI CRM Assistant.

The following HCP interaction has been edited.

Review the updated information.

Correct grammar if necessary.

Preserve all medical information.

Return a clean professional interaction summary.

Interaction:

{interaction}
"""

    response = llm.invoke(prompt)

    return response.content


# =====================================================
# Tool 3 : Get HCP Profile
# =====================================================
def get_hcp_profile_tool(hcp_name: str):

    prompt = f"""
You are an AI CRM Assistant.

Generate a professional Healthcare Professional profile.

Doctor Name:

{hcp_name}

Include:

• Doctor Name

• Department

• Specialization

• Typical Clinical Interests

• Previous Visit Summary

• Products Discussed

• Suggested Topics for Next Meeting

• Overall Engagement Level (1-10)

Keep the profile concise and professional.
"""

    response = llm.invoke(prompt)

    return response.content


# =====================================================
# Tool 4 : Suggest Next Action
# =====================================================
def suggest_next_action_tool(summary: str):

    prompt = f"""
You are an AI CRM Assistant.

Based on the following interaction summary:

{summary}

Suggest:

1. Next Best Action

2. Follow-up Strategy

3. Recommended Product Discussion

4. Ideal Follow-up Timeline

5. Tips for the Sales Representative

Return the response in bullet points.
"""

    response = llm.invoke(prompt)

    return response.content


# =====================================================
# Tool 5 : Generate Follow-up Email
# =====================================================
def generate_followup_email_tool(interaction: Dict):

    prompt = f"""
You are an AI CRM Assistant for Pharmaceutical Sales Representatives.

Write a professional follow-up email using ONLY the interaction details below.

Interaction Details

Doctor Name:
{interaction.get("hcp_name","Not Provided")}

Hospital:
{interaction.get("hospital","Not Provided")}

Department:
{interaction.get("department","Not Provided")}

Specialization:
{interaction.get("specialization","Not Provided")}

Interaction Type:
{interaction.get("interaction_type","Not Provided")}

Product Discussed:
{interaction.get("product","Not Provided")}

Visit Date:
{interaction.get("visit_date","Not Provided")}

Follow-up Date:
{interaction.get("follow_up_date","Not Provided")}

Interaction Notes:
{interaction.get("notes","No Notes Available")}

Instructions

Write a professional follow-up email.

Include:

• Subject

• Greeting using the doctor's name

• Thank the doctor for the meeting

• Mention the hospital

• Mention the product discussed

• Mention any requested documents from the notes

• Mention the follow-up meeting date

• Maintain a professional pharmaceutical sales tone

Do NOT use placeholders like:

[Doctor Name]

[Date]

[Company]

[Your Name]

Finish with:

Best Regards,

AI CRM Assistant
"""

    response = llm.invoke(prompt)

    return response.content