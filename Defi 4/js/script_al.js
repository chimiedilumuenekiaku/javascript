const titreSelect = document.querySelector("#titre-select");
const frequenceSelect = document.querySelector("#frequence-select");
const validerBtn = document.querySelector("#valider-btn");
const zoneResultat = document.querySelector("#zone-resultat");

// Afficher le bouton seulement si les deux sélections sont faites
function checkSelections() {
  if (titreSelect.value !== "" && frequenceSelect.value !== "") {
    validerBtn.style.display = "block";
  } else {
    validerBtn.style.display = "none";
  }
}

titreSelect.addEventListener("change", checkSelections);
frequenceSelect.addEventListener("change", checkSelections);

// Quand on clique sur "Valider"
validerBtn.addEventListener('click', () => {
  const titre = titreSelect.options[titreSelect.selectedIndex].text;
  const frequence = parseInt(frequenceSelect.value);

  // Stockage des données dans sessionStorage
  let usages = JSON.parse(sessionStorage.getItem("usages")) || [];
  usages.push({ titre, frequence });
  sessionStorage.setItem("usages", JSON.stringify(usages));

  // Calculer l'empreinte carbone
  calculerEmpreinteAvecAPI();
});

// Fonction qui interroge l'API et calcule l'empreinte totale
function calculerEmpreinteAvecAPI() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://impactco2.fr/api/v1/thematiques/ecv/2?detail=0&language=fr");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      // Construire un dictionnaire des facteurs d'émission
      const facteurs = {};
      data.data.forEach(item => {
        facteurs[item.name] = item.ecv;
      });

      const usages = JSON.parse(sessionStorage.getItem("usages")) || [];

      // Correspondance entre les intitulés utilisateurs et l'API
      const correspondance = {
        "Boeuf": "Boeuf",
        "Poulet": "Poulet",
        "Poisson": "Repas avec du poisson blanc",
        "Kebab": "Kebab",
        "Frites": "Frites (friteuse)",
        "Pates": "Pâtes (sèches)"
      };

      let total = 0;

      usages.forEach(({ titre, frequence }) => {
        const nomApi = correspondance[titre] || titre;
        const facteur = facteurs[nomApi];
       

        if (typeof facteur === "number") {
          total += frequence * facteur;
        }
       

       
      });

      zoneResultat.textContent = "Empreinte totale : " + (total * 1000).toFixed(2) + " g CO₂/jour.";
    }
  };

  xhr.send();
}


