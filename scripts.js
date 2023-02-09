const button = document.getElementById("convert-button")
const select = document.getElementById("currency-select")



const convertValues = async () => {
  const inputReais = document.getElementById("input-real").value
  const realValueText = document.getElementById("real-value-text")
  const currencyValueText = document.getElementById("currency-value-text")
  const dateQuote = document.getElementById("quote-time")

  const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(dados => dados.json())
  console.log(data)
  const dolar = data.USDBRL.high
  const euro = data.EURBRL.high
  const bitCoin = data.BTCBRL.high
  const dateDolar = data.USDBRL.create_date
  const dateEuro = data.USDBRL.create_date
  const dateBitcoin = data.USDBRL.create_date


  realValueText.innerHTML = new Intl.NumberFormat("pt-BR",
    { style: 'currency', currency: "BRL" }
  ).format(inputReais)

  if (select.value === "US$ Dólar americano") {
    currencyValueText.innerHTML = new Intl.NumberFormat("en-US",
      { style: 'currency', currency: "USD" }
    ).format(inputReais / dolar)
    
    const newDateDolar = dateDolar.substr(0,10)
    const hourDolar = dateDolar.substr(10) 
   
    let data_americana = newDateDolar
    let data_brasileira = data_americana.split('-').reverse().join('/')

    dateQuote.innerHTML = `${data_brasileira}${hourDolar}`
  }

  if (select.value === "€ Euro") {
    currencyValueText.innerHTML = new Intl.NumberFormat("de-DE",
      { style: 'currency', currency: "EUR" }
    ).format(inputReais / euro)

    const newDateEuro = dateEuro.substr(0,10)
    const hourEuro = dateEuro.substr(10) 
   
    let data_americana = newDateEuro
    let data_brasileira = data_americana.split('-').reverse().join('/')

    dateQuote.innerHTML = `${data_brasileira}${hourEuro}`

  }

  if (select.value === "Bitcoin") {
    currencyValueText.innerHTML = "BTC " + (inputReais / bitCoin).toFixed(4)

    const newDateBitcoin = dateBitcoin.substr(0,10)
    const hourBitcoin = dateBitcoin.substr(10) 
   
    let data_americana = newDateBitcoin
    let data_brasileira = data_americana.split('-').reverse().join('/')

    dateQuote.innerHTML = `${data_brasileira}${hourBitcoin}`
  }



}

changeCurrency = () => {
  const currencyName = document.getElementById("currency-name")
  const currencyImg = document.getElementById("currency-img")

  if (select.value === "US$ Dólar americano") {
    currencyName.innerHTML = "Dólar Americano"
    currencyImg.src = "./assets/eua.png"
  }

  if (select.value === "€ Euro") {
    currencyName.innerHTML = "Euro"
    currencyImg.src = "./assets/euro.png"
  }

  if (select.value === "Bitcoin") {
    currencyName.innerHTML = "Bitcoin"
    currencyImg.src = "./assets/bitcoin.png"
  }

  convertValues()

}

button.addEventListener("click", convertValues)
select.addEventListener("change", changeCurrency)