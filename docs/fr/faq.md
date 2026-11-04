# FAQ

**Question :** Le widget n'affiche rien. Pourquoi ?

Réponse : Soit le champ **Tuiles** est vide, soit son contenu n’est pas un
JSON valide. Dans ce dernier cas, la console de développement du navigateur affiche le
message « portfolio-widget : le champ « Tuiles » ne contient pas de
tableau JSON valide.» Causes les plus fréquentes : une virgule après la dernière tuile, une
croche de fermeture manquante ou des guillemets typographiques (« ») au lieu de
guillemets droits ("). Vérifiez le texte à l’aide d’un validateur JSON.

**Question :** Il manque une seule tuile, les autres s’affichent correctement.

Réponse : Il manque le `title` à cette tuile. Les tuiles sans titre sont
ignorées afin qu’une faute de frappe dans une tuile n’entraîne pas
celles des autres. Un `title` composé uniquement d’espaces est considéré comme
manquant.

**Question :** Où puis-je trouver l’adresse pour `image` ?

Réponse : Téléchargez l’image dans la médiathèque, ouvrez-la et copiez
l’adresse. Une image provenant d’un site web tiers fonctionne également,
à condition qu’elle soit accessible au public.

**Question :** Pourquoi l’une de mes vignettes n’a-t-elle pas de flèche, alors que l’option « Afficher la flèche »
est activée ?

Réponse : Il manque un `link` à la vignette. Sans destination, elle n’est pas cliquable, et une
flèche suggérerait une action qui n’existe pas.

**Question :** Les images sont recadrées à des hauteurs différentes.

Réponse : Toutes les images sont mises au format 16:9 et remplissent
entièrement la zone d’affichage. Lorsque les formats d’image divergent fortement, le
recadrage varie en conséquence. Fournissez si possible les visuels dès le départ au
format 16:9.

**Question :** Puis-je forcer les vignettes à s’afficher sur un nombre précis de colonnes ?

Réponse : Non. Les vignettes ont une largeur fixe et s’ajustent dès que l’
l'espace vient à manquer — exactement comme avec le widget Portfolio propre à Staffbase.

**Question :** Quand un véritable éditeur remplacera-t-il le champ JSON ?

Réponse : Il est prévu. Le format des données restera inchangé ; vos vignettes
actuellement gérées seront donc conservées.
