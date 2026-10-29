![Screenshot (1)](https://github.com/user-attachments/assets/2959dbf6-86b4-4600-833e-0167c2e52499)
![Screenshot (5)](https://github.com/user-attachments/assets/f6db6f45-ff01-4002-bf50-f49309c97548)
![Screenshot (43)](https://github.com/user-attachments/assets/2bb69c71-6ea9-4cf4-a522-067ff155e538)

## Run with Docker

Build the production image from the repository root:

```bash
docker build -t neighbourhood-community-forum .
```

Start the application:

```bash
docker run --rm --name neighbourhood-community-forum -p 3000:3000 neighbourhood-community-forum
```

Open [http://localhost:3000/login](http://localhost:3000/login).

The container serves the built React frontend and the Express API on port `3000`. The application uses Firebase Authentication and Cloud Firestore, so make sure the Firebase project configuration and security rules are set up for your deployment.

## Run locally

In one terminal, start the backend:

```bash
cd backend
npm ci
npm start
```

In another terminal, start the frontend:

```bash
cd frontend
npm ci
npm run dev
```

During local development, Vite proxies API requests to the backend on port `3000`.
