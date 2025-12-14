# Debugging Examples for Bug Tracker

This document demonstrates intentional bugs and debugging techniques used in the Bug Tracker application.

## Intentional Bugs for Debugging Practice

### 1. Backend Bug Example: Missing Validation

**File**: `backend/routes/bugs.js`
**Line**: Around line 95 (PUT route)

To introduce a bug for debugging practice, you can temporarily remove the validation check:

```javascript
// INTENTIONAL BUG: Comment out validation to see error handling
// const validation = validateBugData(sanitizedData);
// if (!validation.isValid) {
//   return res.status(400).json({
//     success: false,
//     error: 'Validation failed',
//     errors: validation.errors,
//   });
// }
```

**Debugging Technique**: 
- Use `console.log()` to track the flow
- Use Node.js inspector: `node --inspect server.js`
- Check Chrome DevTools (chrome://inspect)

### 2. Frontend Bug Example: Infinite Loop

**File**: `frontend/src/App.jsx`

To create an infinite loop bug:

```javascript
// INTENTIONAL BUG: Missing dependency array causes infinite loop
useEffect(() => {
  fetchBugs();
  // Missing dependency array [] causes this to run on every render
});
```

**Debugging Technique**:
- Open Chrome DevTools Console
- Watch for rapid console.log messages
- Use React DevTools to inspect component re-renders

### 3. Type Coercion Bug

**File**: `frontend/src/components/BugItem.jsx`

```javascript
// INTENTIONAL BUG: String comparison instead of strict equality
const handleStatusChange = (e) => {
  const newStatus = e.target.value;
  if (newStatus == bug.status) { // Should use ===
    return; // Bug: Won't update if values are loosely equal
  }
  onStatusChange(bug.id, newStatus);
};
```

**Debugging Technique**:
- Use `console.log(typeof newStatus, typeof bug.status)`
- Set breakpoints in Chrome DevTools
- Use debugger statement

## Debugging Tools and Techniques

### 1. Console Logging

The application includes strategic console.log statements:

**Backend (server.js)**:
```javascript
console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
```

**Frontend (App.jsx)**:
```javascript
console.log('Fetching bugs...');
console.log('Bugs fetched successfully:', response.data);
console.error('Error fetching bugs:', err);
```

### 2. Chrome DevTools

**Network Tab**:
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by XHR/Fetch
4. Inspect API requests and responses

**Console Tab**:
- View all console.log output
- Check for errors and warnings
- Test JavaScript expressions

**Sources Tab**:
- Set breakpoints in code
- Step through execution
- Inspect variable values
- Use watch expressions

**React DevTools**:
- Install React DevTools extension
- Inspect component hierarchy
- View props and state
- Track component re-renders

### 3. Node.js Inspector

**Start server in debug mode**:
```bash
node --inspect server.js
# Or with nodemon
nodemon --inspect server.js
```

**Connect debugger**:
1. Open Chrome and go to `chrome://inspect`
2. Click "Open dedicated DevTools for Node"
3. Set breakpoints in server code
4. Step through execution

**VS Code Debugging**:
Create `.vscode/launch.json`:
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

### 4. Error Boundaries (React)

The app includes an ErrorBoundary component:

**Location**: `frontend/src/components/ErrorBoundary.jsx`

**Testing Error Boundary**:
```javascript
// Add this to any component to trigger error boundary
const BuggyComponent = () => {
  throw new Error('Test error!');
  return <div>This won't render</div>;
};
```

### 5. Network Request Debugging

**Using axios interceptors** (add to bugService.js):
```javascript
axios.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method.toUpperCase(), config.url);
    console.log('Data:', config.data);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.data);
    return Promise.reject(error);
  }
);
```

## Common Debugging Scenarios

### Scenario 1: Form Not Submitting

**Steps to Debug**:
1. Add console.log in handleSubmit
2. Check if validation is passing
3. Inspect network tab for API call
4. Check backend logs for errors

### Scenario 2: Data Not Updating in UI

**Steps to Debug**:
1. Check if API call succeeded (Network tab)
2. Verify state is being updated (React DevTools)
3. Check if component is re-rendering
4. Inspect props passed to child components

### Scenario 3: API Returning Errors

**Steps to Debug**:
1. Check backend console for error logs
2. Verify request payload in Network tab
3. Test API endpoint with Postman/Thunder Client
4. Check database connection
5. Review error middleware handling

### Scenario 4: Tests Failing

**Steps to Debug**:
1. Run tests in watch mode: `npm test`
2. Add console.log in test cases
3. Check mock implementations
4. Verify test data matches expectations
5. Run tests with coverage to see what's not tested

## Performance Debugging

### React Performance

**Using React DevTools Profiler**:
1. Install React DevTools
2. Go to Profiler tab
3. Start recording
4. Perform actions
5. Analyze render times

**Checking for unnecessary re-renders**:
```javascript
// Add to components
useEffect(() => {
  console.log('Component rendered/re-rendered');
});
```

### Backend Performance

**Logging request duration**:
```javascript
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

## Memory Leak Detection

**Frontend**:
- Use Chrome DevTools Memory profiler
- Take heap snapshots
- Compare snapshots to find leaks

**Backend**:
- Use Node.js `--inspect` flag
- Monitor memory usage: `process.memoryUsage()`
- Use tools like clinic.js

## Best Practices

1. **Always add descriptive console.log messages**
2. **Use debugger statements strategically**
3. **Test error scenarios explicitly**
4. **Keep DevTools open during development**
5. **Use source maps for production debugging**
6. **Implement proper error boundaries**
7. **Log errors to external services in production**
8. **Monitor application performance**
9. **Write tests for edge cases**
10. **Document known issues and their solutions**
