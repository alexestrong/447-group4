from flask import Flask, jsonify, render_template, request, redirect, Response
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import pymysql
import base64
import io
from pathlib import Path

app = Flask(__name__)
CORS(app)

ma = Marshmallow(app)

def connect():
    conn = pymysql.connect(
        host='localhost',
        user='root', 
        password = "root",
        db='crime',
        )

    return conn

def crime_json(crime):

    return jsonify(crime)

def covid_json(covid):
    return jsonify(covid)

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


@app.route("/")
def getData():

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
        crime.append({"Date": row[0], "Crime_Despcription": row[1], "Weapon": row[2], "Age": row[3], "Race": row[4], "District": row[5], "Gender": row[6], "Longitude": row[7], "Latitude": row[8], "Crime_Number": row[9]})
    #print(crime)

    make_points_list(cur)


    cur.close()
    ret_crime = crime_json(crime)
    ret_covid = covid_json(covid)

    return ret_crime
    #return render_template("app.html", covid = covid, crime = crime)
    

if(__name__ == "__main__"):
    app.run(debug=True, host='0.0.0.0', port=5000)