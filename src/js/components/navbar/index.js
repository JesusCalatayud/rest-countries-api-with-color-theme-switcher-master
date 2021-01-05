const navbar = {

    renderDropdownMenu() {
        const dropdownMenu = document.querySelector('.dropdown-menu')
        state.filterOptions.forEach(option => {
            const newItem = document.createElement('LI')
            newItem.setAttribute('class', 'filterItem')
            newItem.innerHTML = `
           <a class="dropdown-item" href="#">${option}</a>
           `
            dropdownMenu.appendChild(newItem)
        })
        helpers.dropdownListener()
    }
}