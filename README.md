# Wally

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=fff)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=fff)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=fff)
![HuggingFace](https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=000)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=fff)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=fff)
![Google Colab](https://img.shields.io/badge/Google%20Colab-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=fff)

A fine-tuned sentence transformer trained on the mechanics of [Wavelength](https://www.boardseyeview.net/post/wavelength) to simulate human semantic reasoning. Wally acts as the "guesser" — given a word pair and a clue, it predicts a value on a 0–100 spectrum.

A fully interactive Flask website allows users to play Wavelength games directly against Wally.

## Setup

**Clone Repository:**
```bash
git clone https://github.com/Akigaii/wally
cd wally
```

**Install Dependencies:**
```bash
pip install -r requirements.txt
```

**Run App:**
```bash
python app/app.py
```

Then open your browser and go to `http://localhost:5000`.

## How to Play

1. Draw a word pair (e.g., Hot / Cold)
2. Enter a clue word or phrase (e.g., "lava")
3. Wally will predict where the needle should land on the spectrum
4. Compare Wally's guess to the hidden value and see how many points it scores

## Project Structure

```
wally/
├── app/
│   ├── app.py              # Flask application
│   ├── deploy.py           # Model loading and inference
│   ├── templates/          # HTML templates
│   └── static/
│       ├── css/            # Stylesheets
│       ├── js/             # JavaScript
│       └── images/         # Static assets
├── src/
│   └── wally.ipynb         # Training notebook
├── history/
│   ├── wally/              # Experiment JSON history files
│   └── baseline/           # Baseline JSON history files
├── graphs/
│   ├── wally/              # Generated experiment graphs
│   └── baseline/           # Baseline graphs
├── data/
│   └── *.csv               # Dataset files
├── best_model/
│   └── wally_100e..._1e-05lr.pth  # Fine-tuned model weights, experiment 5
├── requirements.txt        # Python dependencies
├── pyproject.toml          # Project configuration
└── README.md
```
