# Ajustes

| Ajuste | Descripción |
| --- | --- |
| **Mosaicos** | Los mosaicos de la fila. Se gestionan en la ventana **Editar mosaicos**, que se abre en el cuadro de diálogo de configuración. Por defecto, no hay ningún mosaico. |
| **Mostrar flecha** | Muestra una flecha en la esquina superior derecha de cada mosaico vinculado. Activado por defecto. En la ventana de la derecha, en **Diseño**. |

La flecha se activa de forma conjunta para todos los mosaicos, no individualmente: una
fila en la que a veces aparece una flecha y otras no da la impresión de ser un error. En
los mosaicos sin destino, por regla general, no aparece, ya que no hay nada
en lo que hacer clic.

## La ventana «Editar mosaicos»

La ventana ocupa toda la pantalla. En la parte superior se encuentran **Aplicar**,
**Cancelar**, **Deshacer**, **Rehacer**, la ayuda y el botón para
cambiar la vista previa (editor, escritorio, tableta, móvil). Debajo hay tres columnas:

| Área | Significado |
| --- | --- |
| **Mosaicos** (izquierda) | Todos los mosaicos en orden, con imagen de vista previa, título y enlace. Se pueden reordenar arrastrando el controlador o mediante el teclado; **Nuevo mosaico** añade uno al final. |
| **Mosaico x de y** (centro) | Los campos del mosaico seleccionado: **Contenido** (título, enlace), **Imagen** (biblioteca multimedia, dirección, eliminar) y **Más** (etiqueta, descripción, texto alternativo, nueva pestaña). Por encima, las acciones «Mover», «Duplicar» y «Eliminar» permiten modificar el mosaico. |
| **Diseño** (derecha) | El botón **Mostrar flecha**; se aplica a todos los mosaicos. |

**Aplicar** guarda los mosaicos y la flecha en el widget; **Cancelar** los descarta
— si hay cambios sin guardar, se te preguntará antes de continuar. El estado de la parte superior indica
qué se ha modificado, por ejemplo, «1 mosaico modificado».

Un mosaico sin título muestra en el campo **Título** la indicación «Sin título,
el mosaico no aparece» y se denomina «Sin título» en la lista. Permanece allí
y no se pierde al guardar; solo aparece en la página
en cuanto tiene un título.

## Campos de un mosaico

Los mosaicos y la flecha se almacenan conjuntamente en el atributo `portfolio-config`
(`{"tiles":[…],"showChevron":true}`, codificado). Los widgets más antiguos siguen almacenando los mosaicos
como una lista JSON en el campo `tiles` y la flecha en `show-chevron`; ambos
se siguen leyendo mientras `portfolio-config` no
establezca el valor correspondiente. El formato de los mosaicos es el mismo en ambos casos:

| Campo | Ventana | Obligatorio | Significado |
| --- | --- | --- | --- |
| `title` | Título | sí | El título del mosaico. Si falta, se omite el mosaico. |
| `description` | Descripción (en «Más») | no | Un texto breve debajo del título. |
| `badge` | Etiqueta (en «Más») | no | Una pequeña etiqueta de categoría encima del título. |
| `image` | Imagen | no | Dirección de la imagen. Si no se incluye, el mosaico no tendrá área de imagen. |
| `imageAlt` | Texto alternativo (en «Más») | no | Texto alternativo para lectores de pantalla. Déjalo en blanco si la imagen es meramente decorativa. |
| `link` | Enlace | no | Destino del mosaico. Sin destino, no se puede hacer clic en el mosaico y no aparece ninguna flecha. |
| `newTab` | Abrir en una pestaña nueva (en «Más») | no | `true` abre el destino en una pestaña nueva. Por defecto, `false`. |
| `id` | — | no | Clave propia del mosaico. Se asigna automáticamente si falta. |

Las imágenes se recortan a la relación de aspecto 16:9 y ocupan
por completo el mosaico. Proporcione imágenes en las que el recorte de los bordes
no resulte molesto.
