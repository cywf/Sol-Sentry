# assistant.py
import openai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# OpenAI API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
openai.api_key = OPENAI_API_KEY

# Assistant interaction function
def interact_with_openai(prompt, temperature=0.7, max_tokens=150):
    response = openai.Completion.create(
        model="gpt-4-1106-preview",  # Use the latest GPT-4 model
        prompt=prompt,
        temperature=temperature,
        max_tokens=max_tokens,
        stop=None  # Add other parameters as needed
    )
    return response.choices[0].text.strip()

# CLI interaction (optional feature for now)
def cli_interaction():
    print("Welcome to the Sol-Sentry assistant CLI.")
    while True:
        user_input = input("Enter your message for the assistant: ")
        if user_input.lower() in ["quit", "exit", "close"]:  # Commands to end the conversation
            print("Closing the assistant.")
            break
        response = interact_with_openai(user_input)
        print(f"Assistant: {response}")

# For CLI usage, uncomment the following lines:
# if __name__ == "__main__":
#     cli_interaction()

