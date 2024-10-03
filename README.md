
# CustomizePokemon React App

This is a React application for customizing Pokémon details, including name, description, and image uploads. The app is containerized with Docker for easy deployment.

## Prerequisites

Before you begin, ensure you have the following software installed:

- [Node.js](https://nodejs.org/) (for local development)
- [Docker](https://www.docker.com/) (for containerization)

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/customize-pokemon.git
cd customize-pokemon
```

### 2. Install Dependencies

Use npm or yarn to install the project dependencies.

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### 3. Run the App Locally

To start the app in development mode, run the following command:

```bash
npm start
```

This will start the React development server, and you can view the app at `http://localhost:3000`.

## Building and Running with Docker

You can build and run the application inside a Docker container to ensure consistency across environments.

### 1. Build Docker Image

Ensure that Docker is installed and running on your system. Build the Docker image by running the following command in the project directory:

```bash
docker build -t customize-pokemon-app .
```

### 2. Run the Docker Container

Once the image is built, you can run the container:

```bash
docker run -d -p 3000:80 --name customize-pokemon-container customize-pokemon-app
```

Now, the application will be accessible in your browser at `http://localhost:3000`.

### 3. Stop the Docker Container

To stop the running Docker container:

```bash
docker stop customize-pokemon-container
```


## Notes

- The app is built using React and utilizes the PrimeReact component library.
- The app also uses the IMGBB API to upload and store Pokémon images.
- Feel free to customize the Dockerfile or application settings as needed.

