# UrbanEdge Construction Website

UrbanEdge Construction is a full-stack web application built with React (frontend) and Laravel (backend). The platform showcases construction services, projects, blogs, and testimonials, along with a powerful admin panel for managing dynamic content.

---

## 🚀 Features

* 🏗️ Service Listings
* 🏢 Project Showcase
* 📝 Blogs & Articles
* 💬 Testimonials
* 🔐 Admin Panel (CRUD operations for content management)
* 🗑️ Soft Delete & Recovery (Trash bin functionality to view, restore, or permanently delete removed items)
* 📱 Fully Responsive Design

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Bootstrap / SCSS

### Backend

* Laravel
* REST API

### Database

* MySQL

---

## 📸 Screenshots

| Homepage Hero | Mobile Navigation | Admin Panel (Services) |
|:-------------:|:----------------:|:----------------------:|
| ![Homepage Hero](https://github.com/user-attachments/assets/6b3e1f29-b033-4792-9236-16d8c494ee51) | ![Mobile Navigation](https://github.com/user-attachments/assets/c36ec471-e753-4f1d-9dc3-6fc78281356b) | ![Admin Panel](https://github.com/user-attachments/assets/65b59d9e-3a02-4be6-bdb4-3503606829ef) |

| Services Page | Projects Page |
|:-------------:|:-------------:|
| ![Services Page](https://github.com/user-attachments/assets/0c6f28b6-c90c-4aee-b8d8-40b5af1cd0d9) | ![Projects Page](https://github.com/user-attachments/assets/e1a70534-9c49-4309-9690-323c6256bca8) |


## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/c-ron12/urbanedge-construction.git
```

---

### 2. Setup Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Update your `.env` file with database credentials.

```bash
php artisan migrate
php artisan serve
```

---

### 3. Setup Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Admin Panel Access

<!-- Optional: add demo credentials -->

* URL: `/admin`
* Manage services, projects, blogs, and testimonials

---
## 🔮 Future Enhancements (Admin Console)

To further elevate the platform's scalability and admin user experience, the following features are planned for future releases:

* 📊 **Analytics Dashboard:** Integrate charts and graphs (e.g., using Chart.js or Recharts) on the main welcome screen to display statistics like total projects, active services, and recent blog views.
* 🔐 **Role-Based Access Control (RBAC):** Implement multiple admin tiers (e.g., Super Admin with full access vs. Editor with content-only access) using Laravel Sanctum/Breeze.
* 🌓 **Dark Mode Toggle:** Add a theme switcher to the admin panel for improved accessibility and nighttime usability.
* 🔄 **Bulk Actions:** Enable multi-select checkboxes in tables to mass-delete, activate, or restore multiple items at once.
* 🖼️ **Advanced Media Manager:** Build a dedicated media library section to reuse uploaded construction site images across different modules (Services, Projects, Blogs) instead of re-uploading files.
* ✉️ **Live Contact Form Influx:** Add an admin inbox tab to view and reply to queries sent directly through the frontend "Contact Us" page.

  
## 📂 Project Structure

```
urbanedge-construction/
 ├── frontend/   # React app
 └── backend/    # Laravel API
```

---

## 🎯 Purpose

This project was developed as a full-stack portfolio application to demonstrate real-world implementation of React and Laravel, including API integration, CRUD operations, and admin panel management.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 📧 Contact

Rohan Chettri

* GitHub: https://github.com/c-ron12

---
