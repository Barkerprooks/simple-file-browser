#!/bin/bash

echo "cleaning build space before starting..."
rm -rfv ./api/**/__pycache__ # clean up any residual __pycache__ files
rm -rfv ./api/venv

if ! [ -d ./gmfs/build ]; then
	echo "building frontend components"
	npm run build --prefix ./gmfs 
	if ! [ -d ./gmfs/build ]; then
		echo "error building gmfs"
		exit 0
	fi
fi

docker build --rm -t gmfs .
