import os

DIR = os.environ.get("GMFS_DIR") or "./public"
if not os.path.isdir(DIR):
	os.makedirs(DIR)


def touch_folder(name):
	path = os.path.join(DIR, name)
	if not os.path.isdir(path):
		os.makedirs(path)
	return path


def extract_info(path, author):
	info = os.stat(path)
	text = None

	try:
		with open(path, "rt") as file:
			text = file.read()
	except Exception as e:
		pass

	name = os.path.basename(path)

	return {
		"text": text,
		"name": name,
		"path": os.path.join("/public", author, name),
		"size": info.st_size,
		"author": author,
		"created": info.st_ctime,
		"changed": info.st_mtime
	}


def get_names():
	names = {}
	for entry in os.fwalk(DIR):
		if entry[0] != DIR:
			name = os.path.basename(entry[0])
			names[name] = [extract_info(os.path.join(entry[0], file), name) for file in entry[2]]
	return names


def get_files():
	files = []
	for k, v in get_names().items():
		for file in v:
			files.append(file)
	return files
