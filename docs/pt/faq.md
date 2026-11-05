# Perguntas frequentes

**Pergunta:** O widget não mostra nada. A que se deve isso?

Resposta: Normalmente, ainda não foi criado nenhum bloco — abra as
configurações e clique em **Editar blocos**. Se,
excepcionalmente, tiver definido os
blocos no campo de texto JSON, é possível que o conteúdo não seja um
JSON válido. Nesse caso, na consola de programadores do navegador aparecerá a mensagem
«portfolio-widget: O campo «Blocos» não contém um array JSON válido.»
Causas mais frequentes: uma vírgula após o último mosaico, falta de um
parêntese de fecho ou aspas tipográficas (« ») em vez de aspas retas
(« »). Verifique o texto num validador de JSON.

**Pergunta:** Falta um único bloco, os outros estão visíveis.

Resposta: Falta o título a este bloco. Os blocos sem título são
ignorados, para que um erro ortográfico num bloco não
afete os restantes. Um título composto apenas por espaços conta como ausente.
No editor, esse bloco permanece visível e apresenta a indicação «Sem título,
este bloco não é apresentado» — por isso, não o perde, apenas
só aparece na página quando tiver um título.

**Pergunta:** Como se coloca uma imagem num bloco?

Resposta: Através da área tracejada **Selecionar imagem** na linha ou, no caso de uma
imagem já existente, clicando no ícone da caneta sobre a mesma. Ambas as opções abrem a biblioteca de multimédia; aí
também é possível carregar a imagem diretamente. Uma imagem de um site externo
também funciona — para isso, introduza o seu endereço no campo JSON `image`,
desde que esteja acessível ao público.

**Pergunta:** Eu só queria trocar a imagem e, sem querer, apaguei todo o
bloco.

Resposta: Existem dois caixotes do lixo. O que aparece na pré-visualização da imagem remove apenas a
imagem, enquanto o que se encontra na margem direita da linha remove o bloco inteiro. Desde que ainda não tenha
clicado em **Aplicar**, pode anular o erro com
**Cancelar**.

**Pergunta:** Como altero a ordem?

Resposta: Arraste o mosaico pela alça à esquerda até à sua nova posição. Também é possível
sem rato: selecione a alça com a tecla Tab e, em seguida, desloque-a com as setas
**para cima** e **para baixo**.

**Pergunta:** Por que razão um dos meus mosaicos não tem seta, apesar de a opção «Mostrar seta»
estar ativada?

Resposta: Falta o link ao mosaico. Sem destino, não é possível clicar nele, e uma
seta sugeriria uma ação que não existe.

**Pergunta:** As imagens estão recortadas com alturas diferentes.

Resposta: Todas as imagens são ajustadas para 16:9 e preenchem a área da imagem
na totalidade. Em caso de proporções muito diferentes, o
recorte varia. Se possível, forneça as imagens já na
proporção 16:9.

**Pergunta:** Posso forçar os mosaicos a ocuparem um número específico de colunas?

Resposta: Não. Os mosaicos têm uma largura fixa e quebram-se assim que o
espaço deixar de ser suficiente — tal como acontece com o widget de portfólio próprio da Staffbase.

**Pergunta:** Em vez do editor, só vejo um campo de texto com JSON.

Resposta: O editor substitui o campo **Blocos** assim que
a caixa de diálogo de configuração estiver aberta. Se, por algum motivo, isso não acontecer, o
campo de texto como alternativa; o formato é o mesmo e os campos de um
bloco encontram-se nas definições. Ao reabrir a caixa de diálogo, o
editor volta normalmente a aparecer.
