import cv2
import base64
import numpy as np

def process_image(image_path, task):
    if task == 'extract_blood_vessels':
        processed_image = extract_blood_vessels(image_path)
    elif task == 'extract_lesions':
        processed_image = extract_lesions(image_path)

    _, buffer = cv2.imencode('.jpg', processed_image)
    return base64.b64encode(buffer).decode('utf-8')

def extract_blood_vessels(image_path):
    # Load the image
    image = cv2.imread(image_path)
    
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply adaptive thresholding
    thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 15, 2)
    
    # Apply morphological operations
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))
    opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
    closing = cv2.morphologyEx(opening, cv2.MORPH_CLOSE, kernel)
    
    # Apply canny edge detection
    edges = cv2.Canny(closing, 50, 150)
    
    # Find contours
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Draw contours on a blank image
    result = np.zeros_like(image)
    cv2.drawContours(result, contours, -1, (255,255,255), 1)
    
    return result


def extract_lesions(image_path):
    # Load the image
    image = cv2.imread(image_path)
    
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply Gaussian blur
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Apply thresholding
    _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Draw contours on a blank image
    result = np.zeros_like(image)
    cv2.drawContours(result, contours, -1, (255,255,255), -1)
    
    return result