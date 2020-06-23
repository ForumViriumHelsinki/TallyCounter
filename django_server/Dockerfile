# pull base image
FROM python:3.7-alpine

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# copy project
COPY . /app/

# install dependencies
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install pipenv
RUN pipenv install --system

# run entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
