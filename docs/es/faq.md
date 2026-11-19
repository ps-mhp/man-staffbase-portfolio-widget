# Preguntas frecuentes

**Pregunta:** El widget no muestra nada. ¿A qué se debe?

Respuesta: Por lo general, aún no se ha creado ningún mosaico; abra la
configuración y haga clic en **Editar mosaicos**. Si,
excepcionalmente, ha introducido los
mosaicos en el campo de texto JSON, es posible que el contenido no sea un
JSON válido. En ese caso, en la consola de desarrolladores del navegador aparecerá el mensaje
«portfolio-widget: El campo «Mosaicos» no contiene una matriz JSON válida».
Causas más frecuentes: una coma después del último mosaico, falta un
corchete de cierre o se han utilizado comillas tipográficas (« ») en lugar de comillas rectas
(« »). Comprueba el texto con un validador de JSON.

**Pregunta:** Falta un único mosaico; los demás aparecen correctamente.

Respuesta: A este mosaico le falta el título. Los mosaicos sin título se
omiten para que un error tipográfico en uno de ellos no
afecte al resto. Un título que consista únicamente en espacios en blanco se considera ausente.
En el editor, ese mosaico permanece y muestra la indicación «Sin título,
este mosaico no se muestra», por lo que no lo pierdes, sino que
solo aparecerá en la página una vez que le hayas asignado un título.

**Pregunta:** ¿Cómo se añade una imagen a un mosaico?

Respuesta: A través de **Seleccionar de la biblioteca multimedia** en la sección **Imagen**. La biblioteca multimedia
se abre a la derecha como una barra; desde allí se puede subir la imagen directamente
o arrastrarla hasta el campo de la imagen. También funciona una imagen de otra página web:
para ello, introduce su
dirección https en **Insertar dirección**, siempre que sea de acceso público.

**Pregunta:** Solo quería cambiar la imagen y, sin querer, he borrado todo el
mosaico.

Respuesta: **Eliminar**, en la sección **Imagen**, solo elimina la imagen,
mientras que **Borrar mosaico**, situado encima de los campos, elimina todo el mosaico. Siempre que aún no hayas hecho clic en
**Aplicar**, **Deshacer** revertirá el error, y
**Cancelar** descarta todos los cambios.

**Pregunta:** ¿Cómo cambio el orden?

Respuesta: Arrastra el mosaico en la lista de la izquierda por el tirador hasta su nueva posición.
También se puede hacer sin ratón: seleccione el mosaico, pulse la barra espaciadora, desplácelo con las **flechas arriba** y
**flechas abajo**, y vuelva a pulsar la barra espaciadora. Para desplazar los mosaicos situados encima de los campos,
utilice **Mosaico arriba** y **Mosaico abajo** para moverlos una posición hacia arriba o hacia abajo, respectivamente.

**Pregunta:** ¿Por qué uno de mis mosaicos no tiene flecha, aunque la opción «Mostrar flecha»
esté activada?

Respuesta: Al mosaico le falta el enlace. Sin destino, no se puede hacer clic en él, y una
flecha sugeriría una acción que no existe.

**Pregunta:** Las imágenes están recortadas a diferentes alturas.

Respuesta: En el mosaico de imágenes, todas las imágenes se ajustan a 16:9 y ocupan
por completo el área de la imagen. Cuando las relaciones de aspecto difieren mucho, el
recorte varía. Si es posible, envía las imágenes ya en
proporción 16:9.

**Pregunta:** ¿Puedo forzar que los mosaicos se ajusten a un número concreto de columnas?

Respuesta: No exactamente, pero sí a través del **tamaño**: **Compacto** coloca muchos mosaicos pequeños
uno al lado del otro, **Normal** muestra unas cuatro, **Grande** dos. El número exacto
depende del ancho de la pantalla; así, la fila sigue siendo legible en tabletas
y teléfonos.

**Pregunta:** Mi icono blanco apenas se ve en el editor.

Respuesta: En el mosaico de la imagen aparece sobre un fondo claro. Seleccione en
**Diseño** la opción **Cuadro de iconos**; así, tanto la lista como el campo de imagen
mostrarán el icono dentro del área del cuadro.

**Pregunta:** En la sección de colores aparece «Contraste… difícil de leer».

Respuesta: La fuente y el fondo están demasiado juntos; el texto continuo necesita una
relación de al menos 4,5 : 1. Configura la **fuente** en
**Automático** o elige un color claramente más claro o más oscuro.

**Pregunta:** En lugar de la ventana, solo veo un campo de texto.

Respuesta: La ventana se coloca en el lugar del campo en cuanto se
abre el cuadro de diálogo de configuración. Si en alguna ocasión no lo consigue, el
campo de texto permanece como alternativa; contiene la versión preliminar de la configuración.
Por lo general, al volver a abrir el cuadro de diálogo, la ventana vuelve a aparecer.

**Pregunta:** Ya había creado el widget antes de la modificación. ¿Se perderá algo
?

Respuesta: No. El widget sigue mostrando sus mosaicos anteriores y su
flecha. La ventana adopta estos valores al abrirse; solo cuando se realiza algún
cambio y se selecciona **Aplicar**, se guarda la nueva versión.
