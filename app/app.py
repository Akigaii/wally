import json
import random
from flask import Flask, render_template, jsonify, request
from deploy import predict
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict_route", methods=["POST"])
def predict_route():
    
    data = request.get_json()

    left = data.get('left')
    right = data.get('right')
    guess = data.get('guess')
    print(data)
    print(guess)
    print(left)
    print(right)
    
    if not guess:
        sassyWally = ["are you gonna guess something?",
                      "i can't really guess much with that...",
                      "did you mean to type something?",
                      "wow, whole lotta nothing.",
                      "there's nothing there..."]
        return jsonify({"score": random.choice(sassyWally)})
    
    score = predict(guess, left, right)
    print(f"score: {score}")
    return jsonify({"score": round(score, 1)})

if __name__ == "__main__":
    app.run(port=5003, debug=True)