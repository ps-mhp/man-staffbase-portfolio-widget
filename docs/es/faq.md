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
omiten para que un error tipográfico en un mosaico no
afecte al resto. Un título que consista únicamente en espacios en blanco se considera ausente.
En el editor, ese mosaico permanece y muestra la indicación «Sin título,
este mosaico no se muestra»; por lo tanto, no lo pierdes, sino que
solo aparecerá en la página una vez que le hayas asignado un título.

**Pregunta:** ¿Cómo se añade una imagen a un mosaico?

Respuesta: A través del área rayada **Seleccionar imagen** en la fila; si ya hay
una imagen, haciendo clic en el lápiz que aparece sobre ella. Ambas opciones abren la biblioteca multimedia; allí
también se puede subir la imagen directamente. Una imagen de otra página web
también funciona: para ello, introduce su dirección en el campo JSON `image`,
siempre que sea de acceso público.

**Pregunta:** Solo quería cambiar la imagen y, sin querer, he borrado todo el
mosaico.

Respuesta: Hay dos papeleras. La de la vista previa de la imagen solo elimina la
imagen, mientras que la situada en el extremo derecho de la fila elimina todo el mosaico. Siempre que aún no hayas
hecho clic en **Aplicar**, puedes deshacer el error con
**Cancelar**.

**Pregunta:** ¿Cómo cambio el orden?

Respuesta: Arrastra el mosaico por el controlador situado en el extremo izquierdo hasta su nueva posición. También se puede hacer sin
ratón: selecciona el controlador con la tecla Tab y, a continuación, desplázalo con las teclas **Flecha
arriba** y **Flecha abajo**.

**Pregunta:** ¿Por qué uno de mis mosaicos no tiene flecha, aunque la opción «Mostrar flecha»
esté activada?

Respuesta: A ese mosaico le falta el enlace. Sin destino, no se puede hacer clic en él, y una
flecha sugeriría una acción que no existe.

**Pregunta:** Las imágenes están recortadas a diferentes alturas.

Respuesta: Todas las imágenes se ajustan a 16:9 y ocupan
por completo el área de la imagen. Cuando las relaciones de aspecto difieren mucho, el
recorte varía. Si es posible, facilite las imágenes ya en la
relación de aspecto 16:9.

**Pregunta:** ¿Puedo forzar que los mosaicos se distribuyan en un número concreto de columnas?

Respuesta: No. Los mosaicos tienen un ancho fijo y se ajustan en cuanto
no hay espacio suficiente, igual que en el widget de portafolio propio de Staffbase.

**Pregunta:** En lugar del editor, solo veo un campo de texto con JSON.

Respuesta: El editor ocupa el lugar del campo **Mosaicos** en cuanto
se abre el cuadro de diálogo de configuración. Si en alguna ocasión no lo consigue, el
campo de texto como alternativa; el formato es el mismo y los campos de un
mosaico se encuentran en la configuración. Al volver a abrir el cuadro de diálogo, el
editor suele reaparecer.
