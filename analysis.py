
from pathlib import Path
import json

import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split


DATA_FILE = Path("data/seattle_01.csv")
OUTPUT_FILE = Path("data/summary.js")
ROOM_TYPES = ["Entire home/apt", "Private room", "Shared room"]
FEATURES = ["bedrooms", "bathrooms", "accommodates", "reviews", "overall_satisfaction"]
BINS = [0, 50, 100, 150, 200, 250, 300, 400, float("inf")]
BIN_LABELS = ["$0–49", "$50–99", "$100–149", "$150–199", "$200–249",
              "$250–299", "$300–399", "$400+"]


def price_summary(rows):
    """Counts, median, and histogram for a set of listings."""
    counts = pd.cut(rows["price"], bins=BINS, right=False, labels=BIN_LABELS).value_counts()
    return {
        "count": int(len(rows)),
        "median": float(rows["price"].median()),
        "under150": round(float((rows["price"] < 150).mean() * 100), 1),
        "histogram": [int(counts[label]) for label in BIN_LABELS],
    }


def main():
    df = pd.read_csv(DATA_FILE)
    df = df.drop_duplicates(subset="room_id")
    df = df.dropna(subset=["price", "room_type", "bedrooms"])

    # Keep listings with missing ratings in descriptive summaries.
    groups = {"All listings": price_summary(df)}
    for room in ROOM_TYPES:
        groups[room] = price_summary(df[df["room_type"] == room])

    room_medians = [
        {"label": "Entire home", "price": float(df[df["room_type"] == ROOM_TYPES[0]]["price"].median())},
        {"label": "Private room", "price": float(df[df["room_type"] == ROOM_TYPES[1]]["price"].median())},
        {"label": "Shared room", "price": float(df[df["room_type"] == ROOM_TYPES[2]]["price"].median())},
    ]

    bedroom_groups = [
        {"label": "0–1 bedrooms", "price": float(df[df["bedrooms"] <= 1]["price"].median())},
        {"label": "2 bedrooms", "price": float(df[df["bedrooms"] == 2]["price"].median())},
        {"label": "3+ bedrooms", "price": float(df[df["bedrooms"] >= 3]["price"].median())},
    ]

    # Same five model inputs as the original project.
    model_df = df.dropna(subset=FEATURES + ["price"])
    x_train, x_test, y_train, y_test = train_test_split(
        model_df[FEATURES], model_df["price"], test_size=0.2, random_state=42
    )
    model = LinearRegression().fit(x_train, y_train)
    predictions = model.predict(x_test)

    correlations = model_df[["price"] + FEATURES].corr()["price"].drop("price")
    names = {
        "bedrooms": "Bedrooms", "bathrooms": "Bathrooms", "accommodates": "Guest capacity",
        "reviews": "Reviews", "overall_satisfaction": "Guest rating",
    }

    summary = {
        "year": 2018,
        "bins": BIN_LABELS,
        "groups": groups,
        "roomMedians": room_medians,
        "bedroomMedians": bedroom_groups,
        "correlations": [
            {"label": names[feature], "value": round(float(correlations[feature]), 2)}
            for feature in FEATURES
        ],
        "model": {
            "rows": int(len(model_df)),
            "r2": round(float(r2_score(y_test, predictions)), 3),
            "mae": round(float(mean_absolute_error(y_test, predictions)), 2),
        },
    }
    OUTPUT_FILE.write_text("const dashboardData = " + json.dumps(summary, indent=2) + ";\n")
    print(f"Saved {OUTPUT_FILE} using {len(df):,} listings")
    print(f"Test R²: {summary['model']['r2']}; test MAE: ${summary['model']['mae']:.2f}")


if __name__ == "__main__":
    main()
