# Passo a passo

## Configurar o caso básico

1. Coloque o widget **Portfólio** no local pretendido da página.
2. Abra as definições do widget e clique em
   **Editar mosaicos**. O editor de mosaicos abre-se.
3. Clique em **Adicionar mosaico**. Aparece uma nova linha vazia
   no final da lista.
4. Preencha os campos **Título** e **Link**.
5. Clique na área tracejada **Selecionar imagem** e procure a
   imagem na biblioteca multimédia. Também é possível carregá-la diretamente a partir daí.
6. Repita os passos 3 a 5 para cada mosaico adicional.
7. Clique em **Aplicar** e guarde a página.
8. Mantenha a opção **Mostrar seta** ativada se pretender que apareça uma seta no canto superior direito de cada
   mosaico.
9. Verifique o resultado na pré-visualização.

## Preencher um bloco na íntegra

O título, o link e a imagem aparecem na linha. Todo o resto encontra-se atrás do
botão de expansão **Mais** no final da linha:

- **Etiqueta** — uma palavra curta que indica a categoria, acima do título, por exemplo, «Veículos».
- **Descrição** — um texto curto abaixo do título.
- **Texto alternativo da imagem** — o que um leitor de ecrã
  lê em vez da imagem. Deixe em branco se a imagem for apenas decorativa. Ao selecionar uma imagem,
  o editor retira um texto alternativo da biblioteca de multimédia, desde que o
  campo ainda não tenha sido preenchido — mas não um simples nome de ficheiro como «lkw.png»;
  um texto digitado manualmente permanece.
- **Abrir numa nova aba** — abre o destino numa nova aba do navegador.

Com **Menos**, a secção volta a fechar-se. Cada linha tem o seu próprio
botão de expansão.

Apenas o título é obrigatório. Tudo o resto pode faltar.

## Alterar a ordem

A ordem dos mosaicos na página corresponde à ordem na lista.

- **Com o rato:** Agarre o mosaico pela alça à extrema esquerda e arraste-o
  para cima ou para baixo. Assim que cobrir metade de uma linha adjacente,
  os dois trocam de lugar.
- **Com o teclado:** Selecione a alça com a tecla Tab e
  desloque o mosaico com as teclas **Seta para cima** e **Seta para baixo**
  uma posição de cada vez.

## Alterar ou remover a imagem

Na pré-visualização da imagem existem dois pequenos botões:

- O **lápis** abre a biblioteca multimédia e substitui a imagem.
- O **cesto de lixo** remove apenas a imagem. O mosaico permanece e é
  exibido sem a área da imagem.

Por outro lado, o **cesto de lixo na extremidade direita da linha** remove o bloco na totalidade.

## Alterar posteriormente

1. Clique no widget e abra as suas definições.
2. Clique em **Editar blocos**.
3. Altere o que for necessário e clique em **Aplicar**.
4. Guarde e verifique na pré-visualização.

**Cancelar** rejeita as alterações; caso haja alterações pendentes, o editor
pergunta antes.

## Se algo não funcionar

1. Se faltar um mosaico na página, é provável que lhe falte o título. O editor
   exibe uma mensagem a indicar «Sem título, este mosaico não será
   exibido» — o mosaico permanece lá, mas simplesmente não é mostrado.
2. Se um bloco ficar sem imagem, verifique o endereço: este deve poder ser
   aberto diretamente no navegador. As imagens da biblioteca de multimédia cumprem sempre este requisito.
3. Se, em vez do editor, aparecer apenas um campo de texto com JSON, continue a editar os
   blocos excepcionalmente nesse local — o formato é o mesmo:

   ```json
   [
     {
       "title": "Camião",
       "badge": "Veículos",
       "description": "A gama pesada para o transporte de longo curso.",
       "image": "https://…/lkw.png",
       "imageAlt": "Um camião na autoestrada",
       "link": "/content/page/lkw",
       "newTab": true
     }
   ]
   ```

   Se, depois disso, não aparecer mais nada, é provável que o JSON esteja incorreto: uma vírgula
   a seguir ao último bloco ou uma chave de fecho em falta. Verifique
   o texto num validador de JSON.
