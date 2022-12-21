# Crime &amp; COVID Tracker

### Names:
- Alex Strong
- Joni Kim
- Lauren Hayden


## User Guide

1) Step 1
2) Step 2
3) Step 3
4) Step 4


## Common Bug fixes

1. You will most likely have to remove the port number in 'home.py'. Make sure you also put in your SQL credentials.
From this...
```
def connect():
    conn = pymysql.connect(
        host='localhost',
        port= 4306,
        user='root', 
        password = "root",
        db='crime',
        )
```

To this...
```
def connect():
    conn = pymysql.connect(
        host='localhost',
        user='root', 
        password = "root",
        db='crime',
        )
```


2. You will most likely have to change this in 'package.json' 
From this...
```
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

To this...
```
  "scripts": {
    "start": "react-scripts --openssl-legacy-provider start",
    "build": "react-scripts --openssl-legacy-provider build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```