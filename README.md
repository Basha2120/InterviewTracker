# 🚀 InterviewSprint - Placement Preparation & Mock Interview Tracking System

[InterviewSprint Header](https://via.placeholder.com/1200x400/1a1a2e/8b5cf6?text=InterviewSprint+-+Your+Placement+Journey,+Tracked)

**Live Demo:** [https://interview-tracker-ten.vercel.app](https://interview-tracker-ten.vercel.app)

InterviewSprint is a modern, responsive web application designed to help students and professionals organize, track, and optimize their placement preparation journey. From managing job applications to tracking daily coding practice and keeping a record of interview rounds, InterviewSprint is your personalized hub for landing your dream job.

*(Note: This repository contains the public Frontend client. The backend Java/Spring Boot API is kept in a separate private repository to ensure security of application secrets and database credentials).*

---

## ✨ Key Features

- **📊 Interactive Dashboard**: Get a bird's-eye view of your applications, success rate, and practice progress through visual data and sleek UI.
- **💼 Job Application Tracking**: Keep track of companies, roles, application status, dates, and direct links to job descriptions.
- **📝 Interview Round Management**: Log every OA (Online Assessment), Technical, and HR round for a specific application. Track difficulty levels, topics asked, and personal feedback.
- **💻 Practice Logs**: Maintain a centralized log of problems solved across various platforms (LeetCode, HackerRank, GeeksForGeeks, etc.). Keep track of difficulty levels, approaches, and revision status.
- **🔐 Secure Authentication**: Full JWT-based login and registration system protecting your personal career data.

---

## 🛠️ Technology Stack (Frontend)

InterviewSprint's user interface is built with a focus on speed, aesthetics, and user experience using modern web technologies:

- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS, PostCSS (Glassmorphism design language)
- **Routing**: React Router DOM (Protected Routes & Layouts)
- **Icons**: Lucide React
- **API Communication**: Axios (with centralized interceptors for automatic JWT injection and 401 handling)
- **Deployment**: Vercel

### Architecture & Security Highlight
While the frontend focuses on delivering a premium user experience, it securely communicates with a standalone Spring Boot backend:
- Dynamic API URLs are injected securely via Vercel Environment Variables (`VITE_API_URL`).
- The backend relies on strict Cross-Origin Resource Sharing (CORS) configurations, dynamically accepting connections only from `https://*.vercel.app` production domains.
- Data persistence is handled securely via PostgreSQL (Supabase) entirely separated from the client side.

---

## 💻 Local Development Setup

If you wish to run the React frontend locally:

### Prerequisites
- Node.js (v18+)

### Steps
1. Clone this repository and open the directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the frontend directory and add the backend URL (If you do not have access to the private backend repo, you will not be able to authenticate or load data):
   ```env
   VITE_API_URL=http://localhost:8080
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

*Built with ❤️ to make interview tracking simpler and more organized!*
