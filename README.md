# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Result

- The user can view the optimal layout for the page for most used widths (more details below)
- The user can shorten any valid URL to https://shooort.eu/123abc, where 123abc is 3 chars path that is randomly created for each link
- Server checks if the URL to shorten is already in the database - and then provides already shortened link.
- Server checks if the shortened URL is unique. If not, it will generate a different path.
- The array of shortened URLs is stored in the local storage so that the user can view previously shortened URLs
- The user can delete the shortened link from the array in local storage
- The user can copy the shortened link to their clipboard in a single click
- The user receives an error message when the `form` is submitted if:
  - The `input` field is empty
  - The provided input have any space or %20
  - The provided link does not contain the https:// or http:// protocol
  - The provided input is not a link
  - The provided link is already shortened and displayed on the list in the local storage
  - The provided link is already shortened (is in the shooort.eu domain)

### Links

- Solution URL: [https://github.com/SlawekZet/FEM-Shortly-repository](https://github.com/SlawekZet/FEM-Shortly-repository)
- Live Site URL: [https://shooort.eu/](https://shooort.eu/)
- Express.JS server: [https://github.com/SlawekZet/Render-express.js-server](https://github.com/SlawekZet/Render-express.js-server)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Typescript
- CSS Modules
- React Router
- [React](https://reactjs.org/) - JS library
- [Express.js](https://expressjs.com/) - node.js framework
- [mongoDB](https://www.mongodb.com/) - database provider
- [Netlify](https://www.netlify.com/) - to deploy page
- [Render](https://render.com/) - to deploy Express.js server

### Prepared for widths:

- 1440px+
- 1440px
- 1024px
- 768px (tablet)
- 425-320px (mobile)

### What I learned

I needed to learn the basics of Express.JS to set up my own server that would cover both shortening the links and redirecting from shortened links.

### Useful resources

- [Node.JS Tutorial](https://youtu.be/fBNz5xF-Kx4) - Really nice tutorial, that helped me understand the basics of node.js
- [Express.JS Tutorial](https://youtu.be/L72fhGm1tfE) - The same but for express.js
- [Render](https://render.com/) - very user-friendly app to deploy the server.

## Author

- Frontend Mentor - [@SlawekZet](https://www.frontendmentor.io/profile/SlawekZet)
