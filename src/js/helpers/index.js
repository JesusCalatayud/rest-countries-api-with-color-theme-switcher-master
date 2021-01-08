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

        filterItems.forEach(item => item.addEventListener('mouseover', (event) => {
            event.target.style.backgroundColor = state.darkMode ? 'white' : '#DCD8D8'
            event.target.style.color = state.darkMode ? 'black' : 'inherit'
        }))
        filterItems.forEach(item => item.addEventListener('mouseout', (event) => {
            event.target.style.backgroundColor = 'inherit'
            event.target.style.color = state.darkMode ? 'white' : 'black'
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
    },

    //Future improvement: create dark mode classes and toggle between classes instead of hardcode styles
    styleToggler() {
        const navbar = document.querySelector('.navbar')
        const newNavbarStyles = navbar.getAttribute('class').replaceAll(state.darkMode ? 'light' : 'dark', state.darkMode ? 'dark' : 'light')
        navbar.removeAttribute('class')
        navbar.setAttribute('class', newNavbarStyles)
        const card = Array.from(document.querySelectorAll('.card'))
        card.forEach(card => {
            card.removeAttribute('class')
            card.setAttribute('class', state.darkMode ? 'card bg-dark' : 'card bg-light')
            card.style.color = state.darkMode ? 'white' : 'black'
        })
        const body = document.querySelector('body')
        body.style.backgroundColor = state.darkMode ? '#313131' : 'white'
        const darkModeContainer = document.querySelector('#dark-mode-container')
        darkModeContainer.style.color = state.darkMode ? 'white' : 'black'
        const searchbar = document.querySelector('#searchbar')
        searchbar.style.backgroundColor = state.darkMode ? '#313131' : 'white'
        searchbar.style.color = state.darkMode ? 'white' : 'black'
        const dropdownMenu = document.querySelector('.dropdown-menu')
        dropdownMenu.style.backgroundColor = state.darkMode ? '#313131' : 'white'
        const filterItem = Array.from(document.querySelectorAll('.dropdown-item'))
        filterItem.forEach(el => {
            el.style.color = state.darkMode ? 'white' : 'black'
        })
        const borderItems = Array.from(document.querySelectorAll(state.darkMode ? '.borderItem' : '.borderItemDark'))
        borderItems.forEach(el => {
            el.removeAttribute('class')
            el.setAttribute('class', state.darkMode ? 'borderItemDark' : 'borderItem')
        })
        const detailsContainer = document.querySelector('#detailsContainer')
        detailsContainer.style.color = state.darkMode ? 'white' : 'black'
        const backButton = document.querySelector('#backButton')
        backButton.style.backgroundColor = state.darkMode ? '#212529' : 'transparent'
        backButton.style.color = state.darkMode ? 'rgba(255,255,255,0.7)' : 'black'
        backButton.style.border = state.darkMode ? '1px solid #212529' : '1px solid gray'
    },

    openDetails(selectedCountry) {
        let data
        if(typeof(selectedCountry) === 'string'){
            const previousDetails = document.querySelector('#detailItem')
            previousDetails.remove()
            const country = state.countriesData.filter(el => el.name === selectedCountry)
            data = {...country[0]}
        } else {
            data = selectedCountry
        }
        const newDiv = document.createElement('DIV')
        newDiv.setAttribute('id', 'detailItem')
        newDiv.style.width = '100%'
        const detailsContainer = document.querySelector('#detailsContainer')
        detailsContainer.appendChild(newDiv)
        detailsContainer.style.display = 'inline'
        const countriesContainer = document.querySelector('#countriesContainer')
        countriesContainer.style.display = 'none'
        const borders = this.getCountryNameByAlphaCode(data.borders.map(el => el))

        newDiv.innerHTML = `
        <div style="background-color: transparent; height: calc(100vh - 7rem); display: flex; align-items: center; justify-content: space-evenly; width: 100%;">
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 50%; height: 100%">
        <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">
        <button id="backButton" onclick="helpers.closeDetails()" style="background-color: ${state.darkMode ? '#212529' : 'transparent'}; color: ${state.darkMode ? 'rgba(255,255,255,0.7)' : 'black'}; border: ${state.darkMode ? '1px solid #212529' : '1px solid gray'};"><i style="padding-right: 10px;" class="fas fa-long-arrow-alt-left"></i>Back</button>
            <div style="box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.33);">
            <img src=${data.flag} alt={data.name} style="width: 30rem; height: 20rem; object-fit: cover;"/>
            </div>
        </div>
    </div>
    
    <div style="display: flex; flex-direction: column; width: 50%; justify-content: center">
    <p style="font-size: 2rem;"><strong>${data.name}</strong></p>
      <div style="display: flex">
        <div>
        <p><strong>Population: </strong>${data.population}</p>
        <p><strong>Native Name: </strong>${data.nativeName}</p>
        <p><strong>Region: </strong>${data.region}</p>
        <p><strong>Sub Region: </strong>${data.subregion}</p>
        <p><strong>Capital: </strong>${data.capital}</p>
        </div>

        <div>
        <p><strong>Top Level Domain: </strong>${data.topLevelDomain}</p>
        <p><strong>Currencies: </strong>${data.currencies.map(el => el.name)}</p>
        <p><strong>Languages: </strong>${data.languages.map(el => el.name)}</p>
        </div>
      </div>
        <p>
            <strong>Border Countries: </strong>
        </p>
        <div id="bordersContainer"></div>
    
     </div>
            
        </div>
        `
        const bordersContainer = document.querySelector('#bordersContainer')
        borders.map(border => {
            const newBorderDiv = document.createElement('DIV')
            newBorderDiv.innerHTML = border
            newBorderDiv.setAttribute('class', state.darkMode ? 'borderItemDark' : 'borderItem')
            newBorderDiv.style.cursor = 'pointer'
            bordersContainer.appendChild(newBorderDiv)
            newBorderDiv.addEventListener('click', () => this.openDetails(border))
        })
    },

    getCountryNameByAlphaCode(borders) {
        const countries = borders.map(country => {
            const filteredCountries = state.countriesData.filter(el => el.alpha3Code === country)
            return filteredCountries[0].name
        })
        return countries
    },

    closeDetails() {
        const detailItem = document.querySelector('#detailItem')
        detailItem.remove()
        const detailsContainer = document.querySelector('#detailsContainer')
        detailsContainer.style.display = 'none'
        const countriesContainer = document.querySelector('#countriesContainer')
        countriesContainer.style.display = 'flex'
    }

}