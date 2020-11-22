# gitpodnode

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Notalifeform/gitpodnode)

# meer technische info 
## over de code
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


## over de tools
* gitpod online editor en hosting ontwikkelomgeving\
https://www.gitpod.io/docs/
* introdution to docker (kennis alleen nodig als je de repo heftig wilt aanpassen)\
https://docker-curriculum.com
* yarn (kennis alleen nodig als je de repo heftig wilt aanpassen)\
https://yarnpkg.com/getting-started
* heroku hosting productieomgeving\
https://devcenter.heroku.com/



# Je shop op Heroku draaien

## Setup (alleen de 1e keer)

### login op Heruko

```
heroku login -i
```

(note: de optie `-i` is nodig voor gitpod) 

### Maak Heroku app

verzin een leuke naam, bv funkywebshop

```
heroku create funkywebshop
```

onthoudt de naam van je app (bv `funkywebshop)

het domein wordt dan (https://funkywebshop.herokuapp.com/)

### Maak een database

```
heroku addons:create heroku-postgresql:hobby-dev
```

### Kopieer je database naar Heroku

vanaf de project root (/workspace/project-name)\
project-name is de naam van je repo

```
 cd /workspace/<project-name>
 yarn push:db <app-name>
```

### Zet je mail configuratie

Je krijgt een email account en wachtwoord 

```
heroku config:set GMAIL_EMAIL=<email account>
heroku config:set GMAIL_PASSWORD=<email wachtwoord>
heroku config:set ORDER_MAIL_TO=<jouw email waar je orders ontvangt>
```

Dit maakt environment variables in heroku. In gitpod doe je dit met `export  <naam>=<waarde>`  - mailen vanuit gitpod gaat niet, omdat de poort daarvoor geblocked is. 



### Push de code naar heroku

```
git push heroku
```

 of gebruik de gitpiod editor (source control> ... > push to > heroku)

### Zet aantal heroku workers naar 1

```
heroku ps:scale web=1
```

## Link bestaande app aan Heroku
Deze commando's run je iedere keer nadat je gitpod opnieuw opstart.

```
heroku login -i
```

(note: de optie `-i` is nodig voor gitpod) 

```
heroku git:remote -a <app-name>
```

# Handige commando's

## start webserver 

.. als ie bijvoorbeeld gecrashed is..

```
start_web
```
## Sql opnieuw in database laden

.. als je de sql bestanden aangepast hebt..

```
reset_db
```


# Notes

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


# TODO

- [X] deploy to heroku
- [X] serve static files
- [x] add some rest calls
- [x] more complex model
- [x] documentation for students
- [x] automate/optimize heroko deploy

# Credits

-  Robert Bakker [Notalifeform](https://www.gihub.com/Notalifeform)
