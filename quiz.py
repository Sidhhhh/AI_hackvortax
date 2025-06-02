from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import re
import json

app = Flask(__name__)
CORS(app)

# ✅ Correct: configure the API key
genai.configure(api_key="api_key")  

# ✅ Create the model instance once
model = genai.GenerativeModel("gemini-1.5-flash")  
@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.get_json()
    topic = data.get('topic', '').strip()

    if not topic:
        return jsonify({"error": "No topic provided."}), 400

    prompt = f"""
    Generate a quiz with 15 multiple-choice questions (MCQs) about {topic}.
    For each question, provide:
    - a question
    - 4 options (A, B, C, D)
    - the correct answer key (e.g., "A")

    Return only valid JSON in this format:
    [
      {{
        "question": "What is ...?",
        "options": {{
          "A": "...",
          "B": "...",
          "C": "...",
          "D": "..."
        }},
        "answer": "B"
      }},
      ...
    ]
    Don't include explanations or markdown.
    """

    try:
        # ✅ Generate content using the model
        response = model.generate_content(prompt)

        # ✅ Extract plain text response
        raw_content = response.text
        print("RAW Gemini Response:\n", raw_content)

        # ✅ Clean and parse
        cleaned = re.sub(r"```json|```", "", raw_content).strip()
        quiz_data = json.loads(cleaned)

        return jsonify({"quiz": quiz_data})

    except json.JSONDecodeError as jde:
        return jsonify({
            "error": "JSON parsing failed.",
            "details": str(jde),
            "raw": raw_content
        }), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
