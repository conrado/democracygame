"""This is an example of a local_settings.py module needed by Emocracy Change as
needed and rename it to local_settings.py """


SECRET_KEY = 'SERVER SPECIFIC DO NOT SHARE!'


DATABASE_ENGINE = 'postgresql_psycopg2' 
DATABASE_NAME = 'd_develop'

DATABASE_USER = 'demo'             
DATABASE_PASSWORD = 'demo'
DATABASE_HOST = 'preeker.net'             # Set to empty string for localhost. Not used with sqlite3.
DATABASE_PORT = ''             # Set to empty string for default. Not used with sqlite3.

TEST_DATABASE_NAME = 'demo_test'
