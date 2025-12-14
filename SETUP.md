# Setup Instructions for Mt-Kenya Agro-Loup

## Quick Setup Guide

### 1. Install Dependencies

#### Frontend Dependencies
```powershell
cd frontend
npm install react-router-dom
```

#### Backend Dependencies (already installed)
The backend dependencies are already set up. If needed:
```powershell
cd backend
npm install
```

### 2. Environment Configuration

Two `.env` files need to be created:

#### Backend `.env` (in backend folder)
Create a file `backend/.env` with:
```
MONGO_URI=mongodb://localhost:27017/mtkenya-agro
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
```

**For MongoDB Atlas (Cloud):**
Replace `MONGO_URI` with your Atlas connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mtkenya-agro?retryWrites=true&w=majority
```

#### Frontend `.env` (in frontend folder)
Create a file `frontend/.env` with:
```
VITE_API_URL=http://localhost:5000
```

### 3. Start MongoDB

#### Option A: Local MongoDB
Make sure MongoDB is running locally:
```powershell
# Start MongoDB service (if installed locally)
net start MongoDB
```

#### Option B: MongoDB Atlas
If using MongoDB Atlas, no local setup needed. Just use your connection string in the backend `.env` file.

### 4. Run the Application

Open **two** PowerShell terminals:

#### Terminal 1 - Backend Server
```powershell
cd backend
npm run dev
```

The backend will start on: http://localhost:5000

#### Terminal 2 - Frontend Development Server
```powershell
cd frontend
npm run dev
```

The frontend will start on: http://localhost:5173

### 5. Access the Application

Open your browser and navigate to:
**http://localhost:5173**

## Project Structure Overview

```
mt-kenya-Agro-loup/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Main server file
│   ├── .env                # Environment variables (CREATE THIS)
│   └── package.json
│
└── frontend/               # React + Vite frontend
    ├── src/
    │   ├── components/     # Reusable components (Navbar, Footer)
    │   ├── pages/          # Page components (Home, Products, etc.)
    │   ├── lib/            # API utilities
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # Entry point
    ├── .env                # Environment variables (CREATE THIS)
    └── package.json
```

## Testing the Application

### 1. Test Backend API

Open a browser or use Postman to test:
```
GET http://localhost:5000/
Response: "MT Kenya Agro API is running"

GET http://localhost:5000/api/agro
Response: [] (empty array if no products yet)
```

### 2. Test Frontend Pages

Navigate through the application:
- Home: http://localhost:5173/
- Products: http://localhost:5173/products
- Farmer Dashboard: http://localhost:5173/farmer-dashboard
- About: http://localhost:5173/about
- Contact: http://localhost:5173/contact

### 3. Add a Product

1. Go to Farmer Dashboard
2. Click "Add New Product"
3. Fill in the form:
   - Farmer Name
   - Email
   - Crop Type (e.g., Tomatoes, Maize, Potatoes)
   - Quantity in kg
   - Location (e.g., Nanyuki, Meru)
   - Harvest Date
4. Click "Add Product"
5. The product should appear in the table and on the Products page

## Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Check if MongoDB is running
- Verify `MONGO_URI` in backend `.env` file
- For Atlas: Check network access and credentials

### Issue: "Frontend can't connect to backend"
**Solution:**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env` file
- Verify CORS settings in backend

### Issue: "Module not found" errors
**Solution:**
```powershell
# In frontend directory
npm install

# In backend directory
cd ../backend
npm install
```

### Issue: "react-router-dom not found"
**Solution:**
```powershell
cd frontend
npm install react-router-dom
```

## Development Tips

### Hot Reload
- Frontend: Automatically reloads on file changes
- Backend: Uses nodemon for auto-restart on file changes

### Port Configuration
- Backend runs on port 5000 (configurable in `.env`)
- Frontend runs on port 5173 (Vite default)

### Database
- Database name: `mtkenya-agro`
- Collection: `agros`

## Next Steps

After successfully running the application:

1. **Add Sample Data**: Use the Farmer Dashboard to add some products
2. **Explore Features**: Navigate through all pages
3. **Test Filtering**: Try filtering products by crop type
4. **Customize**: Modify colors, text, or add new features

## Additional Resources

- React Documentation: https://react.dev
- Vite Documentation: https://vite.dev
- Express Documentation: https://expressjs.com
- MongoDB Documentation: https://docs.mongodb.com

## Support

For issues or questions:
- Check the troubleshooting section above
- Review the main README.md file
- Contact: info@mtkenya-agro.com

---

Happy coding! 🌾
