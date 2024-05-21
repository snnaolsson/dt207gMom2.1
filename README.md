# Backend moment 2.1 - rest webtjänst

Repositoryt innehåller kod för ett rest api för CV skapat med express. 

Grundläggande funktionalitet för CRUD är implementerad. 

# Länk
En liveversion av APIet finns tillgänglig på följande URL:

# Installation, databas
APIet använder sqlite3-databas.
- Klona ned källkodfilerna
- kör kommando npm install för att installera nödvändiga npm-paket
- Kör installations scriptet install.js. Install.js skapar databastabellen.

## Databastabellen
__Tabellnamn: jobs__
id INTEGER PRIMARY KEY AUTOINCREMENT, 
companyname TEXT NOT NULL, 
jobtitle TEXT NOT NULL, 
location TEXT, 
startdate TEXT, 
enddate TEXT

# Användning
__GET /cv/jobs__ : hämtar alla tillgängliga arbeten
__POST /cv/jobs__ : Lagrar nytt arbete. Kräver att ett work-objekt skickas med. Jobtitle och companyname är obligatoriska uppgifter. 
__PUT /cv/jobs/:id__ :Uppdaterar existerande arbete med angivet id. Kräver att work-objekt skickas med : jobtitle och companyname är obligatoriska.
__DELETE /cv/jobs/:id__ : Raderar kurs med angivet id. 

Ett work-object returneras som json med följande struktur:
  {
    "id": 2,
    "companyname": "Jobbelijobbet",
    "jobtitle": "Boendehandledare",
    "location": "Östersunds",
    "startdate": "2020",
    "enddate": null
  }