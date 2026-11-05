# Paso a paso

## Configuración básica

1. Coloca el widget **Portafolio** en el lugar que desees de la página.
2. Abre la configuración del widget y haz clic en
   **Editar mosaicos**. Se abrirá el editor de mosaicos.
3. Haz clic en **Añadir mosaico**. Aparecerá una nueva línea vacía
   al final de la lista.
4. Rellena los campos **Título** y **Enlace**.
5. Haz clic en el área rayada **Seleccionar imagen** y busca la
   imagen en la biblioteca multimedia. También puedes subirla directamente desde allí.
6. Repite los pasos del 3 al 5 para cada mosaico adicional.
7. Haz clic en **Aplicar** y guarda la página.
8. Deja activada la opción **Mostrar flecha** si quieres que aparezca una flecha en la esquina superior derecha de cada
   mosaico.
9. Comprueba el resultado en la vista previa.

## Rellenar completamente un mosaico

El título, el enlace y la imagen aparecen en la línea. El resto de la información se encuentra tras el
botón desplegable **Más** al final de la línea:

- **Etiqueta**: una breve palabra de categoría encima del título, por ejemplo, «Vehículos».
- **Descripción**: un texto breve debajo del título.
- **Texto alternativo de la imagen**: lo que un lector de pantalla
  lee en lugar de la imagen. Déjelo en blanco si la imagen es meramente decorativa. Al seleccionar una imagen,
  el editor toma un texto alternativo de la biblioteca multimedia, siempre que el
  campo aún no se haya rellenado; sin embargo, no toma un simple nombre de archivo como «lkw.png»,
  sino que se mantiene el texto que hayas escrito tú mismo.
- **Abrir en una pestaña nueva**: abre el enlace en una nueva pestaña del navegador.

Con **Menos** se vuelve a cerrar el panel. Cada línea tiene su propio
botón de expansión.

Solo es obligatorio el título. El resto puede omitirse.

## Cambiar el orden

El orden de los mosaicos en la página es el mismo que el de la lista.

- **Con el ratón:** agarra el mosaico por el controlador situado en el extremo izquierdo y arrástralo
  hacia arriba o hacia abajo. En cuanto cubra la mitad de una fila adyacente,
  ambos intercambiarán sus posiciones.
- **Con el teclado:** selecciona el controlador con la tecla Tab y
  mueve el mosaico con las teclas **Flecha arriba** y **Flecha abajo**
  una posición cada vez.

## Cambiar o eliminar la imagen

En la vista previa de la imagen hay dos pequeños botones:

- El **lápiz** abre la biblioteca multimedia y sustituye la imagen.
- La **papelera** solo elimina la imagen. El mosaico permanece y se
  muestra sin el área de la imagen.

Por el contrario, la **papelera situada en el extremo derecho de la fila** elimina todo el mosaico.

## Modificar posteriormente

1. Haz clic en el widget y abre su configuración.
2. Haz clic en **Editar mosaicos**.
3. Modifique lo que sea necesario y haga clic en **Aplicar**.
4. Guarde los cambios y compruébelos en la vista previa.

**Cancelar** descarta los cambios; si hay alguno pendiente, el editor
le preguntará antes.

## Si algo no funciona

1. Si falta un mosaico en la página, es probable que le falte el título. El editor
   muestra en esa línea el mensaje «Sin título, este mosaico no
   se muestra»: el mosaico permanece ahí, pero no se muestra.
2. Si un mosaico no tiene imagen, comprueba la dirección: debe poder
   abrirse directamente en el navegador. Las imágenes de la biblioteca siempre cumplen este requisito.
3. Si en lugar del editor solo aparece un campo de texto con JSON, sigue editando los
   mosaicos allí de forma excepcional; el formato es el mismo:

   ```json
   [
     {
       "title": "Camión",
       "badge": "Vehículos",
       "description": "La gama pesada para el transporte de larga distancia.",
       "image": "https://…/lkw.png",
       "imageAlt": "Un camión en la autopista",
       "link": "/content/page/lkw",
       "newTab": true
     }
   ]
   ```

   Si después no aparece nada más, lo más probable es que el JSON esté mal: una coma
   después del último elemento o un corchete de cierre que falta. Comprueba
   el texto con un validador de JSON.
