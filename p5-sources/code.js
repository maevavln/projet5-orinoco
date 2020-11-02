function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        let listTeddies = JSON.parse(this.responseText);
        console.log(listTeddies);
       document.getElementById("demo").innerHTML = "<img class=\"img-product\" src= \"" + listTeddies[0].imageUrl + "\" alt=\"peluche\">";
       /*<img class="img-product" src="images/teddy_2-min.png" alt="la peluche tit'ours" />*/
      }
    };
    xhttp.open("GET", "http://localhost:3000/api/teddies", true);
    xhttp.send();
  }
console.log("coucou");
loadDoc();