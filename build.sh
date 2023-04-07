#!/bin/bash

if [ "$1" == "--clean" ] || [ "$1" == "-c" ]; then
	echo "cleaning reproducible project files..."
	rm -rf ./api/**/__pycache__
	rm -rf ./gmfs/node_modules
	rm -rf ./gmfs/build
	rm -rf ./api/venv
	rm -rf ./build
	echo "done."
	exit 0
fi

if ! [ -d ./gmfs/node_modules ]; then
	echo "downloading packages..."
	npm install --prefix ./gmfs
fi

if ! [ -d ./gmfs/build ]; then
	echo "building frontend components"
	npm run build --prefix ./gmfs 
	if ! [ -d ./gmfs/build ]; then
		echo "error building gmfs"
		exit 0
	fi
fi

docker build --rm -t gmfs .

if [ "$1" == "--save" ] || [ "$1" == "-s" ]; then
	echo "saving build to GZip compressed tarball..."
	mkdir ./build && docker save gmfs:latest | gzip > ./build/gmfs.tar.gz
	echo "done."
fi
