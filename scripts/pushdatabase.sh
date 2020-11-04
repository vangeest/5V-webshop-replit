#
# script to workaround the issue that you can not access your
# heroku psql database from gitpod
#
appname=$1

if [[ -z $appname ]]; then
    echo "usage: pushdatabase <appname>"
    exit 1
fi

# FIXME: https://3000-https://f9bc2fa0-741d-4c26-96f7-479159194b26.ws-eu01.gitpod.io/shop.dump
base_url="https://3000-$GITPOD_WORKSPACE_URL"

check=$(curl -s $base_url | grep -c "Nothing to see here")
echo "check $code"

if [[ $check == "1" ]]; then
  echo "starting web server.."
  cd src && node index.js &
fi

echo "---> dumping DB..."
pg_dump -Fc --no-acl --no-owner -h localhost -U api shop > public/shop.dump

echo "--> restoring DB... $base_url/shop.dump"
heroku pg:backups:restore $base_url/shop.dump DATABASE_URL -a $appname --confirm $appname

busy="yes"
while [[ $busy != "" ]]
  echo `date`"...Still busy..."
  sleep 2
  heroku pg:backups > /tmp/t.txt
  start=$(awk '/Restores/{ print NR; exit }' /tmp/t.txt)
  end=$(awk '/Copies/{ print NR-1; exit }' /tmp/t.txt)
  busy=$(head -n $end /tmp/t.txt  | tail -n $start | grep Progress)
done



