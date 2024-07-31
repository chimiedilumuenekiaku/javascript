

const key = "350fd5ad85c190d580deddfc69d03681"

function colocarDadosNaTela(dados) {
    console.log(dados)
    document.querySelector(".title").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".text-prev").innerHTML = dados.weather[0].description
    document.querySelector(".Umidade").innerHTML = dados.main.humidity + "%"
    document.querySelector(".img-prev").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`

}


async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())

   colocarDadosNaTela(dados)
    
}

function cliqueiNoBotao() {
    const cicade = document.querySelector(".input-cidade").value
    
    buscarCidade(cicade)
}

