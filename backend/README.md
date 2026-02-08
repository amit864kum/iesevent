# Luxury Events Backend API

Backend REST API for the Luxury Event Management Website.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Image Upload**: Cloudinary
- **Email**: Nodemailer

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update with your credentials:

```bash
cp .env.example .env
```

Required environment variables:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_SECRET_TOKEN` | Secret token for admin routes |
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP server port |
| `SMTP_USER` | SMTP username/email |
| `SMTP_PASS` | SMTP password/app password |
| `COMPANY_EMAIL` | Email to receive notifications |

### 3. Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

## API Endpoints

### Gallery

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/gallery` | Get all gallery images | Public |
| GET | `/api/gallery/categories` | Get categories with counts | Public |
| GET | `/api/gallery/:id` | Get single image | Public |
| POST | `/api/gallery` | Create new image | Admin |
| PUT | `/api/gallery/:id` | Update image | Admin |
| DELETE | `/api/gallery/:id` | Delete image | Admin |

### Testimonials

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/testimonials` | Get all testimonials | Public |
| GET | `/api/testimonials/:id` | Get single testimonial | Public |
| POST | `/api/testimonials` | Submit testimonial | Public |
| PUT | `/api/testimonials/:id` | Update testimonial | Admin |
| DELETE | `/api/testimonials/:id` | Delete testimonial | Admin |

### Contact

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/contact` | Submit contact form | Public |
| GET | `/api/contact` | Get all messages | Admin |
| GET | `/api/contact/:id` | Get single message | Admin |
| PUT | `/api/contact/:id` | Update message status | Admin |
| DELETE | `/api/contact/:id` | Delete message | Admin |

## Admin Authentication

Admin routes are protected using a secret header token:

```
x-admin-token: your_admin_secret_token
```

## Rate Limiting

- General API: 100 requests per 15 minutes
- Form submissions: 10 requests per hour

## Folder Structure

```
backend/
├── src/
│   ├── config/         # Database & Cloudinary config
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth, validation, rate limiting
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── services/       # Email service
│   └── server.js       # Entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
