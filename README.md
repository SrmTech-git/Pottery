# Pottery Management System

A demo pottery management tool built with React, designed to help manage pottery inventory, track items, and demonstrate best practices in modern web development.

## About

Pottery is a user-friendly inventory management system for pottery businesses and studios. Built with simplicity and maintainability in mind, this project serves as an educational example of clean React development suitable for junior developers.

### Key Features

- 🏺 Pottery inventory management
- ✏️ Add, edit, and delete pottery items
- 📋 View pottery catalog
- 📊 Track inventory quantities
- 🔍 Search and filter functionality
- 📱 Responsive design for mobile and desktop

### Technology Stack

- **Frontend:** React 18+ with JSX
- **State Management:** React Context API + Hooks
- **Data Storage:** Browser LocalStorage
- **Testing:** Jest + React Testing Library
- **Styling:** CSS (plain CSS or CSS Modules)

**Future Enhancements:** Migration path to Java backend with SQL database

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Pottery

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm start

# Open http://localhost:3000 in your browser
# The app will automatically reload when you make changes
```

### Testing

```bash
# Run tests in watch mode
npm test

# Run tests with coverage report
npm test -- --coverage
```

### Building for Production

```bash
# Create optimized production build
npm run build

# The build folder will contain the production-ready files
```

## Project Structure

```
Pottery/
├── public/              # Static files
├── src/
│   ├── components/     # React components
│   │   ├── common/    # Reusable components
│   │   ├── pottery/   # Pottery-specific components
│   │   └── layout/    # Layout components
│   ├── services/      # Business logic & localStorage services
│   ├── models/        # Data models and types
│   ├── utils/         # Utility functions
│   ├── hooks/         # Custom React hooks
│   ├── context/       # React Context providers
│   ├── App.jsx        # Main App component
│   └── index.jsx      # Entry point
└── tests/             # Test files
```

See [CLAUDE.md](CLAUDE.md) for detailed development guidelines and architectural decisions.

## Data Storage

Currently using browser **LocalStorage** for data persistence. All data models are designed to be SQL-compatible for future migration to a relational database.

### Future Migration Path

This project is designed with scalability in mind:

1. **Current:** React + LocalStorage (demo/prototype phase)
2. **Future:** React + Java (Spring Boot) backend + SQL database

Data models follow SQL-compatible patterns to ensure smooth migration when ready.

## Code Philosophy

This project emphasizes **code readability for junior developers**:

- Clear, descriptive variable and function names
- Explanatory comments for learning purposes
- Simple, explicit code over clever solutions
- Gradual introduction of React concepts
- Well-documented examples

## Contributing

### For AI Assistants

If you're an AI assistant working on this project, please read [CLAUDE.md](CLAUDE.md) first for comprehensive development guidelines and project conventions.

### For Developers

1. Fork the repository
2. Create a feature branch (`feature/your-feature-name`)
3. Make your changes following the code style guide
4. Write/update tests
5. Ensure all tests pass (`npm test`)
6. Submit a pull request

**Code Style:**
- 2 spaces for indentation
- PascalCase for components
- camelCase for functions and variables
- See [CLAUDE.md](CLAUDE.md) for full style guide

## Documentation

- [CLAUDE.md](CLAUDE.md) - Comprehensive development guide for AI assistants and developers
- [Data Models](CLAUDE.md#data-storage-and-models) - Detailed data model documentation
- [Testing Guide](CLAUDE.md#testing-strategy) - Testing practices and examples

## Useful Commands

```bash
npm start              # Start development server
npm test              # Run tests
npm run build         # Create production build
npm install <package> # Add new dependency
```

## Learning Resources

This project is great for learning:
- React fundamentals (components, hooks, state)
- LocalStorage API
- React Context for state management
- Component testing with React Testing Library
- Project structure and organization

## License

To be determined.

## Contact

For questions or issues, please open an issue in the repository.

---

**Status:** Active Development
**Last Updated:** 2025-11-14
**Version:** 0.2.0
