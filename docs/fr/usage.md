# Étape par étape

## Configuration de base

1. Placez le widget **Portfolio** à l'endroit souhaité sur la page.
2. Ouvrez les paramètres du widget et cliquez sur
   **Modifier les vignettes**. L'éditeur de vignettes s'ouvre.
3. Cliquez sur **Ajouter une tuile**. Une nouvelle ligne vide apparaît
   à la fin de la liste.
4. Remplissez les champs **Titre** et **Lien**.
5. Cliquez sur la zone en pointillés **Sélectionner une image** et recherchez l’
  image dans la médiathèque. Vous pouvez également la télécharger directement à partir de là.
6. Répétez les étapes 3 à 5 pour chaque tuile supplémentaire.
7. Cliquez sur **Appliquer** et enregistrez la page.
8. Laissez l’option **Afficher la flèche** activée si vous souhaitez qu’une flèche apparaisse en haut à droite de chaque
   vignette.
9. Vérifiez le résultat dans l’aperçu.

## Remplir entièrement une vignette

Le titre, le lien et l’image apparaissent sur la ligne. Toutes les autres informations se trouvent derrière le
menu déroulant **Plus** à la fin de la ligne :

- **Étiquette** — un mot-clé de catégorie au-dessus du titre, par exemple « Véhicules ».
- **Description** — un court texte sous le titre.
- **Texte alternatif de l’image** — ce qu’un lecteur d’écran
  lit à la place de l’image. Laissez ce champ vide si l’image est purement décorative. Lors de la sélection d’une image,
  l’éditeur reprend un texte alternatif de la médiathèque tant que le
  champ n’a pas été modifié — mais pas un simple nom de fichier comme « lkw.png » ;
  un texte saisi manuellement est conservé.
- **Ouvrir dans un nouvel onglet** — ouvre la page de destination dans un nouvel onglet du navigateur.

Cliquez sur **Réduire** pour refermer la section. Chaque ligne dispose de son propre
bouton d’expansion.

Seul le titre est obligatoire. Tout le reste peut être omis.

## Modifier l’ordre

L'ordre des vignettes sur la page correspond à l'ordre dans la liste.

- **Avec la souris :** saisissez la vignette par la poignée située tout à gauche et faites-la
  glisser vers le haut ou vers le bas. Dès qu'elle recouvre à moitié une ligne voisine,
  les deux échangent leurs places.
- **Avec le clavier :** sélectionnez la poignée à l'aide de la touche Tabulation, puis
  déplacez la vignette à l'aide des touches **Flèche vers le haut** et **Flèche vers le bas**
  d'une position à chaque fois.

## Changer ou supprimer l'image

Deux petits boutons se trouvent sur l'aperçu de l'image :

- Le **crayon** ouvre la médiathèque et remplace l'image.
- La **corbeille** supprime uniquement l'image. La vignette reste en place et s'affiche
  sans zone d'image.

La **corbeille située à droite de la ligne** supprime en revanche la tuile dans son intégralité.

## Modifier ultérieurement

1. Cliquez sur le widget et ouvrez ses paramètres.
2. Cliquez sur **Modifier les tuiles**.
3. Modifiez ce qui doit l’être, puis cliquez sur **Appliquer**.
4. Enregistrez et vérifiez dans l’aperçu.

**Annuler** rejette les modifications ; s’il y en a, l’éditeur
vous demande confirmation au préalable.

## En cas de problème

1. Si une vignette manque sur la page, c’est probablement parce qu’elle n’a pas de titre. L’éditeur
   affiche alors le message « Sans titre, cette vignette ne s’
   affiche pas » — la vignette reste présente, mais elle n’est tout simplement pas affichée.
2. Si une vignette n’affiche pas d’image, vérifiez l’adresse : elle doit pouvoir
   s’ouvrir directement dans le navigateur. Les images issues de la médiathèque répondent toujours à cette condition.
3. Si, à la place de l’éditeur, seul un champ de texte contenant du JSON s’affiche, continuez à modifier les
   tu peux, à titre exceptionnel, continuer à modifier les vignettes à cet endroit — le format est le même :

   ```json
   [
     {
       "title": "Camion",
       "badge": "Véhicules",
       "description": "La gamme des poids lourds pour le transport longue distance.",
       "image": "https://…/lkw.png",
       "imageAlt": "Un camion sur l'autoroute",
       "link": "/content/page/lkw",
       "newTab": true
     }
   ]
   ```

   Si rien n'apparaît ensuite, c'est généralement que le JSON est incorrect : une virgule
   après le dernier élément ou une parenthèse fermante manquante. Vérifiez
   le texte à l'aide d'un validateur JSON.
