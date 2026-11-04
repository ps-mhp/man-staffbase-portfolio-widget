# Definições

| Definição | Descrição |
| --- | --- |
| **Blocos** | Os blocos como uma lista JSON. O valor predefinido é `[]`, ou seja, nenhum bloco. Os campos de cada bloco encontram-se abaixo. |
| **Mostrar seta** | Mostra uma seta no canto superior direito de cada mosaico com link. Por predefinição, está ativada. |

A seta é ativada em conjunto para todos os blocos, não individualmente: uma
linha em que ora aparece uma seta e ora não dá a impressão de ser um erro. Nos
blocos sem destino, a seta não aparece de forma geral — não há nada
em que clicar.

## Campos de um bloco

| Campo | Obrigatório | Significado |
| --- | --- | --- |
| `title` | sim | O título do bloco. Se faltar, o bloco é ignorado. |
| `description` | não | Um texto breve abaixo do título. |
| `badge` | não | Um pequeno ícone de categoria acima do título. |
| `image` | não | Endereço da imagem. Se faltar, o mosaico não terá área de imagem. |
| `imageAlt` | não | Texto alternativo para leitores de ecrã. Deixe em branco se a imagem for apenas decorativa. |
| `link` | não | Destino do mosaico. Sem destino, o mosaico não é clicável e não apresenta uma seta. |
| `newTab` | não | `true` abre o destino numa nova aba. Predefinição `false`. |
| `id` | não | Chave exclusiva do mosaico. É atribuída automaticamente se estiver em falta. |

As imagens são recortadas para a proporção 16:9 e preenchem o mosaico
na totalidade. Forneça imagens em que o recorte nas margens
não seja problemático.
