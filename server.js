const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization header' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // In production, use a secure method to validate tokens
    if (token !== process.env.ADMIN_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    next();
};

// Route to fetch cases by advocate name
app.post('/api/cases/search', authenticateAdmin, async (req, res) => {
    try {
        const { advocateName } = req.body;
        
        if (!advocateName) {
            return res.status(400).json({ error: 'Advocate name is required' });
        }

        // URL of the Mahabubnagar court search page
        const searchUrl = 'https://mahabubnagar.dcourts.gov.in/case-status-search-by-advocate/';
        
        // First, get the search page to extract any CSRF tokens or form data
        const searchPageResponse = await axios.get(searchUrl);
        const $ = cheerio.load(searchPageResponse.data);
        
        // Extract form action and any hidden fields
        const form = $('form[method="post"]');
        const action = form.attr('action') || searchUrl;
        const formData = {};
        
        // Collect hidden form fields
        form.find('input[type="hidden"]').each((index, element) => {
            const name = $(element).attr('name');
            const value = $(element).val();
            if (name) {
                formData[name] = value;
            }
        });
        
        // Add the advocate name to the form data
        // Common field names for advocate search forms
        const possibleFieldNames = ['advocate_name', 'advocateName', 'advocate', 'search_advocate', 'adv_name'];
        let foundFieldName = false;
        
        for (const fieldName of possibleFieldNames) {
            if (form.find(`input[name="${fieldName}"]`).length > 0) {
                formData[fieldName] = advocateName;
                foundFieldName = true;
                break;
            }
        }
        
        // If we didn't find a matching field name, try to find any text input field
        if (!foundFieldName) {
            const textInput = form.find('input[type="text"]').first();
            if (textInput.length > 0) {
                const name = textInput.attr('name');
                if (name) {
                    formData[name] = advocateName;
                    foundFieldName = true;
                }
            }
        }
        
        if (!foundFieldName) {
            return res.status(400).json({ error: 'Could not find advocate name input field on the search form' });
        }
        
        // Submit the form
        const searchResponse = await axios({
            method: 'POST',
            url: action.startsWith('http') ? action : new URL(action, searchUrl).href,
            data: new URLSearchParams(formData).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': searchUrl
            }
        });
        
        // Parse the search results
        const result$ = cheerio.load(searchResponse.data);
        const cases = [];
        
        // Look for table rows containing case information
        result$('table tr').each((index, row) => {
            if (index === 0) return; // Skip header row
            
            const cells = result$(row).find('td');
            if (cells.length >= 5) { // Assuming at least 5 columns of case info
                const caseInfo = {
                    srNo: result$(cells[0]).text().trim(),
                    caseNumber: result$(cells[1]).text().trim(),
                    filingDate: result$(cells[2]).text().trim(),
                    status: result$(cells[3]).text().trim(),
                    category: result$(cells[4]).text().trim(),
                    partyName: result$(cells.length > 5 ? cells[5] : cells[1]).text().trim()
                };
                
                // Only add if we have meaningful data
                if (caseInfo.caseNumber) {
                    cases.push(caseInfo);
                }
            }
        });
        
        // Alternative parsing for different table structures
        if (cases.length === 0) {
            // Look for other common patterns in court websites
            result$('.case-list-item, .result-row, .court-case, [id*="case"], [class*="case"]').each((index, element) => {
                const item$ = result$(element);
                
                // Try to extract case information from various possible formats
                const caseInfo = {
                    caseNumber: item$.find('[data-field="caseno"], [data-field="cino"], .case-no, .case-number, [id*="caseno"]').first().text().trim() ||
                                item$.find('td:contains("Case No"), td:contains("Case Number")').next().text().trim() ||
                                '',
                    filingDate: item$.find('[data-field="filingdate"], .filing-date, .date').first().text().trim() ||
                                 item$.find('td:contains("Filing Date")').next().text().trim() ||
                                 '',
                    status: item$.find('[data-field="status"], .status').first().text().trim() ||
                             item$.find('td:contains("Status")').next().text().trim() ||
                             '',
                    category: item$.find('[data-field="category"], .category, .type').first().text().trim() ||
                               item$.find('td:contains("Category")').next().text().trim() ||
                               '',
                    partyName: item$.find('[data-field="parties"], .parties, .petitioner, .respondent').first().text().trim() ||
                               ''
                };
                
                if (caseInfo.caseNumber) {
                    cases.push(caseInfo);
                }
            });
        }
        
        res.json({
            success: true,
            advocateName: advocateName,
            totalCases: cases.length,
            cases: cases
        });
        
    } catch (error) {
        console.error('Error fetching cases:', error);
        
        if (error.response?.status === 404) {
            return res.status(404).json({ error: 'Court search page not found' });
        } else if (error.response?.status === 403) {
            return res.status(403).json({ error: 'Access forbidden - court website may be blocking automated requests' });
        } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            return res.status(500).json({ error: 'Unable to connect to court website' });
        }
        
        res.status(500).json({ 
            error: 'Internal server error', 
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
});