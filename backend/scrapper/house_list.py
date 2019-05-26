import requests
from bs4 import BeautifulSoup


def house_list(u):
    r = requests.get(u)
    s = BeautifulSoup(r.text, "html.parser")

    houses_tags = s.findAll("div", {"class": "posting-card"})

    result = []
    for f in houses_tags:
        result.append(f["data-to-posting"])
    return result


if __name__ == "__main__":
    url = "https://www.zonaprop.com.ar/casa-venta-el-lucero-escobar.html"
    houses = house_list(url)
    print(houses)
