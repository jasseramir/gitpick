import { formatNumber, isObject } from './utils.js';
import { getLangColor } from './colors.js'

// It is exported to use it in main.js and utils.js
export const list = document.getElementById('langList'); // The Select Element

const [firstOption, ...restOptions] = Array.from(list.options); // Separating the default option
const viewCard = document.getElementById('viewCard'); // The Output
const searchBtn = document.getElementById('searchBtn'); // The Interactive Button

// This function is used to sort options
// Disclaimer: use it only for options in any select elements
function sortOptions(selectList) {
    return selectList.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
}

// Sorting
list.innerHTML = ''; // 1. Make the select empty
list.appendChild(firstOption); // 2. Add the default option
sortOptions(restOptions).forEach(option => {
    list.appendChild(option); // 3. Add sorted options
});

// This function is used to render new changes on the page
export function renderPage(repo) {
    searchBtn.disabled = list.value === '';
    searchBtn.classList.remove('failed-btn');
    viewCard.classList.remove('empty-selection-card', 'loading-card', 'failed-card', 'success-card');
    
    if (isObject(repo) && repo.type) {
        viewCard.classList.add('failed-card');
        searchBtn.textContent = 'Retry';
        searchBtn.classList.add('failed-btn');
        searchBtn.disabled = false;
        
        if (repo?.type === 'fetchingError') {
            viewCard.innerHTML = '<p>Error fetching the data. <br> Wait a little while, then try again</p>';
            return;
        } else if (repo?.type === 'abortError') {
            viewCard.innerHTML = '<p>Request timed out. <br> Check your connection, then try again</p>';
            return;
        } else if (repo?.type === 'emptyResultErr') {
            viewCard.innerHTML = '<p>There is no result for now<br> Wait a little while, then try again</p>';
            return;
        }
    }
    
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
        
        default:
            viewCard.innerHTML = `
            <h3></h3>
            <p class="desc"></p>
            <div class="repo-info">
              <div class="info-container">
                <i class="ri-circle-fill info-icon" style="color: ${getLangColor(repo.language)};"></i> <p class="language">${repo.language || 'Unknown'}</p>
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
            viewCard.classList.add('success-card');
            searchBtn.textContent = 'Refresh';
            searchBtn.disabled = false;
            break;
    }
}