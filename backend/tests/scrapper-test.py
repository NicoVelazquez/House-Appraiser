import scrapper.house_info as house_info
import scrapper.house_list as house_list

if __name__ == "__main__":
    url = "https://www.zonaprop.com.ar/casa-venta-ayres-del-pilar"

    page = 1
    aux_houses = []

    while True:
        neighborhood_url = url + ".html"
        if page > 1:
            neighborhood_url = url + "-pagina-" + str(page) + ".html"
        houses = house_list.house_list(neighborhood_url)
        print(len(houses))
        if houses == aux_houses:
            break
        for h in houses:
            house_url = "https://www.zonaprop.com.ar" + h
            print(house_info.house_info(house_url))
        page = page + 1
        aux_houses = houses
