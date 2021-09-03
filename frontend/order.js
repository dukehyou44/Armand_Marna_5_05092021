let order = JSON.parse(localStorage.getItem("order"))
console.log(order.orderId);
let prix = localStorage.getItem("prixTotal")

document.getElementById("orderId").innerHTML += `
<p class="text-white">Le prix total est de ${prix} €.</p>
<p class="text-white">Votre numéro de commande est : ${order.orderId}.</p>`;


setTimeout (function finDeCommande (){
alert("Nous vous remercions pour votre confiance. Votre commande est en cours de traitement. Appuyez OK votre aller sur la page d'accueil.")
localStorage.clear();
window.location.href = "index.html";
},5000);