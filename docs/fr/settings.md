# Paramètres

| Paramètre | Description |
| --- | --- |
| **Vignettes** | Les vignettes de la ligne. Elles sont gérées dans la fenêtre **Modifier les vignettes**, qui s'ouvre dans la boîte de dialogue de configuration. Par défaut, aucune vignette n'est affichée. |
| **Afficher la flèche** | Affiche une flèche en haut à droite de chaque vignette liée. Activé par défaut. Dans la fenêtre, en bas à droite sous **Mise en page**. |

L’activation de la flèche s’applique à l’ensemble des vignettes, et non individuellement : une
série où la flèche apparaît tantôt et tantôt non donne l’impression d’une erreur. Sur les
vignettes sans destination, elle n’apparaît en principe pas — il n’y a rien
à cliquer.

## La fenêtre « Modifier les vignettes »

La fenêtre occupe tout l’écran. En haut se trouvent **Appliquer**,
**Annuler**, **Annuler la dernière action**, **Rétablir**, l’aide et le bouton de basculement pour
l’aperçu (éditeur, bureau, tablette, mobile). En dessous, trois colonnes :

| Zone | Signification |
| --- | --- |
| **Vignettes** (à gauche) | Toutes les vignettes classées par ordre, avec une vignette d’aperçu, un titre et un lien. Vous pouvez les réorganiser en les faisant glisser par la poignée ou à l’aide du clavier ; **Nouvelle vignette** en ajoute une à la fin. |
| **Vignette x sur y** (au centre) | Les champs de la vignette sélectionnée : **Contenu** (titre, lien), **Image** (bibliothèque, adresse, supprimer) et **Plus** (étiquette, description, texte alternatif, nouvel onglet). Au-dessus, les actions **Déplacer**, **Dupliquer** et **Supprimer** permettent de manipuler la vignette. |
| **Mise en page** (à droite) | Le bouton **Afficher la flèche** ; il s'applique à toutes les vignettes. |

**Appliquer** enregistre les vignettes et la flèche dans le widget, **Annuler** les rejette
— en cas de modifications non enregistrées, le système demande confirmation au préalable. Le statut en haut indique
ce qui a été modifié, par exemple « 1 vignette modifiée ».

Une vignette sans titre affiche dans le champ **Titre** la remarque « Sans titre,
la vignette n’apparaît pas » et s’intitule « Sans titre » dans la liste. Elle y reste
et n’est pas perdue lors de l’enregistrement ; elle n’apparaît sur la page que
dès qu’elle a un titre.

## Champs d’une tuile

Les tuiles et la flèche sont enregistrées ensemble dans l’attribut `portfolio-config`
(`{"tiles":[…],"showChevron":true}`, encodé). Les anciens widgets contiennent encore les vignettes
sous forme de liste JSON dans le champ `tiles` et la flèche dans `show-chevron` ; les deux
continuent d’être pris en compte tant que `portfolio-config` ne définit pas la valeur correspondante
. Le format des vignettes est le même dans les deux cas :

| Champ | Fenêtre | Obligatoire | Signification |
| --- | --- | --- | --- |
| `title` | Titre | oui | Le titre de la vignette. S’il manque, la vignette est ignorée. |
| `description` | Description (sous « Plus ») | non | Un court texte sous le titre. |
| `badge` | Badge (sous « Plus ») | non | Un petit badge de catégorie au-dessus du titre. |
| `image` | Image | non | Adresse de l’image. Si elle est manquante, la vignette n’affiche pas d’image. |
| `imageAlt` | Texte alternatif (sous « Plus ») | non | Texte alternatif pour les lecteurs d’écran. Laisser vide si l’image est purement décorative. |
| `link` | Lien | non | Destination de la vignette. Sans destination, la vignette n’est pas cliquable et n’affiche pas de flèche. |
| `newTab` | Ouvrir dans un nouvel onglet (sous « Plus ») | non | `true` ouvre la destination dans un nouvel onglet. Valeur par défaut : `false`. |
| `id` | — | non | Clé unique de la vignette. Attribuée automatiquement si elle est manquante. |

Les images sont recadrées au format 16:9 et remplissent entièrement la vignette.
Fournissez des visuels pour lesquels un recadrage sur les bords
ne pose pas de problème.
