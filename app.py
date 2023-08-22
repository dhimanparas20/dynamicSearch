from flask import Flask, jsonify, render_template,make_response
from flask_restful import Api, Resource,reqparse
from os import system,path,makedirs
import json
system("clear")

with open('config.json') as json_file:
  data = json.load(json_file)
APIvalue = data["API"]  

app = Flask(__name__)
api = Api(app) 

class Home(Resource):
    def get(self):
        return make_response(render_template("index.html"))

class getAPi(Resource):
    def get(self):
        data  = {"API":APIvalue}
        return jsonify(data)

api.add_resource(Home, '/')
api.add_resource(getAPi, '/getapi/')

if __name__ == '__main__':
    app.run(debug=True)
