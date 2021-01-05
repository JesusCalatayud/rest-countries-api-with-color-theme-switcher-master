const countriesData = [];


async function fetchData() {
    const data = await fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {
            return data.map(el => {
                return (
                    {
                        name: el.name,
                        population: el.population,
                        region: el.region,
                        capital: el.capital,
                        flag: el.flag
                    }
                );
            });

        });
    countriesData.push(...data)
};

fetchData();

