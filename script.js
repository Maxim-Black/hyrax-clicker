
/*let skore = 150;
let hrac = "Karel";
let text2 = `Hráč ${hrac} má ${skore} bodů.`; 

let nahodneCislo = Math.floor(Math.random() * 10) +1;
console.log(`hodnota kostky: ${nahodneCislo}`);

let hyrax=0;
setInterval(function() {
    hyrax++;
    console.log(`Automatický příjem. Stav účtu: ${hyrax}`); 
}, 10);*/

/*setInterval(function(){
    hyrax=hyraxzasekundu
}, 1000);*/

/*let hyrax = 0;
let silaKliknuti = 1;
let hyraxzasekundu =0;

let btnHyrax = document.getElementById("btn-hyrax");
let textSkore = document.getElementById("skore");

btnHyrax.addEventListener("click", function() {
    hyrax += silaKliknuti; 
    textSkore.textContent = hyrax;
});




let btnFarma = document.getElementById("btn-farma");
let cenaFarma = 10;

btnFarma.addEventListener("click", function() {
    if (hyrax >= cenaFarma) {
        hyrax -= cenaFarma;
        silaKliknuti++;         
        
        textSkore.textContent = hyrax; 
        
        cenaFarma += 10; 
        btnFarma.textContent = `koupit farmu  (Cena: ${cenaFarma} hyraxu)`;
    } else {
        alert("Nedostatek prostředků!");
    }
});


let btnTovarna = document.getElementById("btn-tovarna");
let cenaTovarna = 50;

btnTovarna.addEventListener("click", function() {
    if (hyrax >= cenaTovarna) {
        hyrax -= cenaTovarna;
        textSkore.textContent = hyrax;
        
        cenaTovarna += 50;
        btnTovarna.textContent = `Koupit Továrnu (Cena: ${cenaTovarna})`;
        
        setInterval(function() {
            hyrax++; 
            textSkore.textContent = hyrax;
        }, 1000);
    }
})*/
let randSeed = Date.now();
function nahoda() {
    randSeed = (randSeed * 9301 + 49297) % 233280;
    return randSeed / 233280;
}

function nahodaCeleCislo(max) {
    return parseInt(nahoda() * max);
}

let hyrax = 0;
let silaKliknuti = 1;
let hyraxzasekundu = 0;
let multiplier = 1;
let isSpinning = false;
let tajnaSanceJackpot = 0;
let milionarInProgress = false;

let tBronzova = false;
let tStribrna = false;
let tZlata = false;
let tDiamantova = false;

let btnHyrax = document.getElementById("btn-hyrax");
let textSkore = document.getElementById("skore");
let textSkoreSec = document.getElementById("skore-sec");
let textSkoreClick = document.getElementById("skore-click");

let btnFarma = document.getElementById("btn-farma");
let btnTovarna = document.getElementById("btn-tovarna");
let btnPortal = document.getElementById("btn-portal");
let btnKlonovac = document.getElementById("btn-klonovac");
let btnChram = document.getElementById("btn-chram");

let elCenaFarma = document.getElementById("cena-farma");
let elCenaTovarna = document.getElementById("cena-tovarna");
let elCenaPortal = document.getElementById("cena-portal");
let elCenaKlonovac = document.getElementById("cena-klonovac");
let elCenaChram = document.getElementById("cena-chram");

let btnOpenWheel = document.getElementById("btn-open-wheel");
let btnCloseWheel = document.getElementById("btn-close-wheel");
let wheelModal = document.getElementById("wheel-modal");
let btnSpin = document.getElementById("btn-spin");
let wheel = document.getElementById("wheel");

let btnMilionar = document.getElementById("btn-milionar");
let milionarModal = document.getElementById("milionar-modal");

let jackpotOverlay = document.getElementById("jackpot-overlay");
let jackpotTimer = document.getElementById("jackpot-timer");
let timerSeconds = document.getElementById("timer-seconds");

let soundHyraxContainer = document.getElementById("sound-hyrax-container");
let audioClick = document.getElementById("audio-click");
let audioJackpot = document.getElementById("audio-jackpot");
let audioMilionarStart = document.getElementById("audio-milionar-start");
let audioWait = document.getElementById("audio-wait");
let audioSure = document.getElementById("audio-sure");
let audioFinal = document.getElementById("audio-final");
let audioCorrect = document.getElementById("audio-correct");
let audioWrong = document.getElementById("audio-wrong");

let rainInterval;
let odpocetJackpotu;

let cenaFarma = 10;
let cenaTovarna = 50;
let cenaPortal = 250;
let cenaKlonovac = 1000;
let cenaChram = 5000;

function aktualizujStav() {
    textSkoreSec.textContent = hyraxzasekundu;
    textSkoreClick.textContent = silaKliknuti * multiplier;
    
    if (hyrax >= cenaFarma) btnFarma.classList.add("affordable");
    else btnFarma.classList.remove("affordable");

    if (hyrax >= cenaTovarna) btnTovarna.classList.add("affordable");
    else btnTovarna.classList.remove("affordable");

    if (hyrax >= cenaPortal) btnPortal.classList.add("affordable");
    else btnPortal.classList.remove("affordable");

    if (hyrax >= cenaKlonovac) btnKlonovac.classList.add("affordable");
    else btnKlonovac.classList.remove("affordable");

    if (hyrax >= cenaChram) btnChram.classList.add("affordable");
    else btnChram.classList.remove("affordable");
}

function zkontrolujTrofeje() {
    if (hyrax >= 1000 && !tBronzova) {
        tBronzova = true;
        document.getElementById("trofej-bronzova").classList.add("unlocked");
    }
    if (hyrax >= 10000 && !tStribrna) {
        tStribrna = true;
        document.getElementById("trofej-stribrna").classList.add("unlocked");
    }
    if (hyrax >= 100000 && !tZlata) {
        tZlata = true;
        document.getElementById("trofej-zlata").classList.add("unlocked");
    }
    if (hyrax >= 1000000 && !tDiamantova) {
        tDiamantova = true;
        document.getElementById("trofej-diamantova").classList.add("unlocked");
    }
}

function zmenSkore(hodnota) {
    hyrax += hodnota;
    if (hyrax < 0) hyrax = 0;
    textSkore.textContent = hyrax;
    aktualizujStav();
    zkontrolujTrofeje();
}

function vytvorPlovouciText(x, y, hodnota) {
    let text = document.createElement("div");
    text.className = "floating-text";
    text.textContent = "+" + hodnota;
    text.style.left = x + "px";
    text.style.top = y + "px";
    document.body.appendChild(text);
    setTimeout(function() { text.remove(); }, 1000);
}

btnHyrax.addEventListener("click", function(e) {
    let pridano = silaKliknuti * multiplier;
    zmenSkore(pridano);
    vytvorPlovouciText(e.clientX - 20, e.clientY - 20, pridano);
});

btnFarma.addEventListener("click", function() {
    if (hyrax >= cenaFarma) {
        zmenSkore(-cenaFarma);
        silaKliknuti += 1;         
        cenaFarma += 10; 
        elCenaFarma.textContent = cenaFarma;
    }
});

btnTovarna.addEventListener("click", function() {
    if (hyrax >= cenaTovarna) {
        zmenSkore(-cenaTovarna);
        hyraxzasekundu += 1;
        cenaTovarna += 50;
        elCenaTovarna.textContent = cenaTovarna;
    }
});

btnPortal.addEventListener("click", function() {
    if (hyrax >= cenaPortal) {
        zmenSkore(-cenaPortal);
        hyraxzasekundu += 10;
        cenaPortal += 250;
        elCenaPortal.textContent = cenaPortal;
    }
});

btnKlonovac.addEventListener("click", function() {
    if (hyrax >= cenaKlonovac) {
        zmenSkore(-cenaKlonovac);
        silaKliknuti += 5;
        cenaKlonovac += 1000;
        elCenaKlonovac.textContent = cenaKlonovac;
    }
});

btnChram.addEventListener("click", function() {
    if (hyrax >= cenaChram) {
        zmenSkore(-cenaChram);
        hyraxzasekundu += 50;
        cenaChram += 5000;
        elCenaChram.textContent = cenaChram;
    }
});

soundHyraxContainer.addEventListener("click", function() {
    audioClick.currentTime = 0;
    audioClick.play();
    tajnaSanceJackpot += 5; 
});

btnOpenWheel.addEventListener("click", function() {
    wheelModal.classList.remove("hidden");
});

btnCloseWheel.addEventListener("click", function() {
    if (!isSpinning) wheelModal.classList.add("hidden");
});

btnSpin.addEventListener("click", function() {
    if (isSpinning) return;
    if (hyrax < 100) return;

    zmenSkore(-100);
    isSpinning = true;

    let segmenty = 11;
    let nahodnySegment;
    let sanceHod = nahodaCeleCislo(100); 

    if (sanceHod < tajnaSanceJackpot) {
        nahodnySegment = 10; 
    } else {
        nahodnySegment = nahodaCeleCislo(segmenty); 
    }
    
    tajnaSanceJackpot = 0; 

    let stupneJednohoSegmentu = 360 / segmenty;
    let cilovyUhel = (360 - (nahodnySegment * stupneJednohoSegmentu)) - (stupneJednohoSegmentu / 2);
    let celkoveOtoceni = 1800 + cilovyUhel; 

    wheel.style.transform = `rotate(${celkoveOtoceni}deg)`;

    setTimeout(function() {
        isSpinning = false;
        wheel.style.transition = "none";
        wheel.style.transform = `rotate(${cilovyUhel}deg)`;
        setTimeout(function() { wheel.style.transition = "transform 4s cubic-bezier(0.15, 0.85, 0.35, 1)"; }, 50);

        vyhodnotKolo(nahodnySegment);
    }, 4000);
});

function vyhodnotKolo(segment) {
    let policka = [150, 50, 100, 20, 80, -10, -50, -30, -80, -20, "jackpot"];
    let vysledek = policka[segment];

    if (vysledek === "jackpot") {
        spustJackpot();
    } else if (vysledek > 0) {
        zmenSkore(vysledek);
    } else {
        zmenSkore(vysledek);
    }
}

function spustRain() {
    rainInterval = setInterval(function() {
        let drop = document.createElement("img");
        drop.src = "media/hyraxklikani.png";
        drop.className = "rain-drop";
        drop.style.left = nahodaCeleCislo(window.innerWidth) + "px";
        drop.style.animationDuration = (2 + nahodaCeleCislo(3)) + "s";
        document.getElementById("rain-container").appendChild(drop);
        
        setTimeout(function() { drop.remove(); }, 5000);
    }, 150);
}

function zastavRain() {
    clearInterval(rainInterval);
    document.getElementById("rain-container").innerHTML = "";
}

function spustJackpot() {
    jackpotOverlay.classList.remove("hidden");
    audioJackpot.currentTime = 0;
    audioJackpot.play();
    spustRain();

    setTimeout(function() {
        jackpotOverlay.classList.add("hidden");
        multiplier = 3;
        jackpotTimer.classList.remove("hidden");
        aktualizujStav();
        
        let zbyvajiciCas = 60;
        timerSeconds.textContent = zbyvajiciCas;

        clearInterval(odpocetJackpotu);
        odpocetJackpotu = setInterval(function() {
            zbyvajiciCas--;
            timerSeconds.textContent = zbyvajiciCas;
            
            if (zbyvajiciCas <= 0) {
                clearInterval(odpocetJackpotu);
                multiplier = 1;
                jackpotTimer.classList.add("hidden");
                audioJackpot.pause();
                zastavRain();
                aktualizujStav();
            }
        }, 1000);

    }, 5000);
}

btnMilionar.addEventListener("click", function() {
    if (milionarInProgress) return;
    
    audioMilionarStart.currentTime = 0;
    audioMilionarStart.play();
    
    setTimeout(function() {
        milionarModal.classList.remove("hidden");
        audioWait.currentTime = 0;
        audioWait.play();
    }, 3000);
});

let tlacitkaOdpovedi = document.querySelectorAll(".odpoved");
for(let i = 0; i < tlacitkaOdpovedi.length; i++) {
    tlacitkaOdpovedi[i].addEventListener("click", function() {
        if (milionarInProgress) return;
        milionarInProgress = true;

        let vybraneTlacitko = this;
        vybraneTlacitko.classList.add("selected");

        audioWait.pause();
        audioSure.currentTime = 0;
        audioSure.play();

        setTimeout(function() {
            audioFinal.currentTime = 0;
            audioFinal.play();

            setTimeout(function() {
                let spravne = vybraneTlacitko.getAttribute("data-correct") === "true";
                vybraneTlacitko.classList.remove("selected");

                if (spravne) {
                    audioCorrect.play();
                    milionarModal.classList.add("hidden");
                    milionarInProgress = false;
                    spustJackpot();
                } else {
                    audioWrong.play();
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                }
            }, 4000); 

        }, 3500); 
    });
}

setInterval(function() {
    if (hyraxzasekundu > 0) {
        zmenSkore(hyraxzasekundu);
    }
}, 1000);

aktualizujStav();