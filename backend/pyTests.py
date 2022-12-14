import pytest
import pymysql
from home import connect, retApp

def test_connect():
    conn = connect()

    assert(conn.host == 'localhost' and conn.user == b'root' and conn.db == b'crime')

def test_return():
    conn = connect()

    cur = conn.cursor()
    test_crime = []
    cur.execute("SELECT * FROM crime_info WHERE Gender = 'M' and Age = 22")
    for row in cur.fetchall():
        test_crime.append({"Date": row[0].isoformat(), "Crime_Despcription": row[1], "Weapon": row[2], "Age": row[3],
            "Race": row[4], "District": row[5], "Gender": row[6], "Longitude": float(row[7]), "Latitude": float(row[8]), "Crime_Number": row[9]})
    print(test_crime)

    assert(len(test_crime) == 92)

@pytest.fixture()
def test_app():
    app = retApp
    return app

def test_filters(client):
    response = client.get('/filters')
    assert b'Date' in response.data