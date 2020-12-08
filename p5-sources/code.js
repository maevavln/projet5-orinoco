function loadDoc(url){
  const teddiespromise = new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        let data = JSON.parse(this.responseText);
        resolve(data);
      }
    };
    console.log(url);
    xhttp.open("GET", url, true);
    xhttp.send();
  });
  return teddiespromise;
}


function createListing(){
  let teddiespromise = loadDoc("http://localhost:3000/api/teddies");
  teddiespromise.then((listTeddies) => {
    console.log(listTeddies);
        for (let i = 0; i < listTeddies.length; i++) {
          let theTeddies = document.getElementById("theTeddies");
          let teddiesImg = document.createElement("img");
          teddiesImg.setAttribute("class", "img-product");
          teddiesImg.setAttribute("src", listTeddies[i].imageUrl);
          teddiesImg.setAttribute("alt", "peluche : " + listTeddies[i].name);
          let teddiesDiv = document.createElement('div');
          teddiesDiv.setAttribute("class", "details-teddies col-3 custom-line");
          teddiesDiv.appendChild(teddiesImg);
          let teddiesDivName = document.createElement("div");
          teddiesDivName.setAttribute("class", "infos-teddies");
          teddiesDiv.appendChild(teddiesDivName);
          let teddiesName = document.createElement("h3");
          teddiesName.setAttribute("class", "name-teddies text-center style-name-teddy");
          teddiesName.textContent = listTeddies[i].name;
          teddiesDivName.appendChild(teddiesName);
          let descriptionTeddie = document.createElement('div');
          descriptionTeddie.setAttribute("class", "description-teddies text-justify");
          descriptionTeddie.textContent = listTeddies[i].description;
          teddiesDivName.appendChild(descriptionTeddie);
          let priceTeddie = document.createElement('div');
          priceTeddie.setAttribute("class", "price-teddies text-center custom-price");
          priceTeddie.textContent = listTeddies[i].price + " €";
          teddiesDivName.appendChild(priceTeddie);
          let plusDinfo = document.createElement('a');
          plusDinfo.setAttribute("class", "infos-teddy text-center");
          plusDinfo.textContent = "Voir la fiche produit";
          plusDinfo.setAttribute("href", "product.html?id=" + listTeddies[i]._id);
          teddiesDivName.appendChild(plusDinfo);
          theTeddies.appendChild(teddiesDiv);
        }
    console.log("toutes les peluches ont été recuperees");
  })
}

function createOneTeddyPage(urlProduct, productId){
  console.log(urlProduct);
  if (productId === undefined) {
    // afficher une page qui dit que le produit n'existe pas
    console.log("le produit n'existe pas");  
  }
  else {
    let teddiespromise = loadDoc(urlProduct);
    teddiespromise.then((teddy) => {
      console.log(teddy);
      //let panier = localStorage.getItem('panier');
      //localStorage.setItem("panier", panier + "\n" + teddy._id);
      let imgProduct = document.getElementById("img-product");
      //imgProduct.setAttribute("class", "product-img");
      imgProduct.setAttribute("src",teddy.imageUrl);
      let nameProduct = document.getElementById("name-product");
      //nameProduct.setAttribute("class", "name-teddy");
      nameProduct.textContent = teddy.name;
      //let colorProduct = document.getElementById("color-product");
      //colorProduct.setAttribute("class", "color-teddy");
      //colorProduct.textContent = teddy.colors;
      let descriptionProduct = document.getElementById("product-description");
      descriptionProduct.setAttribute("class", "description-product space-product-description");
      descriptionProduct.textContent = teddy.description;
      let priceProduct = document.getElementById("product-price");
      //priceProduct.setAttribute("class", "price-product space-product-price");
      priceProduct.textContent = teddy.price + " €";
      addColorInSelector(teddy.colors);

      let btnAddCart = document.getElementById("btn-add-cart");
      btnAddCart.addEventListener("click", () => {
        addProductToCart(teddy);
      });
    });
  }
   onLoadCartNumbers()

}

function addColorInSelector(colorList){
  let colorSelector = document.getElementById("color-product")
  for (let i = 0; i < colorList.length; i++) {
    let option = document.createElement("option");
    option.text = colorList[i];
    colorSelector.add(option);
  };
}

function onLoadCartNumbers(){ //creation d'un patch panier
  let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
      document.querySelector('.btn-cart span').textContent = productNumbers;
    }
}

function addProductToCart(product) {
  console.log("the product clicked is", product);
  //let jsonProduct = JSON.stringify(product);
  //console.log(jsonProduct);
  let products = localStorage.getItem("cartProduct");
  if (products == null) {
    let productArray = [];
    productArray.push(product);
    jsonProducts = JSON.stringify(productArray);
    localStorage.setItem("cartProduct", jsonProducts);
  }
  else {
    productArray = JSON.parse(products);
    productArray.push(product);
    jsonProducts = JSON.stringify(productArray);
    localStorage.setItem("cartProduct", jsonProducts);
  }

  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  if( productNumbers ) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector('.btn-cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector('.btn-cart span').textContent = 1;
  }
}

