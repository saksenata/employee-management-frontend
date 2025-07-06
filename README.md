# Employee Management System - Frontend

A modern, responsive employee management system built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This application provides comprehensive inventory and user management with secure authentication and beautiful UI.

## 🚀 Features

### Authentication & Security
- **JWT-based authentication** with automatic token refresh
- **Auto-logout** on inactivity and token expiration (30 minutes)
- **Protected routes** with role-based access control
- **Secure cookie management** for session persistence
- **User data caching** in localStorage for performance
- **Token validation** using checkToken endpoint

### Inventory Management
- **Complete CRUD operations** (Create, Read, Update, Delete)
- **Image upload and display** with authenticated image fetching
- **Sequential numbering** (1, 2, 3...) instead of IDs for better UX
- **Responsive data tables** with adaptive columns
- **Form validation** with React Hook Form
- **Delete confirmation dialogs** with web-based alerts
- **Image preview** before upload

### User Management
- **Full user lifecycle management** (add, edit, delete, view)
- **Profile picture upload** with authenticated display
- **Password management** with show/hide toggles
- **Form validation** and error handling
- **Responsive design** for all screen sizes
- **Sequential numbering** in user tables

### Password Management
- **Change password functionality** for logged-in users
- **Show/hide password toggles** with eye icons
- **Password validation** (minimum 6 characters)
- **Password confirmation** matching
- **Secure password transmission**

### UI/UX Features
- **Modern, responsive design** with Tailwind CSS
- **Show/hide password toggles** on all password fields
- **Mobile-first approach** with hamburger menu
- **Loading states** and error handling
- **Web-based alert dialogs** for confirmations
- **Consistent styling** across all pages
- **User dropdown** in header with password change option

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with interceptors
- **Authentication**: JWT with automatic refresh
- **UI Components**: Custom components with Tailwind
- **State Management**: React hooks and context

## 📋 Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** or **yarn**
- **Backend API** running (for data operations)

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd employee-management-frontend
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── inventories/        # Inventory management pages
│   │   ├── add/           # Add inventory page
│   │   ├── [id]/          # Dynamic inventory pages
│   │   │   └── edit/      # Edit inventory page
│   │   └── page.tsx       # Inventory list page
│   ├── users/             # User management pages
│   │   ├── add/           # Add user page
│   │   ├── [id]/          # Dynamic user pages
│   │   │   ├── edit/      # Edit user page
│   │   │   └── change-password/ # Change password page
│   │   └── page.tsx       # User list page
│   ├── login/             # Authentication page
│   │   └── page.tsx
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page (redirects to inventories)
├── components/            # Reusable UI components
│   ├── AuthenticatedImage/ # Image component with auth headers
│   ├── InventoryForm/     # Reusable inventory form
│   ├── UserForm/          # Reusable user form
│   ├── Alert/             # Custom alert component
│   ├── Header/            # Application header
│   ├── Sidebar/           # Navigation sidebar
│   └── Layout/            # Main layout wrapper
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts         # Authentication hook
│   └── withAuth.tsx       # HOC for protected routes
├── services/              # API service layer
│   ├── inventoryService.ts # Inventory API calls
│   ├── userService.ts     # User API calls
│   └── authService.ts     # Authentication API calls
├── types/                 # TypeScript type definitions
│   ├── inventory.ts       # Inventory-related types
│   ├── user.ts           # User-related types
│   └── auth.ts           # Authentication types
├── utils/                 # Utility functions
│   ├── auth.ts           # Authentication utilities
│   └── validation.ts     # Form validation schemas
└── styles/               # Global styles
    └── globals.css       # Tailwind CSS imports
```

## 🔧 Key Features Explained

### Authentication Flow
- **Login**: JWT tokens stored in secure cookies with user data caching
- **Auto-refresh**: Automatic token refresh on API calls using checkToken
- **Logout**: Clears cookies, localStorage, and redirects to login
- **Protected Routes**: HOC wrapper for route protection
- **User Caching**: User data stored in localStorage for fast access

### Password Management
- **Show/Hide Toggles**: Eye icons for all password fields
- **Change Password**: Accessible via user dropdown in header
- **Password Validation**: Minimum 6 characters with confirmation matching
- **Secure Transmission**: Encrypted password transmission to API

### Image Handling
- **AuthenticatedImage Component**: Fetches images with auth headers
- **Automatic token refresh**: Handles 401 errors by refreshing tokens
- **Fallback display**: Shows placeholder when images fail to load
- **Image Preview**: Real-time preview before upload

### Form Management
- **React Hook Form**: Efficient form handling with minimal re-renders
- **Real-time Validation**: Immediate feedback on form errors
- **File Upload**: Image upload with preview and validation
- **Error Handling**: Comprehensive error display and handling

### Responsive Design
- **Mobile-first**: Optimized for all screen sizes
- **Hamburger Menu**: Collapsible sidebar for mobile
- **Adaptive Tables**: Hidden columns on smaller screens
- **Touch-friendly**: Optimized for touch interactions
- **Sequential Numbering**: Clean 1, 2, 3... numbering instead of IDs

## 🎨 UI Components

### Custom Components
- **Alert**: Web-based confirmation dialogs
- **AuthenticatedImage**: Secure image display with auth headers
- **InventoryForm**: Reusable inventory form with image upload
- **UserForm**: Reusable user form with password toggles
- **Layout**: Responsive layout wrapper with user dropdown
- **Password Toggle**: Eye icon component for show/hide passwords

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Consistent design system
- **Responsive Breakpoints**: Mobile, tablet, desktop
- **Loading States**: Skeleton loaders and spinners
- **Sequential Numbering**: Clean table numbering system

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth with auto-refresh
- **HTTP-only Cookies**: Secure cookie storage for tokens
- **User Data Caching**: localStorage for performance with secure handling
- **Password Security**: Show/hide toggles with encrypted transmission
- **CORS Handling**: Proper cross-origin requests
- **Input Validation**: Server and client-side validation
- **XSS Protection**: Sanitized inputs and outputs
- **Token Validation**: checkToken endpoint for user verification

## 📱 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel with automatic builds
```

### Other Platforms
```bash
npm run build
# Deploy the 'out' directory to any static hosting
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
