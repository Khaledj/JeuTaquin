let tab = [];
tab[0] = [1, 2, 3, 4];
tab[1] = [5, 6, 7, 8];
tab[2] = [9, 10, 11, 12];
tab[3] = [13, 14, 15, ""];

let tabRef = [];
tabRef[0] = [1, 2, 3, 4];
tabRef[1] = [5, 6, 7, 8];
tabRef[2] = [9, 10, 11, 12];
tabRef[3] = [13, 14, 15, ""];

let up = -1;
let down = 1;
let left = -1;
let right = 1;

$(document).ready(function () {
    let copiedTab;
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab.length; j++) {
            $('.row' + i + ' .case' + j).append(tab[i][j]);
        }
    }

    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab.length; j++) {
            $('.row' + i + ' .case' + j).click(function () {
                $('#info').empty();
                deplacer(i, j);
                winner();
            });
        }

    }

    $('#btn').click(function () {
        $('#info').empty();
        melanger();
        copiedTab = copyTable(tab);

    });
    $('#btn1').click(function () {
        $('#info').empty();
        MelangeM(100);
        copiedTab = copyTable(tab);


    });
    $('#btn2').click(function () {
        $('#info').empty();
        solvable();
    });

    $('#btn3').click(function () {
        $('#info').empty();
        dessiner(copiedTab);
    });


    });


    function dessiner(tab) {
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

        dessiner(tab);// redessine le tableau

        return tab;
    }

    function tabsimple(tableau) {
        let test = [];
        for (let i = 0; i < tableau.length; i++) {
            for (let j = 0; j < tableau.length; j++) {
                test.push(tableau[i][j]);
            }
        }
        return test;
    }

    function melanger() {

        tableau = tabsimple(tab);
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
        dessiner(tab);

    }

    function deplacer(i, j) {
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

    function NombreAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function MelangeM(nbfois) {
        let booleen;
        for (let a = 0; a < nbfois; a++) {
            do {
                i = NombreAleatoire(0, tab.length);
                j = NombreAleatoire(0, tab.length);
                booleen = permutable(i, j);
            } while (booleen === false)
            deplacer(i, j);
        }

    }

    function permutable(i, j) {
        let test;
        if ((existe(i + 1, j) && vide(i + 1, j)) ||
            (existe(i - 1, j) && vide(i - 1, j)) ||
            (existe(i, j + 1) && vide(i, j + 1)) ||
            (existe(i, j - 1) && vide(i, j - 1))) {
            test = true;
        } else {
            test = false;
        }
        return test;
    }

    function winner() {
        for (let i = 0; i < tab.length; i++) {
            for (let j = 0; j < tab.length; j++) {
                if (tab[i][j] !== tabRef[i][j]) {
                    return false;
                }
            }
        }
        $('#info').html('<div class = "alert alert-success">Vous avez gagné</div>');
    }

    function parityV() {
        let sum = 0;
        let par;

        for (let i = 0; i < tab.length; i++) {
            for (let j = 0; j < tab.length; j++) {
                if (tab[i][j] === "") {
                    sum = i + j;
                }
            }
        }
        if (sum % 2 === 0) {
            par = "pair";
        } else {
            par = "impair";
        }
        return par;
    }

    function countPermutation(tableau) {

        let tabs = [];
        let compteur = 0;
        let tmp;

        for (let i = 0; i < tableau.length; i++) {
            for (let j = 0; j < tableau.length; j++) {
                tabs.push(tableau[i][j]);
            }
        }
        for (let r = 0; r < tabs.length; r++) {
            if (tabs[r] === "") {
                tabs[r] = 16;
            }
        }

        for (let i = 0; i < tabs.length; i++) {
            let k = i;
            for (let j = i + 1; j < tabs.length; j++) {
                if (tabs[j] < tabs[k]) {
                    k = j;
                }
            }
            if (k !== i) {
                tmp = tabs[k];
                tabs[k] = tabs[i];
                tabs[i] = tmp;
                compteur++;
            }
        }
        if (compteur % 2 === 0) {
            par = "pair";
        } else {
            par = "impair"
        }
        return par;
    }

    function solvable() {
        let pV = parityV();


        let pT = countPermutation(tab);

        if (pV === pT) {
            $('#info').html('<div class = "alert alert-success">Le jeu est résolvable vous pouvez jouer</div>');
        } else {
            $('#info').html('<div class = "alert alert-success">Le jeu ne peut pas être résolu remélanger à nouveau</div>');
        }
    }

    function copyTable(tableau) {
        copyTab = [[], [] ,[] ,[]];
        for (let i = 0; i < tableau.length; i++) {
            for (let j = 0; j < tableau[i].length; j++) {
                copyTab[i][j] = tableau[i][j];
            }
        }
       return copyTab;
    }


