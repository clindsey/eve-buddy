install:
	npm install

clean:
	rm -rf node_modules
	rm -rf client/public/*
	rm -rf server/build/*

installEslint:
	npm install -g eslint

dev-client:
	(cd client && exec ../node_modules/.bin/gulp)

dev-server:
	./node_modules/.bin/babel-node server/app/index.js
