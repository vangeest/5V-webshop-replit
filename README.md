[Run on Repl.it](https://replit.com/github/vangeest/webshop-replit-example)

# TODO
- [ ] remove arrow functions, because they make the code difficult for novice programmers. Explanation on arrow functions can be found here: https://zendev.com/2018/10/01/javascript-arrow-functions-how-why-when.html
- [ ] replace npm by yarn
- [ ] speed up time it takes to "run", maybe by checking if packages changes before re-installing and by checking of sql file was changed before rebuilding database 

# Basic explanation of how the webshop works
The basic idea is that a webpage of the shop is loaded by the browser and information on the articles in the shop are added to that depending on what the user selects.
1. You open a browser and navigate to the webshop. 
2. The browser downloads the html en css files from the server. It also downloads a piece of javascript code.
3. The javascript code is being executed by the browser. The javascript code connects to a link on the server that is connected to the api. This is called a REST-interface. Through the REST interface, the javascript code in the browser request information on the articles it needs to display.
4. The api is a programm on the server which connects to the database. It requests information from the database and sends it back to the browser. The result is sent in json-format.
5. The javascript programm in the browser looks at the json-file and add's elements containing articels in the shop to the DOM. The DOM is the model of the html files that the browser keeps in it memory and shows to the user. These elements added are displayed by the browser.

An alternative approach would be to have the server build complete web-pages including all information on articles. This is the idea behind the php programming language. The REST-interface is gaining popularity. An advantage of REST above php is that REST allows for more responsive (interfactive) websites.

# Explanation of files and folders

## db folder
Database with information on the arcticles in the shop

## web folder
Static (non changing) html, css en js files.

## api folder
js files which are being executed on the server when the api is called

## .replit
We use a bash-repl (language="bash" in .replit file), because bash has sqlite3 and nodejs installed. Downside of bash-repl: The nodejs-repl installs packages automatically by scanning your code. In the bash-repl we have to maintain dependencies in a packages file manually. 

## start.sh
This file is executed everytime you click on "Run" in replit. What it does is:
1. (re)install packages using the package.json file
2. (re) create the databasefile db/my.db
3. start the server for the api en webpages

# Documentation

## Code
* tutorial building a REST-api with postgressDB + jsnode + jsexpress\
https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
* serving static files with jsexpress\
https://expressjs.com/en/starter/static-files.html
* basic html & css & javascript reference\
https://www.w3schools.com
* basic sql course\
https://www.khanacademy.org/computing/computer-programming/sql
* postgres (database) documentatie\
https://node-postgres.com/
* shoppping basket lokaal opslaan\
google op local storage javascript basket
* bestelling mailen\
heroku specifieke oplossing, zie aldaar\
generieke uitleg vind je hier: https://youtu.be/Va9UKGs1bwI


## Tools
* gitpod online editor en hosting ontwikkelomgeving\
https://www.gitpod.io/docs/
* introdution to docker (kennis alleen nodig als je de repo heftig wilt aanpassen)\
https://docker-curriculum.com
* yarn (kennis alleen nodig als je de repo heftig wilt aanpassen)\
https://yarnpkg.com/getting-started
* heroku hosting productieomgeving\
https://devcenter.heroku.com/


# Notes

## Zet je mail configuratie

Je krijgt een email account en wachtwoord 

```
heroku config:set GMAIL_EMAIL=<email account>
heroku config:set GMAIL_PASSWORD=<email wachtwoord>
heroku config:set ORDER_MAIL_TO=<jouw email waar je orders ontvangt>
```

Dit maakt environment variables in heroku. In gitpod doe je dit met `export  <naam>=<waarde>`  - mailen vanuit gitpod gaat niet, omdat de poort daarvoor geblocked is. 



## posting data 

onze backend code kan alleen 'x-www-form-urlencoded' aan, voor 'multipart/form-data' default Form-data format moeten we de 'formidable' lib gebruiken 
(https://www.npmjs.com/package/formidable)


## Random images maken

```
count=1
while [[ $count -lt 100 ]]
do
 echo $count
 count=$[$count+1]
 wget -O $count.jpg https://picsum.photos/200/300
done
```
# credits
- avs123a\
for a "Simple inventory list example with crud using : NodeJS, express framework, pug template, sqlite database and bootstrap". See https://github.com/avs123a/NodeJS-simple-example
- Robert Bakker [Notalifeform](https://www.gihub.com/Notalifeform)\
for help almost 24x7 with many questions and problems and providing basic shop called gitpodnode to be further developed by students on gitpod and deplyed freely on heroku. See https://gitpod.io/#https://github.com/Notalifeform/gitpodnode




