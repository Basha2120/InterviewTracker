# 🚀 InterviewSprint - Placement Preparation & Mock Interview Tracking System

![InterviewSprint Header](https://via.placeholder.com/1200x400/1a1a2e/8b5cf6?text=InterviewSprint+-+Your+Placement+Journey,+Tracked)

**Live Demo:** [https://interview-tracker-ten.vercel.app](https://interview-tracker-ten.vercel.app)

InterviewSprint is a comprehensive, full-stack web application designed to help students and professionals organize, track, and optimize their placement preparation journey. From managing job applications to tracking daily coding practice and keeping a record of interview rounds, InterviewSprint is your personalized hub for landing your dream job.

---

## ✨ Key Features

- **📊 Interactive Dashboard**: Get a bird's-eye view of your applications, success rate, and practice progress through visual data and sleek UI.
- **💼 Job Application Tracking**: Keep track of companies, roles, application status, dates, and direct links to job descriptions.
- **📝 Interview Round Management**: Log every OA (Online Assessment), Technical, and HR round for a specific application. Track difficulty levels, topics asked, and personal feedback.
- **💻 Practice Logs**: Maintain a centralized log of problems solved across various platforms (LeetCode, HackerRank, GeeksForGeeks, etc.). Keep track of difficulty levels, approaches, and revision status.
- **🔐 Secure Authentication**: JWT-based login and registration system protecting your personal career data.
- **🧑‍💻 User Profiles**: Personalized experience with roles (Admin/User).
- **🛡️ Admin Panel**: Administrative access to manage and review platform usage (for Admin accounts).

---

## 🛠️ Technology Stack

InterviewSprint is built with modern, scalable technologies.

### Frontend 🎨
- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **API Communication**: Axios (with centralized interceptors for JWT)
- **Deployment**: Vercel

### Backend ⚙️
- **Framework**: Java 17, Spring Boot 3
- **Security**: Spring Security, JWT (JSON Web Tokens)
- **Database ORM**: Hibernate / Spring Data JPA
- **Database**: PostgreSQL (hosted on Supabase)
- **Connection Pooling**: HikariCP (optimized for Supabase PgBouncer)
- **Deployment**: Render

---

## 🚀 Deployment Architecture

This project adopts a decoupled architecture for deployment:
1. **Frontend (Vercel)**: The React/Vite application is deployed to Vercel, providing a fast, edge-cached experience. Environment variables (`VITE_API_URL`) are injected during the Vite build process to securely point to the backend.
2. **Backend (Render)**: The Spring Boot Java application is deployed securely as a Web Service on Render. It handles CORS pre-flight requests from the Vercel app dynamically using origin patterns.
3. **Database (Supabase)**: A remote PostgreSQL database handles data persistence. The backend connects to this database securely using environment variables (`DB_URL`, `DB_USER`, `DB_PASSWORD`), entirely hiding secrets from the public repository.

---

## 💻 Local Development Setup

If you wish to run the project locally, follow these steps:

### Prerequisites
- Node.js (v18+)
- Java 17 (JDK)
- PostgreSQL (Local or Remote)
- Maven

### 1. Backend Setup (`/interviewsprint-backend`)
1. Open the backend folder.
2. Ensure you have a PostgreSQL database running.
3. Update `application.properties` or set your local environment variables:
   - `DB_URL`
   - `DB_USER`
   - `DB_PASSWORD`
   - `JWT_SECRET` (A strong random string)
4. Run the Spring Boot application using your IDE or via Maven:
   ```bash
   mvn spring-boot:run
   ```

### 2. Frontend Setup (`/interviewsprint-frontend`)
1. Open the frontend folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the frontend directory and add the backend URL:
   ```env
   VITE_API_URL=http://localhost:8080
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔒 Security Measures Implemented
* **No Harcoded Secrets**: Database credentials and JWT secrets are strictly managed via environment variables.
* **CORS Wildcard Allowance**: Dynamic backend configuration to allow dynamic Vercel preview environments safely (`https://*.vercel.app`).
* **PgBouncer Compatibility**: Specific configurations applied to Hikari/Spring Boot to prevent `[ERROR: prepared statement "S_2" already exists]` crashes when using Supabase poolers.
* **Route Protection**: Private/Admin React routes wrap application endpoints enforcing stateful access logic.

---

*Built with ❤️ to make interview tracking simpler and more organized!*
