const cardComponent = {

    async fetchData() {
        const data = await fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(data => data.map(el => el))
        helpers.countriesListener(data)
    },

    renderCards(countries) {
        const container = document.querySelector('#countriesContainer')
        const cardItems = Array.from(document.querySelectorAll('.cardItem'))
        if (cardItems.length) {
            cardItems.forEach(item => item.remove())
        }
        countries.length && countries.forEach(country => {
            const countryCard = document.createElement('DIV')
            countryCard.setAttribute('class', 'cardItem')
            countryCard.innerHTML = `       
        <div class="card" style="width: 18rem; height: 25rem">
        <img class="card-img-top" style="height: 45%; object-fit: cover;" src=${country.flag} alt="Card image cap">
        <div class="card-body" style="display: flex; flex-direction: column; justify-content: center;">
          <h5 class="card-title" style="padding-bottom: 10px;"><strong>${country.name}</h5>
          <p class="card-text"><strong>Population: </strong>${country.population}</p>
          <p class="card-text"><strong>Region: </strong>${country.region}</p>
          <p class="card-text"><strong>Capital: </strong>${country.capital}</p>
        </div>
      </div>
    `
            container.appendChild(countryCard)
        })
    }


}
