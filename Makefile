stop:
	docker stop api db

clear:
	make stop
	docker system prune --volumes --force

clear-all:
	make stop
	docker system prune --volumes --force --all

fresh:
	make clear-all
	make dev

network:
	docker network inspect facile >/dev/null || docker network create --driver bridge facile

prod:
	make network
	docker build -t facile-store .
	docker run -d \
		--restart=unless-stopped \
		--network=facile \
		--name=db \
		-p 27017:27017 \
		mongo \
		mongod --noauth
	docker run -d \
		--restart=unless-stopped \
		--network=facile \
		--name=api \
		-p 24041:24041 \
		--mount type=volume,target=data-node,source=db,destination=/data/db \
		--mount type=volume,target=server,source=store,destination=/home/node/store/server \
		facile-store
dev:
	make network
	docker build -t facile-store .
	docker run -d \
		--restart=unless-stopped \
		--network=facile \
		--name=db \
		-p 27017:27017 \
		mongo \
		mongod --noauth
	docker run -d \
		--restart=unless-stopped \
		--network=facile \
		--name=api \
		-p 24041:24041 \
		-p 24051:24051 \
		--mount type=bind,source="$(CURDIR)"/data-node,target=/data/db \
		--mount type=bind,source="$(CURDIR)"/server,target=/home/node/store/server \
		--entrypoint=npm \
		facile-store run dev

build:
	docker build -t lucestudio/facile-store:v$(v) -t lucestudio/facile-store:latest .

push:
	docker push lucestudio/facile-store

docker:
	make build v=$(v) && make push
