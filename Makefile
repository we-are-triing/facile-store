network:
	docker network inspect facile >/dev/null || docker network create --driver bridge facile

prod:
	make network
	docker-compose up

dev:
	make network
	docker-compose -f docker-compose.dev.yml up

build:
	docker build -t lucestudio/facile-store:v$(v) -t lucestudio/facile-store:latest .

push:
	docker push lucestudio/facile-store

docker:
	make build v=$(v) && make push
