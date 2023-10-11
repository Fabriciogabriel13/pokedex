const pokemonName = document.querySelector('.pokemon__name');//class name
const pokemonNumber = document.querySelector('.pokemon__number');//class numero
const pokemonImage = document.querySelector('.pokemon__image');//clase img

const form = document.querySelector('.form');//class form
const input = document.querySelector('.input__search');//class input
const buttonPrev = document.querySelector('.btn-prev');//class voltar
const buttonNext = document.querySelector('.btn-next');//class proximo

let searchPokemon = 1; //começa do 1

const fetchPokemon = async (pokemon) => { //fetch é projetada para fazer solicitações de rede de forma assíncrona, o que significa que a execução do código JavaScript pode continuar enquanto a solicitação de rede está em andamento.
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);//API do site pokémon
    //caracteres limites
  if (APIResponse.status === 200) {
    const data = await APIResponse.json(); //await vai esperar o api procurar no json
    return data;//vai retornar o valor
  }
}

const renderPokemon = async (pokemon) => { //render vai buscar a img

  pokemonName.innerHTML = 'Loading...';//inner vai colocar a funçao dentro do html
  pokemonNumber.innerHTML = '';
//buscando os dados dentro da api
  const data = await fetchPokemon(pokemon);

  if (data) {// se na data tiver, ele funciona
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name; //add nome 
    pokemonNumber.innerHTML = data.id; //add numero
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];//caminho da imagem no .jason do api
    input.value = '';//os caracteres voltam ao vazio dps da pesquisa
    searchPokemon = data.id;
  } else { //senao, um abraço e um aviso de erro
    pokemonImage.style.display = 'none'; // n mostra nada na tela
    pokemonName.innerHTML = 'Not found :c';// avisa que n encontrou
    pokemonNumber.innerHTML = ''; // tem numero pra tu n 
  }
}

form.addEventListener('submit', (event) => { // evento de chamada, fala q eu te escuto 
  event.preventDefault();//retorna pra mim 
  renderPokemon(input.value.toLowerCase());//input com qualquer caracteres, transformado em minusculo
});

buttonPrev.addEventListener('click', () => { //evento click coltar
  if (searchPokemon > 1) {
    searchPokemon -= 1;//minimizei a busca até o 1
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {//evento click proximo
  searchPokemon += 1;//soma +1 a o click 
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);//buscar o pokemon