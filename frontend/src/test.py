import pymysql
import mysql.connector

# conn = pymysql.connect(
#     host='localhost',
#     user='root', 
#     password = "root",
#     db='crime',
#     )

conn = mysql.connector.connect(
    host='localhost',
    user='root', 
    password = "root",
    db='crime',
    )

cursor = conn.cursor()
result = cursor.execute("SELECT Latitude, Longitude FROM crime_info")
lres = []
resStr = 'export const addPoints = ['
spacing = ',\n'

for row in cursor:
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

with open('src/data/testpoints.js', 'w+') as f:
    f.write(resStr)
    print("end")

#res = list(cursor.fetchall())
#print("successfully ", result)
print("\n\n\n")
#print(res)
#print(lres)
#print("resStr: ", resStr)

