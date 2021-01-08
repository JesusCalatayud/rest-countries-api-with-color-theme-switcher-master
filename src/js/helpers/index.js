const helpers = {

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
            this.updateRegionFilter(event.target.innerHTML)
        }))
    },

    updateRegionFilter(value) {
        state.regionFilter = []
        state.regionFilter.push(value === 'America' ? 'Americas' : value)
        const filteredCountries = state.countriesData.filter(country => country.region === state.regionFilter[0])
        this.countriesListener(filteredCountries)
    },

    updateCountryFilter(value) {
        state.countryFilter = value
        const filteredCountries = state.countriesData.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
        this.countriesListener(filteredCountries)
    }

}