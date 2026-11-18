# Definições

| Definição | Descrição |
| --- | --- |
| **Mosaicos** | Os mosaicos da linha. São geridos na janela **Editar mosaicos**, que se abre na caixa de diálogo de configuração. Por predefinição, não há nenhum mosaico. |
| **Mostrar seta** | Mostra uma seta no canto superior direito de cada mosaico com ligação. Ativado por predefinição. Na janela, à direita, em **Apresentação**. |

A seta é ativada em conjunto para todos os mosaicos, não individualmente: uma
linha em que ora aparece uma seta e ora não parece um erro. Nos
mosaicos sem destino, ela não aparece de forma geral — não há nada
para clicar.

## A janela «Editar mosaicos»

A janela ocupa todo o ecrã. Na parte superior encontram-se **Aplicar**,
**Cancelar**, **Reverter**, **Repetir**, a Ajuda e o botão para
a pré-visualização (Editor, Ambiente de Trabalho, Tablet, Telemóvel). Abaixo, três colunas:

| Área | Significado |
| --- | --- |
| **Blocos** (à esquerda) | Todos os blocos por ordem, com imagem de pré-visualização, título e link. Arrastando pela alça ou utilizando o teclado, pode reorganizá-los; **Novo bloco** adiciona um ao final. |
| **Bloco x de y** (centro) | Os campos do mosaico selecionado: **Conteúdo** (título, link), **Imagem** (biblioteca multimédia, endereço, remover) e **Mais** (etiqueta, descrição, texto alternativo, nova aba). Acima, as ações *Mover*, *Duplicar* e *Apagar* permitem alterar a posição do mosaico. |
| **Design** (à direita) | O botão **Mostrar seta**; aplica-se a todos os mosaicos. |

**Aplicar** insere os mosaicos e a seta no widget, **Cancelar** rejeita-os
— no caso de alterações não guardadas, é apresentada uma mensagem de confirmação. O estado na parte superior indica
o que foi alterado, por exemplo, «1 mosaico alterado».

Um mosaico sem título apresenta no campo **Título** a indicação «Sem título,
o mosaico não aparece» e denomina-se «Sem título» na lista. Permanece lá
e não se perde ao guardar; só aparece na página
assim que tiver um título.

## Campos de um mosaico

Os mosaicos e a seta são guardados em conjunto no atributo `portfolio-config`
(`{"tiles":[…],"showChevron":true}`, codificado). Os widgets mais antigos ainda contêm os mosaicos
como uma lista JSON no campo `tiles` e a seta em `show-chevron`; ambos
continuam a ser lidos, desde que `portfolio-config` não
defina o respetivo valor. O formato dos mosaicos é o mesmo em ambos os casos:

| Campo | Janela | Obrigatório | Significado |
| --- | --- | --- | --- |
| `title` | Título | sim | O título do mosaico. Se faltar, o mosaico é ignorado. |
| `description` | Descrição (em «Mais») | não | Um texto breve abaixo do título. |
| `badge` | Etiqueta (em «Mais») | não | Uma pequena etiqueta de categoria acima do título. |
| `image` | Imagem | não | Endereço da imagem. Se não for fornecido, o bloco não terá área de imagem. |
| `imageAlt` | Texto alternativo (em «Mais») | não | Texto alternativo para leitores de ecrã. Deixe em branco se a imagem for apenas decorativa. |
| `link` | Link | não | Destino do mosaico. Sem destino, o mosaico não é clicável e não apresenta uma seta. |
| `newTab` | Abrir num novo separador (em «Mais») | não | `true` abre o destino num novo separador. Predefinição `false`. |
| `id` | — | não | Chave exclusiva do mosaico. É atribuída automaticamente caso não exista. |

As imagens são recortadas para a proporção 16:9 e preenchem o mosaico
na totalidade. Forneça imagens em que o recorte nas margens
não seja problemático.
