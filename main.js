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