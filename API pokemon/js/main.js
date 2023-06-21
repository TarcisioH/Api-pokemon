let botaoPesquisar = document.querySelector("#botao-pesquisar-pokemon");
let inputErro = document.querySelector(".erro");

//funcao que captura os elementos html
let elementos = pegarElementosHtml();

//acoes no evento de click do botao pesquisar
botaoPesquisar.addEventListener("click", () => {
    let input = document.querySelector("#pesquisar-pokemon").value;
    if (input.length > 0) {

        //consumindo API
        let xhr = consumindoApi(input);

        xhr.addEventListener("load", () => {

            if(xhr.status === 200) {
            let response = xhr.responseText;

            //retorno da api, convertendo para um objeto
            let informacoesPokemon = JSON.parse(response);

            //pegando os dados da api e salvando em variaveis
            let imgPokemon = informacoesPokemon.sprites.front_default;
            let nomePokemon = informacoesPokemon.name;
            let arrayHabilidades = informacoesPokemon.abilities.map((habilidade) => habilidade.ability.name);
            let tipo = informacoesPokemon.types.map((tipo) => tipo.type.name);

            //jogando os dados das variaveis nos elementos html
            elementos.imgTag.src = imgPokemon;
            dadosNoHtml(elementos.nameTag,nomePokemon);
            dadosNoHtml(elementos.habilidadesTag,`Habilidades: ${arrayHabilidades}`);
            dadosNoHtml(elementos.tipoTag,`Pokemon do tipo: ${tipo}`);

            } else {
                erro("Pokemon não encontrado!");
            }
        })

        xhr.send();

    } else {
        erro("Digite o nome ou o número do pokemon");
    }
})

function consumindoApi(input) {
    let xhr = new XMLHttpRequest();
    let url = `https://pokeapi.co/api/v2/pokemon/${input}`
    xhr.open("GET", url);

    return xhr
}


function pegarElementosHtml() {
    let tags = {
    imgTag: document.querySelector(".img-pokemon"),
    nameTag: document.querySelector(".card-title"),
    habilidadesTag: document.querySelector(".card-text"),
    tipoTag: document.querySelector(".tipo-pokemon"),
    imgErro: document.querySelector(".img-pokemon")
    }
    return tags
}

function dadosNoHtml(elementoHtml, dado) {
    elementoHtml.textContent = dado;
}

function erro(mensagem) {
        elementos.imgErro.src = "/img/erro.jpg";
        elementos.nameTag.textContent = mensagem;
        elementos.habilidadesTag.textContent = "";
        elementos.tipoTag.textContent = ""
}