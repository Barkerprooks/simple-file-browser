#!/bin/bash

if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
	echo "usage: $0 [-c|-h|-s]"
	echo
	echo "  --clean, -c: clean the build space"
	echo "  --save, -s:  save the docker image as a compressed tarball"
	echo "  --help, -h:  this page"
	echo
	exit 0
fi

if [ "$1" == "--clean" ] || [ "$1" == "-c" ]; then
	echo "cleaning reproducible project files..."
	rm -rf ./api/**/__pycache__
	rm -rf ./simple-file-browser/node_modules
	rm -rf ./simple-file-browser/build
	rm -rf ./api/venv
	rm -rf ./build
	echo "done."
	exit 0
fi

if ! [ -d ./simple-file-browser/node_modules ]; then
	echo "downloading packages..."
	npm install --prefix ./simple-file-browser
fi

if ! [ -d ./simple-file-browser/build ]; then
	echo "building frontend components"
	npm run build --prefix ./simple-file-browser 
	if ! [ -d ./simple-file-browser/build ]; then
		echo "error building simple-file-browser"
		exit 0
	fi
fi

docker build --rm -t simple-file-browser .

if [ "$1" == "--save" ] || [ "$1" == "-s" ]; then
	echo "saving build to GZip compressed tarball..."
	mkdir ./build && docker save simple-file-browser:latest | gzip > ./build/simple-file-browser.tar.gz
	echo "done."
fi
