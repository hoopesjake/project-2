
















































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
// function searchJSONteam() {
//     const searchInputTeam = document.getElementById('searchInputTeam').value.trim().toLowerCase();
//     const searchResultsContainerTeam = document.getElementById('searchResultsTeam');

//     fetch('https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData')
//         .then(response => response.json())
//         .then(data => {
//             let foundTeam = null;

//             // Loop through each team object in the data
//             Object.values(data).some(team => {
//                 // Check if the current team's name matches the search input
//                 if (team.name.toLowerCase() === searchInputTeam) {
//                     foundTeam = team;
//                     return true; // Stop iteration once a match is found
//                 }
//                 return false; // Continue to the next team if no match
//             });

//             // Clear previous search results
//             searchResultsContainerTeam.innerHTML = '';

//             if (foundTeam) {
//                 const { name, abbreviation, logo_light, location, statistics, current_record } = foundTeam;

//                 // Display team information in the search results container
//                 searchResultsContainerTeam.innerHTML = `
//                     <h3>${name} (${abbreviation})</h3>
//                     <img src="${logo_light}" alt="${name} Logo" width="100">
//                     <p><strong>Location:</strong> ${location}</p>
//                     <p><strong>Current Record:</strong> ${current_record}</p>
//                     <h3>Statistics:</h3>
//                     <ul>
//                         <li>Average Rebounds: ${statistics.avgRebounds.displayName} - ${statistics.avgRebounds.value}</li>
//                         <li>Assist To Turnover Ratio: ${statistics.assistTurnoverRatio.displayName} - ${statistics.assistTurnoverRatio.value}</li>
//                         <li>Fouls Per Game: ${statistics.avgFouls.displayName} - ${statistics.avgFouls.value}</li>
//                         <li>Free Throw Percentage: ${statistics.freeThrowPct.displayName} - ${statistics.freeThrowPct.value}</li>
//                         <li>3-Point Field Goal Percentage: ${statistics.threePointPct.displayName} - ${statistics.threePointPct.value}</li>
//                         <li>Points Per Game: ${statistics.avgPoints.displayName} - ${statistics.avgPoints.value}</li>
//                         <li>Assists Per Game: ${statistics.avgAssists.displayName} - ${statistics.avgAssists.value}</li>
//                         <li>Turnovers Per Game: ${statistics.avgTurnovers.displayName} - ${statistics.avgTurnovers.value}</li>
//                         <li>Field Goal Percentage: ${statistics.fieldGoalPct.displayName} - ${statistics.fieldGoalPct.value}</li>
//                         <li>Blocks Per Game: ${statistics.avgBlocks.displayName} - ${statistics.avgBlocks.value}</li>
//                         <li>Steals Per Game: ${statistics.avgSteals.displayName} - ${statistics.avgSteals.value}</li>
//                     </ul>
//                 `;
//             } else {
//                 // Display message if no matching team is found
//                 searchResultsContainerTeam.textContent = 'Team not found.';
//             }
//         });
        
// }

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
                                <td>${statistics.avgRebounds.value}</td>
                            </tr>
                            <tr>
                                <td>${statistics.assistTurnoverRatio.displayName}</td>
                                <td>${statistics.assistTurnoverRatio.value}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgFouls.displayName}</td>
                                <td>${statistics.avgFouls.value}</td>
                            </tr>
                            <tr>
                                <td>${statistics.freeThrowPct.displayName}</td>
                                <td>${statistics.freeThrowPct.value}</td>
                            </tr>
                            <tr>
                                <td>${statistics.threePointPct.displayName}</td>
                                <td>${statistics.threePointPct.value}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgPoints.displayName}</td>
                                <td>${statistics.avgPoints.value}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgAssists.displayName}</td>
                                <td>${statistics.avgAssists.value}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgTurnovers.displayName}</td>
                                <td>${statistics.avgTurnovers.value}</td>
                            </tr>
                            <tr>
                                <td>${statistics.fieldGoalPct.displayName}</td>
                                <td>${statistics.fieldGoalPct.value}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgBlocks.displayName}</td>
                                <td>${statistics.avgBlocks.value}</td>
                            </tr>
                            <tr>
                                <td>${statistics.avgSteals.displayName}</td>
                                <td>${statistics.avgSteals.value}</td>
                            </tr>
                        </table>
                    `;

                // Display the table in the search results container
                searchResultsContainerTeam.innerHTML = tableHTML;
            } else {
                // Display message if no matching team is found
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