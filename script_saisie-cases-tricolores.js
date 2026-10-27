      // ====== GÉNÉRATION ======
      var conteneur = document.getElementById("lignes");
      var msg = document.getElementById("msg");
      var etats = []; // 0 = blanc, 1 = rouge, 2 = vert

      LIGNES_OBJETS.forEach(function (objet, i) {
        etats.push(0);
        var ligne = document.createElement("div");
        ligne.className = "ligne";

        var img = document.createElement("div");
        img.className = "objet";
        var vraiImg = document.createElement("img");
        vraiImg.src = objet.image;        // ← "fraise.png" devient la source de l'image
        vraiImg.alt = objet.nom;          // texte alternatif (accessibilité)
        vraiImg.style.width = "100%";
        vraiImg.style.height = "100%";
        vraiImg.style.objectFit = "contain";
        img.appendChild(vraiImg);

        var nom = document.createElement("div");
        nom.className = "nom-objet";
        nom.textContent = objet.nom;

        var caseEl = document.createElement("div");
        caseEl.className = "case";
        caseEl.title = "Blanc → Rouge → Vert → Blanc";

        caseEl.addEventListener("click", function () {
          etats[i] = (etats[i] + 1) % 3; // cycle blanc → rouge → vert → blanc…
          caseEl.classList.remove("rouge", "vert");
          if (etats[i] === 1) caseEl.classList.add("rouge");
          if (etats[i] === 2) caseEl.classList.add("vert");
          msg.textContent = "";
          msg.className = "msg";
        });

        ligne.appendChild(img);
        ligne.appendChild(nom);
        ligne.appendChild(caseEl);
        conteneur.appendChild(ligne);
      });

      // ====== VALIDATION ======
      function nomEtat(etat) { return etat === 1 ? "rouge" : etat === 2 ? "vert" : "blanc"; }

      function valider() {
        var ok = LIGNES_OBJETS.every(function (objet, i) {
          return nomEtat(etats[i]) === objet.bonneCouleur;
        });
        if (ok) {
          try { sessionStorage.setItem("couleursOK", "1"); } catch (e) {}
          window.location.href = PAGE_SUIVANTE;
        } else {
          msg.textContent = "Vos résultats ne correspondent à ceux des autres équipes du projet. Vérifiez vos résultats et rentrez de nouveau votre code.";
          msg.className = "msg error";
        }
      }

      document.getElementById("btn-avant").addEventListener("click", valider);