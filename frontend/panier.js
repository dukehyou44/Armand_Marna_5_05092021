let articleAjouterAuPanier = JSON.parse(localStorage.getItem("article"));


const tableauPanier = document.getElementById("tableau");

if(articleAjouterAuPanier === null){
    const panierVide = `
    <div class="panier vide">
    <div>Votre panier est vide</div>
    </div>
    `;
    tableauPanier.innerHTML = panierVide;
}else{
    var affichageArticlePanier = [];
    const articlePanier = document.getElementById("articleDuPanier"); 

    for(let i = 0; i < articleAjouterAuPanier.length; i++){
        
        articlePanier.innerHTML += `<tr>
        <th>${articleAjouterAuPanier[i].nom}</th>
        <th>${articleAjouterAuPanier[i].choixUser}</th>
        <th>${articleAjouterAuPanier[i].prix} €</th>
      </tr>`
    }

}

let prixTotale = [];

for(let n = 0; n < articleAjouterAuPanier.length; n++){
    prixTotale.push(articleAjouterAuPanier[n].prix);
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotaleFinal = prixTotale.reduce(reducer,0);

document.getElementById("prixTotale").innerHTML += `
<th>Prix total</th>
<th>${prixTotaleFinal} €</th>`;



const btnViderPanier = document.getElementById("vider");

btnViderPanier.addEventListener("click", (event) => {
    event.preventDefault;
    localStorage.removeItem("article");
    alert("Le panier est désormais vide");
    window.location.href = "index.html";
});








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
