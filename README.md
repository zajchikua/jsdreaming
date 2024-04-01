# jsdreaming

Place the JavaScript code in a file named jsdreamingscript.js in the same directory as the HTML file. 
When you open the HTML file in a web browser, it will fetch data from the ARTIC API and display the artwork information on the page.


# Artworks Webpage

This project allows you to browse artworks from the Art Institute of Chicago's collection.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (https://nodejs.org/) installed on your machine

### Installing

1. Clone the repository to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd jsdreaming
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Running the Webpage

1. Start the development server:

    ```bash
    npm start
    ```

2. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the webpage.

## Usage

- Click on the "Artworks List" link to view a list of artworks.
- Click on an artwork title to view its details, including image, title, ID, and additional information.

## Built With

- HTML
- CSS
- JavaScript
- Fetch API

## Acknowledgments

- This project uses the Art Institute of Chicago's [API](https://api.artic.edu/) to retrieve artwork data.
- Pagination logic adapted from [here](https://stackoverflow.com/questions/22698605/fetch-api-and-pagination).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
