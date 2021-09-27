// Fonction de base, auto-invoquer au chargement de la page. 

(async function(){
    const articles = await getArticles();
    
    for(article of articles) {
      displayArticles(articles)
    }
})();

// Fonction qui permet de recuperer les articles.

function getArticles() {
    return fetch("http://localhost:3000/api/furniture")
    .then(function(data) {
        return data.json();
    })
    .then(function(articles) {
        return articles;
    })
    .catch(function(err) {
        console.log("erreur : " + err)
    });
}

// Fonction qui affiche les articles recuperer plus tôt.

function displayArticles() {
    document.querySelector(".containe").innerHTML += 
    `
    <div class="col-xl-4" style="margin-bottom:30px;">
    <div class="card bg-secondary">
    <a href="./produit.html?_id=${article._id}">
            <img class="card-img-top img-fluid" src="${article.imageUrl}" alt="${article.name}">
            </a>
        <div class="card-body bg-dark">
                <h2 class="card-title text-white">${article.name}</h2>
                <h6 class="card-subtitle text-white">${article.price / 100}.00 €</h3>
                <p class="card-text text-white">${article.description}</p>
                <a href="./produit.html?_id=${article._id}" class="btn btn-primary">Voir le produit</a>
        </div>      
    </div>
    </div>`;
}    