# Quick Reference Guide - MERN Bug Tracker

## 📦 Installation

```powershell
# Quick setup (recommended)
.\setup.ps1

# Manual setup
cd backend ; npm install
cd ..\frontend ; npm install
```

## 🚀 Running the Application

### Start Both Servers
**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```
Runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```
Runs on: http://localhost:3000

### Start MongoDB
```powershell
# Windows
mongod

# Or use MongoDB Compass/Atlas
```

## 🧪 Testing

### Backend Tests
```powershell
cd backend
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Frontend Tests
```powershell
cd frontend
npm test                # Run all tests
npm run test:ui         # Visual UI
npm run test:coverage   # Coverage report
```

## 🐛 Debugging

### Backend Debugging
```powershell
# With Node Inspector
cd backend
npm run debug

# Then open: chrome://inspect
```

### Frontend Debugging
- Open Chrome DevTools (F12)
- Use React DevTools extension
- Set breakpoints in Sources tab

### VS Code Debugging
- Press F5
- Select "Debug Backend Server" or "Debug Full Stack"

## 📝 Common Commands

### Backend
```powershell
npm start          # Production mode
npm run dev        # Development with nodemon
npm run debug      # Debug mode
npm test           # Run tests
```

### Frontend
```powershell
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
npm test           # Run tests
```

## 🔧 Environment Variables

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bugtracker
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bugtracker
```

## 📚 API Quick Reference

### Endpoints
```
GET    /api/bugs              # Get all bugs
GET    /api/bugs/:id          # Get single bug
POST   /api/bugs              # Create bug
PUT    /api/bugs/:id          # Update bug
PATCH  /api/bugs/:id/status   # Update status
DELETE /api/bugs/:id          # Delete bug
```

### Sample Request (Create Bug)
```json
POST /api/bugs
{
  "title": "Login button broken",
  "description": "The login button doesn't respond to clicks",
  "reportedBy": "John Doe",
  "status": "open",
  "priority": "high"
}
```

## 🎯 Test Coverage

### Backend (30+ tests)
- ✅ Validation helpers (14 tests)
- ✅ API routes (16 tests)

### Frontend (23+ tests)
- ✅ BugForm component (8 tests)
- ✅ BugItem component (6 tests)
- ✅ BugList component (4 tests)
- ✅ App integration (5 tests)

## 🔍 Troubleshooting

### MongoDB Connection Error
```powershell
# Start MongoDB
mongod

# Or check MongoDB Compass
```

### Port Already in Use
```powershell
# Change port in .env (backend)
PORT=5001

# Change port in vite.config.js (frontend)
server: { port: 3001 }
```

### Tests Failing
```powershell
# Clear cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Frontend Not Loading
```powershell
# Check backend is running
# Verify proxy in vite.config.js
# Check console for CORS errors
```

## 📖 File Structure Reference

```
backend/
├── __tests__/          # Test files
├── middleware/         # Express middleware
├── models/            # Mongoose models
├── routes/            # API routes
├── utils/             # Helper functions
└── server.js          # Entry point

frontend/
├── src/
│   ├── __tests__/     # Component tests
│   ├── components/    # React components
│   ├── services/      # API services
│   ├── App.jsx        # Main app
│   └── main.jsx       # Entry point
├── index.html
└── vite.config.js
```

## 🎨 Key Features

1. **Create Bugs** - Fill form and submit
2. **View Bugs** - See all reported bugs
3. **Update Status** - Change bug status
4. **Delete Bugs** - Remove bugs
5. **Filtering** - Filter by status/priority
6. **Validation** - Form and API validation
7. **Error Handling** - Graceful error messages

## 💡 Tips

- Keep DevTools open during development
- Use React DevTools to inspect state
- Check Network tab for API issues
- Read console logs for debugging
- Run tests before committing code
- Use VS Code debugging for step-through

## 📞 Help

- Check README.md for detailed docs
- See DEBUGGING.md for debugging guide
- Review PROJECT_SUMMARY.md for overview

## ⚡ Quick Actions

```powershell
# Fresh start
rm -rf node_modules ; npm install

# Reset database (stop mongod first)
rm -rf /data/db/*

# View test coverage
npm run test:coverage

# Debug in VS Code
Press F5 → Select configuration
```
