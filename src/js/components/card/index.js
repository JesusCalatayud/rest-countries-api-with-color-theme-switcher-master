function displayCard (info){
    const countriesContainer = document.querySelector(".countriesContainer")
    info.forEach(element => {
        countriesContainer.innerHTML = 
        `
        <div class="card" style="width: 18rem;">
            <img src=${element.flag} class="img-fluid" alt="">
            <div class="card-body">
            <h5 class="card-title">${element.name}</h5> 
            <p class="card-text"> <strong>Population</strong>${element.population} </p>
            <p class="card-text"> <strong>Region</strong>${element.region} </p>
            <p class="card-text"> <strong>Capital</strong>${element.capital} </p>
        </div>
        `
    });    

}

displayCard(countriesData)



