echo installing node.js packages according to package-lock.json file
npm install
echo genenating database from db.sql and saving to db.sqlite3
sqlite3 main.db < main.sql
echo starting api and static webserver
node index.js
