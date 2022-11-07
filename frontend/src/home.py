from flask import Flask, render_template, request, redirect, Response
import pymysql
import base64
import io

app = Flask(__name__)

def connect():
    conn = pymysql.connect(
        host='localhost',
        user='root', 
        password = "root",
        db='crime',
        )

    return conn

@app.route("/")
def main():

    conn = connect()  
    cur = conn.cursor()

    covid = []
    crime = []
   

    print("\n----------------covid-----------------------\n")
    cur.execute("SELECT * FROM covid_info")
    for row in cur.fetchall():
        covid.append({"covid_date": row[0], "covid_number_case": row[1], "covid_number_deaths": row[2]})
    print(covid)

    print("\n----------------crime-----------------------\n")
    cur.execute("SELECT * FROM crime_info")
    for row in cur.fetchall():
        crime.append({"Date": row[0], "Crime_Despcription": row[1], "Weapon": row[2], "Age": row[3], "Race": row[4], "District": row[5], "Gender": row[6], "Longitude": row[7], "Latitude": row[8], "Crime_Number": row[9]})
    print(crime)


    cur.close()
    return render_template("schools.html", covid = covid, crime = crime)