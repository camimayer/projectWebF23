// Vérifie si la page HTML est chargée avant le script
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
// Déclaration des variables globales
var totalAmount = "0.00";

// Fonction à exécuter après le chargement de la page HTML
// Cette fonction écoute les événements et exécute les fonctions en fonction de chaque événement
function ready() {
    const addToCartButtons = document.getElementsByClassName("add-product-button");
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart);
    }

    const purchaseButton = document.getElementsByClassName("purchase-button")[0];
    purchaseButton.addEventListener("click", makePurchase);
}
// Cette fonction confirme l'achat et vide le panier
function makePurchase() {
    if (totalAmount == "0.00") {
        alert("Votre Panier est vide!");
    } else {
        alert(
            `
            Votre commande a été finalisée avec succès !
            Valeur de la commande : ${totalAmount}$
            Merci pour votre achat et revenez souvent.
            `
        )
    }
    
    const listproductscart = document.getElementsByClassName("remove-product-button")
    for (var i = listproductscart.length; i >= 0;) {
        listproductscart[listproductscart.length -1].parentElement.parentElement.remove();
        updateTotal();
    }
}

// Cette fonction ajoute des articles au panier
function addProductToCart(event) {
    const button = event.target;
    const productInfos = button.parentElement;
    const productImage = productInfos.getElementsByClassName("product-img")[0].src;
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText;
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText;

    const productCartName = document.getElementsByClassName("cart-product-title");
    for (var i = 0; i < productCartName.length; i++) {
        //Vérifie si l'article existe dans le panier et modifie uniquement la quantité
        if (productCartName[i].innerText == productTitle) {
            productCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++;
            updateTotal()
            // Quitte la fonction pour ne pas répéter l'élément déjà existant
            return;
        }
    }

    let newCartProduct = document.createElement("tr");
    // Ajoute la ligne "tr" au HTML
    newCartProduct.classList.add("cart-product");
    // Ajoute des colonnes "td" au HTML
    newCartProduct.innerHTML =
    ` 
        <td class="product-identification">
        <img class="cart-product-image" src="${productImage}" alt="${productTitle}"> 
        <strong class="cart-product-title">${productTitle}</strong>
        </td>
        <td>
        <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
        <input class="product-qtd-input" type="number" value="1" min="1">
        <button class="remove-product-button" type="button">Supprimer</button>
        </td>
    ` ;

    const tableBody = document.querySelector(".cart-table tbody");
    // Ajoute l'article au panier
    tableBody.append(newCartProduct);
    
    updateTotal();
    // Écoute les événements de changement de quantité et de suppression des articles ajoutés au panier
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", updateTotal);
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click",removeProduct);
}

// Cette fonction remove des articles du panier
function removeProduct(event) {
    event.target.parentElement.parentElement.remove();
    updateTotal();
}

// Cette fonction met à jour la valeur "Total" du panier
function updateTotal() {
    totalAmount = 0;
    const cartProducts = document.getElementsByClassName("cart-product");
    for (var i = 0; i < cartProducts.length; i++) {
        const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("$", "");
        const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value;
        totalAmount += productPrice * productQuantity;
    }
    totalAmount = totalAmount.toFixed(2);
    document.querySelector(".cart-total-container span").innerText = totalAmount + "$";
}
