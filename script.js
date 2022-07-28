const pokemonImg = document.querySelector('.pokemon-img');
const dadosPokemon = document.querySelector('.dados-pokemon');

const form = document.querySelector('form');
const input = document.getElementById('pokemon-input');

const nextButton = document.querySelector('button.next');
const prevButton = document.querySelector('button.prev');

let lastSearch = 1;

async function getApiResponse(pokemon){
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(response.status != 200) return false;
    let data = await response.json()
    return data;
}

async function updatePokemon(pokemon){
    dadosPokemon.innerHTML = 'loading...'
    pokemonImg.alt = '';
    pokemonImg.src = '';

    let data = await getApiResponse(pokemon)

    if(data){
        
        let imgLink = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        imgLink = imgLink ? imgLink : data['sprites']['front_default']
        
        let pokemonName = data['name'];
        let pokemonId = data['id'];
        
        pokemonImg.src = imgLink ? imgLink : '';
        pokemonImg.alt = imgLink ? pokemonName : 'IMAGEM NÃO ENCONTRADA!';
        dadosPokemon.innerHTML = `${pokemonId} - ${pokemonName}`;
        lastSearch = pokemonId;
    }else{
        dadosPokemon.innerHTML = `ERROR!`;
    }
    input.value = '';
}

form.addEventListener('submit', (event) => {
    event.preventDefault() //Faz a página n dar reload qnd da o submit!!!!
    updatePokemon(input.value)
})

nextButton.addEventListener('click', () => {
    if(lastSearch < 904){
        updatePokemon(lastSearch + 1)
    }
});

prevButton.addEventListener('click', () => {
    if(lastSearch > 1){
        updatePokemon(lastSearch - 1)
    }
});

updatePokemon(lastSearch);