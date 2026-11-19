# Paramètres

| Paramètre | Description |
| --- | --- |
| **Vignettes** | Les vignettes de la ligne. Elles sont gérées dans la fenêtre **Modifier les vignettes**, qui s'ouvre dans la boîte de dialogue de configuration. Par défaut, aucune vignette n'est définie. |
| **Affichage** | **Vignette image** (image en haut, recadrée au format 16:9, texte en dessous) ou **Boîte d'icône** (icône ou image ajustée, texte centré sur un fond coloré). La tuile image est sélectionnée par défaut. Dans la fenêtre à droite, sous **Mise en page**. |
| **Taille** | **Compacte**, **Normale** ou **Grande** — pour chaque type d’affichage. La taille normale est sélectionnée par défaut. Voir ci-dessous. |
| **Arrière-plan** | Arrière-plan des vignettes : **Par défaut**, une couleur de l’identité visuelle MAN ou une valeur hexadécimale personnalisée (`#RRGGBB`). Par défaut : blanc pour la vignette image et rouge MAN pour l’encadré icône. |
| **Police** | Couleur du titre, de l’étiquette, de la description et de la flèche : **Automatique**, une couleur de l’identité visuelle MAN ou une valeur hexadécimale personnalisée. Le réglage « Automatique » choisit, sur une surface sélectionnée, la couleur la plus lisible entre le foncé et le blanc ; sinon, il utilise les couleurs MAN habituelles. |
| **Afficher la flèche** | Affiche une flèche en haut à droite de chaque vignette liée. Activé par défaut. Dans la fenêtre, en bas à droite sous **Mise en page**. |

L'affichage, la taille, les couleurs et la flèche s'appliquent à toutes les vignettes de manière commune, et non
à chaque vignette individuellement : une rangée dans laquelle chaque vignette aurait un aspect différent donnerait l'impression d'une
erreur. Sur les vignettes sans destination, la flèche n'apparaît en principe pas — il
n'y a rien à cliquer à cet endroit.

## Tailles

La taille définit la largeur minimale d’une colonne. Le nombre de colonnes
pouvant être affichées côte à côte dépend de la largeur du widget sur la
page ; toutes les colonnes d’une rangée ont la même largeur, et toutes les vignettes d’une
rangée ont la même hauteur.

| Taille | Largeur minimale | Sur toute la largeur de la page | Tablette | Téléphone | Particularité |
| --- | --- | --- | --- | --- | --- |
| **Compact** | 160 px | environ 7 | 4 | 2 | Police plus petite ; les descriptions s’arrêtent après trois lignes. |
| **Normal** | 280 px | 4 | 2 | 1 | La forme des versions précédentes. |
| **Grand** | 440 px | 2 | 1 | 1 | Image à gauche, texte à droite, comme une liste d’actualités. Si la vignette mesure moins de 420 px (téléphone), l’image revient en haut. Les icônes restent côte à côte. |

## Couleurs

Une remarque sous les couleurs signale lorsque le texte sur la surface est difficile
à lire (contraste inférieur à 4,5 : 1). La combinaison n’est toutefois pas interdite.
Au survol de la souris, une zone de couleur s'assombrit légèrement ; une police sélectionnée
conserve sa couleur au lieu de devenir rouge.

## La fenêtre « Modifier les vignettes »

La fenêtre occupe tout l'écran. En haut se trouvent **Appliquer**,
**Annuler**, **Annuler**, **Rétablir**, l’aide et le bouton de basculement pour
l’aperçu (éditeur, bureau, tablette, mobile). En dessous, trois colonnes :

| Zone | Signification |
| --- | --- |
| **Vignettes** (à gauche) | Toutes les vignettes classées par ordre, avec aperçu, titre et lien. Vous pouvez les réorganiser en faisant glisser la poignée ou à l’aide du clavier ; **Nouvelle vignette** en ajoute une à la fin. |
| **Vignette x sur y** (au centre) | Les champs de la vignette sélectionnée : **Contenu** (titre, lien), **Image** (bibliothèque, adresse, supprimer) et **Plus** (étiquette, description, texte alternatif, nouvel onglet). Au-dessus, les actions « Déplacer », « Dupliquer » et « Supprimer » permettent de modifier la vignette. |
| **Mise en page** (à droite) | **Affichage**, **Taille**, **Surface**, **Police** et **Afficher la flèche** ; tout s’applique à toute la rangée. |

**Appliquer** enregistre les vignettes et la mise en page dans le widget, **Annuler** les rejette
— une confirmation est demandée au préalable en cas de modifications non enregistrées. Le statut en haut indique
ce qui a été modifié, par exemple « 1 vignette modifiée, mise en page modifiée ».

Une vignette sans titre comporte dans le champ **Titre** la mention « Sans titre,
la vignette n’apparaît pas » et s’intitule « Sans titre » dans la liste. Elle y reste
et n’est pas perdue lors de l’enregistrement ; elle n’apparaît sur la page que
dès qu’elle a un titre.

## Champs d’une tuile

Les tuiles, la flèche et la mise en page sont enregistrées ensemble dans l’attribut `portfolio-config`
(`{"tiles":[…],"showChevron":true,"variant":"icon","size":"compact","background":"#E40045","textColor":"#FFFFFF"}`,
encodé). `variant` peut prendre la valeur `image` ou `icon`, `size` peut prendre la valeur `compact`, `normal`
ou `large`, les couleurs sont indiquées au format `#RRGGBB` ; ce qui est manquant ou invalide
est considéré comme la valeur par défaut. Les anciens widgets contiennent encore les vignettes sous forme de liste JSON dans le
champ `tiles` et la flèche dans `show-chevron` ; les deux continuent d’être pris en compte
tant que `portfolio-config` ne définit pas la valeur correspondante, et ils s’affichent
comme auparavant (tuile d’image, normale). Le format des tuiles est le même dans les deux cas :

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

Dans la vignette, les images sont recadrées au format 16:9 et
remplissent entièrement la zone d’affichage. Fournissez des visuels pour lesquels un
recadrage sur les bords ne pose pas de problème. Dans la zone des icônes, en revanche, l’image est
ajustée et n’est jamais recadrée — les symboles et logos au format SVG
ou PNG avec un fond transparent, de la même couleur que la police (donc blancs sur la
zone rouge par défaut), sont adaptés à cet emplacement.
