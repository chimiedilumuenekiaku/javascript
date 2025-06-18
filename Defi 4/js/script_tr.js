const titreSelect = document.querySelector("#titre-select");
const frequenceSelect = document.querySelector("#frequence-select");
const distanceSelect = document.querySelector("#distance-select");
const validerBtn = document.querySelector("#valider-btn");
const zoneResultat = document.querySelector("#zone-resultat");

function checkSelections() {
  if (
    titreSelect.value !== "" &&
    frequenceSelect.value !== "" &&
    distanceSelect.value !== ""
  ) {
    validerBtn.style.display = "block";
  } else {
    validerBtn.style.display = "none";
  }
}

titreSelect.addEventListener("change", checkSelections);
frequenceSelect.addEventListener("change", checkSelections);
distanceSelect.addEventListener("change", checkSelections);

validerBtn.addEventListener("click", () => {
  const titre = titreSelect.value;
  const frequence = parseInt(frequenceSelect.value);
  const distance = parseFloat(distanceSelect.value);

  if (isNaN(frequence) || isNaN(distance)) {
    alert("Veuillez sélectionner une fréquence et une distance valides.");
    return;
  }

  let usages = JSON.parse(sessionStorage.getItem("usages")) || [];
  usages.push({ titre, frequence, distance });
  sessionStorage.setItem("usages", JSON.stringify(usages));

  calculerEmpreinteAvecAPI();
});

function calculerEmpreinteAvecAPI() {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://impactco2.fr/api/v1/transport?km=12&displayAll=0&ignoreRadiativeForcing=0&numberOfPassenger=0&includeConstruction=0&language=fr"
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      const facteurs = {};
      data.data.forEach((item) => {
        facteurs[item.name] = item.value;
      });

      const usages = JSON.parse(sessionStorage.getItem("usages")) || [];

      const correspondance = {
        "voiture": "Voiture électrique",
        "bus-electrique": "Bus électrique",
        "velo": "Vélo à assistance électrique",
        "metro": "Métro",
        "tramway": "Tramway",
      };

      let total = 0;

      usages.forEach(({ titre, frequence, distance }) => {
        const nomApi = correspondance[titre] || titre;
        const facteur = facteurs[nomApi];
        console.log(`Traitement : ${titre} → ${nomApi} | Facteur = ${facteur} | Fréquence = ${frequence} | Distance = ${distance}`);

        if (typeof facteur === "number" && typeof distance === "number") {
          total += distance * frequence * facteur;
        } else {
          console.warn(`❌ Facteur ou distance invalide pour : "${nomApi}"`);
        }
      });

      zoneResultat.textContent =
        "Empreinte totale : " + (total * 1000).toFixed(2) + " g CO₂/jour.";
    }
  };

  xhr.send();
}
