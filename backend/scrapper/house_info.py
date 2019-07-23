import requests
from bs4 import BeautifulSoup


def house_info(u):
    r = requests.get(u)
    s = BeautifulSoup(r.text, "html.parser")

    result = {}

    price = s.find("div", {"class": "price-items"})
    if price:
        price = price.span.contents[0]
    result['price'] = price

    features_tags = s.findAll("li", {"class": "icon-feature"})
    for f in features_tags:
        result[f.find("span").contents[0]] = f.find("b").contents[0]

    return result


