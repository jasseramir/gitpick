import { list } from './ui.js';

// Enable or disable the search button based on selection
export function syncSearchButton() {
    searchBtn.disabled = list.value === '';
}

// This function is used to format big numbers
export function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}

export function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}