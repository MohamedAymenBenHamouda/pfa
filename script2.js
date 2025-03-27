// Fonction pour ajouter un article au tableau
function ajouterArticle(article) {
    const tableBody = document.getElementById('table-body');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${article.ID}</td>
        <td>${article.nom}</td>
        <td>${article.categorie}</td>
        <td>${article.quantite}</td>
        <td>${article.prix}</td>
        <td><a href="#" class="action-btn">✎</a></td>
    `;
    
    tableBody.appendChild(row);
}

// Initialiser le tableau avec les données initiales
window.onload = function() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ""; // Effacer d'abord le contenu
    
    articlesInitiaux.forEach(article => {
        ajouterArticle(article);
    });
}

document.getElementById('ajouter').addEventListener('click', function() {
    const nom = document.getElementById('nom').value;
    const categorie = document.getElementById('categorie').value;
    const quantite = parseInt(document.getElementById('quantite').value);
    const prix = parseInt(document.getElementById('prix').value);

    // Validation
    if (!nom || !categorie || isNaN(quantite) || isNaN(prix)) {
        alert('Veuillez remplir tous les champs correctement.');
        return;
    }
    
    // Création de l'objet article
    const nouvelArticle = {
        nom: nom,
        categorie: categorie,
        quantite: quantite,
        prix: prix,
    };
     // Envoyer les données au backend
     fetch("http://localhost:8080/api/produits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nouvelArticle)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du produit");
        }
        return response.json();
    })
    .then(data => {
        console.log("Produit ajouté avec succès:", data);
        ajouterArticle(data); // Ajouter l'article retourné par le backend à la table
    })
    .catch(error => console.error("Erreur:", error));

    
    // Ajouter au tableau
    ajouterArticle(nouvelArticle);
    
    // Réinitialiser le formulaire
    document.getElementById('ID').value = '';
    document.getElementById('nom').value = '';
    document.getElementById('quantite').value = '1';
    document.getElementById('prix').value = '';
});