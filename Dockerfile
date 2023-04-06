FROM alpine
EXPOSE 80
ENV GMFS_DIR /var/lib/nginx/html/public

RUN apk add nginx python3 uwsgi uwsgi-python3

ADD --chown=nginx ./api /home/api
ADD --chown=nginx ./gmfs/build /var/www/gmfs
ADD --chown=nginx ./etc/nginx.conf /etc/nginx/http.d/default.conf
ADD --chown=nginx ./etc/entrypoint.sh .

WORKDIR /home/api
RUN python3 -m venv ./venv
RUN ./venv/bin/pip install -r ./requirements.txt

WORKDIR /
CMD ["sh", "entrypoint.sh"]
