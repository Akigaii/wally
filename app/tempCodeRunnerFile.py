@app.route("/predict", methods=["POST"])
# def predict_route():
#     data = request.json
#     score = predict(data["clue"], data["anchor_left"], data["anchor_right"])
#     return jsonify({"score": round(score, 1)})