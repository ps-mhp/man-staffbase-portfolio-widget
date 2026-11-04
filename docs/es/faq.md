# Preguntas frecuentes

**Pregunta:** El widget no muestra nada. ¿A qué se debe?

Respuesta: O bien el campo **Mosaicos** está vacío, o bien su contenido no es un
JSON válido. En el segundo caso, en la consola de desarrolladores del navegador aparecerá el
mensaje «portfolio-widget: El campo «Mosaicos» no contiene una
matriz JSON válida». Las causas más frecuentes son: una coma después del último mosaico, un
corchete de cierre que falta o comillas tipográficas (« ») en lugar de
comillas rectas ("). Comprueba el texto con un validador de JSON.

**Pregunta:** Falta un único mosaico; los demás aparecen correctamente.

Respuesta: A este mosaico le falta el `title`. Los mosaicos sin título se
omiten para que un error tipográfico en un mosaico no
afecte al resto. Un `title` que consista únicamente en espacios en blanco se considera
ausente.

**Pregunta:** ¿De dónde obtengo la dirección para `image`?

Respuesta: Sube la imagen a la biblioteca multimedia, ábrela allí y copia
la dirección. También sirve una imagen de otra página web,
siempre que sea de acceso público.

**Pregunta:** ¿Por qué uno de mis mosaicos no tiene flecha, aunque la opción «Mostrar flecha»
esté activada?

Respuesta: Al mosaico le falta el atributo `link`. Sin destino, no se puede hacer clic en él, y una
flecha sugeriría una acción que no existe.

**Pregunta:** Las imágenes están recortadas a diferentes alturas.

Respuesta: Todas las imágenes se ajustan a 16:9 y ocupan
por completo el área de la imagen. Cuando las relaciones de aspecto difieren mucho, el
recorte varía. Si es posible, envía las imágenes ya en la
proporción 16:9.

**Pregunta:** ¿Puedo forzar que los mosaicos se ajusten a un número concreto de columnas?

Respuesta: No. Los mosaicos tienen un ancho fijo y se ajustan en cuanto
no haya espacio suficiente, igual que ocurre con el widget de portafolio propio de Staffbase.

**Pregunta:** ¿Cuándo habrá un editor propiamente dicho en lugar del campo JSON?

Respuesta: Está previsto. El formato de datos no cambiará, por lo que los mosaicos que
haya creado hoy se mantendrán tal cual.
