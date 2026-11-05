# FAQ

**Question :** Le widget n'affiche rien. Pourquoi ?

Réponse : En règle générale, aucune vignette n'a encore été créée — ouvrez les
paramètres et cliquez sur **Modifier les vignettes**. Si, à titre exceptionnel, vous avez
géré les vignettes dans le champ de texte JSON, il se peut que le contenu ne soit pas
un JSON valide. Dans ce cas, le message suivant s'affiche dans la console de développement du navigateur :
« portfolio-widget : le champ « vignettes » ne contient pas de tableau JSON valide. »
Causes les plus fréquentes : une virgule après la dernière vignette, une
croche de fermeture manquante ou des guillemets typographiques («  ») au lieu de guillemets droits
(« »). Vérifiez le texte à l’aide d’un validateur JSON.

**Question :** Une seule tuile manque, les autres s’affichent correctement.

Réponse : Il manque le titre à cette tuile. Les tuiles sans titre sont
ignorées afin qu’une faute de frappe dans une tuile n’entraîne pas
celles des autres. Un titre composé uniquement d’espaces est considéré comme manquant.
Dans l’éditeur, une telle tuile reste affichée et porte la mention « Sans titre,
cette tuile ne s’affiche pas » — vous ne la perdez donc pas, elle
n’apparaîtra sur la page qu’une fois dotée d’un titre.

**Question :** Comment ajouter une image à une tuile ?

Réponse : Via la zone en pointillés **Sélectionner une image** dans la ligne, ou, si une
image existe déjà, via le crayon situé dessus. Ces deux options ouvrent la médiathèque ; vous
pouvez également y télécharger directement l’image. Une image provenant d’un site web tiers
fonctionne également — pour cela, saisissez son adresse dans le champ JSON `image`
, à condition qu’elle soit accessible au public.

**Question :** Je voulais simplement changer l’image et j’ai supprimé par inadvertance toute la
tuile.

Réponse : Il existe deux corbeilles. Celle située sur l’aperçu de l’image ne supprime que l’
image, tandis que celle située à droite de la ligne supprime la tuile entière. Tant que vous n’avez pas encore
cliqué sur **Appliquer**, vous pouvez annuler cette erreur en cliquant sur
**Annuler**.

**Question :** Comment modifier l'ordre ?

Réponse : Faites glisser la vignette par la poignée située tout à gauche vers son nouvel emplacement. C'est également possible sans
souris : sélectionnez la poignée à l’aide de la touche Tab, puis déplacez-la à l’aide des **flèches
vers le haut** et **vers le bas**.

**Question :** Pourquoi l’une de mes vignettes n’a-t-elle pas de flèche, alors que l’option « Afficher la flèche »
est activée ?

Réponse : Il manque un lien à cette vignette. Sans destination, elle n’est pas cliquable, et une
flèche suggérerait une action qui n’existe pas.

**Question :** Les images sont recadrées à des hauteurs différentes.

Réponse : Toutes les images sont mises au format 16:9 et remplissent
entièrement la zone d’affichage. Lorsque les formats d’image divergent fortement, le
recadrage varie. Fournissez si possible les visuels dès le départ au
format 16:9.

**Question :** Puis-je forcer les vignettes à s’afficher sur un nombre précis de colonnes ?

Réponse : Non. Les vignettes ont une largeur fixe et s’ajustent dès que l’
espace vient à manquer — exactement comme dans le widget Portfolio propre à Staffbase.

**Question :** Au lieu de l'éditeur, je ne vois qu'un champ de texte contenant du JSON.

Réponse : L'éditeur remplace le champ **Vignettes** dès que
la boîte de dialogue de configuration est ouverte. Si cela ne fonctionne pas, le
champ de texte reste affiché par défaut ; le format est le même, et les champs d’une
tuile se trouvent dans les paramètres. Réouvrir la boîte de dialogue permet généralement de
récupérer l’éditeur.
