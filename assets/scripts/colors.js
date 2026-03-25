// Map programming language names to their official brand colors
export function getLangColor(value) {
    const UNKNOWN_COLOR = '#8b949e';
    if (!value) return UNKNOWN_COLOR;
    
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
        'perl': '#0298c3',
        'assembly': '#6E4C13',
        'sql': '#e38c00'
    };
    
    // Return a default gray color if color is not found
    return colors[value?.toLowerCase()] || UNKNOWN_COLOR;
}