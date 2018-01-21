#!/bin/bash
echo "'$1'"

if [ -n "$1" ]; then
  DATABASE="$1"
else
  DATABASE='WeddingGuests'
fi

touch createDb.sql

echo "CREATE DATABASE IF NOT EXISTS $DATABASE; USE $DATABASE;" > createDb.sql

cat createTables_1.0.0.sql initDiets.sql initStates.sql createStoredProcedures_1.0.0.sql populateGuests_1.0.0.sql >> createDb.sql

echo "Creating database $DATABASE..."
mysql --user=root -p --verbose < createDb.sql
echo "$DATABASE created."

echo 'Database initialized. Done'
