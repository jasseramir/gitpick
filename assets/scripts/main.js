// Entry point of the app
// Flow:
// 1. User selects language
// 2. getRepo() fetches data
// 3. renderPage() updates UI
import { list, renderPage } from './ui.js';
import { syncSearchButton } from './utils.js';
import { getRepo } from './data.js';

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