import os
import cv2
import numpy as np
import time
PROCESSED_FOLDER = './uploads/processed'

def process_image(image_path, task):
    start_time = time.time()  # Start the timer

    # Adding a delay for testing purposes
    time.sleep(1)  # Delay for 1 seconds

    if task == 'extract_blood_vessels':
        processed_image = extract_blood_vessels(image_path)
    elif task == 'extract_lesions':
        processed_image = extract_lesions(image_path)
    else:
        processed_image = cv2.imread(image_path)

    processed_image_path = os.path.join(PROCESSED_FOLDER, os.path.basename(image_path))
    cv2.imwrite(processed_image_path, processed_image)

    end_time = time.time()  # End the timer
    time_taken = end_time - start_time  # Calculate the elapsed time

    print(f"Time taken for {task}: {time_taken:.2f} seconds")  # Print the time taken

    return os.path.basename(image_path)

def extract_blood_vessels(image_path):
    # Load the image
    image = cv2.imread(image_path)

    # Convert to grayscale
    green_channel = image[:, :, 1]

    # Apply CLAHE to enhance the contrast of the image
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced_image = clahe.apply(green_channel)

    # Apply median filter to reduce noise
    median = cv2.medianBlur(enhanced_image, 5)

    # Use Sobel filter to detect edges
    sobelX = cv2.Sobel(median, cv2.CV_64F, 1, 0, ksize=5)
    sobelY = cv2.Sobel(median, cv2.CV_64F, 0, 1, ksize=5)
    sobel = np.sqrt(sobelX**2 + sobelY**2)

    # Normalize the result to the range 0-255
    sobel = np.uint8(255 * sobel / np.max(sobel))

    # Apply a binary threshold to get a binary image
    _, binary_image = cv2.threshold(sobel, 30, 255, cv2.THRESH_BINARY)

    # Use morphological operations to remove small noise and connect blood vessel segments
    kernel = np.ones((3, 3), np.uint8)
    morphed_image = cv2.morphologyEx(binary_image, cv2.MORPH_CLOSE, kernel, iterations=1)

    return morphed_image

def extract_lesions(melanoma_image_path):
    # Load the image
    image = cv2.imread(melanoma_image_path)
    
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply image processing to extract lesions
    # Example: Apply thresholding to isolate lesions
    _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
    
    # Apply morphological operations to reduce noise
    kernel = np.ones((5, 5), np.uint8)
    morph = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    morph = cv2.morphologyEx(morph, cv2.MORPH_OPEN, kernel)
    
    # Find contours from the processed image
    contours, _ = cv2.findContours(morph, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Create a mask to draw the lesions
    lesion_mask = np.zeros_like(gray)
    
    # Filter contours by area and draw them with white color
    min_contour_area = 100  # Adjust this value based on the size of the lesions
    for contour in contours:
        if cv2.contourArea(contour) > min_contour_area:
            cv2.drawContours(lesion_mask, [contour], -1, (255), thickness=cv2.FILLED)
    
    return lesion_mask
