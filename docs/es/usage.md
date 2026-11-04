# Paso a paso

## Configuración básica

1. Guarda primero las imágenes en la biblioteca multimedia y copia sus
   direcciones. Cada mosaico necesita su propia dirección.
2. Coloca el widget **Portafolio** en el lugar deseado de la página.
3. Introduce la lista en el campo **Mosaicos**. Cada mosaico es un objeto entre
   corchetes, separado por comas:

   ```json
   [
     {
       "title": "Camión",
       "image": "https://…/lkw.png",
       "link": "/content/page/lkw"
     },
     {
       "title": "Autobús",
       "image": "https://…/bus.png",
       "link": "/content/page/bus"
     }
   ]
   ```

4. Deje activada la opción **Mostrar flecha** si desea que aparezca una flecha en la esquina superior derecha de cada
   mosaico.
5. Guarde los cambios y compruebe el resultado en la vista previa.

## Rellenar un mosaico por completo

Todos los campos que puede contener un mosaico:

```json
{
  "title": "Camión",
  "badge": "Vehículos",
  "description": "La gama pesada para el transporte de larga distancia.",
  "image": "https://…/lkw.png",
  "imageAlt": "Un camión en la autopista",
  "link": "/content/page/lkw",
  "newTab": true
}
```

Solo es obligatorio el campo `title`. El resto puede omitirse.

## Modificar posteriormente

1. Haz clic en el widget y abre su configuración.
2. Modifica el texto del campo **Mosaicos**. El orden de los mosaicos en la
   página = orden en la lista.
3. Guarda los cambios y comprueba el resultado en la vista previa.

## Si algo no funciona

1. Si no aparece nada, lo más probable es que el JSON esté incorrecto. La causa más frecuente: una
   coma después del último mosaico o un corchete de cierre que falta.
   Compruebe el texto con un validador de JSON.
2. Si falta un mosaico concreto, es probable que le falte el `title` — los mosaicos sin
   título se omiten.
3. Si un mosaico no muestra ninguna imagen, comprueba la dirección en `image`: debe
   poder abrirse directamente en el navegador.
