# imageWizards

This project provides a web application for image processing using React for the frontend and Python for the backend. It uses Docker Compose for easy deployment.

## Table of Contents

- [Getting Started](#getting-started)
  - [Docker Setup](#docker-setup)
  - [Manual Setup](#manual-setup)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contributing](#contributing)

## Technologies Used

- React: Frontend framework for building the user interface.
- Python: Backend language for processing the image segmentation tasks.
- Docker Compose: Tool for defining and running multi-container Docker applications.

## Getting Started

### Docker Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repository.git
   ```

2. Navigate to the project directory:
   ```sh
   cd your-repository
   ```

3. Start the application using Docker Compose:
   ```sh
   docker-compose up
   ```

4. Access the application in your browser at `http://localhost:3000`.

### Manual Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/sakibhasancse/imageWizards.git
   ```

2. Navigate to the project directory:
   ```sh
   cd your-repository
   ```

3. Install dependencies for the frontend:
   ```sh
   cd frontend
   npm install
   ```

4. Install dependencies for the backend:
   ```sh
   cd backend
   pip install -r requirements.txt
   ```

5. Start the backend server:
   ```sh
   python app.py
   ```

6. Start the frontend development server:
   ```sh
   cd ..
   npm start
   ```

7. Access the application in your browser at `http://localhost:3000`.

## Usage

- Upload a medical image using the interface.
- Select the segmentation task (e.g., eye fundus segmentation, melanoma segmentation).
- View the original and processed images.
- The application will perform the segmentation using the selected task and display the results.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.
