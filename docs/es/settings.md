# Ajustes

| Ajuste | Descripción |
| --- | --- |
| **Mosaicos** | Los mosaicos de la fila. Se gestionan en la ventana **Editar mosaicos**, que se abre en el cuadro de diálogo de configuración. Por defecto, no hay ningún mosaico. |
| **Presentación** | **Mosaico de imagen** (imagen arriba, recortada a 16:9, texto debajo) o **Cuadro de icono** (icono o imagen ajustada, texto centrado sobre un fondo de color). Por defecto, el mosaico de imagen. En la ventana de la derecha, en **Diseño**. |
| **Tamaño** | **Compacto**, **Normal** o **Grande** — para cada tipo de presentación. Por defecto, Normal. Véase más abajo. |
| **Área** | Fondo de los mosaicos: **Estándar**, un color de la identidad corporativa de MAN o un valor hexadecimal propio (`#RRGGBB`). El valor predeterminado es blanco para el mosaico de imagen y rojo MAN para el recuadro de icono. |
| **Fuente** | Color del título, la etiqueta, la descripción y la flecha: **Automático**, un color de la identidad corporativa de MAN o un valor hexadecimal propio. La opción «Automático» elige, sobre el fondo seleccionado, el color más legible entre oscuro y blanco; en caso contrario, se utilizan los colores habituales de MAN. |
| **Mostrar flecha** | Muestra una flecha en la esquina superior derecha de cada mosaico enlazado. Está activada por defecto. En la ventana, a la derecha, en **Diseño**. |

La presentación, el tamaño, los colores y la flecha se aplican a todos los mosaicos de forma conjunta, no
a cada mosaico por separado: una fila en la que cada mosaico tenga un aspecto diferente da la impresión de ser un
error. En los mosaicos sin destino, la flecha no aparece en ningún caso, ya que
no hay nada en lo que hacer clic.

## Tamaños

El tamaño establece la anchura mínima de una columna. El número de columnas
que caben una al lado de otra depende de la anchura que ocupe el widget en la
página; todas las columnas de una fila tienen la misma anchura, y todos los mosaicos de una
fila tienen la misma altura.

| Tamaño | Ancho mínimo | A ancho completo de página | Tableta | Teléfono | Característica especial |
| --- | --- | --- | --- | --- | --- |
| **Compacto** | 160 px | aprox. 7 | 4 | 2 | Letra más pequeña; las descripciones se cortan tras tres líneas. |
| **Normal** | 280 px | 4 | 2 | 1 | El formato de las versiones anteriores. |
| **Grande** | 440 px | 2 | 1 | 1 | Imagen a la izquierda, texto a la derecha, como una lista de noticias. Si el mosaico tiene menos de 420 px de ancho (teléfono), la imagen vuelve a aparecer arriba. El recuadro de iconos permanece en paralelo. |

## Colores

Una nota debajo de los colores avisa si la tipografía en la superficie es difícil
de leer (contraste inferior a 4,5 : 1). La combinación no está prohibida.
Al pasar el ratón por encima, un área de color se oscurece ligeramente; una fuente seleccionada
mantiene su color, en lugar de volverse roja.

## La ventana «Editar mosaicos»

La ventana ocupa toda la pantalla. En la parte superior se encuentran **Aplicar**,
**Cancelar**, **Deshacer**, **Rehacer**, la ayuda y el botón para
cambiar la vista previa (editor, escritorio, tableta, móvil). Debajo hay tres columnas:

| Área | Significado |
| --- | --- |
| **Mosaicos** (izquierda) | Todos los mosaicos en orden, con imagen de vista previa, título y enlace. Arrastrando el controlador o utilizando el teclado se pueden reorganizar; **Nuevo mosaico** añade uno al final. |
| **Mosaico x de y** (centro) | Los campos del mosaico seleccionado: **Contenido** (título, enlace), **Imagen** (biblioteca multimedia, dirección, eliminar) y **Más** (etiqueta, descripción, texto alternativo, nueva pestaña). Por encima, las acciones «Mover», «Duplicar» y «Eliminar» permiten modificar el mosaico. |
| **Diseño** (derecha) | **Apariencia**, **Tamaño**, **Área**, **Fuente** y **Mostrar flecha**; todo se aplica a toda la fila. |

**Aplicar** guarda los mosaicos y el diseño en el widget; **Cancelar** los descarta
— si hay cambios sin guardar, se pregunta antes. El estado de la parte superior indica
lo que ha cambiado, por ejemplo, «1 mosaico modificado, diseño modificado».

Un mosaico sin título muestra en el campo **Título** la indicación «Sin título,
el mosaico no aparece» y se denomina «Sin título» en la lista. Permanece allí
y no se pierde al guardar; solo aparece en la página
en cuanto tiene un título.

## Campos de un mosaico

Los mosaicos, la flecha y el diseño se guardan conjuntamente en el atributo `portfolio-config`
(`{"tiles":[…],"showChevron":true,"variant":"icon","size":"compact","background":"#E40045","textColor":"#FFFFFF"}`,
codificado). `variant` es `image` o `icon`, `size` es `compact`, `normal`
o `large`, y los colores se indican como `#RRGGBB`; lo que falte o no sea válido
se considera el valor por defecto. Los widgets más antiguos siguen incluyendo los mosaicos como una lista JSON en el
campo `tiles` y la flecha en `show-chevron`; ambos se siguen leyendo,
siempre que `portfolio-config` no establezca el valor correspondiente, y tienen el mismo aspecto
que hasta ahora (mosaico de imagen, normal). El formato de los mosaicos es el mismo en ambos casos:

| Campo | Ventana | Obligatorio | Significado |
| --- | --- | --- | --- |
| `title` | Título | sí | El título del mosaico. Si falta, se omite el mosaico. |
| `description` | Descripción (en «Más») | no | Un texto breve debajo del título. |
| `badge` | Etiqueta (en «Más») | no | Una pequeña etiqueta de categoría encima del título. |
| `image` | Imagen | no | Dirección de la imagen. Si no se incluye, el mosaico no tendrá área de imagen. |
| `imageAlt` | Texto alternativo (en «Más») | no | Texto alternativo para lectores de pantalla. Déjalo en blanco si la imagen es meramente decorativa. |
| `link` | Enlace | no | Destino del mosaico. Sin destino, el mosaico no es clicable y no muestra ninguna flecha. |
| `newTab` | Abrir en una pestaña nueva (en «Más») | no | `true` abre el destino en una pestaña nueva. Por defecto, `false`. |
| `id` | — | no | Clave propia del mosaico. Se asigna automáticamente si falta. |

En el mosaico de imágenes, estas se recortan a la proporción 16:9 y
ocupan por completo el área de la imagen. Proporcione imágenes en las que el
el recorte en los bordes no resulte molesto. En el recuadro de iconos, en cambio, la imagen
se ajusta y nunca se recorta; allí son adecuados símbolos y logotipos en formato SVG
o PNG con fondo transparente, del mismo color que la tipografía (es decir, blanco sobre el
fondo rojo predeterminado).
