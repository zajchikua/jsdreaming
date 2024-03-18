// Fetch artworks from the API
function fetchArtworks(pageNumber) {
    const limit = 50;
    const offset = (pageNumber - 1) * limit;
    const apiUrl = `https://api.artic.edu/api/v1/artworks?limit=${limit}&offset=${offset}`;
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data);
}

// Display artworks on the page
function displayArtworks(artworks) {
    const artworksContainer = document.getElementById('artworks-container');
    artworksContainer.innerHTML = ''; // Clear existing content

    artworks.forEach(artwork => {
        const artworkLink = document.createElement('a');
        artworkLink.href = `artwork.html?id=${artwork.id}`;
        artworkLink.textContent = artwork.id;
        artworkLink.classList.add('artwork-link');
        artworksContainer.appendChild(artworkLink);
        artworksContainer.appendChild(document.createElement('br'));
    });
}

// Display pagination links
function displayPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear existing content

    const maxPagesToShow = 5; // Maximum number of pages to display
    const pages = [];

    // Always show the first page
    pages.push(1);

    // Calculate the range of pages to display
    let startPage, endPage;
    if (totalPages <= maxPagesToShow) {
        // If total pages is less than or equal to maxPagesToShow, show all pages
        startPage = 2;
        endPage = totalPages;
    } else {
        // If total pages is more than maxPagesToShow, calculate startPage and endPage
        if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
            // If currentPage is close to the beginning
            startPage = 2;
            endPage = maxPagesToShow - 1;
        } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
            // If currentPage is close to the end
            startPage = totalPages - maxPagesToShow + 3;
            endPage = totalPages - 1;
        } else {
            // If currentPage is in the middle
            startPage = currentPage - Math.floor(maxPagesToShow / 2);
            endPage = currentPage + Math.floor(maxPagesToShow / 2) - 1;
        }
    }

    // Add page links within the range
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    // Add ellipses if necessary
    if (startPage > 2) {
        pages.splice(1, 0, '...');
    }
    if (endPage < totalPages - 1) {
        pages.splice(pages.length - 1, 0, '...');
    }

    // Always show the last page
    if (totalPages > 1) {
        pages.push(totalPages);
    }

    // Display page links
    pages.forEach((page, index) => {
        if (page === '...') {
            paginationContainer.appendChild(document.createTextNode('...'));
        } else {
            const pageLink = createPageLink(page, page);
            if (page === currentPage) {
                pageLink.classList.add('active');
            }
            paginationContainer.appendChild(pageLink);
            if (index < pages.length - 1) {
                paginationContainer.appendChild(document.createTextNode(', '));
            }
        }
    });

    // Function to create page links
    function createPageLink(text, page) {
        const pageLink = document.createElement('a');
        pageLink.href = `artworks.html?page=${page}`;
        pageLink.textContent = text;
        return pageLink;
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
};
