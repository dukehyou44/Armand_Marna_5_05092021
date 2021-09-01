
(async function(){
    const articles = await getArticles()
    
    for(article of articles) {
      displayArticles(articles)
    }
})()

function getArticles() {
    return fetch("http://localhost:3000/api/furniture")
    .then(function(data) {
        return data.json()
    })
    .then(function(articles) {
        return articles
    })
    .catch(function(err) {
        console.log("erreur : " + err)
    })
}

function displayArticles() {
    document.querySelector(".container").innerHTML += 
    `<div class>
    <a href="./produit.html?_id=${article._id}"
        <div class="carte article">
            <img src="${article.imageUrl}" alt="${article.name}">
        </div>
        <div class="carte infos">
            <div class="carte titre et prix">
                <h2>${article.name}</h2>
                <p>${article.price / 100}.00 €</p>
            </div>
            <div class="carte description">
                <p>${article.description}</p>
            </div>
        </div>
        </a>
    </div>`
}    