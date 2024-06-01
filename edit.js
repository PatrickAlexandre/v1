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
        mbti: 'INFJ'
    };

    document.getElementById('characterName').value = characterData.characterName || 'Johanna';
    document.getElementById('characterTitle').value = characterData.characterTitle || 'Blood Champion';
    document.getElementById('characterRace').value = characterData.characterRace || 'Human';
    document.getElementById('characterClass').value = characterData.characterClass || 'Warrior';
    document.getElementById('dob').value = characterData.dob || '1995-11-21';
    document.getElementById('email').value = characterData.email || 'johanna@example.com';
    document.getElementById('gender').value = characterData.gender || 'female';
    document.getElementById('mbti').value = characterData.mbti || 'INFJ';

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
            mbti: document.getElementById('mbti').value
        };

        localStorage.setItem('characterData', JSON.stringify(updatedCharacterData));

        window.location.href = 'index.html';
    });
});
