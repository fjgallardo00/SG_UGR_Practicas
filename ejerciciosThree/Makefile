copy:
	docker cp ejerciciosThree/. e3fc6f97c9cac87c76b4668b4f3e44d3b7b3ec8eb91c41897c5b80ad413829c6:/usr/local/apache2/htdocs

build:
	docker build -t apachesg .

run:
	docker run -d -p 8080:80 apachesg

stop:
	docker stop apachesg
