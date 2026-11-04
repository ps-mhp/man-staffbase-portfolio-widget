# Configuración

| Configuración | Descripción |
| --- | --- |
| **Mosaicos** | Los mosaicos como lista JSON. El valor predeterminado es `[]`, es decir, ningún mosaico. Los campos de cada mosaico se indican más abajo. |
| **Mostrar flecha** | Muestra una flecha en la esquina superior derecha de cada mosaico con enlace. Está activada por defecto. |

La flecha se activa de forma conjunta para todos los mosaicos, no individualmente para cada uno: una
serie en la que a veces aparece una flecha y otras no da la impresión de ser un error. En
los mosaicos sin destino, no aparece en ningún caso, ya que no hay nada
en lo que hacer clic.

## Campos de un mosaico

| Campo | Obligatorio | Significado |
| --- | --- | --- |
| `title` | sí | El título del mosaico. Si falta, se omite el mosaico. |
| `description` | no | Un texto breve debajo del título. |
| `badge` | no | Una pequeña etiqueta de categoría sobre el título. |
| `image` | no | Dirección de la imagen. Si falta, el mosaico no tiene área de imagen. |
| `imageAlt` | no | Texto alternativo para lectores de pantalla. Déjalo en blanco si la imagen es solo decorativa. |
| `link` | no | Destino del mosaico. Sin destino, el mosaico no es clicable y no muestra ninguna flecha. |
| `newTab` | no | `true` abre el destino en una nueva pestaña. Por defecto, `false`. |
| `id` | no | Clave propia del mosaico. Se asigna automáticamente si no se indica. |

Las imágenes se recortan a la relación de aspecto 16:9 y ocupan
por completo el mosaico. Proporcione imágenes en las que el recorte de los bordes
no resulte molesto.
