# Paramètres

| Paramètre | Description |
| --- | --- |
| **Tuiles** | Les tuiles sous forme de liste JSON. La valeur par défaut est `[]`, c'est-à-dire aucune tuile. Les champs de chaque tuile sont indiqués ci-dessous. |
| **Afficher la flèche** | Affiche une flèche en haut à droite de chaque vignette contenant un lien. Activé par défaut. |

La flèche est activée de manière globale pour toutes les vignettes, et non individuellement : une
série où la flèche apparaît tantôt et tantôt non donne l’impression d’une erreur. Sur les
vignettes sans destination, elle n’apparaît en principe pas — il n’y a rien
à cliquer à cet endroit.

## Champs d’une vignette

| Champ | Obligatoire | Signification |
| --- | --- | --- |
| `title` | oui | Le titre de la vignette. S'il manque, la vignette est ignorée. |
| `description` | non | Un court texte sous le titre. |
| `badge` | non | Une petite étiquette de catégorie au-dessus du titre. |
| `image` | non | Adresse de l’image. Si elle manque, la vignette n’affiche pas d’image. |
| `imageAlt` | non | Texte alternatif pour les lecteurs d’écran. À laisser vide si l’image est purement décorative. |
| `link` | non | Destination de la vignette. Sans destination, la vignette n’est pas cliquable et n’affiche pas de flèche. |
| `newTab` | non | La valeur `true` ouvre la destination dans un nouvel onglet. Valeur par défaut : `false`. |
| `id` | non | Clé unique de la vignette. Attribuée automatiquement si elle est manquante. |

Les images sont recadrées au format 16:9 et remplissent
entièrement la vignette. Fournissez des visuels pour lesquels un recadrage sur les bords
ne pose pas de problème.
