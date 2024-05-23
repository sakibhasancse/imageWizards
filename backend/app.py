from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from image_processing import process_image

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "*"}})

if not os.path.exists('./uploads'):
    os.makedirs('./uploads')

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['image']
    task = request.form.get('task', 'extract_blood_vessels')

    file_path = f'./uploads/{file.filename}'
    file.save(file_path)
    processed_image = process_image(file_path, task)
    return jsonify({'image': processed_image})

if __name__ == '__main__':
    app.run(debug=True)
