const fetch = require("node-fetch");
module.exports = class  App {
    constructor(){
        this.directors;
        this.actors;
    }
    async searchFilm(filmSearch) {
        const respSearch = await fetch(encodeURI(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${filmSearch}`),{
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "38230659-ecd9-4a50-b17e-253983dcaa50",
        },
    });
    return await respSearch.json();
    }
    async getGenresAndCountries() {
        const respGenresAndCountries = await fetch(encodeURI(`https://kinopoiskapiunofficial.tech/api/v2.1/films/filters`),{
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "38230659-ecd9-4a50-b17e-253983dcaa50",
        },
    });
    return await respGenresAndCountries.json();
    }
    async getInformation(filmId) {
        const respInformation = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`,{
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "38230659-ecd9-4a50-b17e-253983dcaa50",
        },
    });
    console.log(respInformation);
    /*const respSearchTeamDevelopment = await fetch(encodeURI(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}`),{
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "38230659-ecd9-4a50-b17e-253983dcaa50",
        },
    });
    await respSearchTeamDevelopment.json().then( result => {
          this.directors = result.filter((arr) => arr.professionKey === "DIRECTOR");
          this.actors = result.filter((arr) => arr.professionKey === "ACTOR");
    })*/
    const respInformationData = await respInformation.json();
    console.log(respInformationData)
    return respInformationData;
    }
}