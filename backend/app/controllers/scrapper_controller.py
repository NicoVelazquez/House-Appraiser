import scrapper.house_info as house_info
import scrapper.house_list as house_list

from flask import request, jsonify
from app import app, mongo


@app.route("/api/country", methods=['POST'])
def post_country():
    url = request.data.decode("utf-8")
    page = 1
    aux_houses = []

    if url in mongo.db.list_collection_names():
        return jsonify({'ok': True, 'message': 'Already scrapped'}), 200

    while True:
        neighborhood_url = url + ".html"
        if page > 1:
            neighborhood_url = url + "-pagina-" + str(page) + ".html"
        houses = house_list.house_list(neighborhood_url)
        if houses == aux_houses:
            break
        for h in houses:
            house_url = "https://www.zonaprop.com.ar" + h
            house_information = house_info.house_info(house_url)
            mongo.db[url].insert_one(house_information)
        page = page + 1
        aux_houses = houses
    return jsonify({'ok': True, 'message': 'Finished scrapping'}), 200


@app.route("/api/house", methods=['POST'])
def post_house():
    print(request.data.decode("utf-8"))
    return jsonify({'ok': True, 'message': 'Price successfully generated!', 'price': 123}), 200


# @app.route('/api/test', methods=['GET', 'POST', 'DELETE', 'PATCH'])
# def user():
#     if request.method == 'GET':
#         query = request.args
#         data = mongo.db.users.find_one(query)
#         return jsonify(data), 200
#
#     data = request.get_json()
#     if request.method == 'POST':
#         if data.get('name', None) is not None and data.get('email', None) is not None:
#             mongo.db.users.insert_one(data)
#             return jsonify({'ok': True, 'message': 'User created successfully!'}), 200
#         else:
#             return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400
#
#     if request.method == 'DELETE':
#         if data.get('email', None) is not None:
#             db_response = mongo.db.users.delete_one({'email': data['email']})
#             if db_response.deleted_count == 1:
#                 response = {'ok': True, 'message': 'record deleted'}
#             else:
#                 response = {'ok': True, 'message': 'no record found'}
#             return jsonify(response), 200
#         else:
#             return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400
#
#     if request.method == 'PATCH':
#         if data.get('query', {}) != {}:
#             mongo.db.users.update_one(
#                 data['query'], {'$set': data.get('payload', {})})
#             return jsonify({'ok': True, 'message': 'record updated'}), 200
#         else:
#             return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400


