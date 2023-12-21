var products = document.getElementById("products"); //on prenndre l'element du html
console.log(products)
var purchase = new Array(0,0,0,0,0,0,0,0,0,0,0,0); //creation du tableaux pour enregistrer les elements du cart dans chaque index
var total_price = 0; //variable pour le calcul du prix total avant le taxes
var modalPay = document.getElementById("myModalPayment");
var modalFinal = document.getElementById("modal-final");
var modalPay2 = document.getElementById("ModalPayment2");

products.addEventListener('click', (e)=>{  //event quand on click dans tout la <section> ca va appeller les instructions suivants
	
    console.log("Clicou"); //test pour voir si la function fonctionne
    console.log(e.target.name); // le target d'interet c'est le button et le valeur c'est le name 
    var index = e.target.name.slice(8); // couper le name pour rester juste le index de chaque produit 
	console.log(index);

    var name = document.getElementById("name"+index); //utiliser l'index pour accéder au nom du produit cliqué
     name = name.innerText; // la variable name va recevoir le nom du produit
    console.log(name);
    
    var price = document.getElementById("price"+index); //utiliser l'index pour accéder au prix du produit cliqué
    price = price.innerText.slice(0, -1) // la variable price va recevoir le prix jusq'au index -1 pour couper le dernier index ($)
    console.log(price)

    var qty = document.getElementById("qty"+index); //utiliser l'index pour accéder a la quantite du produit cliqué
    qty = qty.value //la variable qty va recevoir la quantite que l'utlisateur a choisi dans les options
    console.log(qty)

    purchase[index] = purchase[index] + Number(qty) // le array purchase va recevoir dans l'index la quantite selectione 

    alert("You added $" + Number(qty) * Number(price)) //alert pour montrer au utilisateur qu'il combien de bouteilles il a ajoute avec le prix total
    
    total_price = total_price + Number(qty) * Number(price); //calcul pour montrer le prix totale avnt les taxes

    var element_price = document.getElementById("total-price"); 
    element_price.innerText = "$" + total_price; //montrer dans le cart le prix total avant les taxes + le $
         

})

var btnCart = document.getElementById("btn-cart"); 



btnCart.onclick = function (){ //quand click ici ca ouvre le premier modal
    modalPay.style.display = "block"; // Une classe a été créée dans le CSS "none" pour que le modal n'apparaisse pas, lorsque l'on clique sur btnCart l'affichage devient block pour afficher le modal

    var bodyModal = document.getElementById("body-modal"); 
    bodyModal.innerHTML = ""; //remove le code HTML pour eviter repetition des produits

    
    for(var i = 0; i < purchase.length; i++){ // loop pour entrer dans l'array
        if(purchase[i] > 0){ // si le valeur dans l'index est plus grand que 0
            var name = document.getElementById("name"+i); // elle va afficher le nom en utilisant l'index du produit choisi
            name = name.innerText;
            console.log(name);
            
            var price = document.getElementById("price"+i);
            price = price.innerText.slice(0, -1)
            console.log(price)

            var qty = purchase[i]; //prendre la quantite dans l'array de purchase
            

            var img = document.getElementById("img"+i); // on va afficher aussi l'image du produit
            
            var newTr = document.createElement("tr"); //creation d'un element tr
            newTr.className = "cart-product"; 

            var newTd1 = document.createElement("td"); 
            newTd1.className = "product-identification";

            var newImg = document.createElement("img");
            newImg.className = "cart-product-image";
            newImg.src = img.src;

            var newStrong = document.createElement("strong");   
            newStrong.className = "cart-product-title";
            newStrong.innerText = name;

            newTd1.appendChild(newImg); //pour mettre la tag newImg dans newTd1
            newTd1.appendChild(newStrong); // pour metre la tag newStrong dans newTd1

            newTr.appendChild(newTd1); // newTr va recevoir toute le newTd1

            var newTd2 = document.createElement("td");
            var newSpan = document.createElement("span");
            newSpan.className = "cart-product-price";
            newSpan.innerText = price + "$";

            newTd2.appendChild(newSpan);
            newTr.appendChild(newTd2);   
            
            var newTd3 = document.createElement("td");
            var newInput = document.createElement("input");
            newInput.className = "product-qtd-input";
            newInput.type = "number";
            newInput.value = qty;
            newInput.readOnly = true;

            newTd3.appendChild(newInput);

            newTr.appendChild(newTd3);


            bodyModal.appendChild(newTr); //l'element bodyModal va recevoir newTr au complet

            console.log(bodyModal);
            
        }
    }

    var totalPriceSpan = document.getElementById("total-price-modal");
    var priceGstSpan = document.getElementById("price-gst");
    var priceQstSpan = document.getElementById("price-qst");

    var taxGst = total_price*0.09975; //calcule pour ajouter les taxes

    var totalPriceTax = total_price + taxGst;

    var taxQst = totalPriceTax * 0.05;

    totalPriceTax = totalPriceTax + taxQst; //prix total avec les taxes
    

    priceGstSpan.innerText = taxGst.toFixed(2) + "$";
    priceQstSpan.innerText = taxQst.toFixed(2) + "$"; //il va mettre dans le code html cette text avec seulement 2 numeros apres la virgule
    totalPriceSpan.innerText = totalPriceTax.toFixed(2) + "$"; 
}
var btnConfirmer = document.getElementById("confirmer-btn"); //button pour aller vers le modal de payment
 


btnConfirmer.onclick = function (){ // adc au button un function pour ouvrir le modal2 quand le utilisateur click
    modalPay2.style.display = "block"; // pour montrer le deuxieme modal
    modalPay.style.display = "none"
}

var form = document.getElementById("form-payment");

form.addEventListener("submit", (event)=>{ //appeler la function quand il clique sur le button confirm
    event.preventDefault();

    var cardnumber= /^\d{16}$/
    var cvc = /^\d{3}$/
    var nameoncard =  /^[a-zA-Z-/ ]*$/ 
    var expiration =  /^\d{2}\/\d{2}$/
    var isFormValid = true;

    var inputCardNumber = document.getElementById("cardNumber");
    var cardNumberError = document.getElementById("card-number-error");
    if(cardnumber.test(inputCardNumber.value)){
        cardNumberError.style.display = "none";
    }
    else{
        cardNumberError.style.display = "flex";
        isFormValid = false;
    }
 
    var inputCvc = document.getElementById("cvc");
    var inputCvcError = document.getElementById("cvcPara");
    if(cvc.test(inputCvc.value)){
        inputCvcError.style.display = "none";
    }
    else{
        inputCvcError.style.display = "flex";
        isFormValid = false;
    }

    var inputNameonCard = document.getElementById("nameoncard");
    var nameoncardError = document.getElementById("nameoncardPara");
    if(nameoncard.test(inputNameonCard.value)){
        nameoncardError.style.display = "none";
    }
    else{
        nameoncardError.style.display = "flex";
        isFormValid = false;
    }

    var inputExpiration = document.getElementById("expiration");
    var ExpirationError = document.getElementById("expirationPara");
    if(expiration.test(inputExpiration.value)){
        ExpirationError.style.display = "none";
    }
    else{
        ExpirationError.style.display = "flex";
        isFormValid = false;
    }

    if(isFormValid){
       
       modalPay.style.display = "none";
       modalPay2.style.display = "none";
       modalFinal.style.display = "block";
        
       var modalFinalBody = document.getElementById("facture"); 
       
       for(var i = 0; i < purchase.length; i++){ // loop pour entrer dans l'array
        if(purchase[i] > 0){ // // si le valeur dans l'index est plus grand que 0
            var name = document.getElementById("name"+i); // elle va afficher le nom en utilisant l'index du produit choisi
            name = name.innerText;
            console.log(name);
            
            var price = document.getElementById("price"+i);
            price = price.innerText.slice(0, -1) // montrer le prix sans le dernier chiffre
            console.log(price)

            var qty = purchase[i];
            

            var newTr = document.createElement("tr"); // creations du element Tr
            

            var newTd1 = document.createElement("td"); //creation des elements Td
            newTd1.innerText = name;

            var newTd2 = document.createElement("td"); 
            newTd2.innerText = qty;

            var newTd3 = document.createElement("td"); 
            newTd3.innerText = price;

            var newTd4 = document.createElement("td"); 
            newTd4.innerText = Number(qty) * Number(price); // calcul pour le total avant taxes

            newTr.appendChild(newTd1);
            newTr.appendChild(newTd2); // newTr va recevoir toutes les NewTd
            newTr.appendChild(newTd3);
            newTr.appendChild(newTd4);

            modalFinalBody.appendChild(newTr); // New Tr va etre dand modalFinalBody
        }
    }
    var totalPriceSpan = document.getElementById("total-price-final");
    var priceGstSpan = document.getElementById("gst-final");
    var priceQstSpan = document.getElementById("qst-final");

    var taxGst = total_price*0.09975; //calcule pour ajouter les taxes

    var totalPriceTax = total_price + taxGst;

    var taxQst = totalPriceTax * 0.05;

    totalPriceTax = totalPriceTax + taxQst; //prix total avec les taxes
    

    priceGstSpan.innerText = taxGst.toFixed(2) + "$";
    priceQstSpan.innerText = taxQst.toFixed(2) + "$"; //il va mettre dans le code html cette text avec seulement 2 numeros
    totalPriceSpan.innerText = totalPriceTax.toFixed(2) + "$";

        
    }
   
}); 

var btnClear = document.getElementById("reset-btn"); // button clear pour effacer toute le form
btnClear.onclick = function(){ 
    var cardNumberError = document.getElementById("card-number-error");
    cardNumberError.style.display = "none"; // appeler chaque id dans une variable et metre a "none"

    var inputCvcError = document.getElementById("cvcPara");
    inputCvcError.style.display = "none";

    var nameoncardError = document.getElementById("nameoncardPara");
    nameoncardError.style.display = "none";

    var ExpirationError = document.getElementById("expirationPara");
    ExpirationError.style.display = "none";

}

window.onclick = function(event) {  // montrer quand l'utilisateur click on the screen
    console.log(event.target) // target pour voir ou l'utilisateur a clique
    if (event.target == modalPay) {
        modalPay.style.display = "none"; // si il a cliqie dehors le modal il va fermer 
    }

    if (event.target == modalPay2) {  
        modalPay2.style.display = "none";
    }
    if (event.target == modalFinal) {  
        modalFinal.style.display = "none";
        form.submit();
    }
}



