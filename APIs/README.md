# Tech Trove APIs

## Get Started
### Installation
Install required dependancies

```bash
npm install
```

### Environement Variables

Add `.env` file in `APIs` folder with the following data:

```.env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/Tech-Trove-App
JWT_SECRET=JWT_SECRET
JWT_EXPIRE=1h
JWT_REFRESH_SECRET=JWT_REFRESH_SECRET
JWT_REFRESH_EXPIRE=15m
DEV_ORIGIN=http://localhost:5173
PROD_ORIGIN=https://prod.com
```

### Run APIs Locally

```bash
npm run dev
```
