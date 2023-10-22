

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('pokemon-select');
    const details = document.getElementById('pokemon-details');
    const nameElement = document.getElementById('pokemon-name');
    const imageElement = document.getElementById('pokemon-image');
    const numberElement = document.getElementById('pokemon-number'); 
    const heightElement = document.getElementById('pokemon-height');
    const weightElement = document.getElementById('pokemon-weight');
    const typeElement = document.getElementById('pokemon-type');
    const generationElement = document.getElementById('pokemon-generation');

    function fillPokemonDetails(pokemon) {
        nameElement.textContent = pokemon.nome;
        imageElement.src = pokemon.img;
        numberElement.textContent = pokemon.numero;
        heightElement.textContent = pokemon.altura;
        weightElement.textContent = pokemon.peso;
        typeElement.textContent = pokemon.tipo;
        generationElement.textContent = pokemon.geracao;
        const types = pokemon.tipo.split(',');
    }

    fetch('https://pokemon.danielpimentel.com.br/v1/pokemon/lista')
        .then(response => response.json())
        .then(data => {
            data.pokemon.forEach(pokemon => {
                const option = document.createElement('option');
                option.value = pokemon.nome;
                option.textContent = pokemon.nome;
                select.appendChild(option);
            });
        })
        .catch(error => console.error(error));

    select.addEventListener('change', () => {
        const selectedName = select.value;
        fetch(`https://pokemon.danielpimentel.com.br/v1/pokemon/nome/${selectedName}`)
            .then(response => response.json())
            .then(data => {
                fillPokemonDetails(data.pokemon);
                details.style.display = 'block';
            })
            .catch(error => console.error(error));
    });
});
