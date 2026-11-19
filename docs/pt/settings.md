# Definições

| Definição | Descrição |
| --- | --- |
| **Mosaicos** | Os mosaicos da linha. São geridos na janela **Editar mosaicos**, que se abre na caixa de diálogo de configuração. A predefinição é «Sem mosaico». |
| **Apresentação** | **Mosaico de imagem** (imagem na parte superior, recortada para 16:9, com texto por baixo) ou **Caixa de ícone** (ícone ou imagem ajustada, com texto centrado numa área colorida). A predefinição é o mosaico de imagem. Na janela à direita, em **Design**. |
| **Tamanho** | **Compacto**, **Normal** ou **Grande** — para cada apresentação. A predefinição é Normal. Ver abaixo. |
| **Área** | Fundo dos mosaicos: **Padrão**, uma cor da MAN-CI ou um valor hexadecimal personalizado (`#RRGGBB`). O padrão é branco para o mosaico de imagem e vermelho MAN para a caixa de ícone. |
| **Tipo de letra** | Cor do título, etiqueta, descrição e seta: **Automático**, uma cor da identidade corporativa da MAN ou um valor hexadecimal personalizado. A opção «Automático» seleciona, na área escolhida, a cor mais legível entre escuro e branco; caso contrário, utiliza as cores habituais da MAN. |
| **Mostrar seta** | Mostra uma seta no canto superior direito de cada mosaico com ligação. Ativado por predefinição. Na janela, à direita, em **Apresentação**. |

A apresentação, o tamanho, as cores e a seta aplicam-se a todos os mosaicos em conjunto, não
individualmente: uma linha em que cada mosaico tenha um aspeto diferente parece um
erro. Nos mosaicos sem destino, a seta não aparece — ali
não há nada em que clicar.

## Tamanhos

O tamanho define a largura mínima de uma coluna. O número de colunas
que cabem lado a lado depende da largura que o widget ocupa na
página; todas as colunas de uma linha têm a mesma largura e todos os mosaicos de uma
linha têm a mesma altura.

| Tamanho | Largura mínima | Em largura total da página | Tablet | Telemóvel | Característica especial |
| --- | --- | --- | --- | --- | --- |
| **Compacto** | 160 px | cerca de 7 | 4 | 2 | Letra mais pequena; as descrições terminam após três linhas. |
| **Normal** | 280 px | 4 | 2 | 1 | O formato das versões anteriores. |
| **Grande** | 440 px | 2 | 1 | 1 | Imagem à esquerda, texto à direita, como uma lista de notícias. Se o mosaico tiver menos de 420 px de largura (telemóvel), a imagem volta a ficar na parte superior. A caixa de ícones permanece lado a lado. |

## Cores

Uma nota por baixo das cores avisa quando a letra na área é difícil
de ler (contraste inferior a 4,5 : 1). A combinação não é proibida.
Ao passar o rato por cima, uma área colorida fica ligeiramente mais escura; uma fonte selecionada
mantém a sua cor, em vez de ficar vermelha.

## A janela «Editar mosaicos»

A janela ocupa todo o ecrã. Na parte superior encontram-se **Aplicar**,
**Cancelar**, **Anular**, **Repetir**, a Ajuda e o botão para alternar
a pré-visualização (Editor, Ambiente de Trabalho, Tablet, Telemóvel). Abaixo, três colunas:

| Área | Significado |
| --- | --- |
| **Mosaicos** (à esquerda) | Todos os mosaicos por ordem, com imagem de pré-visualização, título e link. Arrastando pela alça ou utilizando o teclado, é possível reorganizá-los; **Novo mosaico** adiciona um ao final. |
| **Mosaico x de y** (ao centro) | Os campos do mosaico selecionado: **Conteúdo** (título, link), **Imagem** (biblioteca multimédia, endereço, remover) e **Mais** (rótulo, descrição, texto alternativo, nova aba). Acima, as ações «Mover», «Duplicar» e «Apagar» permitem alterar a posição do bloco. |
| **Configuração** (à direita) | **Apresentação**, **Tamanho**, **Área**, **Tipo de letra** e **Mostrar seta**; tudo se aplica a toda a linha. |

**Aplicar** grava os mosaicos e o design no widget, **Cancelar** rejeita-os
— no caso de alterações não guardadas, é apresentada uma mensagem de confirmação. O estado na parte superior indica
o que foi alterado, por exemplo, «1 mosaico alterado, design alterado».

Um mosaico sem título apresenta no campo **Título** a indicação «Sem título,
o mosaico não aparece» e denomina-se «Sem título» na lista. Permanece lá
e não se perde ao guardar; só aparece na página
assim que tiver um título.

## Campos de um mosaico

Os mosaicos, a seta e o design são guardados em conjunto no atributo `portfolio-config`
(`{"tiles":[…],"showChevron":true,"variant":"icon","size":"compact","background":"#E40045","textColor":"#FFFFFF"}`,
codificado). `variant` é `image` ou `icon`, `size` é `compact`, `normal`
ou `large`, as cores são indicadas como `#RRGGBB`; o que faltar ou for inválido
é considerado como valor padrão. Os widgets mais antigos ainda incluem os mosaicos como uma lista JSON no
campo `tiles` e a seta em `show-chevron`; ambos continuam a ser lidos,
desde que `portfolio-config` não defina o valor correspondente, e têm o mesmo aspeto
de sempre (mosaico de imagem, normal). O formato dos mosaicos é, em ambos os casos,
o mesmo:

| Campo | Janela | Obrigatório | Significado |
| --- | --- | --- | --- |
| `title` | Título | sim | O título do mosaico. Se faltar, o mosaico é ignorado. |
| `description` | Descrição (em «Mais») | não | Um texto curto abaixo do título. |
| `badge` | Etiqueta (em «Mais») | não | Uma pequena etiqueta de categoria acima do título. |
| `image` | Imagem | não | Endereço da imagem. Se estiver em falta, o mosaico não terá área de imagem. |
| `imageAlt` | Texto alternativo (em «Mais») | não | Texto alternativo para leitores de ecrã. Deixe em branco se a imagem for apenas decorativa. |
| `link` | Link | não | Destino do mosaico. Sem destino, o mosaico não é clicável e não apresenta uma seta. |
| `newTab` | Abrir numa nova aba (em «Mais») | não | `true` abre o destino numa nova aba. Predefinição `false`. |
| `id` | — | não | Chave exclusiva do mosaico. É atribuída automaticamente caso falte. |

No mosaico de imagens, as imagens são recortadas para a proporção 16:9 e
preenchem totalmente a área da imagem. Forneça imagens em que um
o recorte nas margens não seja problemático. Na caixa de ícones, por outro lado, a imagem é
ajustada e nunca é recortada — nesse caso, são adequados símbolos e logótipos em formato SVG
ou PNG com fundo transparente, na cor do texto (ou seja, branco na
área vermelha predefinida).
