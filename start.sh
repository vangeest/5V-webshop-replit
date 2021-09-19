echo installing node.js packages according to package-lock.json file
echo this may take some minutes the first time
npm install

echo genenating database from create.sql and saving to my.db
cd db
sqlite3 my.db < create.sql
cd ..

echo starting api and static webserver
cd api
node index.js