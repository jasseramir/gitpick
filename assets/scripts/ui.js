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