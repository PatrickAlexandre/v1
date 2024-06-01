document.addEventListener("DOMContentLoaded", function() {
    const editButton = document.getElementById('editButton');

    const characterData = JSON.parse(localStorage.getItem('characterData')) || {
        characterName: 'Johanna',
        characterTitle: 'Blood Champion',
        characterRace: 'Human',
        characterClass: 'Warrior',
        dob: '1995-11-21',
        email: 'johanna@example.com',
        gender: 'female',
        mbti: 'INFJ'
    };

    // Espérance de vie moyenne selon le genre
    const lifeExpectancy = {
        male: 79, // Exemple pour les hommes
        female: 84 // Exemple pour les femmes
    };

    // Calculer l'âge
    const dob = new Date(characterData.dob);
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    const maxLifeExpectancy = lifeExpectancy[characterData.gender];
    const healthRemaining = maxLifeExpectancy - age;
    const healthPercentage = (healthRemaining / maxLifeExpectancy) * 100;

    // Mettre à jour les informations du personnage
    document.getElementById('characterName').innerText = characterData.characterName || 'Johanna';
    document.getElementById('characterTitle').innerText = characterData.characterTitle || 'Blood Champion';
    document.getElementById('characterDetails').innerText = `${age} ${characterData.characterClass} (${characterData.mbti})` || `${age} Warrior`;

    // Mettre à jour la barre de vie
    const healthBar = document.querySelector('.health-bar .bar-fill');
    const hpLabel = document.getElementById('hpLabel');
    healthBar.style.width = `${healthPercentage}%`;
    hpLabel.innerText = `${healthRemaining.toFixed(2)} / ${maxLifeExpectancy}`;

    // Mettre à jour la barre de mana (en fonction des achievements)
    const currentResource = parseFloat(localStorage.getItem('currentResource')) || 0;
    const resourceBar = document.querySelector('.resource-bar .bar-fill');
    const mpLabel = document.getElementById('mpLabel');
    resourceBar.style.width = `${currentResource}%`;
    mpLabel.innerText = `${currentResource} / 100`;

    editButton.addEventListener('click', function() {
        window.location.href = 'edit.html';
    });
});
