fetch('https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData')// makes a variable called "response"
.then((response) => response.json()) // make a variable called "data"
.then((data) => makePage(data)); // pass all the data to the funcition makePage


function makePage(nbaData) {
    const { team, stat, number } = statOfTheDay(nbaData);
    const statlineOfDayElement = document.getElementById('statlineOfTheDay');
    console.log(team);
    console.log(stat);
    console.log(number);
    statlineOfDayElement.innerHTML = `
        <h2>Statline of the Day</h2>
        <p>${team}</p>
        <p>${stat}: ${number}</p>`;

}

// Function to get a random integer within a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get a random team
function statOfTheDay(nbaData) {
    const teamNames = Object.keys(nbaData);
    const randomTeamName = teamNames[getRandomInt(0, teamNames.length - 1)];
    let randomTeam = nbaData[randomTeamName];
    const statCategories = Object.keys(randomTeam.statistics);
    const randomIndex = getRandomInt(0, statCategories.length - 1);
    let randomStat = statCategories[randomIndex];
    let randomStatValue = randomTeam.statistics[randomStat].value;
    return { team: randomTeam.name, stat: randomStat, number: randomStatValue };
}

// // Function to get a random stat category for a given team
// function getRandomStatCategory(randomTeam) {
//     const statCategories = Object.keys(randomTeam.statistics);
//     const randomIndex = getRandomInt(0, statCategories.length - 1);
//     return statCategories[randomIndex];
// }