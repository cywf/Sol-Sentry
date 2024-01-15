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

st.sidebar.header('About Sol-Sentry')
st.sidebar.info("Sol-Sentry is a tool developed to assist blockchain developers in securing their smart contracts using AI.")

# Function to analyze the smart contract using OpenAI
def analyze_contract(code):
    try:
        response = openai.Completion.create(
            engine="davinci-codex",
            prompt=f"Analyze the following Solana smart contract for potential vulnerabilities:\n\n{code}",
            temperature=0,
            max_tokens=150,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            stop=["#"]
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"An error occurred: {str(e)}"

# Text input for smart contract code
contract_code = st.text_area("Enter the Solana smart contract code here:", height=300)

# Button to trigger the analysis
if st.button("Analyze Contract"):
    if contract_code:  # only proceed if the code is provided
        with st.spinner('Analyzing the smart contract...'):
            analysis_result = analyze_contract(contract_code)
            st.success("Analysis complete")
            st.subheader("Analysis Result:")
            st.write(analysis_result)
    else:
        st.error("Please enter the smart contract code to proceed.")

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
    </style>
""", unsafe_allow_html=True)

# Ensure the app runs only if it's the main module
if __name__ == "__main__":
    # Execute the Streamlit interface
    st._main_run_clbk()
