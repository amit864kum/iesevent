# Luxe Events - Luxury Event Management Website

A premium event management platform featuring a public-facing website, separate admin panel, and robust backend with MongoDB, Cloudinary, and email notifications.

## 🏗️ Project Structure

```
d:\Sunny\
├── backend/           # Express.js REST API
│   ├── src/
│   │   ├── config/    # Database & Cloudinary config
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/    # Mongoose schemas
│   │   ├── routes/
│   │   ├── services/  # Email service
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/          # User-facing Next.js website
│   ├── src/
│   │   ├── app/       # Pages (landing, about, services, gallery, testimonials, contact)
│   │   ├── components/# Reusable UI components
│   │   └── lib/       # API helpers
│   ├── .env.example
│   └── package.json
│
└── admin/             # Admin panel Next.js app
    ├── src/
    │   ├── app/       # Dashboard, gallery, testimonials, messages
    │   ├── components/# Admin UI components
    │   └── lib/       # Admin API helpers
    ├── .env.example
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or Atlas)
- Cloudinary account (for image storage)
- SMTP credentials (for email)

### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
# Edit .env with your credentials

npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install

# Create .env.local file
cp .env.example .env.local

npm run dev
```

Frontend runs on: `http://localhost:3000`

### 3. Admin Panel Setup

```bash
cd admin
npm install

# Create .env.local file
cp .env.example .env.local
# Add your admin token

npm run dev
```

Admin runs on: `http://localhost:3001`

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
COMPANY_EMAIL=company@example.com
ADMIN_SECRET_TOKEN=your_super_secret_token
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Admin (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ADMIN_TOKEN=your_super_secret_token
```

## ✨ Features

### User Website
- **Landing Page**: Hero, services preview, gallery preview, testimonials, CTA
- **About Page**: Company story, values, timeline
- **Services Page**: Detailed service offerings with process
- **Gallery Page**: Category-based image filtering with lightbox
- **Testimonials Page**: Client reviews with submission form (auto-published)
- **Contact Page**: Comprehensive contact form with email notifications

### Admin Panel
- **Dashboard**: Stats overview and quick actions
- **Gallery Management**: Full CRUD with Cloudinary image upload
- **Testimonials Management**: Edit, delete, toggle featured
- **Messages**: View contact submissions, reply, archive

### Backend API
- RESTful endpoints for gallery, testimonials, contacts
- Cloudinary image upload integration
- Auto-reply email to users on contact form submission
- Email notification to company
- Admin authentication via secret token header
- Rate limiting and input validation

## 🎨 Design

- Dark theme (`#0B0B0B`) with gold accents (`#C6A45E`)
- Premium typography with Playfair Display headings
- Smooth animations using Framer Motion
- Fully responsive design

## 🔒 Security

- Admin routes protected via `x-admin-token` header
- Input validation with express-validator
- Rate limiting on public endpoints
- CORS configured for frontend origins

## 📦 Tech Stack

- **Frontend**: Next.js 16, React 19, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Image Storage**: Cloudinary
- **Email**: Nodemailer with SMTP

---

Built with ❤️ for luxury event management.
