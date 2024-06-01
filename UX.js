document.addEventListener('DOMContentLoaded', () => {
    const championsContainer = document.getElementById('champions');
    const searchChampionsInput = document.getElementById('search-champions');
    const sortChampionsSelect = document.getElementById('sort-champions');
    const loadMoreChampionsButton = document.getElementById('loadMoreChampions');
    const mbtiContent = document.getElementById('mbti-content');
    const searchMBTIInput = document.getElementById('search-mbti');
    const biasContent = document.getElementById('bias-content');
    const searchBiasesInput = document.getElementById('search-biases');
    const loadMoreBiasesButton = document.getElementById('loadMoreBiases');
    const errorMessageContainer = document.getElementById('error-message');
    
    let allChampions = [];
    let displayedChampions = [];
    const championsPerPage = 8;
    let currentPage = 1;

    let allBiases = [];
    let displayedBiases = [];
    const biasesPerPage = 8;
    let currentBiasPage = 1;

    const apiUrl = 'https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json';
    const mbtiUrl = 'mbti.json';
    const biasesUrl = 'biases.json';

    const displayError = (message) => {
        errorMessageContainer.textContent = message;
        errorMessageContainer.classList.remove('hidden');
        setTimeout(() => {
            errorMessageContainer.classList.add('hidden');
        }, 5000);
    };

    const fetchChampions = async () => {
        try {
            const response = await axios.get(apiUrl);
            allChampions = Object.values(response.data.data);
            filterChampions('');
        } catch (error) {
            console.error('Error fetching data:', error);
            displayError('Failed to load champions data. Please try again later.');
        }
    };

    const fetchMBTI = async () => {
        try {
            const response = await axios.get(mbtiUrl);
            displayMBTI(response.data);
        } catch (error) {
            console.error('Error fetching MBTI data:', error);
            displayError('Failed to load MBTI data. Please try again later.');
        }
    };

    const fetchBiases = async () => {
        try {
            const response = await axios.get(biasesUrl);
            allBiases = response.data;
            filterBiases('');
        } catch (error) {
            console.error('Error fetching biases data:', error);
            displayError('Failed to load biases data. Please try again later.');
        }
    };

    const displayChampions = (champions) => {
        championsContainer.innerHTML = '';
        champions.forEach(champion => {
            const championCard = document.createElement('div');
            championCard.className = 'bg-gray-800 p-4 rounded-lg shadow-lg';

            championCard.innerHTML = `
                <h2 class="text-2xl font-bold mb-2">${champion.name}</h2>
                <p class="text-sm">${champion.title}</p>
                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg" alt="${champion.name}" class="w-full h-auto mt-4 rounded-lg">
            `;

            championsContainer.appendChild(championCard);
        });
    };

    const filterChampions = (searchTerm) => {
        const filteredChampions = allChampions.filter(champion => 
            champion.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const sortedChampions = sortChampions(filteredChampions);
        displayedChampions = [];
        currentPage = 1;
        loadMoreChampions(sortedChampions);
    };

    const sortChampions = (champions) => {
        const sortBy = sortChampionsSelect.value;
        return _.sortBy(champions, [sortBy]);
    };

    const loadMoreChampions = (champions) => {
        const start = (currentPage - 1) * championsPerPage;
        const end = start + championsPerPage;
        const championsToShow = champions.slice(start, end);
        displayedChampions = displayedChampions.concat(championsToShow);
        displayChampions(displayedChampions);
        currentPage++;
        if (displayedChampions.length >= champions.length) {
            loadMoreChampionsButton.style.display = 'none';
        } else {
            loadMoreChampionsButton.style.display = 'block';
        }
    };

    searchChampionsInput.addEventListener('input', (event) => {
        filterChampions(event.target.value);
    });

    sortChampionsSelect.addEventListener('change', () => {
        filterChampions(searchChampionsInput.value);
    });

    loadMoreChampionsButton.addEventListener('click', () => {
        const searchTerm = searchChampionsInput.value.toLowerCase();
        const filteredChampions = allChampions.filter(champion => 
            champion.name.toLowerCase().includes(searchTerm)
        );
        loadMoreChampions(filteredChampions);
    });

    const displayMBTI = (mbtiData) => {
        const searchTerm = searchMBTIInput.value.toLowerCase();
        const filteredMBTI = mbtiData.filter(mbti =>
            mbti.type.toLowerCase().includes(searchTerm)
        );
        mbtiContent.innerHTML = filteredMBTI.map(mbti => `
            <div class="mb-4">
                <h3 class="text-xl font-bold">${mbti.type}</h3>
                <p>${mbti.description}</p>
            </div>
        `).join('');
    };

    const displayBiases = (biases) => {
        biasContent.innerHTML = '';
        biases.forEach(bias => {
            const biasCard = document.createElement('div');
            biasCard.className = 'mb-4';
            biasCard.innerHTML = `
                <h3 class="text-xl font-bold">${bias.bias}</h3>
                <p>${bias.description}</p>
            `;
            biasContent.appendChild(biasCard);
        });
    };

    const filterBiases = (searchTerm) => {
        const filteredBiases = allBiases.filter(bias => 
            bias.bias.toLowerCase().includes(searchTerm.toLowerCase())
        );
        displayedBiases = [];
        currentBiasPage = 1;
        loadMoreBiases(filteredBiases);
    };

    const loadMoreBiases = (biases) => {
        const start = (currentBiasPage - 1) * biasesPerPage;
        const end = start + biasesPerPage;
        const biasesToShow = biases.slice(start, end);
        displayedBiases = displayedBiases.concat(biasesToShow);
        displayBiases(displayedBiases);
        currentBiasPage++;
        if (displayedBiases.length >= biases.length) {
            loadMoreBiasesButton.style.display = 'none';
        } else {
            loadMoreBiasesButton.style.display = 'block';
        }
    };

    searchBiasesInput.addEventListener('input', () => {
        filterBiases(searchBiasesInput.value);
    });

    loadMoreBiasesButton.addEventListener('click', () => {
        const searchTerm = searchBiasesInput.value.toLowerCase();
        const filteredBiases = allBiases.filter(bias => 
            bias.bias.toLowerCase().includes(searchTerm)
        );
        loadMoreBiases(filteredBiases);
    });

    fetchChampions();
    fetchMBTI();
    fetchBiases();
});
