function loadArtworksPage()
{
//Issue a GET request to ARTIC for a list of artworks
fetch('https://api.artic.edu/api/v1/artworks')
    .then(response => response.json())
    .then(data => {
    //build HTML content for artwork page
    let artPage = '<h2>Artwork information page</h2>'
    data.results.forEach(artwork => {
        artworkPage += '<p>Artwork title: ${artwork.title}</p>'
    });
    //content of the main section
    document.getElementById('main-content').innerHTML = artPage;
    })
    .catch(error => console.error('Error fetching artwork data: ', error));
}


function loadImagesPage()
{
//Issue a GET request to ARTIC for a list of images of the artworks
fetch('https://api.artic.edu/api/v1/images')
}

