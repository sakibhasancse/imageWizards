# imageWizards

This project provides a web application for image processing using React for the frontend and Python for the backend. It uses Docker Compose for easy deployment.

## Table of Contents

- [Getting Started](#getting-started)
  - [Docker Setup (Option 1)](#docker-setup)
  - [Manual Setup (Option 2)](#manual-setup)
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
   git clone https://github.com/sakibhasancse/imageWizards.git
   ```

2. Navigate to the project directory:
   ```sh
   cd imageWizards
   ```

3. Build the Docker images using Docker Compose:
   ```sh
   docker-compose build
   ```
4. Start the Docker containers:
   ```sh
   docker-compose up
   ```

5. Access the application in your browser at `http://localhost:3000`.

### Manual Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/sakibhasancse/imageWizards.git
   ```

2. Navigate to the project directory:
   ```sh
   cd imageWizards
   ```

Backend Setup (Python Flask)


1.
    ```sh
    cd backend
    ```

2. **Create a virtual environment**:
    ```sh
    python -m venv venv
    ```

3. **Activate the virtual environment**:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```

4. **Install the dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

5. **Run the Flask application**:
    ```sh
    python app.py
    ```

Frontend Setup (ReactJs)

1. **Navigate to the frontend directory**:
    ```sh
    cd ../frontend
    ```

2. **Install the dependencies**:
    ```sh
    npm install
    ```

3. **Run the frontend application**:
    ```sh
    npm run dev
    ```

Access the application in your browser at `http://localhost:3000`.

## Usage

- Upload a medical image using the interface.
- Select the segmentation task (e.g., eye fundus segmentation, melanoma segmentation).
- View the original and processed images.
- The application will perform the segmentation using the selected task and display the results.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.
