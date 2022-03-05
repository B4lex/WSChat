#!/bin/bash

python manage.py migrate --no-input --verbosity 0
python manage.py runserver 0.0.0.0:8000
