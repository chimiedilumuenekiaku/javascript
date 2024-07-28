let dolar = 5.1

let usdInput = document.querySelector("#usd")
let brlInput = document.querySelector("#brl")

usdInput.addEventListener("keyup", ()=> {
    usdInput.value = formatCurrency(usdInput.value)
})

brlInput.addEventListener("keyup", ()=> {
    brlInput.value = formatCurrency(brlInput.value)
})

usdInput.value = "1000,00"
convert("usd-to-brl")

// funcoes
function formatCurrency(value) {
    // ajustar valor
    let fixedValue = fixValue(value)
    // utilizar funcao de fomatar 
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    }
    let formatter = new Intl.NumberFormat("pt-BR", options)

    return formatter.format(fixedValue)

}

function fixValue(value) {
    let fixedValue = value.replace(",",".")
    let floatValue = parseFloat(fixedValue)
    if(floatValue == NaN) {
        floatValue = 0
    }
    return floatValue
}

function convert(type) {
    if(type="usd-to-brl"){
        // ajustar o valor

        // converter o valor
        // mostrar no campo de real
    }

    if(type="brl-to-usd"){
        // ajustar o valor
        // converter o valor
        // mostrar no campo de dolar
    }
}