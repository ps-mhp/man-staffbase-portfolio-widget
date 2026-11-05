# Definições

| Definição | Descrição |
| --- | --- |
| **Blocos** | Os blocos da linha. São definidos no Editor de blocos, que se abre através da opção **Editar blocos**. Por predefinição, não há nenhum bloco. |
| **Mostrar seta** | Mostra uma seta no canto superior direito de cada mosaico com ligação. Por predefinição, está ativada. |

A seta é ativada em conjunto para todos os mosaicos, não individualmente: uma
linha em que, por vezes, aparece uma seta e, por vezes, não, parece um erro. Nos
mosaicos sem destino, não aparece de forma geral — não há nada
em que clicar.

## O editor de mosaicos

O editor apresenta uma linha por mosaico, todas dispostas uma abaixo da outra. Nessa linha
aparecem:

| Elemento | Significado |
| --- | --- |
| **Ponteiro** (à esquerda) | Arrasta o mosaico para outro local. Com o teclado, pode deslocá-lo com as teclas **Seta para cima** e **Seta para baixo**, uma posição de cada vez. |
| **Imagem** | A pré-visualização. O lápis abre a biblioteca multimédia; o caixote do lixo na pré-visualização remove apenas a imagem, não o mosaico. Sem imagem, aparece ali uma área tracejada com a indicação **Selecionar imagem**. |
| **Título** | O título do mosaico. Obrigatório. |
| **Link** | O destino do mosaico. |
| **Mais** / **Menos** | Expande os campos menos frequentes: etiqueta, descrição, texto alternativo da imagem e **Abrir numa nova aba**. |
| **Cesto de lixo** (à direita) | Remove todo o mosaico. |

Abaixo da lista encontra-se **Adicionar mosaico**; o novo mosaico é adicionado ao
final. **Aplicar** insere a lista no widget, **Cancelar** rejeita-a
— no caso de alterações não guardadas, é apresentada uma mensagem de confirmação.

Um bloco sem título apresenta no editor a indicação «Sem título, este
bloco não será exibido». Permanece na lista e não se perde ao guardar;
na página, só aparece assim que tiver um título.

## Campos de um mosaico

Os mosaicos são guardados como uma lista JSON. Isto só é visível quando
o editor não é apresentado — nesse caso, o campo de texto permanece como alternativa.

| Campo | Editor | Obrigatório | Significado |
| --- | --- | --- | --- |
| `title` | Título | sim | O título do bloco. Se estiver em falta, o bloco é ignorado. |
| `description` | Descrição (em «Mais») | não | Um texto breve abaixo do título. |
| `badge` | Etiqueta (em «Mais») | não | Uma pequena etiqueta de categoria acima do título. |
| `image` | Imagem | não | Endereço da imagem. Se estiver em falta, o bloco não terá área de imagem. |
| `imageAlt` | Texto alternativo (em «Mais») | não | Texto alternativo para leitores de ecrã. Deixe em branco se a imagem for apenas decorativa. |
| `link` | Link | não | Destino do mosaico. Sem destino, o mosaico não é clicável e não apresenta uma seta. |
| `newTab` | Abrir num novo separador (em «Mais») | não | `true` abre o destino num novo separador. Predefinição `false`. |
| `id` | — | não | Chave exclusiva do mosaico. É atribuída automaticamente, caso não exista. |

As imagens são recortadas para a proporção 16:9 e preenchem o mosaico
na totalidade. Forneça imagens em que o recorte nas margens
não seja problemático.
