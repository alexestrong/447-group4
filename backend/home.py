from flask import Flask, jsonify, render_template, request, redirect, Response
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import pymysql
import base64
import io
from pathlib import Path
import json

app = Flask(__name__)
CORS(app)

ma = Marshmallow(app)

# THIS WILL HOLD A LIST OF DICTIONARIES OF ALL THE DATA POINTS.
# WILL BE NARROWED DOWN WITH EACH FILTER CALL AND
global filteredCrime
filteredCrime = []

global crime
crime = []

def retApp():
    return app;


def connect():
    conn = pymysql.connect(
        host='localhost',
        #port= 4306,
        user='root', 
        password = "root",
        db='crime',
        )

    return conn

def crime_json(crime):
    return jsonify(crime)

def covid_json(covid):
    return jsonify(covid)


def sendCrimeDataToJavascript(listOfDictionaries):

    print("Sending crime data to static javascript... ")

    root_folder = Path(__file__).parents[1]
    my_path = root_folder / "frontend/src/data/staticCrimeData.js"

    with open(my_path, 'w+') as f:
        f.write('export const crimeData = ')
        json_string = json.dumps(listOfDictionaries, indent=4)
        f.write(json_string)

def sendCovidDataToJavascript(listOfDictionaries):

    print("Sending covid data to static javascript... ")

    root_folder = Path(__file__).parents[1]
    my_path = root_folder / "frontend/src/data/staticCovidData.js"

    with open(my_path, 'w+') as f:
        f.write('export const covidData = ')
        json_string = json.dumps(listOfDictionaries, indent=4)
        f.write(json_string)


@app.route("/")
def getData():
    global crime

    conn = connect()  
    cur = conn.cursor()

    covid = []
    crime = []

    print("\n----------------covid-----------------------\n")
    cur.execute("SELECT * FROM covid_info")
    for row in cur.fetchall():
        covid.append({"covid_date": row[0].isoformat(), "covid_number_case": row[1], "covid_number_deaths": row[2]})
    #print(covid)

    print("\n----------------crime-----------------------\n")
    cur.execute("SELECT * FROM crime_info")
    for row in cur.fetchall():
        crime.append({"Date": row[0].isoformat(), "Crime_Despcription": row[1], "Weapon": row[2], "Age": row[3],
                     "Race": row[4], "District": row[5], "Gender": row[6], "Longitude": float(row[7]), "Latitude": float(row[8]), "Crime_Number": row[9]})
    #print(crime)

    cur.close()

    sendCrimeDataToJavascript(crime)
    sendCovidDataToJavascript(covid)

    return crime

#########################################################################################
#                                      FILTER ROUTES                                    #
#########################################################################################


# localhost:5000/filters?filter=Weapon:FIREARM&filter=Gender:F
# var filters = ['Weapon:FIREARM', 'Gender:F']
@app.route('/filters')
def applyFilter():
    # Set filteredCrime to hold all data
    filteredCrime = getData()

    # Get a list of all the filter values
    filters = request.args.getlist('filter')

    # Iterate over the filters
    for f in filters:
        # Split the filter value on the ":" character to get the key and value
        key, value = f.split(":")

        # Use a list comprehension to create a new list of dictionaries
        # that only contains dictionaries with the key-value pair specified in the filter
        filteredCrime = [d for d in filteredCrime if d[key] == value]

    # Use the jsonify() function to convert the list of dictionaries into a JSON-formatted string
    json_items = jsonify(filteredCrime)

    # Return the JSON-formatted string
    return json_items


if(__name__ == "__main__"):
    app.run(debug=True, host='0.0.0.0', port=5000)