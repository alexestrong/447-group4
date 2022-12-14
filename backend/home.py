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

# CHANGE THIS TO ACCEPT LIST OF DICTIONARIES AS PARAMETER
# SAME FORMAT, BUT MAKE 'addPoints' A LIST CONTAINING DICTIONARY ITEMS
def make_points_list(cur):

    result = cur.execute("SELECT Latitude, Longitude FROM crime_info")
    lres = []
    resStr = 'export const addPoints = ['
    spacing = ',\n'

    for row in cur:
        #print(row[1])
        tRow0 = str(row[0])
        tRow1 = str(row[1])
        temp = '[' + tRow0+ ',' + tRow1 +']'
        #lres.append(temp)
        resStr += temp
        resStr += spacing

    endind = resStr.rfind(spacing)
    resStr = resStr[:endind]
    resStr += ']'

    root_folder = Path(__file__).parents[1]
    my_path = root_folder / "frontend/src/data/crimepoints.js"  

    with open(my_path, 'w+') as f:
        f.write(resStr)

def sendCoordinatesToJavascript(listOfDictionaries):

    print("Here is the list of dictionaries: ", listOfDictionaries)

    root_folder = Path(__file__).parents[1]
    my_path = root_folder / "frontend/src/data/middleManCoordinates.js"

    with open(my_path, 'w+') as f:
        f.write('export const addPoints = ')
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
        covid.append({"covid_date": row[0], "covid_number_case": row[1], "covid_number_deaths": row[2]})
    #print(covid)

    print("\n----------------crime-----------------------\n")
    cur.execute("SELECT * FROM crime_info")
    for row in cur.fetchall():
        crime.append({"Date": row[0].isoformat(), "Crime_Despcription": row[1], "Weapon": row[2], "Age": row[3],
                     "Race": row[4], "District": row[5], "Gender": row[6], "Longitude": float(row[7]), "Latitude": float(row[8]), "Crime_Number": row[9]})
    print(crime)

    # Make a copy of crime that we will then narrow down with filters
    global filteredCrime
    filteredCrime = crime

    make_points_list(cur)


    cur.close()
    ret_crime = crime_json(crime)
    ret_covid = covid_json(covid)

    return ret_crime
    #return render_template("app.html", covid = covid, crime = crime)

#########################################################################################
#                                      FILTER ROUTES                                    #
#########################################################################################


@app.route('/resetFilter')
def resetFilter():
    global filteredCrime
    global crime
    filteredCrime = crime
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


#@app.route('/publishNewCoordinates')
#def publishNewCoordinates():
#    global filteredCrime
#    sendCoordinatesToJavascript(filteredCrime)
#    return jsonify(filteredCrime)


@app.route('/weapon_firearm')
def weapon_firearm():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Weapon"] == "FIREARM":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)



@app.route('/weapon_knife')
def weapon_knife():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Weapon"] == "KNIFE":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/weapon_hands')
def weapon_hands():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Weapon"] == "HANDS":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/weapon_other')
def weapon_other():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Weapon"] == "OTHER":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/weapon_na')
def weapon_na():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Weapon"] == "NA":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/gender_m')
def gender_m():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Gender"] == "M":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/gender_f')
def gender_f():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Gender"] == "F":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/gender_u')
def gender_u():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Gender"] == "U":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/district_northeast')
def district_northeast():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["District"] == "NORTHEAST":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/district_eastern')
def district_eastern():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["District"] == "EASTERN":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/district_central')
def district_central():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["District"] == "CENTRAL":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/district_northern')
def district_northern():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["District"] == "NORTHERN":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/district_southeast')
def district_southeast():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["District"] == "SOUTHEAST":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/district_southern')
def district_southern():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["District"] == "SOUTHERN":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/district_northwest')
def district_northwest():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["District"] == "NORTHWEST":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/district_western')
def district_western():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["District"] == "WESTERN":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/district_southwest')
def district_southwest():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["District"] == "SOUTHWEST":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/race_black_or_african_american')
def race_black_or_african_american():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Race"] == "BLACK_OR_AFRICAN_AMERICAN":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/race_white')
def race_white():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Race"] == "WHITE":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/race_asian')
def race_asian():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Race"] == "ASIAN":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/race_american_indian_or_alaska_native')
def race_american_indian_or_alaska_native():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Race"] == "AMERICAN_INDIAN_OR_ALASKA_NATIVE":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


@app.route('/race_unknown')
def race_unknown():
    global filteredCrime
    tempList = []

    # We will pull the value we are looking for from our current filtered list

    # Loop through all the dictionary items in the filteredCrime list
    for crimeDictionary in filteredCrime:
        # Check if the value is a match then add it to our temporary list.
        if crimeDictionary["Race"] == "UNKNOWN":
            tempList.append(crimeDictionary)

    # Finally set the temporary list now as our main filtered list
    filteredCrime = tempList

    # Then send the new filtered list to the .JS file that the map is populating from
    sendCoordinatesToJavascript(filteredCrime)
    return jsonify(filteredCrime)


if(__name__ == "__main__"):
    app.run(debug=True, host='0.0.0.0', port=5000)