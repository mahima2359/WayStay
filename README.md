# WayStay

A full-stack vacation rental web application built with Node.js, Express, MongoDB, and EJS. Users can browse property listings, create accounts, post stays, upload photos, leave reviews, and view locations on an interactive map.

**Live demo:** [https://waystay-mhah.onrender.com/listings](https://waystay-mhah.onrender.com/listings)

## Features

- User authentication (signup, login, logout) with Passport.js
- Full CRUD for property listings
- Image uploads via Cloudinary
- Reviews with star ratings
- Interactive maps powered by MapTiler
- Session-based auth with MongoDB session store
- Responsive Bootstrap UI

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Views | EJS, EJS-Mate |
| Auth | Passport.js (local strategy) |
| Storage | Cloudinary |
| Maps | MapTiler |
| Hosting | Render |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- MapTiler API key

### Installation

```bash
git clone https://github.com/mahima2359/WayStay.git
cd WayStay
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
NODE_ENV=development
ATLAS_DB=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_maptiler_api_key
```

### Seed Sample Data (optional)

```bash
npm run seed
```

### Run Locally

```bash
npm start
```

Open [http://localhost:8080/listings](http://localhost:8080/listings)

## Project Structure

```
├── app.js              # Application entry point
├── controllers/        # Route handlers
├── models/             # Mongoose schemas
├── routes/             # Express routers
├── views/              # EJS templates
├── public/             # Static assets
├── middleware.js       # Auth & validation middleware
├── cloudConfig.js      # Cloudinary configuration
├── init/               # Database seed scripts
└── render.yaml         # Render deployment blueprint
```

## Deployment (Render)

1. Push this repo to GitHub
2. Create a **Blueprint** on [Render](https://render.com) linked to the repo
3. Set environment variables: `ATLAS_DB`, `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`, `MAP_TOKEN`
4. Deploy — Render runs `npm install` then `npm start`

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/listings` | Browse all listings |
| GET | `/listings/:id` | View a listing |
| POST | `/listings` | Create a listing |
| PUT | `/listings/:id` | Update a listing |
| DELETE | `/listings/:id` | Delete a listing |
| POST | `/listings/:id/reviews` | Add a review |
| GET/POST | `/signup` | Register |
| GET/POST | `/login` | Login |
| GET | `/logout` | Logout |

## Author

**Mahima** — [GitHub](https://github.com/mahima2359)

## License

ISC © 2026 Mahima. See [LICENSE](LICENSE).
