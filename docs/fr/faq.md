# FAQ

**Question :** Le widget n'affiche rien. Pourquoi ?

Réponse : En règle générale, aucune vignette n'a encore été créée — ouvrez les
paramètres et cliquez sur **Modifier les vignettes**. Si, à titre exceptionnel, vous avez
géré les vignettes dans le champ de texte JSON, il se peut que le contenu ne soit pas
au format JSON valide. Dans ce cas, le message suivant s'affiche dans la console de développement du navigateur :
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

**Question :** Comment ajouter une image à une vignette ?

Réponse : Via **Sélectionner dans la médiathèque** dans la section **Image**. La médiathèque
s’ouvre sous forme de barre à droite ; vous pouvez y télécharger directement l’image
ou la déposer dans le champ d’image par glisser-déposer. Une image provenant d’un site web tiers
fonctionne également — pour cela, saisissez son
adresse https sous **Insérer l’adresse**, à condition qu’elle soit accessible au public.

**Question :** Je voulais simplement changer l’image et j’ai supprimé par inadvertance toute la
tuile.

Réponse : **Supprimer** dans la section **Image** ne supprime que l’image,
tandis que **Supprimer la vignette**, situé au-dessus des champs, supprime la vignette entière. Tant que vous n’avez pas encore cliqué sur
**Appliquer**, **Annuler** corrige cette erreur, et
**Annuler** rejette toutes les modifications.

**Question :** Comment modifier l'ordre ?

Réponse : Faites glisser la vignette dans la liste de gauche à l'aide de la poignée vers son nouvel emplacement.
Cela fonctionne également sans souris : sélectionnez la vignette, appuyez sur la barre d'espace, déplacez-la à l'aide des **flèches vers le haut** et
**flèches vers le bas**, puis appuyez à nouveau sur la barre d'espace. Au-dessus des champs, utilisez
**Déplacer la vignette vers le haut** et **Déplacer la vignette vers le bas** pour la déplacer d'une position vers le haut ou vers le bas.

**Question :** Pourquoi l'une de mes vignettes n'affiche-t-elle pas de flèche, alors que l'option « Afficher la flèche »
est activée ?

Réponse : Il manque un lien à cette vignette. Sans destination, elle n'est pas cliquable, et une
flèche suggérerait une action qui n'existe pas.

**Question :** Les images sont recadrées à des hauteurs différentes.

Réponse : Dans la vignette d’image, toutes les images sont mises au format 16:9 et remplissent
entièrement la zone d’image. Lorsque les formats d’image divergent fortement, le
recadrage varie. Fournissez si possible les visuels dès le départ au
format 16:9.

**Question :** Puis-je forcer les vignettes à s’afficher sur un nombre précis de colonnes ?

Réponse : Pas exactement, mais via la **taille** : **Compact** affiche de nombreuses petites
vignettes côte à côte, **Normal** en affiche environ quatre, **Grand** deux. Leur nombre exact
dépend de la largeur de l’écran — cela permet de garantir la lisibilité de la ligne sur tablette
et sur téléphone.

**Question :** Mon icône blanche est à peine visible dans l’éditeur.

Réponse : Dans la vignette, elle apparaît sur un fond clair. Sous
**Mise en page**, sélectionnez l’affichage **Boîte d’icône** — la liste et la zone d’image
afficheront alors l’icône sur la surface de la boîte.

**Question :** Sous les couleurs, il est indiqué « Contraste… difficilement lisible ».

Réponse : La police et le fond sont trop proches l’un de l’autre ; le texte courant nécessite un
rapport d’au moins 4,5 : 1. Réglez la **police** sur
**Automatique** ou choisissez une couleur nettement plus claire ou plus foncée.

**Question :** À la place de la fenêtre, je ne vois qu’un champ de texte.

Réponse : La fenêtre s’affiche à la place du champ dès que la
boîte de dialogue de configuration est ouverte. Si cela ne fonctionne pas, le
champ de texte reste affiché à titre de solution de secours ; il contient la version brute de la configuration.
En règle générale, il suffit de rouvrir la boîte de dialogue pour que la fenêtre réapparaisse.

**Question :** J’ai créé le widget avant la mise à jour. Y a-t-il des
pertes de données ?

Réponse : Non. Le widget continue d’afficher ses vignettes et sa
flèche. La fenêtre reprend ces valeurs à son ouverture ; ce n’est que lorsque vous
modifiez quelque chose et que vous sélectionnez **Appliquer** que la nouvelle version est enregistrée.
