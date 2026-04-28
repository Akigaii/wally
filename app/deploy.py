import torch
import os
from transformers import AutoTokenizer, AutoModel
import torch.nn as nn

WALLY = "../dl/CS 489_wally_best_old_dataset.pt"
MODEL_NAME = "sentence-transformers/all-mpnet-base-v2"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class WallyRegressor(nn.Module):
    def __init__(self, model_name, dropout=0.2):
        super().__init__()
        self.encoder = AutoModel.from_pretrained(model_name)
        hidden = self.encoder.config.hidden_size
        self.head = nn.Sequential(
            nn.Linear(hidden, 128),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(128, 1),
            nn.Sigmoid()
        )

    def mean_pool(self, token_embeddings, attention_mask):
        mask_expanded = attention_mask.unsqueeze(-1).float()
        return (token_embeddings * mask_expanded).sum(1) / mask_expanded.sum(1).clamp(min=1e-9)

    def forward(self, input_ids, attention_mask):
        out = self.encoder(input_ids=input_ids, attention_mask=attention_mask)
        pooled = self.mean_pool(out.last_hidden_state, attention_mask)
        return self.head(pooled).squeeze(-1)


print("Loading model...")
model = WallyRegressor(MODEL_NAME).to(DEVICE)
model.load_state_dict(torch.load(WALLY, map_location=DEVICE))
model.eval()
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
print("Model ready.")


def predict(clue, anchor_left, anchor_right):
    text = f"clue: {clue} | left: {anchor_left} | right: {anchor_right}"
    enc = tokenizer(text, max_length=64, padding="max_length",
                    truncation=True, return_tensors="pt")
    with torch.no_grad():
        score = model(
            enc["input_ids"].to(DEVICE),
            enc["attention_mask"].to(DEVICE)
        )
    return score.item() * 100