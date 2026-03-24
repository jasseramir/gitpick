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