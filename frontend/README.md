#  Crew Management System - Frontend


[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A modern, fully responsive web application for maritime crew management - tracking seafarers, certificates, appointments, and deployment schedules.

![Crew Management System Banner](https://via.placeholder.com/1200x400?text=Crew+Management+System)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Integration](#-api-integration)
- [Authentication](#-authentication)
- [State Management](#-state-management)
- [Styling Guide](#-styling-guide)
- [Component Documentation](#-component-documentation)
- [Screenshots](#-screenshots)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🎯 Overview

The **Crew Management System** is a comprehensive web application designed for maritime companies to efficiently manage their crew members. This frontend application provides an intuitive interface for:

- Managing crew member profiles and documentation
- Tracking certificate expiration dates with automated alerts
- Scheduling crew appointments and vessel assignments
- Monitoring deployment timelines via calendar view
- Generating reports and exporting data

### Project Goals

- ✅ Replace legacy system with modern, maintainable codebase
- ✅ Improve user experience with responsive design
- ✅ Provide real-time certificate expiry alerts
- ✅ Streamline crew onboarding and offboarding processes
- ✅ Centralize all crew-related documentation

**Live Demo:** [https://sungan.oceancrew.co.kr](https://sungan.oceancrew.co.kr) (Coming Soon)

**Backend Repository:** [Crew Management Backend](https://github.com/your-repo/crew-management-backend)

---

## ✨ Features

### 🔐 Authentication & Authorization
| Feature | Description |
|---------|-------------|
| Login / Logout | Secure authentication with JWT tokens |
| Role-based Access | Admin, Crew Manager, Captain, Crew roles |
| Protected Routes | Automatic redirect for unauthenticated users |
| Session Management | Token storage with automatic expiration handling |

### 👥 Crew Management
| Feature | Description |
|---------|-------------|
| View All Crews | Paginated list with search and filter |
| Add New Crew | Comprehensive form with validation |
| Edit Crew | Update existing crew information |
| Delete Crew | Soft delete with confirmation dialog |
| Search & Filter | By rank, vessel, name, or crew code |

### 📜 Certificate Tracking
| Feature | Description |
|---------|-------------|
| Certificate Management | Add, edit, delete certificates |
| Expiry Tracking | Automatic calculation of remaining days |
| Visual Status | Color-coded badges (VALID, WARNING, CRITICAL, EXPIRED) |
| Document Upload | Attach PDF/JPG copies of certificates |
| Email Alerts | Automatic notifications for expiring certificates |

### 📅 Appointment Management
| Feature | Description |
|---------|-------------|
| Sign On / Sign Off | Record crew boarding and disembarkation |
| Vessel History | Track all vessels a crew has served on |
| Contract Period | Calculate contract duration automatically |
| Deployment Timeline | Visual representation of crew schedules |

### 📊 Dashboard & Analytics
| Feature | Description |
|---------|-------------|
| Statistics Cards | Total crews, on board, active crews, compliance issues |
| Donut Charts | Certificate expiry distribution |
| Recent Alerts | Upcoming certificate expirations |
| Quick Actions | Export data, add crew shortcuts |

### 🗓️ Calendar View
| Feature | Description |
|---------|-------------|
| Monthly Calendar | Visual deployment schedule |
| Color-coded Events | Embark (green), Disembark (blue), Expiry (red) |
| Month Navigation | Previous/Next month navigation |
| Legend | Clear explanation of event types |

### 👨‍👩‍👧‍👦 Family Management
| Feature | Description |
|---------|-------------|
| Family Members | Add, edit, delete family member records |
| Emergency Contact | Mark primary emergency contacts |
| Relation Types | Wife, Husband, Son, Daughter, Parent |

### 💰 Payment Information
| Feature | Description |
|---------|-------------|
| Bank Account | Store bank name, account number, holder name |
| Multiple Accounts | Support for primary and secondary accounts |
| Salary Tracking | Integration with payroll system |

### 🏥 Medical Records
| Feature | Description |
|---------|-------------|
| Medical Checkups | Track height, weight, vision, hearing tests |
| Disease Records | History of illnesses and treatments |
| Injury Records | Track workplace injuries and recovery |
| Document Attachments | Upload medical reports and certificates |

### 📄 Reporting & Export
| Feature | Description |
|---------|-------------|
| Export to Excel | Download crew lists and certificate reports |
| Print Documents | Print crew profiles and certificates |
| PDF Generation | Generate official documents from templates |

---

## 🛠️ Tech Stack

### Frontend Core
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI library |
| React DOM | 18.2.0 | DOM rendering |
| Vite | 5.0.8 | Build tool and dev server |

### State Management
| Technology | Version | Purpose |
|------------|---------|---------|
| Redux Toolkit | 2.2.0 | Global state management |
| RTK Query | 2.2.0 | API caching and data fetching |
| React Redux | 9.1.0 | React bindings for Redux |

### Routing & Navigation
| Technology | Version | Purpose |
|------------|---------|---------|
| React Router DOM | 6.22.0 | Client-side routing |

### Styling & UI
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 3.4.0 | Utility-first CSS framework |
| Lucide React | 0.344.0 | Icon library |

### Charts & Data Visualization
| Technology | Version | Purpose |
|------------|---------|---------|
| Recharts | 2.12.0 | Donut charts and pie charts |

### HTTP Client
| Technology | Version | Purpose |
|------------|---------|---------|
| Axios | 1.6.0 | HTTP requests and interceptors |

---

## 📁 Project Structure
crew-frontend/
│
├── public/ # Static assets
│ ├── favicon.svg
│ └── icons.svg
│
├── src/
│ ├── assets/ # Images, fonts, icons
│ │ ├── images/
│ │ ├── fonts/
│ │ └── icons/
│ │
│ ├── components/ # Reusable components
│ │ ├── common/ # Shared components
│ │ │ ├── Layout.jsx # Main layout wrapper
│ │ │ ├── TopNav.jsx # Top navigation bar
│ │ │ ├── Sidebar.jsx # Side navigation menu
│ │ │ ├── BottomNav.jsx # Footer navigation
│ │ │ ├── LoadingSpinner.jsx # Loading indicator
│ │ │ └── PrivateRoute.jsx # Protected route wrapper
│ │ │
│ │ └── ui/ # UI components
│ │ ├── DonutCard.jsx # Donut chart card
│ │ ├── StatCard.jsx # Statistics card
│ │ ├── Pagination.jsx # Pagination component
│ │ ├── Wave.jsx # Animated wave background
│ │ ├── SearchBar.jsx # Search input with debounce
│ │ ├── FilterDropdown.jsx # Filter dropdown menu
│ │ └── DataTable.jsx # Reusable data table
│ │
│ ├── pages/ # Page components
│ │ ├── auth/ # Authentication pages
│ │ │ ├── Login.jsx
│ │ │ └── ForgotPassword.jsx
│ │ │
│ │ ├── dashboard/ # Dashboard pages
│ │ │ ├── Dashboard.jsx # Main dashboard
│ │ │ ├── Overview.jsx # Overview page
│ │ │ └── CalendarView.jsx # Calendar view
│ │ │
│ │ ├── crew/ # Crew management pages
│ │ │ ├── CrewManagement.jsx # Crew list
│ │ │ ├── CrewDetail.jsx # Crew profile
│ │ │ ├── CrewForm.jsx # Add/Edit crew
│ │ │ └── CrewCard.jsx # Crew card component
│ │ │
│ │ ├── certificates/ # Certificate pages
│ │ │ ├── CertificateList.jsx
│ │ │ ├── CertificateForm.jsx
│ │ │ └── ExpiringCertificates.jsx
│ │ │
│ │ ├── appointments/ # Appointment pages
│ │ │ ├── AppointmentList.jsx
│ │ │ └── AppointmentForm.jsx
│ │ │
│ │ ├── reports/ # Reports pages
│ │ │ ├── Reports.jsx
│ │ │ └── ExportData.jsx
│ │ │
│ │ └── settings/ # Settings pages
│ │ ├── Profile.jsx
│ │ └── UserManagement.jsx
│ │
│ ├── redux/ # Redux state management
│ │ ├── store.js # Store configuration
│ │ ├── api/ # RTK Query API slices
│ │ │ ├── apiSlice.js # Base API configuration
│ │ │ ├── authApi.js # Authentication endpoints
│ │ │ ├── crewApi.js # Crew endpoints
│ │ │ ├── certificateApi.js # Certificate endpoints
│ │ │ ├── appointmentApi.js # Appointment endpoints
│ │ │ └── dashboardApi.js # Dashboard endpoints
│ │ │
│ │ └── slices/ # Redux slices
│ │ ├── authSlice.js # Authentication state
│ │ ├── uiSlice.js # UI state (loading, modals)
│ │ ├── crewSlice.js # Crew state (filters, sorting)
│ │ ├── filterSlice.js # Filter state
│ │ └── notificationSlice.js # Notification state
│ │
│ ├── hooks/ # Custom React hooks
│ │ ├── useAuth.js # Authentication hook
│ │ ├── useDebounce.js # Debounce hook for search
│ │ ├── useLocalStorage.js # Local storage hook
│ │ ├── usePagination.js # Pagination logic hook
│ │ ├── useScreenInit.js # Screen initialization hook
│ │ └── useNotification.js # Notification hook
│ │
│ ├── utils/ # Utility functions
│ │ ├── axiosConfig.js # Axios configuration
│ │ ├── dateHelpers.js # Date formatting helpers
│ │ ├── formatHelpers.js # String formatting helpers
│ │ ├── validationSchemas.js # Form validation schemas
│ │ ├── constants.js # App constants
│ │ └── exportHelpers.js # Data export helpers
│ │
│ ├── config/ # Configuration files
│ │ ├── manifest.js # Screen manifest
│ │ ├── navigation.js # Navigation configuration
│ │ └── apiEndpoints.js # API endpoint constants
│ │
│ ├── services/ # Service layer
│ │ ├── authService.js # Authentication service
│ │ ├── crewService.js # Crew service
│ │ ├── certificateService.js # Certificate service
│ │ └── exportService.js # Export service
│ │
│ ├── styles/ # Global styles
│ │ ├── globals.css # Global CSS
│ │ ├── animations.css # Animation keyframes
│ │ └── theme.css # Theme variables
│ │
│ ├── App.jsx # Main App component
│ ├── main.jsx # Entry point
│ └── index.css # Tailwind imports
│
├── .env # Environment variables
├── .gitignore # Git ignore file
├── index.html # HTML template
├── package.json # Dependencies
├── package-lock.json # Lock file
├── postcss.config.js # PostCSS configuration
├── tailwind.config.js # Tailwind configuration
├── vite.config.js # Vite configuration
└── README.md # Documentation