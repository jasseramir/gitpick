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