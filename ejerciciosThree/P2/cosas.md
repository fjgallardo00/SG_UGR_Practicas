## Dimensiones y materiales

Considerar que si una caja hacemos:
> var caja = new THREE.BoxGeometry(100, 10, 100)

Estamos haciendo una caja de 1 metro de alto y 10 metros de ancho y largo. Es decir, cada 100 en JS, es 1 metro real

Para las dimensiones tener en cuenta lo que considera cada uno. Por ejemplo, si se considera que la imagen del material es 1m², y la pared mide 3 metros, hay que replicarla 3 veces de alto por lo que mida en ancho.


## Técnicas

Hay que tener en cuenta el uso de todas la técnicas para subir nota:
- **Revolución**: Pieza ajedrez "reconvertida" en trofeo
- **Extrusión**: 
- **Barrido**:
- **CSG**: Pedestal
- **Objetos OBJ**: Mesa
- **Animaciones**: Se supone que el reloj de la pared y la puerta. El cuadro también lo debe de tener para abrirse
- **Modelo jerárquico**: Reloj y cuadro
- **Etc**

## Tareas por hacer

- Probar las animaciones y empezar a comprobar si las dimensiones son correctas
- Añadir el trofeo en la sala oculta y hacer la sala
- Al seleccionar un objeto y moverlo, se va por ahí. Se debe a que se mueve al punto final del raycasting en el suelo, por lo que el objeto se va por ahí. Hay que cambiar esa cosa

## Ocurrencias

- Para abrir la puerta al terminar el scape room habría que pinchar en el pomo de la puerta con la función **onClick** del ratón y usar una animación que tarde 2 segundos en abrirse con las animaciones de tween de ese con una rotación sobre un eje de la puerta. Buscar para la puerta una textura de puerta
- Para el cuadro con cosas ocultas detrás, se puede usar de textura el mapa del mundo
- Poner en uno de los pedestales una figura imitando a un jarrón de cristal con la opacity muy leve para simular la transparencia, y en el otro una figura hecha por extrusión/barrido estrambotica

## Cosas a tener en cuenta

- Para que los objetos no atraviesen el suelo es crear la geometría y subir el objeto con y = h/2 ANTES de crear el Mesh para tener su referencia en y = 0 