(async function(){
    const articleId = getArticleId()
    const article = await getArticle(articleId)
    displayArticle(article)
})()

function getArticleId() {
    return new URL(location.href).searchParams.get('_id')
}

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
    })
}

function displayArticle(article) {
  document.getElementById('image').src = article.imageUrl
  document.getElementById('image').alt = article.name
  document.getElementById('titre').textContent = article.name
  document.getElementById('prix').textContent = `${article.price / 100}.00 €`
  document.getElementById('description').textContent = article.description

  varnishChoice(article)
}


function varnishChoice(article) {
    const choixVernis = document.getElementById("choix");
    for (let varnish of article.varnish) {
        choixVernis.innerHTML += `<option value="${varnish}">${varnish}</option>`;
    }

   

    const ajoutPanier = document.getElementById("btn");
    console.log(ajoutPanier);

    ajoutPanier.addEventListener("click", (event) =>{
        event.preventDefault();
        const optionVernis = document.getElementById("choix");
        const choixUser = optionVernis.value;
        console.log(choixUser);
        let optionArticle = {
            id : article._id,
            nom : article.name,
            prix : article.price / 100,
            description : article.description,
            image : article.imageUrl,
            choixUser,

        }
        console.log(optionArticle);

        let articleAjouterAuPanier = JSON.parse(localStorage.getItem("article"));
        console.log(articleAjouterAuPanier);

        if(articleAjouterAuPanier){
            articleAjouterAuPanier.push(optionArticle);
            localStorage.setItem("article",JSON.stringify(articleAjouterAuPanier));
            console.log(articleAjouterAuPanier);
        }else{
            articleAjouterAuPanier = [];
            articleAjouterAuPanier.push(optionArticle);
            localStorage.setItem("article",JSON.stringify(articleAjouterAuPanier));
            console.log(articleAjouterAuPanier);
        }
    });

}
