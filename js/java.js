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
function searchJSONplayer() {
    const searchInputPlayer = document.getElementById('searchInputPlayer').value.trim().toLowerCase();
    const searchResultsContainerPlayer = document.getElementById('searchResultsPlayer');

    fetch('https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData')
        .then(response => response.json())
        .then(data => {
            let foundPlayer = null;
            Object.values(data).some(team => {
                const players = Object.values(team.roster);
                foundPlayer = players.find(player => player.name.toLowerCase() === searchInputPlayer);
                return foundPlayer;
            });


            searchResultsContainerPlayer.innerHTML = '';

            if (foundPlayer) {
                const { name, height, weight, age, birthplace, jersey, position_full } = foundPlayer;
                searchResultsContainerPlayer.innerHTML = `
                    <h3>${name}</h3>
                    <p><strong>Position:</strong> ${position_full}</p>
                    <p><strong>Jersey Number:</strong> ${jersey}</p>
                    <p><strong>Height:</strong> ${height}</p>
                    <p><strong>Weight:</strong> ${weight}</p>
                    <p><strong>Age:</strong> ${age}</p>
                    <p><strong>Birthplace:</strong> ${birthplace}</p>
                `;
            } else {
                searchResultsContainerPlayer.textContent = 'Player not found.';
            }
        });
}
// search team
function searchJSONteam() {
    const searchInputTeam = document.getElementById('searchInputTeam').value.trim().toLowerCase();
    const searchResultsContainerTeam = document.getElementById('searchResultsTeam');

    fetch('https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData')
        .then(response => response.json())
        .then(data => {
            let foundTeam = null;

            // Loop through each team object in the data
            Object.values(data).some(team => {
                // Check if the current team's name matches the search input
                if (team.name.toLowerCase() === searchInputTeam) {
                    foundTeam = team;
                    return true; // Stop iteration once a match is found
                }
                return false; // Continue to the next team if no match
            });

            // Clear previous search results
            searchResultsContainerTeam.innerHTML = '';

            if (foundTeam) {
                const { name, abbreviation, logo_light, location, statistics, current_record } = foundTeam;

                // Create a table to display team information and statistics
                const tableHTML = `
                        <h3>${name} (${abbreviation})</h3>
                        <img src="${logo_light}" alt="${name} Logo" width="100">
                        <p><strong>Location:</strong> ${location}</p>
                        <p><strong>Current Record:</strong> ${current_record}</p>
                        <h3>Statistics:</h3>
                        <table>
                            <tr>
                                <th>Category</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td>${statistics.avgRebounds.displayName}</td>
                                <td>${statistics.avgRebounds.value.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>${statistics.assistTurnoverRatio.displayName}</td>
                                <td>${statistics.assistTurnoverRatio.value.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgFouls.displayName}</td>
                                <td>${statistics.avgFouls.value.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>${statistics.freeThrowPct.displayName}</td>
                                <td>${statistics.freeThrowPct.value.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>${statistics.threePointPct.displayName}</td>
                                <td>${statistics.threePointPct.value.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgPoints.displayName}</td>
                                <td>${statistics.avgPoints.value.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgAssists.displayName}</td>
                                <td>${statistics.avgAssists.value.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgTurnovers.displayName}</td>
                                <td>${statistics.avgTurnovers.value.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>${statistics.fieldGoalPct.displayName}</td>
                                <td>${statistics.fieldGoalPct.value.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgBlocks.displayName}</td>
                                <td>${statistics.avgBlocks.value.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgSteals.displayName}</td>
                                <td>${statistics.avgSteals.value.toFixed(1)}</td>
                            </tr>
                        </table>
                    `;

                searchResultsContainerTeam.innerHTML = tableHTML;
            } else {

                searchResultsContainerTeam.textContent = 'Team not found.';
            }
        });
}

function clearSearchTeam() {
    document.getElementById('searchInputTeam').value = '';
    document.getElementById('searchResultsTeam').innerHTML = '';
}

// clear search function
function clearSearchPlayer() {
    const searchInputPlayer = document.getElementById('searchInputPlayer');
    const searchResultsContainerPlayer = document.getElementById('searchResultsPlayer');

    searchInputPlayer.value = '';

    searchResultsContainerPlayer.innerHTML = '';
}

function clearSearchTeam() {
    const searchInputTeam = document.getElementById('searchInputTeam');
    const searchResultsContainerTeam = document.getElementById('searchResultsTeam');

    searchInputTeam.value = '';

    searchResultsContainerTeam.innerHTML = '';
}

// random statline
fetch('https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData')
    .then((response) => response.json())
    .then((data) => makePage(data));

function makePage(nbaData) {
    const { team, stat, number } = statOfTheDay(nbaData);
    const statlineOfDayElement = document.getElementById('statlineOfTheDay');

    // Get the corresponding team object from the NBA data
    const teamObject = nbaData[team];
    const logoUrl = teamObject.logo_light; // Use the light logo URL for display

    // Create HTML content including the team logo
    statlineOfDayElement.innerHTML = `
        <h2>Statline of the Day</h2>
        <div class="team-info">
            <img class="logo-img" src="${logoUrl}" alt="${team} Logo" class="team-logo">
            <p>${team}</p>
        </div>
        <p>${stat}: ${number}</p>`;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function statOfTheDay(nbaData) {
    const teamNames = Object.keys(nbaData);
    const randomTeamName = teamNames[getRandomInt(0, teamNames.length - 1)];
    const randomTeam = nbaData[randomTeamName];
    const statCategories = Object.keys(randomTeam.statistics);
    const randomIndex = getRandomInt(0, statCategories.length - 1);
    const randomStatKey = statCategories[randomIndex];
    const randomStat = randomTeam.statistics[randomStatKey];
    const statDisplayName = randomStat.displayName;
    const statValue = randomStat.value.toFixed(1);

    return { team: randomTeam.name, stat: statDisplayName, number: statValue };
}


// // Function to get a random stat category for a given team
// function getRandomStatCategory(randomTeam) {
//     const statCategories = Object.keys(randomTeam.statistics);
//     const randomIndex = getRandomInt(0, statCategories.length - 1);
//     return statCategories[randomIndex];
// }

// dropdown menus

// Initialize a selected players array
let selectedPlayers = [];

async function toggleDropdown(position) {
    const dropdownContent = document.getElementById(`dropdownItems${position}`);
    const dropdownBtn = document.getElementById(`dropdown${position}`);

    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        const response = await fetch('https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData');
        const data = await response.json();

        const players = Object.keys(data).reduce((acc, teamName) => {
            const roster = data[teamName].roster;
            Object.keys(roster).forEach(playerName => {
                if (roster[playerName].position_abbr === position) {
                    acc.push({ name: playerName, position: roster[playerName].position_full });
                }
            });
            return acc;
        }, []);

        dropdownContent.innerHTML = '';
        players.forEach(player => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = `${player.name}`;
            link.addEventListener('click', () => addPlayer(player));
            listItem.appendChild(link);
            dropdownContent.appendChild(listItem);
        });

        dropdownContent.style.display = 'block';

        // Focus on the first anchor tag inside the dropdown content
        const firstLink = dropdownContent.querySelector('a');
        if (firstLink) {
            firstLink.focus();
        }
    }
}

// Function to add a player to the selected list
function addPlayer(player) {
    if (selectedPlayers.length < 5) {
        selectedPlayers.push(player);
        updateSelectedPlayersDisplay();
    } else {
        alert('You can only select up to 5 players.');
    }
}

// Function to update the display of selected players
function updateSelectedPlayersDisplay() {
    const selectedPlayersSection = document.querySelector('.choose-your-five');
    selectedPlayersSection.innerHTML = '<h1>Your Starting 5</h1>';
    selectedPlayers.forEach(player => {
        const playerInfo = document.createElement('p');
        playerInfo.textContent = `${player.name} - ${player.position}`;
        selectedPlayersSection.appendChild(playerInfo);
    });
}

window.onclick = function (event) {
    if (!event.target.matches('.dropdown-btn')) {
        const allDropdowns = document.querySelectorAll('.dropdown-content');
        allDropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
};

// Function to update the display of selected players
function updateSelectedPlayersDisplay() {
    const selectedPlayersSection = document.querySelector('.choose-your-five');

    // Create the header element
    const header = document.createElement('h4');
    header.textContent = 'Your Starting 5';

    // Clear existing content and append the header
    selectedPlayersSection.innerHTML = '';
    selectedPlayersSection.appendChild(header);

    // Append each selected player info
    selectedPlayers.forEach(player => {
        const playerInfo = document.createElement('p');
        playerInfo.textContent = `${player.name} - ${player.position}`;
        selectedPlayersSection.appendChild(playerInfo);
    });
}

// modal button from sumbit with message:

document.addEventListener('DOMContentLoaded', function () {
    const subscribeForm = document.getElementById('subscribeForm');
    const modal = document.getElementById('modal');
    const submitButton = document.getElementById('submitButton');
    const closeModalButton = document.getElementById('closeModalButton');

    submitButton.addEventListener('click', function () {
        showModal();
    });

    closeModalButton.addEventListener('click', function () {
        closeModal();
    });

    subscribeForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        showModal();
    });

    function showModal() {
        // Display the modal
        modal.style.display = 'block';

        // Reset the form after a short delay to ensure the modal is displayed
        setTimeout(function () {
            subscribeForm.reset(); // Reset form fields
        }, 100);
    }

    function closeModal() {
        modal.style.display = 'none';
    }
});




