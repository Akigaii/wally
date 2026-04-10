import json
# import requests
from flask import Flask, render_template
from deploy import predict
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

# @app.route("/predict", methods=["POST"])
# def predict_route():
#     data = request.json
#     score = predict(data["clue"], data["anchor_left"], data["anchor_right"])
#     return jsonify({"score": round(score, 1)})

if __name__ == "__main__":
    app.run(port=5000, debug=True)