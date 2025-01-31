import streamlit as st
from langchain_ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import (
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    AIMessagePromptTemplate,
    ChatPromptTemplate
)

# Custom CSS styling for SPPU theme
st.markdown("""
<style>
    .main {
        background-color: #1a1a1a;
        color: #ffffff;
    }
    .sidebar .sidebar-content {
        background-color: #2d2d2d;
    }
    .stTextInput textarea {
        color: #ffffff !important;
    }
    .stSelectbox div[data-baseweb="select"] {
        background-color: #3d3d3d !important;
    }
    .stMarkdown code {
        background-color: #2d2d2d !important;
        color: #89cff0 !important;
    }
</style>
""", unsafe_allow_html=True)

st.title("Elevate-AI")
st.caption("Syllabus-Aligned AI Assistant for Computer Engineering Students")


# Initialize Ollama chat engine
llm_engine = ChatOllama(
    model=selected_model,
    base_url="http://localhost:11434",
    temperature=0.3
)

# System prompt configuration for SPPU focus
system_prompt = SystemMessagePromptTemplate.from_template(
    """You are an expert tutor for Savitribai Phule Pune University's 
    Fundamentals of Data Structures course. Follow these guidelines:
    
    1. Prioritize content from SPPU syllabus documents
    2. Use examples from official course material
    3. Structure answers with:
       - Clear algorithm steps
       - Time complexity analysis
       - Practical code examples
    4. Format responses using Markdown with:
       - Headers for main concepts
       - Code blocks for implementations
       - Bullet points for key points
    """
)

# Session state management
if "message_log" not in st.session_state:
    st.session_state.message_log = [{
        "role": "ai", 
        "content": "Welcome SPPU Student! Ask me about:\n- Algorithms\n- Data Structures\n- Complexity Analysis\n- Syllabus Topics"
    }]

# Chat container
chat_container = st.container()

# Display chat messages
with chat_container:
    for message in st.session_state.message_log:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

# Chat processing functions
def generate_ai_response(prompt_chain):
    processing_pipeline = prompt_chain | llm_engine | StrOutputParser()
    return processing_pipeline.invoke({})

def build_prompt_chain():
    prompt_sequence = [system_prompt]
    for msg in st.session_state.message_log:
        if msg["role"] == "user":
            prompt_sequence.append(HumanMessagePromptTemplate.from_template(msg["content"]))
        elif msg["role"] == "ai":
            prompt_sequence.append(AIMessagePromptTemplate.from_template(msg["content"]))
    return ChatPromptTemplate.from_messages(prompt_sequence)

# Handle user input
user_query = st.chat_input("Ask your SPPU Data Structures question...")

if user_query:
    # Add user message to log
    st.session_state.message_log.append({"role": "user", "content": user_query})
    
    # Generate AI response
    with st.spinner("Analyzing syllabus content..."):
        prompt_chain = build_prompt_chain()
        ai_response = generate_ai_response(prompt_chain)
    
    # Add AI response to log
    st.session_state.message_log.append({"role": "ai", "content": ai_response})
    
    # Rerun to update chat display
    st.rerun()
