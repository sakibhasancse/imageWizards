from flask import Flask, request, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS
import os
from image_processing import process_image
import uuid

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

def generate_unique_filename(filename):
    ext = filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    return unique_filename

@app.route('/upload', methods=['POST'])
def upload_image():
    task = request.form.get('task', 'extract_blood_vessels')
    file = request.files.get('image')
    image_url = request.form.get('image_url')
    processed_path = None
    
    if not file and not image_url:
        return jsonify({"error": "No file or image URL provided"}), 400

    if file:  # Working for user input image
        original_filename = file.filename
        unique_filename = generate_unique_filename(original_filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(file_path)
    elif image_url: # Working for suggest image
        base_file_path = os.path.basename(image_url)
        file_path = os.path.join(app.config['ASSETS_FOLDER'], base_file_path)
        if not os.path.exists(file_path):
            return jsonify({"error": "Image not found in assets"}), 404
        
        process_file_path = os.path.join(app.config['PROCESSED_FOLDER'], base_file_path)
        if os.path.exists(process_file_path):
            processed_path = base_file_path

    if not processed_path:
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
