import requests
from bs4 import BeautifulSoup
import time


def house_info(u):
    r = requests.get(u)
    s = BeautifulSoup(r.text, "html.parser")

    features_tags = s.findAll("li", {"class": "icon-feature"})
    features = []
    for f in features_tags:
        features.append(
            {'name': f.find("span").contents[0],
             'value': f.find("b").contents[0]}
        )
    price = s.find("div", {"class": "price-items"})
    if price:
        price = price.span.contents[0]
    result = {'price': price, "features": features}
    return result


if __name__ == "__main__":
    # start_time = time.time()
    # print("--- %s seconds ---" % (time.time() - start_time))
    url = "https://www.zonaprop.com.ar/propiedades/barrio-el-lucero-casa-3-ambientes-44640808.html"
    house = house_info(url)
    print(house)
