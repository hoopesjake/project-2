// Function to get a random integer within a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get a random team
function getRandomTeam() {
    const teamNames = Object.keys(teams);
    const randomIndex = getRandomInt(0, teamNames.length - 1);
    return teamNames[randomIndex];
}

// Function to get a random stat category for a given team
function getRandomStatCategory(teamName) {
    const team = teams[teamName];
    const statCategories = Object.keys(team.statistics);
    const randomIndex = getRandomInt(0, statCategories.length - 1);
    return statCategories[randomIndex];
}

// Example usage
const randomTeam = getRandomTeam();
const randomStatCategory = getRandomStatCategory(randomTeam);
console.log(`Random team: ${randomTeam}`);
console.log(`Random stat category: ${randomStatCategory}`);