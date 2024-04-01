// Function to load artworks page
function loadArtworksPage() {
    // Redirect to the artworks page
    window.open('artworks.html', '_blank');
}

// Fetch artworks from the API
function fetchArtworks(pageNumber) {
    const limit = 50;
    const offset = (pageNumber - 1) * limit;
    const apiUrl = `https://api.artic.edu/api/v1/artworks?limit=${limit}&offset=${offset}`;
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data);
}

// Function to display artworks on the page
function displayArtworks(artworks) {
    const artworksContainer = document.getElementById('artworks-container');
    artworksContainer.innerHTML = ''; // Clear existing content

    artworks.forEach(artwork => {
        const artworkLink = document.createElement('a');
        artworkLink.href = `artwork-details.html?id=${artwork.id}`;
        artworkLink.textContent = artwork.title;
        artworkLink.classList.add('artwork-link');
        artworkLink.addEventListener('click', function(event) {
            event.preventDefault();
            fetchArtworkDetails(artwork.id);
        });
        artworksContainer.appendChild(artworkLink);
        artworksContainer.appendChild(document.createElement('br'));
    });
}

/// Function to fetch artwork details
 function fetchArtworkDetails(artworkId) {
     const apiUrl = `https://api.artic.edu/api/v1/artworks/${artworkId}`;
     return fetch(apiUrl)
         .then(response => response.json())
         .then(data => {
             const artwork = data.data;
             displayArtworkDetails(artwork);
         })
         .catch(error => console.error('Error fetching artwork details:', error));
 }

 // Function to display artwork details on a new page
 function displayArtworkDetails(artwork) {
     const imageBaseUrl = `https://www.artic.edu/iiif/2`;
     const imageUrl = `${imageBaseUrl}/${artwork.image_id}/full/843,/0/default.jpg`;

     const newPage = window.open('', '_blank');
     newPage.document.write(`
         <html>
             <head>
                 <title>${artwork.title}</title>
             </head>
             <body>
                 <h1>${artwork.title}</h1>
                 <img src="${imageUrl}" alt="${artwork.title}">
                 <p>Artist: ${artwork.artist_title}</p>
                 <p>Date: ${artwork.date_display}</p>
                 <p>Medium: ${artwork.medium}</p>
                 <!-- Add more fields here -->
             </body>
         </html>
     `);
     newPage.document.close();
 }

// Function to display pagination links
function displayPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear existing content

    // Create pagination links
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = `jsdreaming.html?page=${i}`;
        pageLink.textContent = i;
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        paginationContainer.appendChild(pageLink);
        if (i < totalPages) {
            paginationContainer.appendChild(document.createTextNode(', '));
        }
    }
}

// Handle page load
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;

    fetchArtworks(page)
        .then(data => {
            const totalPages = Math.ceil(data.pagination.total / 50); // Assuming 'total' or 'pagination.total' is the total count of artworks
            displayArtworks(data.data);
            displayPagination(totalPages, page);
        })
        .catch(error => console.error('Error fetching artworks:', error));
}
