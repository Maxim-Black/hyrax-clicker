console.log("ahoj c:");
//let cislo = prompt("zadej cislo");
//if (cislo % 2 == 0){
//    alert("je to sude")
//}
    
//else{
//    alert("je to liche")
//}

//let pocitadlo = 1;


//while (pocitadlo <= 5) {
//    console.log("Číslo je: " + pocitadlo);
//    pocitadlo++;
//}


//for (let i = 1; i <= 50; i++) {
//    console.log(i);
//}


//let playlist = ["dracula", "lying from you", "Judas"];
//playlist.push("borderline");
//for (let i=0 ; i<playlist.length; i++){
//    console.log(1+i+"pisnička je "+ playlist[i]);
//}
//let vymazanapisnicka = playlist.pop();
//for (let i=0 ; i<playlist.length; i++){
//    console.log(1+i+"pisnička je "+ playlist[i]);
//}
    
//function soucetcisel (a,b){
 //   return a+b
//}

//let a = prompt ("zadej cislo");
//let b = prompt ("zadej cislo");

//let vysledek = soucetcisel(a,b);
//alert(vysledek);

/*let hrac = {
    Jmeno: "petr",
    hp: 80,
    max_hp: 100,
    inventory: ["mapa", "potion", "meč"],
    
    vypijlektvar: function () {
        let indexPotionu = this.inventory.indexOf("potion");
        
        if (indexPotionu > -1) {
            this.inventory.splice(indexPotionu, 1);
            this.hp = this.hp + 20;
            
            if (this.hp > this.max_hp) {
                this.hp = this.max_hp;
            }
            
            console.log(`vypil si lektvar žužo Nový počet HP: ${this.hp}. Zbylý inventář: ${this.inventory}`);
        } else {
            console.log(`smolík nemáš potion`);
        }
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'h' || event.key === 'H') {
        hrac.vypijlektvar();
    }
});*/
/*let mujPanel = document.getElementById("zadani");
console.log(mujPanel);
let nadpis = document.getElementById("nadpis");
nadpis.style.color = "red";
nadpis.style.backgroundColor = "black";
nadpis.style.fontSize = "3rem";*/

/*let tlacitko = document.getElementById("btn");
let pole = document.getElementById("jmeno");
let vystup = document.getElementById("vysledek");
tlacitko.addEventListener("click", function (){
    let zadanyText = pole.value;
    vystup.textContent=zadanyText;
    pole.value = "";
});*/
    const input = document.getElementById("polozka");
    const tlacitko = document.getElementById("tlacitko");
    const seznam = document.getElementById("seznam");

    tlacitko.addEventListener("click", () => {
        const li = document.createElement("li");
        li.textContent = input.value;

        const btnSmazat = document.createElement("button");
        btnSmazat.textContent = "Smazat";

        btnSmazat.addEventListener("click", () => {
            li.remove();
        });

        li.appendChild(btnSmazat);
        seznam.appendChild(li);
        input.value = "";
    });
