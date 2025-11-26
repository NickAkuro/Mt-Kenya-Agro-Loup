# Mt-Kenya Agro-Loup

A transparent, tech-enabled marketplace that smooths regional supply, protects farmer incomes, and delivers fresher produce to consumers.

## Project Overview

Mt-Kenya Agro-Loup is a full-stack MERN application designed to connect farmers directly with consumers in the Mt Kenya region. The platform eliminates middlemen, ensures fair pricing, and delivers farm-fresh produce efficiently.

## Features

### For Farmers
- 📝 Easy product listing with crop details
- 💰 Transparent pricing and direct sales
- 📊 Dashboard to manage products
- 📱 Mobile-friendly interface

### For Consumers
- 🌾 Browse fresh, local produce
- 🔍 Filter products by crop type and location
- 👨‍🌾 Connect directly with farmers
- ✅ View harvest dates and product details

### Platform Features
- 🌐 Responsive design for all devices
- ⚡ Fast, modern user interface
- 🔒 Secure data handling
- 📈 Real-time product updates

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Vite for build tooling
- Modern CSS with custom properties

### Backend
- Node.js & Express
- MongoDB with Mongoose
- CORS enabled
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd mt-kenya-Agro-loup
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
MONGO_URI=mongodb://localhost:27017/mtkenya-agro
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
mt-kenya-Agro-loup/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   └── Agro.js
│   │   ├── routes/
│   │   │   └── agro.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── ui/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── FarmerDashboard.jsx
    │   │   ├── About.jsx
    │   │   └── Contact.jsx
    │   ├── lib/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── .env
```

## API Endpoints

### Products
- `GET /api/agro` - Get all products
- `POST /api/agro/add` - Add new product
- `PUT /api/agro/update/:id` - Update product
- `DELETE /api/agro/delete/:id` - Delete product

## Available Scripts

### Backend
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] User authentication system
- [ ] Payment integration
- [ ] Order tracking
- [ ] Farmer verification system
- [ ] Rating and review system
- [ ] Mobile application
- [ ] SMS notifications
- [ ] Advanced analytics dashboard

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact:
- Email: info@mtkenya-agro.com
- Phone: +254 700 123 456

## Acknowledgments

- Mt Kenya farming community
- All contributors and supporters
- Open source community

---

Built with ❤️ for the Mt Kenya Region
