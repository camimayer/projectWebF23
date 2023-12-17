var products = document.getElementById("products");
console.log(products)
var purchase = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
var total_price = 0;

products.addEventListener('click', (e)=>{
	
    console.log("Clicou");
    console.log(e.target.name);
    var index = e.target.name.slice(8);
	console.log(index);

    var name = document.getElementById("name"+index);
     name = name.innerText;
    console.log(name);
    
    var price = document.getElementById("price"+index);
    price = price.innerText.slice(0, -1)
    console.log(price)

    var qty = document.getElementsByName("qty"+index)[0];
    qty = qty.value
    console.log(qty)

    purchase[index] = Number(qty)

    alert("You added $" + Number(qty) * Number(price))
    
    total_price = total_price + Number(qty) * Number(price);

    var element_price = document.getElementById("total-price");
    element_price.innerText = "$" + total_price;
         

})

var btnPay = document.getElementById("btn-pay");
var modalPay = document.getElementById("myModalPayment");

window.onclick = function(event) {
    console.log(event.target)
    if (event.target == modalPay) {
        modalPay.style.display = "none";
    }
}

btnPay.onclick = function (){
    modalPay.style.display = "block";

    var bodyModal = document.getElementById("body-modal");
    bodyModal.innerHTML = "";

    
    for(var i = 0; i < purchase.length; i++){
        if(purchase[i] > 0){
            var name = document.getElementById("name"+i);
            name = name.innerText;
            console.log(name);
            
            var price = document.getElementById("price"+i);
            price = price.innerText.slice(0, -1)
            console.log(price)

            var qty = document.getElementsByName("qty"+i)[0];
            qty = qty.value
            console.log(qty)

            var img = document.getElementById("img"+i);
            
            var newTr = document.createElement("tr");
            newTr.className = "cart-product";

            var newTd1 = document.createElement("td");
            newTd1.className = "product-identification";

            var newImg = document.createElement("img");
            newImg.className = "cart-product-image";
            newImg.src = img.src;

            var newStrong = document.createElement("strong");
            newStrong.className = "cart-product-title";
            newStrong.innerText = name;

            newTd1.appendChild(newImg);
            newTd1.appendChild(newStrong);

            newTr.appendChild(newTd1);

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


            bodyModal.appendChild(newTr);

            console.log(bodyModal);
            
        }
    }

    var totalPriceSpan = document.getElementById("total-price-modal");
    var priceGstSpan = document.getElementById("price-gst");
    var priceQstSpan = document.getElementById("price-qst");

    var taxGst = total_price*0.09975;

    var totalPriceTax = total_price + taxGst;

    var taxQst = totalPriceTax * 0.05;

    totalPriceTax = totalPriceTax + taxQst;
    

    priceGstSpan.innerText = taxGst.toFixed(2) + "$";
    priceQstSpan.innerText = taxQst.toFixed(2) + "$";
    totalPriceSpan.innerText = totalPriceTax.toFixed(2) + "$";
}