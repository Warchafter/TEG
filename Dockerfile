FROM python:3.8-alpine
LABEL MAINTAINER="Kevin Arriaga kevin.arriaga@gmail.com"

# set system-wide environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system-wide dependencies
COPY ./requirements.txt /requirements.txt
COPY ./new_requirements.txt /new_requirements.txt
RUN apk update
RUN apk add postgresql-client jpeg-dev libjpeg
RUN apk add --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev \
    zlib zlib-dev python3-dev libffi-dev openssl-dev cargo
RUN pip install --upgrade pip

# install project dependencies
RUN pip install -r /requirements.txt

# Remove unnecessary dependencies
RUN apk del .tmp-build-deps

# set work directory
RUN mkdir /app
WORKDIR /app

# copy project
COPY ./backend /app

# make static and media root
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
RUN adduser -D user
RUN chown -R user:user /vol
RUN chmod -R 755 /vol/web
USER user
