# Portfolio Documentation - Adwaid

This is a premium, high-end portfolio built with React.js, Tailwind CSS, and Framer Motion. It is designed for maximum performance and visual impact.

## 🚀 Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS (Utility-first)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: React Context API
- **Storage**: LocalStorage (Persistent across sessions)

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components (Hero, About, Navbar, etc.)
├── context/        # Global state (Auth and Portfolio Data)
├── data/           # Mock JSON for initial load
├── hooks/          # Custom React hooks
├── pages/          # Full page components (Home, Projects, Admin, etc.)
└── App.jsx         # Routing and layout logic
```

## ⚙️ Administrative Features

### Admin Login

- **Route**: `/admin`
- **Password**: `2805` (Customizable in `AuthContext.jsx`)

### Content Management

The administrative dashboard allows you to:

1. **Hero & About**: Update your taglines, bio, and skills instantly.
2. **Project Gallery**:
   - Add new projects with local image uploads.
   - Categorize work (Sports Design, Digital Drawing, etc.).
   - Toggle "Featured" status for Home page display.
   - Hide/Show projects using visibility controls.
3. **Inbox Management**:
   - Receive messages from the contact form.
   - View sender details and delete entries.

## 📱 Mobile Responsiveness

The site uses a mobile-first approach. All containers, typography, and image grids have specific Tailwind breakpoints to ensure a premium experience on devices from 320px to 4K resolutions.

## 🛡️ Data Persistence

All changes made in the Admin Dashboard are saved to the browser's `localStorage`. This allows the site to function as a full CMS without a backend for now. To migrate to a real database (like Supabase), you only need to update the `DataContext.jsx` functions.

---

Developed by Antigravity.
