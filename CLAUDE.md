# CLAUDE.md - AI Assistant Development Guide

## Project Overview

**Project Name:** Pottery
**Repository:** SrmTech-git/Pottery
**Status:** Initial Setup Phase
**Last Updated:** 2025-11-14

### Purpose
This document serves as a comprehensive guide for AI assistants (like Claude) working on the Pottery codebase. It outlines project structure, development workflows, coding conventions, and best practices.

---

## Repository Structure

```
Pottery/
├── .git/                    # Git repository metadata
├── CLAUDE.md               # This file - AI assistant guide
├── README.md               # Project documentation (to be created)
├── .gitignore              # Git ignore patterns (to be created)
└── [Project files to be added]
```

### Expected Directory Structure

As the project develops, consider organizing code into:

```
├── src/                    # Source code
│   ├── components/        # Reusable components
│   ├── services/          # Business logic and API services
│   ├── utils/             # Utility functions
│   ├── models/            # Data models/types
│   └── config/            # Configuration files
├── tests/                 # Test files
├── docs/                  # Additional documentation
├── scripts/               # Build and utility scripts
└── public/                # Static assets (if web project)
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

**To be defined based on project language:**

- Indentation: [tabs/spaces, size]
- Line length: [max characters]
- Naming conventions:
  - Variables: `camelCase` or `snake_case`
  - Classes: `PascalCase`
  - Constants: `UPPER_CASE`
  - Files: `kebab-case` or `PascalCase`

---

## Testing Strategy

### Test Coverage Goals

- Aim for 80%+ code coverage
- All new features must include tests
- Critical paths require comprehensive testing

### Test Types

1. **Unit Tests**
   - Test individual functions/methods
   - Mock external dependencies
   - Fast execution

2. **Integration Tests**
   - Test component interactions
   - Test API endpoints
   - Database operations

3. **End-to-End Tests**
   - Test complete user workflows
   - Critical business processes

### Running Tests

```bash
# To be defined based on testing framework
# Examples:
# npm test
# pytest
# cargo test
```

---

## Dependencies and Package Management

### Installing Dependencies

```bash
# To be defined based on project type
# Examples:
# npm install
# pip install -r requirements.txt
# cargo build
```

### Adding New Dependencies

1. Evaluate necessity and alternatives
2. Check license compatibility
3. Review security vulnerabilities
4. Document why dependency is needed
5. Update dependency file
6. Update documentation

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

## Database Schema

### Migrations

- Always create migration files for schema changes
- Never modify existing migrations
- Test migrations on development before production

### Data Models

Document key data models and relationships:

```
[To be defined as models are created]
```

---

## Build and Deployment

### Development Build

```bash
# To be defined
# Examples:
# npm run dev
# python manage.py runserver
# cargo run
```

### Production Build

```bash
# To be defined
# Examples:
# npm run build
# python setup.py build
# cargo build --release
```

### Deployment Process

1. Run all tests
2. Create production build
3. Run deployment scripts
4. Verify deployment
5. Monitor for errors

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

**To be determined as project develops**

Potential stacks based on project needs:
- Frontend: React, Vue, Angular, Svelte
- Backend: Node.js, Python (Django/Flask), Ruby (Rails), Go, Rust
- Database: PostgreSQL, MySQL, MongoDB, SQLite
- Testing: Jest, Pytest, Mocha, etc.

### Key Features

**To be documented as features are implemented**

### Known Issues

**To be tracked as issues are discovered**

### Performance Considerations

**To be documented based on project requirements**

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

# Development (to be updated)
# [build command]
# [test command]
# [lint command]
# [format command]
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
