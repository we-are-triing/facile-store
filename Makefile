network:
	docker network inspect facile >/dev/null || docker network create --driver bridge facile

prod:
	make network
	docker build -t facile-store .
	docker run -d \
		--restart=unless-stopped \
		--network=facile \
		--uid=0 \
		--name=db \
		--mount source=data-node,destination=/data/db \
		-p 27017:27017 \
		mongo \
		mongod --noauth
	docker run \
		--restart=unless-stopped \
		--network=facile \
		--name=api \
		-p 24041:24041 \
		facile-store
dev:
	make network
	docker build -t facile-store .
	docker run -d \
		--restart=unless-stopped \
		--network=facile \
		--name=db \
		--mount source=data-node,destination=/data/db \
		-p 27017:27017 \
		mongo \
		mongod --noauth
	docker run \
		--restart=unless-stopped \
		--network=facile \
		--name=api \
		-p 24041:24041 \
		-p 24051:24051 \
		--entrypoint=npm \
		facile-store run dev

build:
	docker build -t lucestudio/facile-store:v$(v) -t lucestudio/facile-store:latest .

push:
	docker push lucestudio/facile-store

docker:
	make build v=$(v) && make push
