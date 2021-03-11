
const options_currencyapi = {
  method: 'GET',
  url: 'https://currencyapi-net.p.rapidapi.com/currencies',
  params: {output: 'JSON', base: 'USD'},
  headers: {
    'x-rapidapi-key': '',
    'x-rapidapi-host': 'currencyapi-net.p.rapidapi.com',
    'useQueryString': true
  }
};

const options_convert = {
  method: 'GET',
  url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
  headers: {
    'x-rapidapi-key': '',
    'x-rapidapi-host': 'currency-converter5.p.rapidapi.com'
  }
};

axios.request(options_currencyapi).then(function (response) {
  localStorage.setItem("currencies", JSON.stringify(response.data['currencies']));
  let info = JSON.parse(localStorage.getItem("currencies"))
  for(const [chave, valor]  of Object.entries(info)){
    document.getElementById("currency-from").innerHTML += `<option value="${chave}">${valor}</option>` ;
    document.getElementById("currency-to").innerHTML += `<option value="${chave}">${valor}</option>` ;
  }
}).catch(function (error) { 
	console.error(error);
});

function convert(){
  let amount = document.getElementById("amount").value
  let currency_from = document.getElementById("currency-from").value
  let currency_to = document.getElementById("currency-to").value
  options_convert.params = {from: currency_from, to: currency_to, amount: amount, format: 'json'}
  axios.request(options_convert).then(function (response) {
    console.log(response.data.rates[currency_to]);
    document.getElementById("rate").innerHTML = "Taxa : " + response.data.rates[currency_to].rate
    document.getElementById("converted_amount").innerHTML = "Valor : " + response.data.rates[currency_to].rate_for_amount
  }).catch(function (error) {
    console.error(error);
  });
}

async function trocar_cor(){
  while(true){
    document.getElementById("body").style.backgroundColor = (`rgb(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)})`)
    // console.log(b)
    await new Promise(r => setTimeout(r, 1500));
  }
}

trocar_cor()


