// Fonction de base, auto-invoquer au chargement de la page. 

(async function(){
    const articleId = getArticleId()
    const article = await getArticle(articleId)
    displayArticle(article)
})();

// Fonction qui recuperer l'ID des articles.

function getArticleId() {
    return new URL(location.href).searchParams.get('_id');
}

// Fonction qui recupere les articles selon leurs ID.

function getArticle(articleId){
    return fetch(`http://localhost:3000/api/furniture/${articleId}`)
    .then(function(data) {
        return data.json()
    })
    .then(function(articles) {
        return articles
    })
    .catch(function(err) {
        console.log("erreur : " + err)
    });
};

// Fonction qui affiche les articles.

function displayArticle(article) {
  document.getElementById('image').src = article.imageUrl
  document.getElementById('image').alt = article.name
  document.getElementById('titre').textContent = article.name
  document.getElementById('prix').textContent = `${article.price / 100}.00 €`
  document.getElementById('description').textContent = article.description

  varnishChoice(article)
}

// Fonction qui va recuperer les choix de vernis et permettre leurs affichage.

function varnishChoice(article) {
    const choixVernis = document.getElementById("choix");
    for (let varnish of article.varnish) {
        choixVernis.innerHTML += `<option value="${varnish}">${varnish}</option>`;
    }

//    Ajout du listener pour ecouter le bouton Ajout au panier.

    const ajoutPanier = document.getElementById("btn");

    ajoutPanier.addEventListener("click", (event) =>{
        event.preventDefault();
        const optionVernis = document.getElementById("choix");
        const choixUser = optionVernis.value;
        const quantite = document.getElementById("quantite");
        const quantiteChoisi = quantite.value
        let optionArticle = {
            id : article._id,
            nom : article.name,
            prix : article.price / 100,
            description : article.description,
            image : article.imageUrl,
            quantiteChoisi,
            choixUser,

        };

        let articleAjouterAuPanier = JSON.parse(localStorage.getItem("article"));

// Ajout du panier de le local storage.

        const ajoutDansLocalStorage = () => {
            articleAjouterAuPanier.push(optionArticle);
            localStorage.setItem("article",JSON.stringify(articleAjouterAuPanier));
        };

        if(articleAjouterAuPanier){
            ajoutDansLocalStorage();
        }else{
            articleAjouterAuPanier = [];
            ajoutDansLocalStorage();
            
        }
        alert("Votre produit a été ajouté au panier.");
        console.log(articleAjouterAuPanier);
    });

}
