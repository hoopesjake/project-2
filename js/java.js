
















































// scroller at top of page
document.addEventListener('DOMContentLoaded', function () {
    const scrollerInner = document.querySelector('.scroller__inner');

    const imageUrls = [
        "https://a.espncdn.com/i/teamlogos/nba/500/atl.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/bkn.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/cha.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/chi.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/cle.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/dal.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/den.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/det.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/hou.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/ind.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/lac.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/mem.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/mia.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/mil.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/min.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/no.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/ny.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/okc.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/orl.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/phi.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/phx.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/por.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/sac.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/sa.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/tor.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/utah.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/wsh.png"
    ];

    function populateScroller() {
        imageUrls.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'NBA Team Logo';
            scrollerInner.appendChild(img.cloneNode(true));
        });
    }

    populateScroller();

    scrollerInner.addEventListener('animationiteration', () => {
        const images = scrollerInner.querySelectorAll('img');
        images.forEach(img => {
            scrollerInner.appendChild(img.cloneNode(true));
        });
    });
});

// search player
function searchJSON() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const searchResultsContainer = document.getElementById('searchResults');

    fetch('https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData')
        .then(response => response.json())
        .then(data => {
            let foundPlayer = null;
            Object.values(data).some(team => {
                const players = Object.values(team.roster);
                foundPlayer = players.find(player => player.name.toLowerCase() === searchInput);
                return foundPlayer;
            });


            searchResultsContainer.innerHTML = '';

            if (foundPlayer) {
                const { name, height, weight, age, birthplace, jersey, position_full } = foundPlayer;
                searchResultsContainer.innerHTML = `
                    <h3>${name}</h3>
                    <p><strong>Position:</strong> ${position_full}</p>
                    <p><strong>Jersey Number:</strong> ${jersey}</p>
                    <p><strong>Height:</strong> ${height}</p>
                    <p><strong>Weight:</strong> ${weight}</p>
                    <p><strong>Age:</strong> ${age}</p>
                    <p><strong>Birthplace:</strong> ${birthplace}</p>
                `;
            } else {
                searchResultsContainer.textContent = 'Player not found.';
            }
        });
}



// search team

// clear search function
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResultsContainer = document.getElementById('searchResults');

    // Clear search input
    searchInput.value = '';

    // Clear search results container
    searchResultsContainer.innerHTML = '';
}