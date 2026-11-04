# Passo a passo

## Configurar o caso básico

1. Guarde previamente as imagens na biblioteca multimédia e copie os respetivos
   endereços. Cada mosaico precisa do seu próprio endereço.
2. Coloque o widget **Portfólio** no local pretendido da página.
3. Introduza a lista no campo **Blocos**. Cada bloco é um objeto entre
   parênteses retos, separado por vírgulas:

   ```json
   [
     {
       "title": "Camião",
       "image": "https://…/lkw.png",
       "link": "/content/page/lkw"
     },
     {
       "title": "Autocarro",
       "image": "https://…/bus.png",
       "link": "/content/page/bus"
     }
   ]
   ```

4. Mantenha a opção **Mostrar seta** ativada se pretender que apareça uma seta no canto superior direito de cada
   mosaico.
5. Guarde e verifique o resultado na pré-visualização.

## Preencher um mosaico na íntegra

Todos os campos que um mosaico reconhece:

```json
{
  "title": "Camião",
  "badge": "Veículos",
  "description": "A gama pesada para o transporte de longo curso.",
  "image": "https://…/lkw.png",
  "imageAlt": "Um camião na autoestrada",
  "link": "/content/page/lkw",
  "newTab": true
}
```

Apenas o campo `title` é obrigatório. Todos os outros podem ser omitidos.

## Alterar posteriormente

1. Clique no widget e abra as suas definições.
2. Altere o texto no campo **Blocos**. A ordem dos blocos na
   página corresponde à ordem na lista.
3. Guarde e verifique na pré-visualização.

## Se algo não funcionar

1. Se não aparecer nada, normalmente o JSON está incorreto. Causa mais comum: uma
   vírgula a seguir ao último mosaico ou uma chave de fecho em falta.
   Verifique o texto num verificador de JSON.
2. Se faltar um único mosaico, é provável que lhe falte o `title` — os mosaicos sem
   título são ignorados.
3. Se um mosaico ficar sem imagem, verifique o endereço em `image`: este deve
   poder ser aberto diretamente no navegador.
