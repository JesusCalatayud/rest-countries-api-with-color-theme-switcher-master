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
        state.countriesData.push(...countries)
        cardComponent.renderCards(state.countriesData)
    },

    renderDropdownMenu() {
        const dropdownMenu = document.querySelector('.dropdown-menu')
        state.filterOptions.forEach(option => {
           const newItem = document.createElement('LI')
           newItem.innerHTML = `
           <a class="dropdown-item" href="#">${option}</a>
           `
           dropdownMenu.appendChild(newItem)
        })
    }
}