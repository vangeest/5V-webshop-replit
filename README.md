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

### Setup (alleen de 1e keer)

## login op Heruko

```
heroku login -i
```

(note: heroku login werkt niet op gitpod) 

## Maak Heroku app

```
heroku create
```

onthoudt de naam van je app (bv `young-plains-71844`)

## Maak een database

```
heroku addons:create heroku-postgresql:hobby-dev
```

## Kopieer je database naar Heroku

note: de standaard manier werkt niet in gitpod:

```
heroku pg:push shop DATABASE_URL --app young-plains-71844
```

### Dump je database

Hiermee maak je een dump naar je eigen webserver 
let op! dit kan aleen met niet gevoelige data

```
pg_dump -Fc --no-acl --no-owner -h localhost -U api shop > public/shop.dump
```

`<link>` is de link naar je eigen website:

```
heroku pg:backups:restore https://`<link>`.gitpod.io/shop.dump DATABASE_URL -a <app-name> --confirm <app-name>
```

note: dit kan wel 5 minuten duren (geen idee waarom)

status kun je checken met

```
heroku pg:backups  -a <app-name>
```




https://3000-d0a5c694-94a9-483a-978f-1d1b086b2c5d.ws-eu01.gitpod.io/shop.dump



heroku ps:scale web=1

young-plains-71844

heroku git:remote -a young-plains-71844



postgresql-solid-63959

heroku pg:push <localdbname> DATABASE_URL --app <appname>


Does not work in gitpod:



https://stackoverflow.com/a/63762256/430721

heroku pg:push shop DATABASE_URL --app young-plains-71844


pg_dump -Fc --no-acl --no-owner -h localhost -U api shop > publiv/shop.dump
heroku pg:backups:restore https://3000-d0a5c694-94a9-483a-978f-1d1b086b2c5d.ws-eu01.gitpod.io/shop.dump DATABASE_URL -a young-plains-71844 --confirm young-plains-71844






https://3000-d0a5c694-94a9-483a-978f-1d1b086b2c5d.ws-eu01.gitpod.io/shop.dump

heroku pg:backups:restore https://3000-d0a5c694-94a9-483a-978f-1d1b086b2c5d.ws-eu01.gitpod.io/shop.dump DATABASE_URL -a young-plains-71844


heroku pg:backups:restore https://3000-d0a5c694-94a9-483a-978f-1d1b086b2c5d.ws-eu01.gitpod.io/shop.dump DATABASE_URL -a young-plains-71844 --confirm young-plains-71844




## TODO

- [ ] deploy to heroku
- [ ] serve static files
- [ ] add some rest calls
- [ ] more complex model
- [ ] documentation for students
