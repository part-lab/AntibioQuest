

var choixCouleurs = new Set();
var choixSymboles = new Set();
var msg = document.getElementById("msg");

function creerCases(liste, conteneurId, estCouleur) {
  var conteneur = document.getElementById(conteneurId);
  liste.forEach(function (item) {
    var el = document.createElement("div");
    el.className = "case";
    el.dataset.id = item.id;
    if (estCouleur) { el.style.background = item.fond; }
    else { el.textContent = item.emoji; }
    el.addEventListener("click", function () {
      // Sélection multiple : on coche / décoche
      el.classList.toggle("choisie");
      el.classList.remove("fausse");
      var ensemble = estCouleur ? choixCouleurs : choixSymboles;
      if (el.classList.contains("choisie")) { ensemble.add(item.id); }
      else { ensemble.delete(item.id); }
      msg.textContent = "";
      msg.className = "msg";
    });
    conteneur.appendChild(el);
  });
}

creerCases(couleurs, "couleurs", true);
creerCases(symboles, "symboles", false);

// Vérifie que l'ensemble coché correspond exactement à l'ensemble attendu
function ensembleValide(ensemble, attendu) {
  if (ensemble.size !== attendu.length) return false;
  return attendu.every(function (id) { return ensemble.has(id); });
}

function valider() {
  if (choixCouleurs.size === 0 && choixSymboles.size === 0) {
    msg.textContent = "Cochez au moins une couleur et un symbole.";
    msg.className = "msg error";
    return;
  }
  var couleursOK = ensembleValide(choixCouleurs, COULEURS_GAGNANTES);
  var symbolesOK = ensembleValide(choixSymboles, SYMBOLES_GAGNANTS);
  if (couleursOK && symbolesOK) {
    try { sessionStorage.setItem("enigmeOK", "1"); } catch (e) {}
    window.location.href = PAGE_SUIVANTE;
  } else {
    msg.textContent = "Vos résultats ne correspondent à ceux des autres équipes du projet. Vérifiez vos résultats et rentrez de nouveau votre code.";
    msg.className = "msg error";
    // Secousse sur les éléments cochés qui ne font pas partie de la solution
    //if (!couleursOK) marquerFausses("couleurs", COULEURS_GAGNANTES);
    if (!symbolesOK) marquerFausses("symboles", SYMBOLES_GAGNANTS);
  }
}

function marquerFausses(conteneurId, attendus) {
  Array.from(document.getElementById(conteneurId).children).forEach(function (el) {
    if (el.classList.contains("choisie") && attendus.indexOf(el.dataset.id) === -1) {
      el.classList.add("fausse");
    }
  });
}

document.getElementById("btn-avant").addEventListener("click", valider);
