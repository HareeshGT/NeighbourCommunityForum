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

The container serves the built React frontend and the Express API on port `3000`. Firebase configuration is read from environment variables at runtime.

### Configure Firebase on Render

In your Render service, open **Environment** and add these variables using the values from your Firebase project settings:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID` (optional)

Save the variables and redeploy. Do not commit actual values to Git.

### Run locally

Create a local environment file from the template:

```bash
cp backend/.env.example backend/.env
```

Fill in the Firebase values in `backend/.env`. The root `.gitignore` excludes local environment files from Git.

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
