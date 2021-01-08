    const navbar = {

        renderDropdownMenu() {
            const dropdownMenu = document.querySelector('.dropdown-menu')
            state.regionFilterOptions.forEach(option => {
                const newItem = document.createElement('LI')
                newItem.setAttribute('class', 'filterItem')
                newItem.innerHTML = `
            <a class="dropdown-item" href="#">${option}</a>
            `
                dropdownMenu.appendChild(newItem)
            })
            helpers.dropdownListener()
        },

        searchbarHandler() {
            const searchbar = document.querySelector('input')
            searchbar.addEventListener('keyup', (event) => {
                helpers.updateCountryFilter(event.target.value)
            })
        }
    }