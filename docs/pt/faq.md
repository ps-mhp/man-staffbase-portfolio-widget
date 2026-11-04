# Perguntas frequentes

**Pergunta:** O widget não mostra nada. A que se deve isso?

Resposta: Ou o campo **Blocos** está vazio, ou o seu conteúdo não é um
JSON válido. No segundo caso, aparece na consola de programadores do navegador a
mensagem «portfolio-widget: O campo «Blocos» não contém um
array JSON.» Causas mais comuns: uma vírgula após o último mosaico, uma
chave de fecho em falta ou aspas tipográficas (« ») em vez de
aspas retas ("). Verifique o texto num validador de JSON.

**Pergunta:** Falta um único mosaico, os outros estão todos presentes.

Resposta: A este mosaico falta o `title`. Os mosaicos sem título são
ignorados, para que um erro ortográfico num mosaico não
afete os restantes. Um `title` composto apenas por espaços conta como
ausente.

**Pergunta:** Onde posso obter o endereço para `image`?

Resposta: Carregue a imagem na biblioteca multimédia, abra-a lá e copie
o endereço. Uma imagem de um site externo também funciona,
desde que esteja acessível ao público.

**Pergunta:** Por que razão um dos meus mosaicos não tem uma seta, apesar de a opção «Mostrar seta»
estar ativada?

Resposta: Falta o `link` nesse mosaico. Sem destino, não é clicável, e uma
seta sugeriria uma ação que não existe.

**Pergunta:** As imagens estão recortadas em alturas diferentes.

Resposta: Todas as imagens são ajustadas para 16:9 e preenchem a área da imagem
na totalidade. Em caso de proporções muito diferentes, o
recorte varia. Se possível, forneça as imagens já na
proporção 16:9.

**Pergunta:** Posso forçar os mosaicos a ocuparem um número específico de colunas?

Resposta: Não. Os mosaicos têm uma largura fixa e quebram assim que o
espaço deixar de ser suficiente — tal como acontece com o widget de portfólio próprio da Staffbase.

**Pergunta:** Quando é que vai ser disponibilizado um editor propriamente dito em vez do campo JSON?

Resposta: Está previsto. O formato dos dados permanecerá inalterado, pelo que os
blocos que criou hoje permanecerão inalterados.
