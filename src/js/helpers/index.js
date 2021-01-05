const helpers = {

    formatData(data) {
        return (
            {
                name: data.name,
                population: data.population,
                region: data.region,
                capital: data.capital,
                flag: data.flag
            }
        )
    },

    countriesListener(countries) {
        if (!state.countriesData.length) {
            state.countriesData.push(...countries)
            return cardComponent.renderCards(state.countriesData)
        }
        cardComponent.renderCards(countries)
    },

    dropdownListener() {
        const filterItems = Array.from(document.querySelectorAll('.filterItem'))
        filterItems.forEach(item => item.addEventListener('click', (event) => {
            this.updateFilter(event.target.innerHTML)
        }))
    },

    updateFilter(value) {
        state.filter = []
        state.filter.push(value === 'America' ? 'Americas' : value)
        const filteredCountries = state.countriesData.filter(country => country.region === state.filter[0])
        this.countriesListener(filteredCountries)
    }
}