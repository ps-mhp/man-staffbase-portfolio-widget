# Étape par étape

## Configuration de base

1. Enregistrez au préalable les images dans la médiathèque et copiez leurs
   adresses. Chaque vignette doit avoir sa propre adresse.
2. Placez le widget **Portfolio** à l'emplacement souhaité sur la page.
3. Saisissez la liste dans le champ **Vignettes**. Chaque vignette correspond à un élément entre
   crochets, séparé par des virgules :

   ```json
   [
     {
       "title": "Camion",
       "image": "https://…/lkw.png",
       "link": "/content/page/lkw"
     },
     {
       "title": "Bus",
       "image": "https://…/bus.png",
       "link": "/content/page/bus"
     }
   ]
   ```

4. Laissez l’option **Afficher la flèche** activée si vous souhaitez qu’une flèche apparaisse en haut à droite de chaque
   vignette.
5. Enregistrez et vérifiez le résultat dans l’aperçu.

## Remplir entièrement une vignette

Tous les champs d’une vignette :

```json
{
  "title": "Camion",
  "badge": "Véhicules",
  "description": "La gamme des poids lourds pour le transport longue distance.",
  "image": "https://…/lkw.png",
  "imageAlt": "Un poids lourd sur l'autoroute",
  "link": "/content/page/lkw",
  "newTab": true
}
```

Seul le champ `title` est obligatoire. Tous les autres peuvent être omis.

## Modifier a posteriori

1. Cliquez sur le widget et ouvrez ses paramètres.
2. Modifiez le texte dans le champ **Vignettes**. L'ordre des vignettes sur la
   page correspond à l'ordre dans la liste.
3. Enregistrez et vérifiez dans l'aperçu.

## Si quelque chose ne fonctionne pas

1. Si rien ne s'affiche, c'est généralement que le JSON est erroné. Cause la plus fréquente : une
   virgule après la dernière vignette ou une parenthèse fermante manquante.
   Vérifiez le texte à l'aide d'un vérificateur JSON.
2. Si une tuile est manquante, c’est probablement parce qu’il lui manque le `title` — les tuiles sans
   titre sont ignorées.
3. Si une tuile n’affiche pas d’image, vérifiez l’adresse dans `image` : elle doit
   pouvoir s’ouvrir directement dans le navigateur.
