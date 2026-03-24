// This function is used to get the data
async function getRepo(value) {
    if (value === '') {
        renderPage('empty');
        return;
    }
    
    try {
        const randomPage = Math.floor(Math.random() * 10) + 1;
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${value}&sort=stars&order=desc&per_page=100&page=${randomPage}`);
        
        if (!response.ok) {
            renderPage('failed');
            return;
        }
        
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.items.length);
            renderPage(data.items[randomIndex]);
        } else {
            renderPage('failed');
        }
    } catch(err) {
        console.error('Error fetching repository data:', err);
        renderPage('failed');
    }
}