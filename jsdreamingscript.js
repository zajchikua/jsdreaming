// Function to load artworks and display their IDs with links
function loadArtworksPage() {
    const apiUrl = 'https://api.artic.edu/api/v1/artworks?limit=50';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayArtworks(data))
        .catch(error => console.error('Error fetching artworks:', error));
}

// Function to display artworks
function displayArtworks(data) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Clear existing content

    data.data.forEach(artwork => {
        const artworkLink = document.createElement('a');
        artworkLink.href = `https://api.artic.edu/api/v1/artworks/${artwork.id}`;
        artworkLink.textContent = artwork.id;
        artworkLink.classList.add('artwork-link');
        mainContent.appendChild(artworkLink);
        mainContent.appendChild(document.createElement('br'));
    });
}

// Call loadArtworksPage() function when the page is loaded
window.onload = loadArtworksPage;
