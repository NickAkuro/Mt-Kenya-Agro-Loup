# MERN Bug Tracker

A full-stack bug tracking application built with MongoDB, Express, React, and Node.js (MERN stack), featuring comprehensive testing and debugging practices.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Debugging](#debugging)
- [API Documentation](#api-documentation)
- [Testing Approach](#testing-approach)
- [Error Handling](#error-handling)

## ✨ Features

- **Create Bug Reports**: Users can report new bugs with detailed information
- **View Bug List**: Display all reported bugs with filtering options
- **Update Bug Status**: Change bug status (open, in-progress, resolved)
- **Delete Bugs**: Remove bugs from the tracker
- **Priority Levels**: Categorize bugs by priority (low, medium, high, critical)
- **Error Boundaries**: Graceful error handling in React components
- **Comprehensive Testing**: Unit and integration tests for both frontend and backend
- **Debugging Tools**: Console logs, Chrome DevTools integration, Node.js inspector

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Jest** - Testing framework
- **Supertest** - API testing
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **CSS3** - Styling

## 📁 Project Structure

```
mern-bug-tracker/
├── backend/
│   ├── __tests__/
│   │   ├── validation.test.js      # Unit tests for validation helpers
│   │   └── bugs.test.js            # Integration tests for API routes
│   ├── middleware/
│   │   └── errorHandler.js         # Error handling middleware
│   ├── models/
│   │   └── Bug.js                  # Mongoose bug model
│   ├── routes/
│   │   └── bugs.js                 # Bug API routes
│   ├── utils/
│   │   └── validation.js           # Validation helper functions
│   ├── .env                        # Environment variables
│   ├── .env.example                # Environment variables template
│   ├── jest.config.js              # Jest configuration
│   ├── package.json                # Backend dependencies
│   └── server.js                   # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── __tests__/
│   │   │   ├── App.test.jsx        # App integration tests
│   │   │   ├── BugForm.test.jsx    # BugForm component tests
│   │   │   ├── BugItem.test.jsx    # BugItem component tests
│   │   │   └── BugList.test.jsx    # BugList component tests
│   │   ├── components/
│   │   │   ├── BugForm.jsx         # Bug creation/edit form
│   │   │   ├── BugForm.css
│   │   │   ├── BugItem.jsx         # Individual bug display
│   │   │   ├── BugItem.css
│   │   │   ├── BugList.jsx         # Bug list container
│   │   │   ├── BugList.css
│   │   │   └── ErrorBoundary.jsx   # React error boundary
│   │   ├── services/
│   │   │   └── bugService.js       # API service layer
│   │   ├── App.jsx                 # Main App component
│   │   ├── App.css
│   │   ├── main.jsx                # React entry point
│   │   ├── index.css               # Global styles
│   │   └── setupTests.js           # Test setup
│   ├── index.html                  # HTML template
│   ├── package.json                # Frontend dependencies
│   └── vite.config.js              # Vite configuration
│
├── DEBUGGING.md                    # Debugging guide
└── README.md                       # This file
```

## 📦 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (running locally or MongoDB Atlas account)
- **npm** or **yarn**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd mern-bug-tracker
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd ../backend
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bugtracker
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bugtracker
```

### Step 5: Start MongoDB

If using local MongoDB:

```bash
# Windows
mongod

# macOS/Linux
sudo mongod
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Client runs on `http://localhost:3000`

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Test Coverage Includes:**
- ✅ Unit tests for validation helpers
- ✅ Integration tests for all API endpoints
- ✅ Mock database calls
- ✅ Error handling scenarios

### Frontend Testing

```bash
cd frontend

# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

**Test Coverage Includes:**
- ✅ Component unit tests (BugForm, BugItem, BugList)
- ✅ Form validation tests
- ✅ User interaction tests (button clicks, form submission)
- ✅ Integration tests for API calls
- ✅ Different UI states (loading, error, empty)

### Running All Tests

From the root directory:

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd ../frontend && npm test
```

## 🐛 Debugging

### Backend Debugging

**Console Logs:**
The application includes strategic console.log statements for tracking:
- Request paths and methods
- API responses
- Error messages

**Node.js Inspector:**
```bash
cd backend

# Start with inspector
npm run debug

# Or with nodemon
nodemon --inspect server.js
```

Then open Chrome and navigate to `chrome://inspect`

**VS Code Debugging:**
Press F5 in VS Code with the following configuration in `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "program": "${workspaceFolder}/backend/server.js",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### Frontend Debugging

**Chrome DevTools:**

1. **Console Tab**: View all console.log outputs and errors
2. **Network Tab**: Inspect API requests and responses
3. **Sources Tab**: Set breakpoints and step through code
4. **React DevTools**: Inspect component hierarchy, props, and state

**Using debugger statement:**
```javascript
const handleSubmit = (e) => {
  debugger; // Execution will pause here
  e.preventDefault();
  // ...
};
```

See [DEBUGGING.md](./DEBUGGING.md) for detailed debugging techniques and intentional bug examples.

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Bugs
```http
GET /api/bugs
```

**Query Parameters:**
- `status` (optional): Filter by status (open, in-progress, resolved)
- `priority` (optional): Filter by priority (low, medium, high, critical)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Login button not working",
      "description": "When clicking login, nothing happens",
      "status": "open",
      "priority": "high",
      "reportedBy": "John Doe",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

#### Get Single Bug
```http
GET /api/bugs/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Login button not working",
    "description": "When clicking login, nothing happens",
    "status": "open",
    "priority": "high",
    "reportedBy": "John Doe",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Create Bug
```http
POST /api/bugs
```

**Request Body:**
```json
{
  "title": "Login button not working",
  "description": "When clicking login, nothing happens",
  "reportedBy": "John Doe",
  "status": "open",
  "priority": "high"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Login button not working",
    "description": "When clicking login, nothing happens",
    "status": "open",
    "priority": "high",
    "reportedBy": "John Doe",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Update Bug
```http
PUT /api/bugs/:id
```

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "reportedBy": "John Doe",
  "status": "in-progress",
  "priority": "critical"
}
```

#### Update Bug Status
```http
PATCH /api/bugs/:id/status
```

**Request Body:**
```json
{
  "status": "resolved"
}
```

#### Delete Bug
```http
DELETE /api/bugs/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Bug deleted successfully"
}
```

### Error Responses

```json
{
  "success": false,
  "error": "Error message",
  "errors": ["Validation error 1", "Validation error 2"]
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Server Error

## 🧪 Testing Approach

### Backend Testing Strategy

#### 1. Unit Tests (`__tests__/validation.test.js`)

**Purpose**: Test individual helper functions in isolation

**Coverage:**
- Input validation functions
- Data sanitization
- ObjectId validation
- Response formatting

**Example:**
```javascript
test('should validate correct bug data', () => {
  const validBug = {
    title: 'Test Bug',
    description: 'This is a test bug description',
    reportedBy: 'John Doe',
  };
  const result = validateBugData(validBug);
  expect(result.isValid).toBe(true);
});
```

#### 2. Integration Tests (`__tests__/bugs.test.js`)

**Purpose**: Test API routes with mocked database

**Coverage:**
- All CRUD endpoints
- Request/response validation
- Error handling
- Database interactions (mocked)

**Example:**
```javascript
test('should create a new bug', async () => {
  const newBug = {
    title: 'New Bug',
    description: 'This is a new bug description',
    reportedBy: 'John Doe',
  };
  
  const response = await request(app).post('/api/bugs').send(newBug);
  
  expect(response.status).toBe(201);
  expect(response.body.success).toBe(true);
});
```

### Frontend Testing Strategy

#### 1. Component Unit Tests

**BugForm Tests** (`__tests__/BugForm.test.jsx`):
- Form field rendering
- Validation error display
- Form submission with valid data
- Error clearing on user input

**BugItem Tests** (`__tests__/BugItem.test.jsx`):
- Bug information display
- Status change handling
- Delete confirmation
- CSS class application

**BugList Tests** (`__tests__/BugList.test.jsx`):
- Loading state
- Error state
- Empty state
- Bug list rendering

#### 2. Integration Tests

**App Tests** (`__tests__/App.test.jsx`):
- API call on mount
- Bug creation flow
- Error handling
- State management

**Example:**
```javascript
test('fetches and displays bugs on mount', async () => {
  bugService.getAllBugs.mockResolvedValue({ data: mockBugs });
  
  render(<App />);
  
  await waitFor(() => {
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
  });
});
```

### Test Coverage Goals

- **Backend**: 80%+ coverage for utils and routes
- **Frontend**: 70%+ coverage for components
- All user-facing features have tests
- Critical paths are fully tested
- Error scenarios are covered

## 🛡️ Error Handling

### Backend Error Handling

#### 1. Error Middleware (`middleware/errorHandler.js`)

**Handles:**
- Mongoose validation errors
- Cast errors (invalid ObjectId)
- Duplicate key errors
- Generic server errors

**Example:**
```javascript
app.use(errorHandler);
```

#### 2. Async Error Handling

**asyncHandler wrapper:**
```javascript
router.get('/', asyncHandler(async (req, res) => {
  // Errors automatically caught and passed to error middleware
  const bugs = await Bug.find();
  res.json({ success: true, data: bugs });
}));
```

#### 3. Validation Errors

**Custom validation:**
```javascript
const validation = validateBugData(bugData);
if (!validation.isValid) {
  return res.status(400).json({
    success: false,
    error: 'Validation failed',
    errors: validation.errors,
  });
}
```

### Frontend Error Handling

#### 1. Error Boundary (`components/ErrorBoundary.jsx`)

**Catches:**
- Component rendering errors
- Lifecycle method errors
- Constructor errors

**Usage:**
```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

#### 2. API Error Handling

**In services:**
```javascript
try {
  const response = await axios.get('/api/bugs');
  return response.data;
} catch (error) {
  console.error('API Error:', error);
  throw error;
}
```

**In components:**
```javascript
try {
  await bugService.createBug(bugData);
  setSuccessMessage('Bug created!');
} catch (err) {
  setError(err.response?.data?.error || 'Failed to create bug');
}
```

#### 3. Form Validation Errors

**Client-side validation:**
```javascript
const validateForm = () => {
  const errors = {};
  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  }
  return errors;
};
```

## 📝 Notes

- **MongoDB Connection**: Ensure MongoDB is running before starting the backend
- **Port Configuration**: Default ports are 5000 (backend) and 3000 (frontend)
- **CORS**: Backend is configured to accept requests from frontend
- **Environment Variables**: Never commit `.env` files to version control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built as part of MERN stack learning assignment - Week 6

## 🙏 Acknowledgments

- Express.js documentation
- React documentation
- Jest and Vitest documentation
- MongoDB University
