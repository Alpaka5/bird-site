FROM python:3.12-alpine
WORKDIR /srv/backend
COPY ./srv/backendv2/requirements.txt /srv/backend
RUN pip3 install -r requirements.txt
EXPOSE 5000

ENTRYPOINT ["sh", "-c"]
CMD ["uvicorn main:app --host 0.0.0.0 --port 5000 --reload --log-level trace"]