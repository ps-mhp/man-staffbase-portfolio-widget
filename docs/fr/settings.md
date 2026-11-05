# Paramètres

| Paramètre | Description |
| --- | --- |
| **Vignettes** | Les vignettes de la ligne. Elles sont gérées dans l'éditeur de vignettes, accessible via **Modifier les vignettes**. Par défaut, aucune vignette n'est sélectionnée. |
| **Afficher la flèche** | Affiche une flèche en haut à droite de chaque vignette liée. Activé par défaut. |

La flèche est activée de manière globale pour toutes les vignettes, et non individuellement : une
série où la flèche apparaît tantôt et tantôt non donne l’impression d’une erreur. Elle
n’apparaît en principe pas sur les vignettes sans destination — il n’y a rien
à cliquer à cet endroit.

## L'éditeur de vignettes

L'éditeur affiche une ligne par vignette, toutes les unes en dessous des autres. Dans chaque ligne
figurent :

| Élément | Signification |
| --- | --- |
| **Poignée** (à gauche) | Déplace la vignette vers un autre emplacement. Avec le clavier, les touches **flèche vers le haut** et **flèche vers le bas** permettent de le déplacer d’une position à chaque fois. |
| **Image** | L’aperçu. Le crayon ouvre la médiathèque, la corbeille sur l’aperçu supprime uniquement l’image, pas la tuile. En l'absence d'image, une zone en pointillés **Sélectionner une image** s'affiche à cet endroit. |
| **Titre** | Le titre de la vignette. Champ obligatoire. |
| **Lien** | La destination de la vignette. |
| **Plus** / **Moins** | Déplie les champs moins courants : étiquette, description, texte alternatif de l’image et **Ouvrir dans un nouvel onglet**. |
| **Corbeille** (à droite) | Supprime l’ensemble de la vignette. |

Sous la liste se trouve **Ajouter une vignette** ; la nouvelle vignette s’ajoute à la
fin. **Appliquer** enregistre la liste dans le widget, **Annuler** la rejette
— si des modifications n’ont pas été enregistrées, le système demande confirmation au préalable.

Une vignette sans titre affiche dans l’éditeur la mention « Sans titre, cette
vignette ne s’affiche pas ». Elle reste dans la liste et n’est pas
perdue lors de l’enregistrement ; elle n’apparaît sur la page que dès qu’elle a un titre.

## Champs d’une vignette

Les vignettes sont enregistrées sous forme de liste JSON. Cela n’est visible que lorsque
l’éditeur ne s’affiche pas — dans ce cas, le champ de texte sert de solution de secours.

| Champ | Éditeur | Obligatoire | Signification |
| --- | --- | --- | --- |
| `title` | Titre | oui | Le titre de la vignette. S’il manque, la vignette est ignorée. |
| `description` | Description (sous « Plus ») | non | Un court texte sous le titre. |
| `badge` | Badge (sous « Plus ») | non | Un petit badge de catégorie au-dessus du titre. |
| `image` | Image | non | Adresse de l’image. Si elle est manquante, la vignette n’affiche pas d’image. |
| `imageAlt` | Texte alternatif (sous « Plus ») | non | Texte alternatif pour les lecteurs d’écran. Laisser vide si l’image est purement décorative. |
| `link` | Lien | non | Destination de la vignette. Sans destination, la vignette n’est pas cliquable et n’affiche pas de flèche. |
| `newTab` | Ouvrir dans un nouvel onglet (sous « Plus ») | non | `true` ouvre la destination dans un nouvel onglet. Valeur par défaut : `false`. |
| `id` | — | non | Clé unique de la vignette. Attribuée automatiquement si elle est manquante. |

Les images sont recadrées au format 16:9 et remplissent
entièrement la vignette. Fournissez des visuels pour lesquels un recadrage sur les bords
ne pose pas de problème.
