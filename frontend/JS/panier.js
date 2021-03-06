let articleAjouterAuPanier = JSON.parse(localStorage.getItem("article"));


const tableauPanier = document.getElementById("tableau");

// Action si le panier est vide.

if(articleAjouterAuPanier === null){
    const panierVide = `
    <div class="panier vide">
    <div class="text-white" style="display: flex; margin-top: 40px; margin-bottom:40px; align-items:center; flex-direction: column; font-size:25px;">Votre panier est vide. <a href=index.html class="text-white">Cliquez-ici pour aller à l'accueil</a></div>
    </div>
    `;
    tableauPanier.innerHTML = panierVide;

// Si le panier est rempli on va...

}else{

// recuperer les infos importantes pour notre tableau recapitulatif

    var affichageArticlePanier = [];
    const articlePanier = document.getElementById("articleDuPanier"); 

    for(let i = 0; i < articleAjouterAuPanier.length; i++){
        
        articlePanier.innerHTML += `<tr>
        <th class="font-weight-normal">${articleAjouterAuPanier[i].nom}</th>
        <th class="font-weight-normal">${articleAjouterAuPanier[i].choixUser}</th>
        <th class="font-weight-normal">${articleAjouterAuPanier[i].quantiteChoisi}</th>
        <th class="font-weight-normal">${articleAjouterAuPanier[i].prix} €</th>
        <th class="font-weight-normal">${articleAjouterAuPanier[i].prix*articleAjouterAuPanier[i].quantiteChoisi} €</th>
      </tr>`
    }


//  recuperer et enregistrer le prix total dans le local storage
let prixTotale = [];

for(let n = 0; n < articleAjouterAuPanier.length; n++){
    prixTotale.push(articleAjouterAuPanier[n].prix*articleAjouterAuPanier[n].quantiteChoisi);
}
console.log(prixTotale);
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotaleFinal = prixTotale.reduce(reducer,0);
console.log(prixTotaleFinal);
localStorage.setItem("prixTotal",prixTotaleFinal);

document.getElementById("prixTotale").innerHTML += `<tr>
<th colspan=4>Prix total</th>
<th>${prixTotaleFinal} €</th>
</tr>`;


// Ecouter le bouton vider le panier et supprimer les articles du local storage

const btnViderPanier = document.getElementById("vider");

btnViderPanier.addEventListener("click", (event) => {
    event.preventDefault;
    localStorage.clear();
    alert("Le panier est désormais vide");
    window.location.href = "index.html";
});





}

// Ecouter le btn "valider le panier", puis recuperer les infos du formulaire et faire une requete POST

document.getElementById("validerPanier").addEventListener("click", function(){
    var valide = true;
    var objContact = [];
    for(var input of document.querySelectorAll(".form input")){
        objContact.push(input.value);
        
        valide &= input.reportValidity();
        if(!valide){
            break;
        }
    }
    if(valide){
        let contact = {
            firstName: objContact[0],
            lastName: objContact[1],
            address: objContact[4],
            city: objContact[3],
            email: objContact[2],
        };
        let products = [];
            for (listeId of articleAjouterAuPanier) {
                products.push(listeId.id);
            }

        const order = {
            contact,
            products,
        }
        localStorage.setItem("form", JSON.stringify(order));
        fetch("http://localhost:3000/api/furniture/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            })
                .then((data) => data.json())
                .then((reponseOrder) => {
                    localStorage.setItem("order", JSON.stringify(reponseOrder));
                    document.location.href = "order.html";
                })
                .catch((erreur) => console.log("erreur : " + erreur));
       
    }
    }
);
