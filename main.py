import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

from google.colab import drive
drive.mount('/content/drive/')
DATA_DIR = "/content/drive/MyDrive/Fashion-Mnist_Dataset" # This was changed for my Google Drive link.

TRAIN_FILE = os.path.join(DATA_DIR, "fashion-mnist_train.csv")
TEST_FILE = os.path.join(DATA_DIR, "fashion-mnist_test.csv")


def main():
    print("Hello from wally!")


if __name__ == "__main__":
    main()
