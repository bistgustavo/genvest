# Genvest - Investment Platform

## Overview

Genvest is a modern investment platform built with React.js that provides users with investment opportunities and financial services. The platform features a responsive design, user authentication, contact management, and various interactive components.

## Features

- 🎯 Modern and responsive UI design
- 🔐 User authentication and registration
- 📱 Mobile-friendly interface
- 📧 Contact form with Google Sheets integration
- 🗺️ Interactive Google Maps integration
- 💼 Investment portfolio management
- 👥 Team member profiles
- 🎨 Tailwind CSS for styling

## Tech Stack

- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Google Maps API
- Google Sheets API (for contact form)
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/genvest.git
cd genvest
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create environment variables
   Create a `.env` file in the root directory and add the following:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
genvest/
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── ...
│   │   ├── Card.jsx
│   │   ├── Signup.jsx
│   │   └── ...
│   ├── assets/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

## Contact Form Setup

The contact form uses Google Sheets as a backend to store submissions. To set it up:

1. Create a new Google Sheet
2. Set up Google Apps Script:
   - Go to Extensions > Apps Script
   - Copy and paste the provided script
   - Deploy as web app
   - Set permissions to "Anyone"
   - Copy the deployment URL
3. Update the `GOOGLE_SHEETS_URL` in `Contact.jsx`

## Features in Detail

### User Authentication

- Sign up with email/password
- Profile photo upload
- Social media integration
- Form validation

### Contact Page

- Interactive contact form
- Google Maps integration
- Real-time form validation
- Success/error notifications
- Data storage in Google Sheets

### Responsive Design

- Mobile-first approach
- Tailwind CSS utilities
- Smooth transitions
- Modern UI components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Website: [genvest.com.np](https://genvest.com.np)
- Email: info@genvest.com.np
- Location: Kathmandu, Nepal

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Maps Platform](https://developers.google.com/maps)
- [Google Sheets API](https://developers.google.com/sheets/api)
