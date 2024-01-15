# Import the required libraries

import streamlit as st
import openai
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

# OpenAI API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# Initialize OpenAI API client
openai.api_key = OPENAI_API_KEY

# Streamlit interface
st.set_page_config(page_title='Sol-Sentry', layout='wide', initial_sidebar_state='expanded')
st.markdown("""
    <style>
        .css-18e3th9 {
            background-color: #0e1117;
        }
        .css-1d391kg {
            background-color: #1f2736;
        }
    </style>
""", unsafe_allow_html=True)

st.title('Sol-Sentry: Smart Contract Analysis')
st.subheader("An AI-powered assistant for Solana smart contract analysis")

# Sidebar for user input
st.sidebar.header('User Input')
user_name = st.sidebar.text_input("Enter your name:")
user_prompt = st.sidebar.text_area("Enter your prompt for the assistant:")

# Function to fetch and run the appropriate analysis function
def run_analysis_function(code, function_name):
    # Retrieve the function config from the repository
    function_config_url = f"https://raw.githubusercontent.com/cywf/Sol-Sentry/main/gpt-functions/{function_name}.json"
    function_config_response = requests.get(function_config_url)
    
    if function_config_response.status_code == 200:
        function_config = function_config_response.json()
        # Here you would include the logic to interpret the function_config and execute the function
        # This is a placeholder for the actual function execution logic
        # You need to implement the function execution based on the function_config and code provided
        # For example:
        # result = execute_function(function_config, code)
        # return result
        pass
    else:
        return "Function configuration could not be retrieved."

# File uploader for the contract code
uploaded_file = st.sidebar.file_uploader("Upload the smart contract code as a file:", type=["sol"])

# Optional: Direct code input
direct_code_input = st.sidebar.text_area("Or paste the smart contract code directly here:", height=150)

# Button to trigger the analysis
if st.sidebar.button("Analyze Contract"):
    # Determine the source of the code
    code_to_analyze = direct_code_input if direct_code_input else uploaded_file.getvalue().decode("utf-8") if uploaded_file else ""
    
    if code_to_analyze:  # only proceed if the code is provided
        with st.spinner('Analyzing the smart contract...'):
            # The 'analyze_contract' function is a placeholder for the actual function you want to run
            # You need to determine the function name dynamically based on the user prompt or some other logic
            function_name = "analyze_contract"  # Replace with dynamic function name determination logic
            analysis_result = run_analysis_function(code_to_analyze, function_name)
            st.success("Analysis complete")
            st.subheader("Analysis Result:")
            st.write(analysis_result)
    else:
        st.error("Please provide the smart contract code to proceed.")

# Streamlit interface customization for dark mode and overall styling
st.markdown("""
    <style>
        /* Main page styling */
        .css-1v3fvcr {
            background-color: #0e1117;
            color: #fff;
        }
        /* Text area styling */
        .stTextArea {
            background-color: #1f2736;
        }
        /* Sidebar styling */
        .css-1lcbmhc {
            background-color: #1f2736;
            color: #fff;
        }
        /* Button styling */
        .stButton>button {
            background-color: #21ce99;
            color: #fff;
        }
        /* Output styling */
        .stAlert {
            background-color: #262d3a;
            border-left: 5px solid #21ce99;
        }
        /* File uploader customization */
        .css-1cpxqw2 {
            background-color: #1f2736;
            border-color: #21ce99;
        }
    </style>
""", unsafe_allow_html=True)

# Ensure the app runs only if it's the main module
if __name__ == "__main__":
    # Execute the Streamlit interface
#    st._main_run_clbk()
