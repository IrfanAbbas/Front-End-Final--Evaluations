# Social Media Web App:     .Connection
FOr live demo 
https://front-end-final-evaluations.vercel.app/

user name: kminchelle
password: 0lelplR

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Goals](#project-goals)
3. [Major Tasks](#major-tasks)
   - [User Authentication](#user-authentication)
   - [Post Management](#post-management)
   - [Comment Management](#comment-management)
4. [API Scope](#api-scope)
5. [App Functionality](#app-functionality)
6. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation and Setup](#installation-and-setup)
7. [Error Handling and Debugging](#error-handling-and-debugging)
8. [Contributing](#contributing)
9. [Conclusion](#conclusion)

## Project Overview

This project creates a basic social media web application that allows users to log in, view posts, interact with posts, and browse comments. The app uses a Mock API (dummyjson.com) to simulate real-world data retrieval and user authentication.

## Features

1. **User Authentication**

   - Secure login functionality.
     -Authentication using token.
   - User data storage with a token in localStorage for session persistence.
   - Logout capability.

2. **Post Management**

   - Display initial 10 posts.
   - Implement infinite scrolling to load additional posts (10 at a time).
   - Search functionality to find posts based on keywords.

3. **Comment Management**
   - Display existing comments associated with each post.
   - Optional simulated comment system for local display.

## Technologies Used

- **Frontend:** HTML, CSS, Bootstrap, JavaScript
- **Data Storage:** localStorage (for user data), Mock API (dummyjson.com)

## Getting Started

### Prerequisites

- Code editor (e.g., VS Code)
- Basic knowledge of HTML, CSS, JavaScript
- Internet connection for fetching data from the Mock API

### Installation and Setup

1. **Clone the Repository**

   - Use `git clone` to clone the repository to your local machine.
   - Navigate to the project directory.

2. **Install Dependencies**

   - This project relies on external resources (like Bootstrap). Ensure proper network connection.

3. **Run the App**
   - Open the HTML files in a web browser to view and interact with the app.
   - Use the following URL structure for Mock API data:
     -Login:`https://dummyjson.com/auth/login`
     -Authentication:`https://dummyjson.com/auth/me`
     - Users: `https://dummyjson.com/users`
     - Posts: `https://dummyjson.com/posts`
     - Comments: `https://dummyjson.com/posts/{postId}/comments`
     - SearchPost:`https://dummyjson.com/posts/search?q=love`
       -SearchUser:`https://dummyjson.com/users/search?q=John`
       -Add Comment:`https://dummyjson.com/comments/add`
       -Update Comment:`https://dummyjson.com/comments/1`
     - Delete Comment:`https://dummyjson.com/comments/1`

## Features

### User Authentication

- **Login:** Simulate login by storing a token in localStorage upon successful login.
- **Logout:** Clear the token from localStorage to log out.
- **Session Persistence:** Check for a valid token on page load to maintain the user's session.

### Post Management

- **Initial Post Display:** Fetch and display the first 10 posts on login or page load.
- **Infinite Scrolling:** Detect when the user scrolls to the bottom of the page and load additional posts.
- **Search Functionality:** Allow users to search for posts by keyword. This feature is optional and depends on implementation.
- **Search Functionality:** Allow users to search for users by username and email. This feature is optional and depends on implementation.

### Comment Management

Due to frontend-only limitations, comments are either displayed from the Mock API or simulated for local display without modifying the actual API data.

- **Limited Comment Display:** Display existing comments from the Mock API. The app doesn't allow users to modify these comments.
- **Simulated Comment System:** Users can submit comments, but they are stored only for the current session.

## Error Handling and Debugging

- **API Errors:** Handle errors when fetching data from the Mock API, providing user-friendly messages.
- **Empty Comments:** Prevent users from posting empty comments and display a warning.
- **Logging:** Use `console.log` to debug and trace function calls and data.

- **GitHub Pages:** A simple and free option for deploying static websites.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and submit a pull request.

## Conclusion

This README outlines the structure and functionality of the social media web app project. It provides a detailed guide for setup, key features, user interaction, and other important aspects to help you navigate and contribute to the project.
