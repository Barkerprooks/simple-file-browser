uwsgi \
	--plugins python3 \
	--http-socket :5000 \
	--master \
	--chdir /home/api \
	--virtualenv ./venv \
	-p 2 \
	-w wsgi:app \
	-d /var/log/uwsgi.log
nginx
tail -qf /var/log/uwsgi.log /var/log/nginx/access.log
