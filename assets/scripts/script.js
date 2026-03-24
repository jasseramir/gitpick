const list = document.getElementById('langList'); // The Select Element
const viewCard = document.getElementById('viewCard'); // The Output
const searchBtn = document.getElementById('searchBtn'); // The Interactive Button

// Enable or disable the search button based on selection
function syncSearchButton() {
    searchBtn.disabled = list.value === '';
}

// This function is used to format big numbers
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}

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

// Map programming language names to their official brand colors
function getLangColor(value) {
    const unknown = '#8b949e';
    if (!value) return unknown;
    
    const colors = {
        'javascript': '#f1e05a',
        'python': '#3572A5',
        'c': '#555555',
        'c++': '#f34b7d',
        'typescript': '#3178c6',
        
        'java': '#b07219',
        'c#': '#178600',
        'go': '#00ADD8',
        'rust': '#dea584',
        'php': '#4F5D95',
        
        'swift': '#F05138',
        'kotlin': '#A97BFF',
        'ruby': '#701516',
        'dart': '#00B4AB',
        'scala': '#c22d40',
        
        'shell': '#89e051',
        'html': '#e34c26',
        'css': '#563d7c',
        'objective-c': '#438eff',
        'objective-c++': '#6866fb',
        
        'r': '#198CE7',
        'matlab': '#e16737',
        'groovy': '#e69f56',
        'powershell': '#012456',
        'elixir': '#6e4a7e',
        
        'clojure': '#db5855',
        'haskell': '#5e5086',
        'lua': '#000080',
        'perl': '#0298c3'
    };
    
    // Return a default gray color if color is not found
    return colors[value?.toLowerCase()] || unknown;
}

// This function is used to render new changes on the page
function renderPage(repo) {
    searchBtn.disabled = list.value === '';
    searchBtn.classList.remove('failed-btn');
    viewCard.classList.remove('empty-selection-card', 'loading-card', 'failed-card', 'success-card');
    
    switch (repo) {
        case 'empty':
            viewCard.innerHTML = '<p>Please select a language</p>';
            viewCard.classList.add('empty-selection-card');
            searchBtn.textContent = 'Search';
            break;
        
        case 'loading':
            viewCard.innerHTML = `
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text-last"></div>
            <div class="repo-info">
              <div class="skeleton skeleton-info"></div>
            </div>
            <div class="skeleton skeleton-btn"></div>
            `
            viewCard.classList.add('loading-card');
            searchBtn.disabled = true;
            break;
        
        case 'failed':
            viewCard.innerHTML = '<p>Error fetching the data. <br> Wait a little while, then try again</p>';
            viewCard.classList.add('failed-card');
            searchBtn.textContent = 'Retry';
            searchBtn.classList.add('failed-btn');
            searchBtn.disabled = false;
            break;
        
        default:
            viewCard.innerHTML = `
            <h3></h3>
            <p class="desc"></p>
            <div class="repo-info">
              <div class="info-container">
                <i class="ri-circle-fill info-icon"></i> <p class="language">${repo.language || 'Unknown'}</p>
              </div>

              <div class="info-container">
                <i class="ri-star-fill info-icon"></i> <p class="stars">${formatNumber(repo.stargazers_count)}</p>
              </div>
        
              <div class="info-container">
                <i class="ri-git-fork-line info-icon"></i> <p class="forks">${formatNumber(repo.forks_count)}</p>
              </div>
        
              <div class="info-container">
                <i class="ri-spam-2-line info-icon"></i> <p class="issues">${formatNumber(repo.open_issues_count)}</p>
              </div>
            </div>
            
            <a class="visit-btn" href="${repo.html_url}" target="_blank">View Repository <i class="ri-external-link-line"></i></a>
            `;
            console.log(repo.language)
            viewCard.querySelector('h3').textContent = repo.name;
            viewCard.querySelector('.desc').textContent = repo.description || 'No description.';
            const langColor = getLangColor(repo.language);
            viewCard.querySelector('.ri-circle-fill').style.color = langColor;
            viewCard.classList.add('success-card');
            searchBtn.textContent = 'Refresh';
            searchBtn.disabled = false;
            break;
    }
}

// We should use it at least once when the page loads
renderPage('empty');

// Events
searchBtn.addEventListener('click', () => {
    if (list.value === '') {
        renderPage('empty');
        return;
    }

    renderPage('loading');
    getRepo(list.value);
});

list.addEventListener('change', syncSearchButton);

window.addEventListener('pageshow', () => {
    syncSearchButton();
});