let tab = [];
tab[0] = [1, 2, 3, 4];
tab[1] = [5, 6, 7, 8];
tab[2] = [9, 10, 11, 12];
tab[3] = [13, 14, 15, ""];

let up = -1;
let down = 1;
let left = -1;
let right = 1;

$(document).ready(function () {
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab.length; j++) {
            $('.row' + i + ' .case' + j).append(tab[i][j]);
        }
    }

    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab.length; j++) {
                $('.row' + i + ' .case' + j).click(function () {
                    console.log(deplacer(i,j));
                });
        }

    }

    $('#btn').click(function () {
        melanger();
    });
    $('#btn1').click(function () {
        MelangeM(100);
    });


    function dessiner() {
        for (let i = 0; i < tab.length; i++) {
            for (let j = 0; j < tab.length; j++) {
                $('.row' + i + ' .case' + j).html(tab[i][j]);
            }
        }
    }

    function vide(i, j) {
        let v;
        if (tab[i][j] === "") {
            v = true;
        } else {
            v = false;
        }
        return v;
    }

    function existe(i, j) {
        let e;
        if (i >= 0 && i <= 3 && j >= 0 && j <= 3) {
            e = true;
        } else {
            e = false;
        }
        return e;
    }

    function permuter(i1, j1, i2, j2) {
        let v = tab[i1][j1]; // v = ""
        let nonVide = tab[i2][j2]; // nonVide = 12

        tab[i1][j1] = nonVide; // "" = 12
        tab[i2][j2] = v; // 12 = ""

        dessiner();// redessine le tableau
        return tab;
    }

    function tabsimple() {
        let test = [];
        for (let i = 0; i < tab.length; i++) {
            for (let j = 0; j < tab.length; j++) {
                test.push(tab[i][j]);
            }
        }
        return test;
    }

    function melanger() {

        tableau = tabsimple();
        for (let i = tableau.length - 1; i >= 1; i--) {
            let hi = Math.floor(Math.random() * (i + 1));
            let si = tableau[i];
            tableau[i] = tableau[hi];
            tableau[hi] = si;
        }
        for (let i = 0; i < tab.length; i++) {
            for (let j = 0; j < tab.length; j++) {
                tab[i][j] = tableau[tab.length * i + j];
            }
        }
        dessiner();
    }

    function deplacer(i,j) {
        let test;
        if (existe(i + 1, j) && vide(i + 1, j)) {
            permuter(i + down, j, i, j);
            test = true;
        } else if (existe(i - 1, j) && vide(i - 1, j)) {
            permuter(i + up, j, i, j);
            test = true;
        } else if (existe(i, j + 1) && vide(i, j + 1)) {
            permuter(i, j + right, i, j);
            test = true;
        } else if (existe(i, j - 1) && vide(i, j - 1)) {
            permuter(i, j + left, i, j);
            test = true;
        } else {
            test = false;
        }
        return test;
    }

 function NombreAleatoire(min,max) {
     return Math.floor(Math.random() * (max-min) + min);
 }

 function MelangeM(nbfois) {
        let booleen;
     for (let a = 0; a < nbfois;a++)
     {
            do {
                i = NombreAleatoire(0, tab.length);
                j = NombreAleatoire(0, tab.length);
                booleen = permutable(i, j);
            }while(booleen === false)
             deplacer(i,j);
     }
 }
function permutable(i,j) {
    let test;
    if ( (existe(i + 1, j) && vide(i + 1, j)) ||
    (existe(i - 1, j) && vide(i - 1, j)) ||
        (existe(i, j + 1) && vide(i, j + 1)) ||
        (existe(i, j - 1) && vide(i, j - 1))){
        test = true;
    } else {
        test = false;
    }
    return test;
}



});
