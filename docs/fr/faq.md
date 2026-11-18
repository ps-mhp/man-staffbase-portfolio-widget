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

Réponse : Toutes les images sont mises au format 16:9 et remplissent
entièrement la zone d’affichage. Lorsque les formats d’image divergent fortement, le
recadrage varie en conséquence. Fournissez si possible les visuels dès le départ au
format 16:9.

**Question :** Puis-je forcer les vignettes à s’afficher sur un nombre précis de colonnes ?

Réponse : Non. Les vignettes ont une largeur fixe et s’ajustent dès que l’
espace ne suffit plus — exactement comme avec le widget Portfolio propre à Staffbase.

**Question :** Au lieu de la fenêtre, je ne vois qu’un champ de texte.

Réponse : La fenêtre remplace le champ dès que la
boîte de dialogue de configuration est ouverte. Si cela ne fonctionne pas, le
champ de texte reste affiché par défaut ; il contient la version brute de la configuration.
Réouvrir la boîte de dialogue permet généralement de faire réapparaître la fenêtre.

**Question :** J’ai créé le widget avant la refonte. Est-ce que quelque chose
va être perdu ?

Réponse : Non. Le widget continue d’afficher ses vignettes et sa
flèche telles qu’elles étaient auparavant. La fenêtre reprend ces valeurs à son ouverture ; ce n’est que lorsque vous
modifiez quelque chose et que vous sélectionnez **Appliquer** que la nouvelle version est enregistrée.
