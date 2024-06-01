document.addEventListener("DOMContentLoaded", function() {
    const editForm = document.getElementById('editForm');

    const characterData = JSON.parse(localStorage.getItem('characterData')) || {
        characterName: 'Johanna',
        characterTitle: 'Blood Champion',
        characterRace: 'Human',
        characterClass: 'Warrior',
        dob: '1995-11-21',
        email: 'johanna@example.com',
        gender: 'female',
        mbti: 'INFJ',
        nap: 1.2,
        weight: 70,
        height: 175
    };

    document.getElementById('characterName').value = characterData.characterName || 'Johanna';
    document.getElementById('characterTitle').value = characterData.characterTitle || 'Blood Champion';
    document.getElementById('characterRace').value = characterData.characterRace || 'Human';
    document.getElementById('characterClass').value = characterData.characterClass || 'Warrior';
    document.getElementById('dob').value = characterData.dob || '1995-11-21';
    document.getElementById('email').value = characterData.email || 'johanna@example.com';
    document.getElementById('gender').value = characterData.gender || 'female';
    document.getElementById('mbti').value = characterData.mbti || 'INFJ';
    document.getElementById('nap').value = characterData.nap || '1.2';
    document.getElementById('weight').value = characterData.weight || 70;
    document.getElementById('height').value = characterData.height || 175;

    editForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedCharacterData = {
            characterName: document.getElementById('characterName').value,
            characterTitle: document.getElementById('characterTitle').value,
            characterRace: document.getElementById('characterRace').value,
            characterClass: document.getElementById('characterClass').value,
            dob: document.getElementById('dob').value,
            email: document.getElementById('email').value,
            gender: document.getElementById('gender').value,
            mbti: document.getElementById('mbti').value,
            nap: parseFloat(document.getElementById('nap').value) || 1.2, // Valeur par défaut
            weight: parseFloat(document.getElementById('weight').value) || 70, // Valeur par défaut
            height: parseFloat(document.getElementById('height').value) || 175 // Valeur par défaut
        };

        localStorage.setItem('characterData', JSON.stringify(updatedCharacterData));

        window.location.href = 'index.html';
    });
});
