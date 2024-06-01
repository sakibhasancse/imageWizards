from flask import Flask, request, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS
import os
from image_processing import process_image

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "*"}})

UPLOAD_FOLDER = './uploads/orginal'
PROCESSED_FOLDER = './uploads/processed'
ASSETS_FOLDER = './assets'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER
app.config['ASSETS_FOLDER'] = ASSETS_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(PROCESSED_FOLDER):
    os.makedirs(PROCESSED_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['image']
    if not file:
        return jsonify({"error": "No file found"})
    task = request.form.get('task', 'extract_blood_vessels')

    file_path = f'{UPLOAD_FOLDER}/{file.filename}'
    file.save(file_path)
    processed_path = process_image(file_path, task)
    return jsonify({'image_path': processed_path})

@app.route('/processed_images/<filename>')
def processed_images(filename):
    return send_from_directory(app.config['PROCESSED_FOLDER'], filename)

@app.route('/assets/<filename>')
def assets_images(filename):
    return send_from_directory(app.config['ASSETS_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
