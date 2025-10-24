# app.py (or your preferred file name)
from flask import Flask, jsonify, request
from flask_cors import CORS # Import CORS for cross-origin requests

app = Flask(__name__)
CORS(app) # Enable CORS for your Flask app

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Data from Flask API!"})

@app.route('/api/submit', methods=['POST'])
def submit_data():
        data = request.json
        print(f"Received data: {data}")
        return jsonify({"message": "Data received successfully!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)