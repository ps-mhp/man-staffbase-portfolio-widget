# Configuración

| Configuración | Descripción |
| --- | --- |
| **Mosaicos** | Los mosaicos de la fila. Se gestionan en el editor de mosaicos, al que se accede mediante **Editar mosaicos**. Por defecto, no hay ningún mosaico. |
| **Mostrar flecha** | Muestra una flecha en la esquina superior derecha de cada mosaico enlazado. Está activada por defecto. |

La flecha se activa de forma conjunta para todos los mosaicos, no individualmente para cada uno: una
fila en la que a veces aparece una flecha y otras no da la impresión de ser un error. En
los mosaicos sin destino no aparece en ningún caso, ya que allí no hay nada
en lo que hacer clic.

## El editor de mosaicos

El editor muestra una línea por cada mosaico, todas una debajo de otra. En la línea
aparecen:

| Elemento | Significado |
| --- | --- |
| **Mango** (izquierda) | Mueve el mosaico a otra posición. Con el teclado, las teclas **flecha arriba** y **flecha abajo** lo desplazan una posición cada vez. |
| **Imagen** | La vista previa. El lápiz abre la biblioteca multimedia; la papelera de la vista previa solo elimina la imagen, no el mosaico. Si no hay imagen, aparece un área rayada con el texto **Seleccionar imagen**. |
| **Título** | El título del mosaico. Obligatorio. |
| **Enlace** | El destino del mosaico. |
| **Más** / **Menos** | Despliega los campos menos habituales: etiqueta, descripción, texto alternativo de la imagen y **Abrir en una pestaña nueva**. |
| **Papelera** (a la derecha) | Elimina todo el mosaico. |

Debajo de la lista aparece **Añadir mosaico**; el nuevo mosaico se añade al
final. **Aplicar** guarda la lista en el widget, **Cancelar** la descarta
— si hay cambios sin guardar, se preguntará antes de continuar.

Un mosaico sin título muestra en el editor la indicación «Sin título, este
mosaico no se mostrará». Permanece en la lista y no se pierde al guardar;
en la página solo aparecerá en cuanto tenga un título.

## Campos de un mosaico

Los mosaicos se guardan como una lista JSON. Esto solo se ve cuando
el editor no aparece; en ese caso, el campo de texto sirve como alternativa.

| Campo | Editor | Obligatorio | Significado |
| --- | --- | --- | --- |
| `title` | Título | sí | El título del mosaico. Si falta, se omite el mosaico. |
| `description` | Descripción (en «Más») | no | Un texto breve debajo del título. |
| `badge` | Etiqueta (en «Más») | no | Una pequeña etiqueta de categoría encima del título. |
| `image` | Imagen | no | Dirección de la imagen. Si falta, el mosaico no tendrá área de imagen. |
| `imageAlt` | Texto alternativo (en «Más») | no | Texto alternativo para lectores de pantalla. Déjalo en blanco si la imagen es solo decorativa. |
| `link` | Enlace | no | Destino del mosaico. Sin destino, no se puede hacer clic en el mosaico y no aparece ninguna flecha. |
| `newTab` | Abrir en una pestaña nueva (en «Más») | no | `true` abre el destino en una pestaña nueva. Por defecto, `false`. |
| `id` | — | no | Clave propia del mosaico. Se asigna automáticamente si falta. |

Las imágenes se recortan a la relación de aspecto 16:9 y ocupan
por completo el mosaico. Proporcione imágenes en las que el recorte de los bordes
no resulte molesto.
