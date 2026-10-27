var ETAPES = [
  { libelle: "Sélection",     icone: "⌬" },  // icône ou numéro affiché
  { libelle: "In vitro",   icone: "🧪" },
  { libelle: "Efficacité",     icone: "🧫" },
  { libelle: "Toxicité",    icone: "🔬" },
  { libelle: "Production",       icone: "💊" }
];

var COULEUR = "#9f0064";                // ← couleur des segments et pastilles faites

// ====== GÉNÉRATION DE LA BARRE DE PROGRESSION ======
var nav = document.getElementById("progression");

function dessinerBarre(etapeActuelle) {
  nav.style.setProperty("--couleur-remplie", COULEUR);
  nav.innerHTML = "";
  // Ligne de fond + segment rempli
  var piste = document.createElement("div");
  piste.className = "piste";
  var rempli = document.createElement("div");
  rempli.className = "rempli";
  rempli.style.width = ((etapeActuelle - 1) / (ETAPES.length - 1)) * 100 + "%";
  piste.appendChild(rempli);
  nav.appendChild(piste);
  // Pastilles + libellés
  var cont = document.createElement("div");
  cont.className = "etapes";
  ETAPES.forEach(function (etape, i) {
    var num = i + 1;
    var el = document.createElement("div");
    el.className = "etape";
    if (num < etapeActuelle) el.classList.add("faite");
    if (num === etapeActuelle) el.classList.add("encours");
    el.innerHTML =
      '<span class="pastille">' +
      (num < etapeActuelle ? "✓" : etape.icone) +
      "</span>" +
      '<span class="libelle">' + etape.libelle + "</span>";
    cont.appendChild(el);
  });
  nav.appendChild(cont);
}

dessinerBarre(ETAPE_ACTUELLE);
