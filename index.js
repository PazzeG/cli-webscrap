const puppeteer = require('puppeteer');
// Fonction de scrap
(async () =>{
//    instanciation du navigateur
    const browser = await puppeteer.launch({headless:true});
// ouvrir une nouvelle page
    const page = await browser.newPage();
// se rendre sur la page
    await page.goto('https://www.senscritique.com/liste/Dv_Dtheque/2567263')
// exécuter la cmd coté client
    const myMovies = await page.evaluate(() =>{
        let movies = []
        let elements = document.querySelectorAll('div.elli-content');
// récupérer les données
        for (element of elements){
            movies.push({
                img: element.querySelector('img').src,
                title: element.querySelector('a.elco-anchor').text,
                date: element.querySelector('span.elco-date').textContent,
                about: element.querySelector('p.elco-options').innerText.trim()
            })
        }
        return movies;

    });
    console.log(myMovies);
    await browser.close();
})();
