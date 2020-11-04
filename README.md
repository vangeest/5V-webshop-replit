# gitpodnode

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Notalifeform/gitpodnode)

# meer technische informatie
* tutorial building a REST-api with postgressDB + jsnode +jsexpress\
https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
* introdution to docker\
https://docker-curriculum.com
* gitpod online editor en hosting ontwikkelomgeving\
https://www.gitpod.io/docs/
* heroku hosting productieomgeving\
?
* serving static files with jsexpress\
https://expressjs.com/en/starter/static-files.html
* basic html & css & javascript reference\
https://www.w3schools.com


# Je shop op Heroku draaien

## Setup (alleen de 1e keer)

### login op Heruko

```
heroku login -i
```

(note: heroku login werkt niet op gitpod) 

### Maak Heroku app

```
heroku create
```

onthoudt de naam van je app (bv `young-plains-71844`)

### Maak een database

```
heroku addons:create heroku-postgresql:hobby-dev
```

### Kopieer je database naar Heroku

note: de standaard manier werkt helaas niet in gitpod:

```
heroku pg:push shop DATABASE_URL --app young-plains-71844
```
zie: https://stackoverflow.com/a/63762256/430721


Hiermee maak je een dump naar je eigen webserver 
let op! dit kan aleen met niet gevoelige data

```
pg_dump -Fc --no-acl --no-owner -h localhost -U api shop > public/shop.dump
```

`<link>` is de link naar je eigen website:

```
heroku pg:backups:restore https://<link>.gitpod.io/shop.dump DATABASE_URL -a <app-name> --confirm <app-name>
```

note: dit kan wel 5 minuten duren (geen idee waarom)

status kun je checken met

```
heroku pg:backups  -a <app-name>
```

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
(na opnieuw opstarten gitpod)

```
heroku login -i
```

(note: heroku login werkt niet op gitpod) 

```
heroku git:remote -a <app-name>
```

## Notes

### Testing checkout

```
curl --location --request POST 'https://<workspace>.gitpod.io/api/checkout' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'firstName=Robert' \
--data-urlencode 'lastName=Bakker' \
--data-urlencode 'email=robert@bakkerfamily.net' \
--data-urlencode 'articles=1' \
--data-urlencode 'articles=2' \
--data-urlencode 'articles=3'
```
### posting data 

onze backend code kan alleen 'x-www-form-urlencoded' aan, voor 'multipart/form-data' default Form-data format moeten we de 'formidable' lib gebruiken 
(https://www.npmjs.com/package/formidable)

## TODO

- [X] deploy to heroku
- [X] serve static files
- [ ] add some rest calls
- [ ] more complex model
- [ ] documentation for students
- [ ] automate/optimize heroko deploy
