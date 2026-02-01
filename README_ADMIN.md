# Admin Panel - Court Case Search System

This system allows administrators to search for court cases by advocate name from the Mahabubnagar District Courts website.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure the admin token in `.env` file:
```env
ADMIN_TOKEN=your_secure_admin_token_here
```

3. Start the server:
```bash
npm start
```

## Usage

1. Access the admin panel at `http://localhost:3000/admin.html`
2. Enter the advocate name (e.g., "T Venkat Rama Sharma")
3. Click "Search Cases" to retrieve case information
4. View the results in a formatted table

## Security

- The system uses token-based authentication to restrict access to authorized administrators only
- The admin token should be kept secret and changed regularly
- All inputs are sanitized to prevent XSS attacks

## Features

- Real-time scraping of Mahabubnagar District Courts website
- Secure admin authentication
- Responsive design for desktop and mobile
- Error handling for network issues
- Case information display (Case Number, Filing Date, Status, Category, Party Names)

## Important Notes

- This system scrapes data from the official court website. Please use responsibly and comply with the website's terms of service
- The court website may implement anti-scraping measures that could affect functionality
- Always verify critical legal information directly with the court authorities

## Troubleshooting

If you encounter issues:
1. Check that the court website is accessible
2. Verify your admin token is correct
3. Check the server logs for specific error messages
4. Ensure your IP address is not blocked by the court website