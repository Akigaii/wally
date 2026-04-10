import json
# import requests
from flask import Flask, render_template, jsonify, request
from deploy import predict
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict_route", methods=["POST"])
def predict_route():
    data = request.get_json()
    print(data)
    left = data.get('left')
    right = data.get('right')
    guess = data.get('guess')
    score = predict(guess, left, right)
    print(f"score: {score}")
    return jsonify({"score": round(score, 1)})

if __name__ == "__main__":
    app.run(port=5000, debug=True)