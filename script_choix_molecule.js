
// Génération dynamique des cases selon la longueur du code
var inputs = [];
var conteneur = document.getElementById("inputs");
for (var i = 0; i < CODE.length; i++) {
var input = document.createElement("input");
input.type = "text";
input.setAttribute("inputmode", "numeric");
input.setAttribute("maxlength", "1");
input.autocomplete = "off";
conteneur.appendChild(input);
inputs.push(input);
}
var msg = document.getElementById("msg");
var btn = document.getElementById("btn");

// Focus automatique et navigation entre les 4 cases
inputs.forEach(function (input, i) {
input.addEventListener("input", function () {
  input.value = input.value.replace(/\D/g, "").slice(0, 1);
  if (input.value && i < inputs.length - 1) inputs[i + 1].focus();
  if (inputs.every(function (x) { return x.value; })) valider();
});
input.addEventListener("keydown", function (e) {
  if (e.key === "Backspace" && !input.value && i > 0) inputs[i - 1].focus();
});
input.addEventListener("paste", function (e) {
  e.preventDefault();
  var data = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
  data.slice(0, CODE.length).split("").forEach(function (d, j) {
    if (inputs[j]) inputs[j].value = d;
  });
  inputs[Math.min(data.length, CODE.length - 1)].focus();
  if (data.slice(0, CODE.length).length === CODE.length) valider();
});
});

function valider() {
var saisie = inputs.map(function (x) { return x.value; }).join("");
if (saisie === CODE) {
  // Marque la session comme autorisée pour contact A
  try { sessionStorage.setItem("accesOK", "1"); } catch (e) {}
  window.location.href = PAGE_SUIVANTE_A;
} else {
    try { sessionStorage.setItem("accesOK", "1"); } catch (e) {}
    window.location.href = PAGE_SUIVANTE_B;
}
}

btn.addEventListener("click", valider);
inputs[0].focus();