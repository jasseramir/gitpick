import { renderPage } from './ui.js';

// This function is used to get the data
export async function getRepo(value) {
    /*
      They will be used for displaying a message
      when the request takes too long time to be retrieved
    */
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    if (value === '') {
        renderPage('empty');
        return;
    }
    
    try {
        const MAX_PAGES = 10;
        const PER_PAGE = 100;
        const randomPage = Math.floor(Math.random() * MAX_PAGES) + 1;
        
        const query = `language:${value} archived:false`;
        const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${PER_PAGE}&page=${randomPage}`;
        
        const response = await fetch(url, { signal: controller.signal });
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
            renderPage({ type: 'emptyResultErr' });
            return;
        }
        
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.items.length);
            renderPage(data.items[randomIndex]);
        } else {
            renderPage({ type: 'emptyResultErr' });
        }
    } catch(err) {
        if (err.name === 'AbortError') {
            console.error('Request timed out');
            renderPage({ type: 'abortError' })
        }
        else {
            console.error('Error fetching repository data:', err);
            renderPage({ type: 'fetchingError' });
        }
    }
}