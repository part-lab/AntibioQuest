var COULEUR_ACTIVE = "#9f0064";    // ← couleur d'une case cliquée

// ====== GÉNÉRATION DE LA GRILLE ======
document.documentElement.style.setProperty("--couleur-active", COULEUR_ACTIVE);
var grille = document.getElementById("grille");
grille.style.gridTemplateColumns = "repeat(" + COLONNES + ", 1fr)";
var cliques = new Set();
var msg = document.getElementById("msg");

var total = COLONNES * LIGNES;
for (var n = 1; n <= total; n++) {
  (function (numero) {
    var el = document.createElement("div");
    el.className = "case";
    el.textContent = numero;
    el.addEventListener("click", function () {
      el.classList.toggle("cliquee");
      el.classList.remove("fausse");
      if (el.classList.contains("cliquee")) { cliques.add(numero); }
      else { cliques.delete(numero); }
      msg.textContent = "";
      msg.className = "msg";
    });
    grille.appendChild(el);
  })(n);
}

// ====== VALIDATION ======
function valider() {
  var ok = cliques.size === CASES_GAGNANTES.length &&
            CASES_GAGNANTES.every(function (num) { return cliques.has(num); });
  if (ok) {
    try { sessionStorage.setItem("grilleOK", "1"); } catch (e) {}
    window.location.href = PAGE_SUIVANTE;
  } else {
    msg.textContent = "Vos résultats ne correspondent à ceux des autres équipes du projet. Vérifiez vos résultats et rentrez de nouveau votre code.";
    msg.className = "msg error";
    

  }
}

document.getElementById("btn-avant").addEventListener("click", valider);