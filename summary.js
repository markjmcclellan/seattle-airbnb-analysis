const dashboardData = {
  "year": 2018,
  "bins": [
    "$0\u201349",
    "$50\u201399",
    "$100\u2013149",
    "$150\u2013199",
    "$200\u2013249",
    "$250\u2013299",
    "$300\u2013399",
    "$400+"
  ],
  "groups": {
    "All listings": {
      "count": 7576,
      "median": 88.0,
      "under150": 81.3,
      "histogram": [
        1002,
        3573,
        1587,
        695,
        224,
        199,
        168,
        128
      ]
    },
    "Entire home/apt": {
      "count": 5603,
      "median": 99.0,
      "under150": 76.1,
      "histogram": [
        202,
        2619,
        1441,
        652,
        211,
        193,
        165,
        120
      ]
    },
    "Private room": {
      "count": 1844,
      "median": 55.0,
      "under150": 96.1,
      "histogram": [
        733,
        899,
        140,
        42,
        13,
        6,
        3,
        8
      ]
    },
    "Shared room": {
      "count": 129,
      "median": 40.0,
      "under150": 99.2,
      "histogram": [
        67,
        55,
        6,
        1,
        0,
        0,
        0,
        0
      ]
    }
  },
  "roomMedians": [
    {
      "label": "Entire home",
      "price": 99.0
    },
    {
      "label": "Private room",
      "price": 55.0
    },
    {
      "label": "Shared room",
      "price": 40.0
    }
  ],
  "bedroomMedians": [
    {
      "label": "0\u20131 bedrooms",
      "price": 75.0
    },
    {
      "label": "2 bedrooms",
      "price": 120.0
    },
    {
      "label": "3+ bedrooms",
      "price": 195.5
    }
  ],
  "correlations": [
    {
      "label": "Bedrooms",
      "value": 0.6
    },
    {
      "label": "Bathrooms",
      "value": 0.48
    },
    {
      "label": "Guest capacity",
      "value": 0.57
    },
    {
      "label": "Reviews",
      "value": -0.17
    },
    {
      "label": "Guest rating",
      "value": 0.07
    }
  ],
  "model": {
    "rows": 6101,
    "r2": 0.347,
    "mae": 40.65
  }
};
