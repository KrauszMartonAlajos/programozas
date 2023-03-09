var sor;
var oszlop;
var jatekter;
var lepes = 0;
var matrix = [];
var generalva = false;
var nyert = false;
var Xpontok = 0;
var Opontok = 0;
jatekvege = false;
var iranyVektor = [[1,0],[-1,0],//víszintes
				   [0,-1],[0,1], //függleges
				   [1,-1],[-1,1], //főátló
				   [1,1],[-1,-1] //mellékátló				
					]; 


function uresMatrix() {
    for (let i = 0; i < sor; i++){
        let uresSor = [];
        for (let j = 0; j < oszlop; j++)
        {
            uresSor.push(0);    
        }
        matrix.push(uresSor);
    }
}

function Katt(td){ 
    // console.log(td)
    if(nyert== false){
        if(td.innerHTML == "")
        {
            let jatekos;
            if (lepes % 2 == 0) {
                td.innerHTML = "X";
                jatekos = "X";
                matrix[td.dataset.sor][td.dataset.oszlop] = "X";
            }
            else { 
                td.innerHTML = "O";
                jatekos = "O";
                matrix[td.dataset.sor][td.dataset.oszlop] = "O";
            }
            lepes++;
            for (let i = 0; i < iranyVektor.length; i += 2) { 
                
                if (megszamol(i, jatekos, td.dataset.sor-0, td.dataset.oszlop-0) + megszamol(i+1, jatekos, td.dataset.sor-0, td.dataset.oszlop-0)+1 == 5) { 
                    console.log("Nyert a",jatekos);
                    if(jatekos == "O"){
                        Opontok++;
                    }
                    else{
                        Xpontok++;
                    }
                    console.log(Xpontok);
                    nyert = true;
                    matrix = [];
                    uresMatrix();
                    console.log(matrix);
                    jatekvege = true;
                    KiErtekeles();
                }
            }
        }
        KiVanSoron();
    }
	
    
    
}

function matrixSzelen(aktsor, aktoszlop) {
    return aktsor < 0 || aktsor >= sor || aktoszlop < 0 || aktoszlop >= oszlop;
}

function jatekosVanE(aktsor, aktoszlop,jatekos) { 
    return matrix[aktsor][aktoszlop] == jatekos; 
}

function megszamol(irany,jatekos,startx,starty) {
    let db = 1;
    while (!matrixSzelen(startx + iranyVektor[irany][0] * db, starty + iranyVektor[irany][1] * db) &&
             jatekosVanE(startx + iranyVektor[irany][0] * db, starty + iranyVektor[irany][1] * db,jatekos)) { 
        db++;
    }
    return db - 1;
}

function generalas() { 
    if(generalva == false){
        generalva = true;
        jatekter = document.getElementById("jatekter");
        oszlop = document.getElementById('number-input-y').value;
        sor = document.getElementById('number-input-x').value;
        let table = document.createElement("table");
        uresMatrix();
        for (let i = 0; i < sor; i++) { 
            var tr = document.createElement("tr");
            for (let j = 0; j < oszlop; j++) { 
                let td = document.createElement("td");
                //td.addEventListener("click","katt(this)");
                td.setAttribute("onclick", "Katt(this)")
                td.dataset.sor = i;
                td.dataset.oszlop = j;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        console.log()
        jatekter.appendChild(table);
        KiVanSoron();
        
    }
    
}

function KiVanSoron(){
    var div = document.getElementById("ki_ertekeles");
    div.innerHTML="";
    if(lepes % 2 == 0){
        div.innerHTML+="Soron következik: X";
    }
    else{
        div.innerHTML+="Soron következik: O";
    }   
    div.innerHTML+="</br>";
    KiErtekeles(); 
}

function KiErtekeles(){
    var div = document.getElementById("ki_ertekeles");
    div.innerHTML+="Pontok:";
    div.innerHTML+="</br>";
    div.innerHTML+="X pontjai:";
    div.innerHTML+=Xpontok;
    div.innerHTML+="</br>";
    div.innerHTML+="O pontjai:";
    div.innerHTML+=Opontok;

}

function ReGeneralas(){
    if(jatekvege == true){
        var table = document.getElementsByTagName("table");
    nyert = false;
    table[0].innerHTML = "";
    table[0].remove();
    generalva = false;
    jatekvege = false;
    }
    else{
        console.log("tesó hadd érjen már véget majd akkor rá ér újra generálni")
    }
    
}
//hozzá adott funkciók:
//csak egy mezőt lehet generálni
//nem lehet a játék vége után újra kattintani
//matrixot reseteli
//ujrageneralas
//mutatja ki van soron (körönként vált hogy ki kezd)
//pontokat is mutat

//design:
//középre vannak igazítva a jelek
//szép gomb
//gombhoz passzoló leírás
//márvány stílus