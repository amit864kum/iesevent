# Product Requirements Document (PRD)
## Luxury Event Management Website

---

## 1. Overview

This project is a luxury event management website designed to showcase services, past events, and client testimonials. The website follows a premium dark theme with gold accents inspired by high-end brands like Lovio.

The platform consists of:
- A public-facing user website
- A separate admin panel
- A Node.js backend with MongoDB

---

## 2. Goals & Objectives

- Establish a premium brand presence
- Showcase gallery of events with categories
- Display real client testimonials
- Allow easy admin content management
- Enable seamless client inquiries via contact form
- Deliver a fast, responsive, and scalable system

---

## 3. Target Audience

- Event planning clients (weddings, corporate, private events)
- High-end and luxury-focused customers
- Business owners managing event portfolios

---

## 4. Tech Stack

| Layer | Technology |
|------|----------|
| Frontend | Next.js |
| Admin Panel | Next.js (separate app) |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Image Storage | Cloudinary |
| Email | Nodemailer |
| Hosting | Vercel, Render/Railway |

---

## 5. User Roles

### 5.1 Public Users
- Can view all pages
- Can submit testimonials
- Can submit contact forms
- No authentication required

### 5.2 Admin
- Single admin
- Access via secret route `/#/admin`
- Manages gallery and testimonials
- Views contact messages

---

## 6. Functional Requirements

### 6.1 User Website

#### Pages:
- Home
- About
- Services
- Gallery
- Testimonials
- Contact Us

#### Features:
- Responsive luxury UI
- Category-based gallery filtering
- Testimonial submission form
- Contact form with auto-reply email

---

### 6.2 Admin Panel

#### Features:
- Dashboard overview
- Gallery CRUD operations
- Testimonial CRUD operations
- Contact form message viewer
- Image preview and category management

---

### 6.3 Backend APIs

#### Gallery API:
- Create image entry
- Fetch images
- Update image data
- Delete images

#### Testimonial API:
- Create testimonial
- Fetch testimonials
- Update testimonial
- Delete testimonial

#### Contact API:
- Submit contact form
- Store message in DB
- Send emails

---

## 7. Non-Functional Requirements

- High performance and fast load times
- Mobile-first responsive design
- Secure admin routes
- Scalable architecture
- Clean and maintainable codebase

---

## 8. UI/UX Guidelines

- Dark background (#0B0B0B)
- Gold accent color (#C6A45E)
- Elegant serif headings
- Minimal animations
- Consistent spacing and layout

---

## 9. Security Considerations

- Environment variables for secrets
- Admin route protection using headers
- Input validation on all forms
- File type and size validation for uploads

---

## 10. Deployment & Maintenance

- Frontend & Admin deployed on Vercel
- Backend on Render or Railway
- MongoDB Atlas for database
- Cloudinary for image assets
- Easy environment configuration

---

## 11. Future Enhancements (Optional)

- SEO optimization
- Booking calendar
- Analytics dashboard
- Multi-admin support
- CMS-style content editor

---

## 12. Success Metrics

- Fast page load times
- User engagement with gallery
- Increased contact inquiries
- Easy admin content updates

---

## 13. Final Notes

This system is built as a real-world freelance project with production-grade quality, scalability, and maintainability.
