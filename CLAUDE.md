# CLAUDE.md - AI Assistant Development Guide

## Project Overview

**Project Name:** Pottery
**Repository:** SrmTech-git/Pottery
**Status:** Initial Setup Phase
**Last Updated:** 2025-11-14

### Purpose
This document serves as a comprehensive guide for AI assistants (like Claude) working on the Pottery codebase. It outlines project structure, development workflows, coding conventions, and best practices.

### Project Description
Pottery is a demo pottery management tool designed to help manage pottery-related activities, inventory, and operations. The application is built with a focus on simplicity and readability, making it accessible for junior developers to understand and maintain.

**Key Goals:**
- Create a user-friendly pottery management system
- Write clean, understandable code suitable for junior developers
- Build with future scalability in mind (eventual SQL database + Java backend)
- Demonstrate best practices in React development

---

## Repository Structure

```
Pottery/
├── .git/                    # Git repository metadata
├── CLAUDE.md               # This file - AI assistant guide
├── README.md               # Project documentation
├── .gitignore              # Git ignore patterns
├── package.json            # NPM dependencies and scripts
├── package-lock.json       # NPM dependency lock file
├── public/                 # Static files (HTML, favicon, etc.)
│   └── index.html         # Main HTML file
├── src/                    # Source code
│   ├── components/        # React components
│   ├── services/          # Business logic and localStorage services
│   ├── utils/             # Utility functions
│   ├── models/            # Data models and types
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React Context providers
│   ├── App.jsx            # Main App component
│   ├── index.jsx          # React entry point
│   └── index.css          # Global styles
└── tests/                 # Test files (optional: can be colocated)
```

### Component Organization

Organize components by feature or functionality:

```
src/
├── components/
│   ├── common/            # Shared/reusable components (Button, Input, etc.)
│   ├── pottery/           # Pottery-specific components
│   ├── inventory/         # Inventory management components
│   └── layout/            # Layout components (Header, Footer, etc.)
```

---

## Development Workflow

### Branch Strategy

**Current Development Branch:** `claude/claude-md-mhz99muovfaoqyhy-01XT1aaLMaJ96R1ou2RqjxpD`

**Branch Naming Convention:**
- Feature branches: `feature/description`
- Bug fixes: `bugfix/issue-description`
- AI-generated branches: `claude/session-id`
- Hotfixes: `hotfix/issue-description`

### Git Operations

**Committing Changes:**
1. Review changes with `git status` and `git diff`
2. Stage relevant files: `git add <files>`
3. Create descriptive commit message
4. Commit: `git commit -m "type: description"`
5. Push: `git push -u origin <branch-name>`

**Commit Message Format:**
```
type: brief description

Detailed explanation if needed

- Bullet points for multiple changes
- Reference issues: Fixes #123
```

**Commit Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style/formatting
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Maintenance tasks

### Pull Request Process

1. Ensure branch is up to date with main
2. Run all tests and linting
3. Create PR with descriptive title and summary
4. Include:
   - Summary of changes (bullet points)
   - Test plan/checklist
   - Related issues
   - Screenshots (if UI changes)

---

## Coding Standards

### General Principles

1. **Write Clean, Readable Code**
   - Use descriptive variable and function names
   - Keep functions small and focused
   - Add comments for complex logic only

2. **Follow DRY (Don't Repeat Yourself)**
   - Extract common code into reusable functions
   - Create shared utilities for repeated patterns

3. **Error Handling**
   - Always handle errors gracefully
   - Provide meaningful error messages
   - Log errors appropriately

4. **Security Best Practices**
   - Never commit secrets, API keys, or credentials
   - Validate and sanitize user input
   - Protect against common vulnerabilities:
     - SQL Injection
     - XSS (Cross-Site Scripting)
     - CSRF (Cross-Site Request Forgery)
     - Command Injection
     - Path Traversal

### Code Style

**JavaScript/React Conventions:**

- **Indentation:** 2 spaces (no tabs)
- **Line length:** Max 100 characters (aim for 80)
- **File extensions:** `.jsx` for components, `.js` for utilities
- **Naming conventions:**
  - **Variables/Functions:** `camelCase` (e.g., `userData`, `fetchPotteryItems`)
  - **Components:** `PascalCase` (e.g., `PotteryList`, `InventoryManager`)
  - **Constants:** `UPPER_CASE` (e.g., `MAX_ITEMS`, `API_TIMEOUT`)
  - **Files:** Match component name in `PascalCase` for components, `camelCase` for utilities
  - **CSS classes:** `kebab-case` (e.g., `pottery-item`, `inventory-list`)

### React-Specific Guidelines

1. **Component Structure:**
   ```jsx
   // Imports
   import React, { useState } from 'react';

   // Component definition
   function ComponentName({ prop1, prop2 }) {
     // State declarations
     const [state, setState] = useState(initialValue);

     // Event handlers
     const handleEvent = () => {
       // handler logic
     };

     // Render
     return (
       <div>
         {/* JSX content */}
       </div>
     );
   }

   export default ComponentName;
   ```

2. **Props Destructuring:**
   - Always destructure props in function parameters for clarity
   - Example: `function Button({ text, onClick, disabled })` not `function Button(props)`

3. **State Management:**
   - Use `useState` for component state
   - Use Context API for shared state across multiple components
   - Keep state as close to where it's used as possible

4. **Comments for Junior Devs:**
   - Add explanatory comments for non-obvious logic
   - Explain "why" not "what" when code is clear
   - Include examples in comments when helpful
   - Use JSDoc for function documentation:
   ```javascript
   /**
    * Calculates the total cost of pottery items
    * @param {Array} items - Array of pottery item objects
    * @returns {number} Total cost in dollars
    */
   function calculateTotal(items) {
     // implementation
   }
   ```

5. **Code Readability for Junior Developers:**
   - Prefer explicit over clever code
   - Break complex operations into smaller, named functions
   - Use descriptive variable names (e.g., `potteryItemList` not `pil`)
   - Avoid advanced JavaScript features without explanation
   - Add comments explaining React concepts (hooks, lifecycle, etc.)

---

## Testing Strategy

### Test Coverage Goals

- Aim for 70%+ code coverage (80%+ for critical features)
- All new features should include tests
- Critical user workflows require comprehensive testing

### Test Types

1. **Unit Tests** (React Testing Library + Jest)
   - Test individual components in isolation
   - Test utility functions and helpers
   - Mock localStorage and external dependencies
   - Fast execution

2. **Integration Tests**
   - Test component interactions
   - Test data flow between components
   - Test localStorage operations
   - Test context providers and consumers

3. **End-to-End Tests** (Optional for demo)
   - Test complete user workflows
   - Test critical pottery management processes

### Testing Tools

- **Jest:** Test runner and assertion library (comes with Create React App)
- **React Testing Library:** Component testing with user-centric approach
- **@testing-library/user-event:** Simulate user interactions
- **@testing-library/jest-dom:** Additional DOM matchers

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended during development)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test -- ComponentName.test.jsx
```

### Writing Tests for Junior Developers

Keep tests simple and readable:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import PotteryItem from './PotteryItem';

test('displays pottery item name', () => {
  // Arrange: Set up test data
  const pottery = { id: 1, name: 'Clay Vase', price: 29.99 };

  // Act: Render component
  render(<PotteryItem item={pottery} />);

  // Assert: Check expected outcome
  expect(screen.getByText('Clay Vase')).toBeInTheDocument();
});
```

---

## Dependencies and Package Management

### Installing Dependencies

```bash
# Install all dependencies
npm install

# Install a new dependency
npm install package-name

# Install a dev dependency (testing, build tools, etc.)
npm install --save-dev package-name
```

### Core Dependencies

**Production:**
- `react` - Core React library
- `react-dom` - React DOM rendering
- Additional dependencies to be added as needed

**Development:**
- `@testing-library/react` - React component testing
- `@testing-library/jest-dom` - Jest DOM matchers
- `@testing-library/user-event` - User interaction simulation

### Adding New Dependencies

1. **Evaluate necessity** - Can we accomplish this without a new dependency?
2. **Check license compatibility** - MIT, Apache 2.0 preferred
3. **Review security vulnerabilities** - Check npm audit
4. **Consider bundle size** - Keep app lightweight
5. **Verify maintenance** - Is package actively maintained?
6. **Document why needed** - Add comment in package.json or docs
7. **Update documentation** - Note in CLAUDE.md if significant

### Dependency Guidelines for Junior Developers

- **Prefer standard libraries** when possible
- **Avoid unnecessary dependencies** - each dependency is technical debt
- **Use established packages** with good documentation
- **Check weekly downloads** on npmjs.com (higher is generally better)
- **Read the documentation** before adding a new dependency

---

## Environment Configuration

### Environment Variables

Store sensitive configuration in environment variables:

```bash
# Example .env structure (never commit actual values)
DATABASE_URL=
API_KEY=
SECRET_KEY=
NODE_ENV=development
```

### Configuration Files

- `.env` - Local environment variables (gitignored)
- `.env.example` - Template for required variables
- Config files should have sensible defaults

---

## API Documentation

### Endpoints

Document all API endpoints as they are created:

```
GET /api/resource
POST /api/resource
PUT /api/resource/:id
DELETE /api/resource/:id
```

### Request/Response Format

Include examples for all endpoints:

```json
{
  "example": "response",
  "format": "json"
}
```

---

## Data Storage and Models

### Current Implementation: LocalStorage

The application currently uses browser localStorage for data persistence:

```javascript
// Example localStorage operations
// Save data
localStorage.setItem('potteryItems', JSON.stringify(items));

// Retrieve data
const items = JSON.parse(localStorage.getItem('potteryItems') || '[]');

// Remove data
localStorage.removeItem('potteryItems');

// Clear all data
localStorage.clear();
```

### Data Model Design Principles

**IMPORTANT:** Design all data models to be SQL-compatible for future migration to a relational database with Java backend.

**Guidelines:**
1. **Use object structures** that map to database tables
2. **Include ID fields** (numeric or UUID strings)
3. **Use proper data types** (strings, numbers, booleans, dates as ISO strings)
4. **Define relationships** through foreign key fields
5. **Avoid complex nested objects** that don't translate to SQL
6. **Include timestamps** (createdAt, updatedAt as ISO date strings)

### Example Data Models

```javascript
// Pottery Item Model
const potteryItem = {
  id: 1,                              // PRIMARY KEY (auto-increment)
  name: "Clay Vase",                  // VARCHAR(255)
  description: "Hand-thrown vase",    // TEXT
  category: "Vase",                   // VARCHAR(100)
  price: 29.99,                       // DECIMAL(10,2)
  quantity: 5,                        // INT
  status: "available",                // VARCHAR(50) or ENUM
  imageUrl: "/images/vase1.jpg",      // VARCHAR(500)
  createdAt: "2025-11-14T10:30:00Z",  // TIMESTAMP
  updatedAt: "2025-11-14T10:30:00Z",  // TIMESTAMP
  createdBy: "user123"                // VARCHAR(100) - future foreign key
};

// Inventory Transaction Model
const inventoryTransaction = {
  id: 1,                              // PRIMARY KEY
  potteryItemId: 1,                   // FOREIGN KEY to potteryItem.id
  type: "sale",                       // VARCHAR(50) - 'sale', 'restock', 'damage'
  quantity: -1,                       // INT (negative for sale, positive for restock)
  notes: "Sold to customer",          // TEXT
  transactionDate: "2025-11-14T14:00:00Z", // TIMESTAMP
  createdBy: "user123"                // VARCHAR(100) - future foreign key
};

// User Model (for future multi-user support)
const user = {
  id: "user123",                      // PRIMARY KEY VARCHAR(100)
  username: "potter1",                // VARCHAR(100) UNIQUE
  email: "potter@example.com",        // VARCHAR(255) UNIQUE
  role: "admin",                      // VARCHAR(50) - 'admin', 'user'
  createdAt: "2025-11-14T10:00:00Z",  // TIMESTAMP
  lastLogin: "2025-11-14T10:00:00Z"   // TIMESTAMP
};
```

### LocalStorage Service Pattern

Create service files to abstract localStorage operations:

```javascript
// src/services/potteryService.js
/**
 * Service for managing pottery items in localStorage
 */
const STORAGE_KEY = 'potteryItems';

export const potteryService = {
  // Get all pottery items
  getAll() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Get pottery item by ID
  getById(id) {
    const items = this.getAll();
    return items.find(item => item.id === id);
  },

  // Create new pottery item
  create(itemData) {
    const items = this.getAll();
    const newItem = {
      ...itemData,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return newItem;
  },

  // Update pottery item
  update(id, updates) {
    const items = this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return items[index];
    }
    return null;
  },

  // Delete pottery item
  delete(id) {
    const items = this.getAll();
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
};
```

### Future Migration Path

When migrating to SQL database with Java backend:

1. **Replace localStorage calls** with API calls to Java backend
2. **Keep the same data model structure** (already SQL-compatible)
3. **Update service files** to use fetch/axios instead of localStorage
4. **Add API endpoints** in Java (Spring Boot) matching service methods
5. **Create SQL tables** from the documented data models
6. **Implement data migration** script to move localStorage data to database

Example future API call:
```javascript
// Future: API call instead of localStorage
async getAll() {
  const response = await fetch('/api/pottery-items');
  return response.json();
}
```

---

## Build and Deployment

### Development Server

```bash
# Start development server (with hot reload)
npm start

# Server will run on http://localhost:3000
# Auto-opens in browser
# Hot reload enabled - changes reflect immediately
```

### Production Build

```bash
# Create optimized production build
npm run build

# Output will be in the 'build/' directory
# Contains minified, optimized static files
# Ready for deployment to any static hosting service
```

### Linting and Code Quality

```bash
# Run ESLint (if configured)
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Deployment Options

Since this is a frontend-only app with localStorage:

**Option 1: GitHub Pages**
```bash
npm run build
# Deploy build/ folder to gh-pages branch
```

**Option 2: Netlify/Vercel**
- Connect GitHub repository
- Set build command: `npm run build`
- Set publish directory: `build`
- Deploy automatically on push

**Option 3: Simple HTTP Server**
```bash
npm run build
npx serve -s build
# Runs on http://localhost:3000
```

### Deployment Process

1. Run all tests: `npm test`
2. Create production build: `npm run build`
3. Test production build locally: `npx serve -s build`
4. Deploy to chosen hosting service
5. Verify deployment
6. Test functionality in production

---

## AI Assistant Guidelines

### When Working on This Project

1. **Always Read This File First**
   - Understand current project structure
   - Follow established conventions
   - Update this file if you make architectural changes

2. **Before Making Changes**
   - Explore existing code to understand patterns
   - Check for similar implementations
   - Consider impact on existing features

3. **Code Quality**
   - Follow security best practices
   - Write tests for new code
   - Refactor when you see opportunities
   - Don't introduce breaking changes without discussion

4. **Documentation**
   - Update README.md for user-facing changes
   - Update CLAUDE.md for development changes
   - Add inline comments for complex logic
   - Document new APIs and functions

5. **Communication**
   - Use TodoWrite tool to track multi-step tasks
   - Provide clear commit messages
   - Explain architectural decisions
   - Ask for clarification when requirements are unclear

### Common Tasks Checklist

**Adding a New Feature:**
- [ ] Understand the requirement fully
- [ ] Plan the implementation (use TodoWrite)
- [ ] Check for existing similar features
- [ ] Implement with tests
- [ ] Update documentation
- [ ] Commit with clear message
- [ ] Create/update PR

**Fixing a Bug:**
- [ ] Reproduce the bug
- [ ] Identify root cause
- [ ] Write test to capture the bug
- [ ] Fix the issue
- [ ] Verify fix with tests
- [ ] Update any affected documentation
- [ ] Commit with "fix:" prefix

**Refactoring:**
- [ ] Ensure tests exist for current behavior
- [ ] Make incremental changes
- [ ] Run tests after each change
- [ ] Update documentation if APIs change
- [ ] Commit with "refactor:" prefix

---

## Project-Specific Notes

### Technology Stack

**Current Stack:**
- **Frontend Framework:** React 18+
- **Language:** JavaScript (JSX)
- **Build Tool:** Create React App (or Vite)
- **Data Storage:** Browser LocalStorage
- **Testing:** Jest + React Testing Library
- **Styling:** CSS (plain CSS or CSS Modules)
- **State Management:** React Context API + useState

**Future Stack (Migration Path):**
- **Backend:** Java (Spring Boot)
- **Database:** SQL (PostgreSQL or MySQL)
- **API:** RESTful API
- **Authentication:** JWT or Spring Security

### Key Features

**Planned Features:**
- Pottery inventory management
- Add/Edit/Delete pottery items
- View pottery catalog
- Track inventory quantities
- Search and filter functionality
- Responsive design for mobile/desktop

**To be implemented based on requirements**

### Code Philosophy for Junior Developers

This project prioritizes:

1. **Readability over Cleverness**
   - Clear variable names over short ones
   - Explicit code flow over advanced patterns
   - Comments explaining "why" for learning

2. **Simplicity over Complexity**
   - Start with simple solutions
   - Add complexity only when needed
   - Avoid premature optimization

3. **Consistency over Perfection**
   - Follow established patterns
   - Consistent file structure
   - Uniform naming conventions

4. **Learning Opportunities**
   - Well-commented examples
   - Clear separation of concerns
   - Gradual introduction of React concepts

### Known Issues

**To be tracked as issues are discovered**

### Performance Considerations

**Current (LocalStorage):**
- LocalStorage has ~5-10MB limit (varies by browser)
- Synchronous operations - acceptable for small datasets
- Consider pagination if item count exceeds 1000

**Future (SQL Database):**
- Implement pagination for large datasets
- Add caching strategies
- Optimize database queries with indexes
- Consider lazy loading for images

---

## Resources and References

### Documentation Links

- [To be added as project develops]

### External Dependencies

- [To be listed as dependencies are added]

### Team Contacts

- [To be added if applicable]

---

## Maintenance Notes

### Regular Maintenance Tasks

- [ ] Update dependencies monthly
- [ ] Review and close stale issues
- [ ] Update documentation
- [ ] Run security audits
- [ ] Review and optimize performance

### Version History

- **v0.2.0** (2025-11-14): Updated with React tech stack
  - Specified React + JSX + LocalStorage stack
  - Added detailed data model guidelines for SQL compatibility
  - Included localStorage service pattern examples
  - Added React-specific coding standards for junior developers
  - Documented future migration path to Java backend
  - Added testing guidelines for React Testing Library

- **v0.1.0** (2025-11-14): Initial CLAUDE.md creation
  - Created comprehensive template for AI assistant guidance
  - Established coding standards and workflows
  - Set up project structure guidelines

---

## Quick Reference

### File References Format

When discussing code, use: `file_path:line_number`
Example: `src/services/api.ts:145`

### Important Commands

```bash
# Git operations
git status                          # Check working directory status
git diff                           # View changes
git add <files>                    # Stage changes
git commit -m "type: message"      # Commit changes
git push -u origin <branch>        # Push to remote

# React Development
npm install                        # Install dependencies
npm start                          # Start development server (http://localhost:3000)
npm test                          # Run tests in watch mode
npm run build                     # Create production build
npm run lint                      # Run linter (if configured)

# Testing
npm test -- --coverage            # Run tests with coverage report
npm test -- ComponentName         # Run specific test file

# Useful utilities
npx serve -s build                # Serve production build locally
npm outdated                      # Check for outdated dependencies
npm audit                         # Check for security vulnerabilities
```

---

## Notes for Future Updates

This document should be updated whenever:
- Project technology stack is chosen
- New architectural patterns are established
- Major features are added
- Development workflows change
- New team conventions are adopted

**Keep this file current and comprehensive to maximize AI assistant effectiveness!**
