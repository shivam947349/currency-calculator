const fromAmountElement = document.querySelector('.amount') ;
const convertedAmountElement = document.querySelector('.convertedAmount') ;
const fromCurrencyElement = document.querySelector('.fromCurrency') ;
const toCurrencyElement = document.querySelector('.toCurrency') ;
const resultElement = document.querySelector('.result') ;
const converterContainer = document.querySelector('.converter-container') ;


//Array to populate the select tags with these countries

const countries = [
    {code: 'USD', name: 'United States Dollar'},
    {code: 'INR', name: 'Indian Rupee'},
    {code: 'AFN', name: 'Afghani'},
    {code: 'EUR', name: 'Euro'},
    {code: 'AOA', name: 'Kwanza'},
    {code: 'AUD', name: 'Australian Dollar	'},
    {code: 'ANG', name: 'Netherlands Antillean Guilder'},
    {code: 'EGP', name: 'Egyptian Pound'},
    {code: 'BMD', name: 'Bermudian Dollar'},
    {code: 'HKD', name: 'Hong Kong Dollar'},
];

//Showing countries from array to select tag

countries.forEach(country => {
    const option1 = document.createElement('option');
    option1.value = country.code;
    option1.textContent = `${country.code} (${country.name})` ;
    fromCurrencyElement.appendChild(option1) ;
    
    const option2 = document.createElement('option');
    option2.value = country.code;
    option2.textContent = `${country.code} (${country.name})` ;
    toCurrencyElement.appendChild(option2) ;

    fromCurrencyElement.value = 'USD' ;
    toCurrencyElement.value = 'INR' ;
})

// Function to get exchange rate using API

const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value ;
    const toCurrency = toCurrencyElement.value ;

    resultElement.textContent = 'Fetching Exchange Rates......'

    try {
        //Fetch Data from API
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`) ;
    const data = await response.json();

    console.log(data)

    const conversionRate = data.rates[toCurrency];
    const convertedAmaount = (amount*conversionRate).toFixed(2) ;

    convertedAmountElement.value = convertedAmaount ;
    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmaount} ${toCurrency}`

        
    } catch (error) {
        converterContainer.innerHTML = `<h2>Error while fetching Exchange Rate....This currency is not present</h2>` ;
    }

    

}

//fetching exchangeRate when user inputs the amount

fromAmountElement.addEventListener('input', getExchangeRate) ;

//fetching exchangeRate when user change the currency
fromCurrencyElement.addEventListener('change', getExchangeRate) ;
toCurrencyElement.addEventListener('change', getExchangeRate) ;
window.addEventListener('load', getExchangeRate) ;


