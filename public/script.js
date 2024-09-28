let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const searchInput = document.getElementById('search');
const characterList = document.getElementById('character-list');
const favoritesList = document.getElementById('favorites-list');
const listNameInput = document.getElementById('list-name');
const generateImageButton = document.getElementById('generate-image');


// Função para mostrar a imagem atual
function showCurrentImage() {
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIndex) {
            item.classList.add('active'); 
        }
    });
}

// Função carrossel
function changeImage() {
    currentIndex = (currentIndex + 1) % totalItems; // Avança para a próxima imagem
    showCurrentImage(); // Atualiza a imagem exibida
}

// Inicializa a primeira imagem
showCurrentImage();

// Alterar imagem a cada 5 segundos
setInterval(changeImage, 3000);



searchInput.addEventListener('input', async () => {
    const searchTerm = searchInput.value;
    const response = await fetch(`http://localhost:3000/api/characters?search=${searchTerm}`);
    const characters = await response.json();

    characterList.innerHTML = '';
    characters.forEach(character => {
        const li = document.createElement('li');
        li.textContent = character.name;

        const heartButton = document.createElement('button');
        heartButton.innerHTML = '❤';
        heartButton.onclick = () => toggleFavorite(character);
        li.appendChild(heartButton);

        characterList.appendChild(li);

    });
});

const toggleFavorite = async (character) =>     {

    //easter-egg
    if (character.name == 'Jar Jar Binks') { 
        alert('Jar Jar Binks é seu favorito?');
        }

    const response = await fetch('http://localhost:3000/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character, isFavorite: true })
    });

        //verifica se o personagem já está na lista de favorito
    if (response.status === 409) {
        const errorData = await response.json();
        alert(errorData.error); 
        return;
    }

    await response.json();
    loadFavorites();
};


const loadFavorites = async () => {
    const response = await fetch('http://localhost:3000/api/favorites');
    favorites = await response.json();

    favoritesList.innerHTML = '';
    favorites.forEach(favorite => {
        const li = document.createElement('li');
        li.textContent = favorite.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.onclick = () => deleteFavorite(favorite.name);
        li.appendChild(deleteButton);

        favoritesList.appendChild(li);
    });
};

const deleteFavorite = async (character) => {
    const response = await fetch('http://localhost:3000/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character })
    });
    await response.json();
    loadFavorites();
    
};


// Carregar favoritos
loadFavorites();

