const list = document.getElementById('langList');
const viewCard = document.getElementById('viewCard');
const search = document.getElementById('searchBtn');

function syncSearchButton() {
    search.disabled = list.value === '';
}

async function getRepo(value) {
    if (value === '') {
        renderPage('empty');
        return;
    }
    try {
        const randomPage = Math.floor(Math.random() * 5) + 1;
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
        renderPage('failed');
    }
}

function getLangColor(value) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'C': '#555555',
        'C++': '#f34b7d',
        'TypeScript': '#3178c6',
        'Java': '#b07219',
        'C#': '#178600',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'PHP': '#4F5D95',
        'Swift': '#F05138',
        'Kotlin': '#A97BFF',
        'Ruby': '#701516'
    };
    return colors[value] || '#8b949e';
}

function renderPage(repo) {
    search.disabled = list.value === '';
    search.classList.remove('failed-btn');
    viewCard.classList.remove('no-result', 'loading', 'failed', 'success-card');
    
    switch (repo) {
        case 'empty':
            viewCard.innerHTML = '<p>Please select a language</p>';
            viewCard.classList.add('no-result');
            search.textContent = 'Search';
            break;
        
        case 'loading':
            viewCard.innerHTML = '<p>Loading... Please wait</p>';
            viewCard.classList.add('loading');
            search.disabled = true;
            break;
        
        case 'failed':
            viewCard.innerHTML = '<p style="line-height: 1.5">Error fetching the data. <br> Wait a little while, then try again</p>';
            viewCard.classList.add('failed');
            search.textContent = 'Click to retry';
            search.classList.add('failed-btn');
            search.disabled = false;
            break;
        
        default:
            viewCard.innerHTML = `
            <h3></h3>
            <p class="desc"></p>
            <div class="repo-info">
              <div class="info-container">
                <i class="ri-circle-fill info-icon"></i> <p class="language"></p>
              </div>

              <div class="info-container">
                <i class="ri-star-fill info-icon"></i> <p class="stars"></p>
              </div>
        
              <div class="info-container">
                <i class="ri-git-fork-line info-icon"></i> <p class="forks"></p>
              </div>
        
              <div class="info-container">
                <i class="ri-spam-2-line info-icon"></i> <p class="issues"></p>
              </div>
            </div>
            
            <a class="visit-btn" target="_blank">Get in touch <i class="ri-external-link-line"></i></a>
            `;
            viewCard.querySelector('h3').textContent = repo.name;
            viewCard.querySelector('.desc').textContent = repo.description || 'No description.';
            viewCard.querySelector('.visit-btn').href = repo.html_url;
            const langColor = getLangColor(repo.language);
            viewCard.querySelector('.ri-circle-fill').style.color = langColor;
            viewCard.querySelector('.language').textContent = repo.language || 'Unknown';
            viewCard.querySelector('.stars').textContent = repo.stargazers_count;
            viewCard.querySelector('.forks').textContent = repo.forks_count;
            viewCard.querySelector('.issues').textContent = repo.open_issues_count;
            viewCard.classList.add('success-card');
            search.textContent = 'Refresh';
            search.disabled = false;
            break;
    }
}

renderPage('empty');
syncSearchButton();

search.addEventListener('click', () => {
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