# Genvest Ventures Frontend

This is the frontend application for Genvest Ventures, a financial services company based in Nepal. The application is built using React and provides a modern, responsive interface for users to access financial services and information.

## Technologies Used

- React
- React Router for navigation
- Tailwind CSS for styling
- Vite (Build tool)

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

## Getting Started

1. Clone the repository

```bash
git clone [repository-url]
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables

```bash
VITE_API_URL=http://localhost:8000
```

4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

To create a production build:

```bash
npm run build
```

The build files will be available in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── assets/        # Static assets (images, icons)
│   ├── components/    # Reusable React components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── App.jsx        # Root component
│   └── main.jsx      # Entry point
├── public/           # Public assets
└── index.html        # HTML template
```

## Features

- Modern and responsive design
- Real-time market data display
- User authentication and authorization
- Financial services information
- Contact and support system
- FAQ section
- Privacy policy and terms of use

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved by Genvest Ventures Pvt. Ltd.
