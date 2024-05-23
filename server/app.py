from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "*"}})  # Allow all origins for the /upload endpoint

# Ensure uploads directory exists
if not os.path.exists('./uploads'):
    os.makedirs('./uploads')

def process_image(image_path, task):
    image = cv2.imread(image_path)
    if task == 'eye_fundus':
        processed_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  
    elif task == 'melanoma':
        processed_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) 
    _, buffer = cv2.imencode('.jpg', processed_image)
    return base64.b64encode(buffer).decode('utf-8')

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['image']
    task = request.form.get('task', 'eye_fundus')

    file_path = f'./uploads/{file.filename}'
    file.save(file_path)
    processed_image = process_image(file_path, task)
    return jsonify({'image': processed_image})

if __name__ == '__main__':
    app.run(debug=True)
