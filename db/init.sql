SELECT 'CREATE DATABASE basepg'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE dataname = 'basepg' )\gexec