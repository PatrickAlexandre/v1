document.addEventListener("DOMContentLoaded", function() {
    const editButton = document.getElementById('editButton');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

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
        male: 79.4, // Espérance de vie pour les hommes en 2023
        female: 85.7 // Espérance de vie pour les femmes en 2023
    };

    // Calculer l'âge en années
    const dob = new Date(characterData.dob);
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    // Fonction pour calculer les années bissextiles
    function calculateLeapYears(years) {
        let leapYears = 0;
        for (let i = 0; i < years; i++) {
            const year = dob.getFullYear() + i;
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
                leapYears++;
            }
        }
        return leapYears;
    }

    // Calculer l'espérance de vie en jours avec années bissextiles
    const maxLifeExpectancyYears = lifeExpectancy[characterData.gender];
    const leapYears = calculateLeapYears(Math.floor(maxLifeExpectancyYears));
    const maxLifeExpectancyDays = (Math.floor(maxLifeExpectancyYears) * 365) + leapYears + Math.round((maxLifeExpectancyYears % 1) * 365);

    // Calculer l'âge en jours
    const ageInDays = Math.floor(ageDifMs / (1000 * 60 * 60 * 24));
    const remainingLifeInDays = maxLifeExpectancyDays - ageInDays;
    const healthPercentage = Math.floor((remainingLifeInDays / maxLifeExpectancyDays) * 100);

    // Mettre à jour les informations du personnage
    document.getElementById('characterName').innerText = characterData.characterName || 'Johanna';
    document.getElementById('characterTitle').innerText = characterData.characterTitle || 'Blood Champion';
    document.getElementById('characterDetails').innerText = `${age} ${characterData.characterClass} (${characterData.mbti})` || `${age} Warrior`;

    // Mettre à jour la barre de vie
    const healthBar = document.querySelector('.health-bar .bar-fill');
    const hpLabel = document.getElementById('hpLabel');
    healthBar.style.width = `${healthPercentage}%`;
    hpLabel.innerText = `${ageInDays} / ${maxLifeExpectancyDays}`;

    // Mettre à jour la barre de mana (en fonction des achievements)
    const currentResource = parseFloat(localStorage.getItem('currentResource')) || 0;
    const maxResource = 800; // La valeur maximale des ressources
    const resourceBar = document.querySelector('.resource-bar .bar-fill');
    const mpLabel = document.getElementById('mpLabel');
    const resourcePercentage = Math.floor((currentResource / maxResource) * 100);
    resourceBar.style.width = `${resourcePercentage}%`;
    mpLabel.innerText = `${currentResource} / ${maxResource}`;

    // Appliquer les couleurs en fonction de la classe
    const classColor = classColors[characterData.characterClass] || { background: '#FFF', color: '#000' };
    document.querySelector('.profile-container').style.backgroundColor = classColor.background;
    document.getElementById('characterName').style.color = classColor.color;

    // Gestion du thème
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '🌚';
        } else {
            themeToggle.textContent = '🌞';
        }
    });

    editButton.addEventListener('click', function() {
        window.location.href = 'edit.html';
    });

    // Initialiser l'état du bouton thème
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '🌚';
    } else {
        themeToggle.textContent = '🌞';
    }
});
