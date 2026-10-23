/* Below is the PSQL equivalent of mysqls  "CREATE IF NOT EXIST db name;"" */

SELECT 'CREATE DATABASE primus'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'primus')\gexec
