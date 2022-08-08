# Mission to Mars

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This is React frontend application done as task for EY intership. The application include routing, custom styling and communication with external API.
At this moment, application has three pages: Home, Privacy Notes & Terms and Conditions, and external API is used for the carousel on the Home page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][react.js]][react-url]
- [![Axios][axios]][axios-url]
- [![Sass][sass]][sass-url]

<!-- GETTING STARTED -->

## Getting Started

To get started you need to get a local copy up and running follow these simple example steps.

### Installation

1. Get a free API Key at [https://api.nasa.gov/](https://api.nasa.gov/)
2. Clone the repo
   ```sh
   git clone https://github.com/vanja-cvetkovic-ey/Mission-to-Mars/
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create .env file
5. Enter your API in `.env`
   ```js
   REACT_APP_IMAGES_APIKEY= = 'ENTER YOUR API';
   ```
6. To change the number of images you want to see in carousel go to
   `components/Carousel.jsx` , current amount is 16.
   ```js
   const IMAGES_COUNT = 16;
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: /mission_to_mars/public/screenshots/Screenshot_1.png
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[axios]: https://img.shields.io/badge/Axios-563D7C?style=for-the-badge&logo=axios&logoColor=white
[axios-url]: https://axios-http.com/docs/intro
[sass]: https://img.shields.io/badge/sass-11132A?style=for-the-badge&logo=sass&logoColor=6188FB
[sass-url]: https://axios-http.com/docs/intro
