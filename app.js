document.addEventListener("DOMContentLoaded", function() {
    const profileImage = document.getElementById('profileImage');
    const characterPanel = document.getElementById('characterPanel');
    const editButton = document.getElementById('editButton');

    const characterData = JSON.parse(localStorage.getItem('characterData')) || {
        characterName: 'Johanna',
        characterTitle: 'Blood Champion',
        characterLevel: '110',
        characterRace: 'Human',
        characterClass: 'Warrior',
        dob: '1995-11-21',
        email: 'johanna@example.com',
        mbti: 'INFJ'
    };

    document.getElementById('characterName').innerText = characterData.characterName || 'Johanna';
    document.getElementById('characterTitle').innerText = characterData.characterTitle || 'Blood Champion';
    document.getElementById('characterLevel').innerText = `${characterData.characterLevel} ${characterData.characterClass}` || '110 Warrior';
    document.getElementById('characterRace').innerText = characterData.characterRace || 'Human';

    profileImage.addEventListener('click', function() {
        characterPanel.classList.toggle('hidden');
    });

    editButton.addEventListener('click', function() {
        window.location.href = 'edit.html';
    });
});
