## Dimensiones y materiales

Considerar que si una caja hacemos:
> var caja = new THREE.BoxGeometry(100, 10, 100)

Estamos haciendo una caja de 1 metro de alto y 10 metros de ancho y largo. Es decir, cada 100 en JS, es 1 metro real

Para las dimensiones tener en cuenta lo que considera cada uno. Por ejemplo, si se considera que la imagen del material es 1m², y la pared mide 3 metros, hay que replicarla 3 veces de alto por lo que mida en ancho.


## Técnicas

Hay que tener en cuenta el uso de todas la técnicas para subir nota:
- **Revolución**: Trofeo
- **Extrusión**: 
- **Barrido**:
- **CSG**: Pedestal, Trofeo, Habitación
- **Objetos OBJ**: Mesa
- **Animaciones**: Reloj y Puerta
- **Modelo jerárquico**: Reloj
- **Etc**

## Tareas por hacer

- Al seleccionar un objeto y moverlo, se va por ahí. Se debe a que se mueve al punto final del raycasting en el suelo, por lo que el objeto se va por ahí. Hay que cambiar esa cosa
- Añadir 3 cuadros. Uno encima de la mesa, otro dentro de la sala pequeña y otro en la pared vacía de al lado de la puerta de salida
- Añadir puzles

## Ocurrencias

- Para el cuadro con cosas ocultas detrás, se puede usar de textura el mapa del mundo. Poner varios cuadros
- Poner en uno de los pedestales una figura imitando a un jarrón de cristal con la opacity muy leve para simular la transparencia, y en el otro una figura hecha por extrusión/barrido estrambotica
- Poner un puzle de luces que tengas que iluminar todas las luces
- Poner una caja invisible en la parte de arriba del trofeo para poder moverlo con mayor 
- Al resolver los puzles, hacer una "animacion" con las cámaras para enseñar que la luz de la puerta se ha puesto verde
- Poner trofeo encima de la mesa

## Cosas a tener en cuenta

- Para que los objetos no atraviesen el suelo es crear la geometría y subir el objeto con y = h/2 ANTES de crear el Mesh para tener su referencia en y = 0 

## Solucion

Primero se hace el puzle de las luces, eso hará que se encienda el busto para poner el trofeo encima. Al hacerlo, se abrirá la puerta para entrar en la sala pequeña. Dentro se introduce la clave numérica que estará apuntada en el papel que está encima de la mesa. Con eso, se desbloqueará la puerta de salida.