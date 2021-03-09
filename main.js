
const options_currencyapi = {
  method: 'GET',
  url: 'https://currencyapi-net.p.rapidapi.com/currencies',
  params: {output: 'JSON', base: 'USD'},
  headers: {
    'x-rapidapi-key': '657110f0a7msh6c1bc80927731a7p103c92jsncc392fa93be0',
    'x-rapidapi-host': 'currencyapi-net.p.rapidapi.com',
    'useQueryString': true
  }
};

const options_convert = {
  method: 'GET',
  url: 'https://currency38.p.rapidapi.com/currency/free/convert',
  headers: {
    'x-rapidapi-key': '657110f0a7msh6c1bc80927731a7p103c92jsncc392fa93be0',
    'x-rapidapi-host': 'currency38.p.rapidapi.com'
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
  options_convert.params = {from: currency_from, to: currency_to, amount: amount}
  axios.request(options_convert).then(function (response) {
    console.log(response.data.data.exchange_rate);
    document.getElementById("rate").innerHTML = response.data.data['exchange_rate']
    document.getElementById("converted_amount").innerHTML = response.data.data['converted']
  }).catch(function (error) {
    console.error(error);
  });
}


