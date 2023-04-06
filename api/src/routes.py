from flask import Blueprint, request, jsonify
from .gmfs import get_files, touch_folder, DIR
import os

routes = Blueprint("api", __name__, url_prefix="/api")


@routes.route("/")
def index():
	try:
		return get_files(), 200
	except Exception as error:
		print(error)
		return {"error": "internal server error"}, 500


@routes.route("/upload", methods=["POST"])
def upload():

	name = request.form.get("name")
	file = request.files.get("file")

	if not name or not file:
		print(list(request.form))
		print(list(request.files))
		return {"error": "invalid request"}, 400

	path = touch_folder(name)
	file.save(os.path.join(path, file.filename))

	return {"ok": "success"}, 200
