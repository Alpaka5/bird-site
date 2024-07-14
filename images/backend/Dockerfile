FROM python:3.12-alpine
WORKDIR /srv/backend
COPY ./srv/backend/requirements.txt /srv/backend
RUN pip3 install -r requirements.txt
EXPOSE 5000

ENTRYPOINT ["sh", "-c"]
CMD ["./manage.py migrate && ./manage.py runserver 0.0.0.0:5000"]