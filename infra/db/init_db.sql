SELECT 'CREATE DATABASE primus'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'primus')\gexec
