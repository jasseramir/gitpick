# GitPick

GitPick is a web-based application that helps developers discover interesting open-source projects on GitHub.  
It uses the GitHub Search API to provide a randomized selection of repositories based on a chosen programming language.

---

## ✨ Features

- **Language Filtering:** Select a programming language (e.g. JavaScript, Python, C, C++, etc.) to find relevant repositories.
- **Randomized Discovery:** Fetches a diverse range of repositories to encourage exploration of new projects.
- **Repository Insights:** Displays essential repository metadata such as:
    - ⭐ Stars
    - 🍴 Forks
    - 🐞 Open Issues
- **Responsive Design:** A clean, modern user interface optimized for both desktop and mobile devices.

---

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3  
- **JavaScript:** ES6+ (Async / Fetch API)  
- **API:** GitHub REST API  
- **Icons:** Remix Icon

---

## 🚀 Getting Started

### Prerequisites

To run this project locally, you only need a modern web browser.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jasseramir/gitpick.git
   ```
2. Navigate to the project directory:
    ```bash
    cd gitpick
    ```
3. Open ```index.html``` in your browser.

---

## 📁 Project Structure

index.html                 # Main structure of the app
assets/styles/styles.css   # UI & layout styling
assets/scripts/script.js  # Logic and API handling

---

## ⚠️ Notes

• GitHub API has rate limits for unauthenticated requests.
If you exceed the limit, the app may temporarily stop working.

---

## 📃 Licence

This project is licensed under the **MIT** License.