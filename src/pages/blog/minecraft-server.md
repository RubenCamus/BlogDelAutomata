---
layout: '../../layouts/Layout.astro'
title: 'Crear un servidor de Minecraft Java con Paper + consolas'
description: 'Cómo crear un servidor Minecraft Java con plugins y permitir la conexión de consolas y Java' 
date: '22 Marzo 2026'
author: Ruben C
---
Este es un paso a paso de cómo crear un servidor de Minecraft en local para jugar con amigos o hacer un servidor público, también explicaré como hacer 
que los jugadores de consola (PS4/PS5,Xbox,Nintendo Switch) puedan conectarse y jugar en nuestro servidor.
## Requerimientos Iniciales

Primero de todo necesitaremos estas aplicaciones instaladas
- Java 17 o superior (lo podemos comprobar en un terminal con java -version)
- Un mínimo 4GB de RAM

## Primeros pasos

1. Primero de todo descargaremos el .jar de **Paper** en la versión que queramos del servidor de Minecraft en la página oficial que podemos encontrar [aquí](https://papermc.io/downloads/paper)
2. Luego creamos una carpeta en el escritorio dónde guardaremos todos los archivos del servidor y añadimos ahí el .jar.
3. Hacemos clic derecho en el explorador de archivos y abrimos un terminal nuevo en el que ejecutaremos este comando ```java -jar .\paper-"VuestraVersionDePaper"```.
4. Esto nos dará un error ya que tenemos que aceptar las condiciones eula, que encontramos en el archivo eula.txt que se genera, lo abrimos con el bloc de notas de Windows y cambiamos false por true.
5. Ahora también tenemos el archivo de server.properties dónde podemos configurar parámetros del servidor como: PvP, protección del spawn, habilitar Nether, dificultad y más... 
Hasta aquí tendríamos un servidor local funcional para jugar en LAN sin plugins instalados. 

## Como añadir plugins y configurar la conexión de consolas a nuestro servidor.
1. Ahora ya podemos desargar los plugins necesarios para hacer nuestro servidor funcionar, os recomiendo descargarlos de [Hangar](https://hangar.papermc.io/) o [Modrinth](https://modrinth.com/discover/plugins).
2. Los esenciales para permitir la conexión con consolas son GeyserMC y Floodgate, los descargaremos y añadiremos en la carpeta plugins. ![captura carpeta](/capturaCarpeta.png).
3. Si reiniciamos el servidor y abrimos una sesión de Minecraft, en multijugador añadimos un servidor nuevo en el que la IP sea localhost y ya estaremos jugando en nuestro servidor.
4. Una vez tenemos esto funcionando hay que permitir a jugadores de otras redes conectarse, tenemos 2 opciones.
> Usar playit.gg, sin abrir puertos de nuestro ordenador o router creará un túnel por el que dirigir el tráfico.
>
> Abrir puertos en nuestro ordenador y/o router local, abriendo el puerto 19132 UDP de nuestro router y firewall.
   
5. Aqui veremos cómo hacerlo con playit.gg que es más cómodo y accesible. Primero iréis a su [página web](https://playit.gg), os créais una cuenta y descargáis el programa. Cuando lo ejecutamos nos dará un código que lo añadiremos en la pestaña de añadir el código <br><img src='/capturaClaimCode.png' width='600' height='400'> <br>Esto nos creará un agente que nos permite crear túneles. Ahora crearemos un nuevo túnel en la pestaña de túneles y seleccionamos Minecraft Bedrock <br><img src='/capturaTunel.png' width='400' height='400'> <br>
6. Tendremos un nombre del servidor y una IP con un **puerto** que nos genera. <img src='/capturaTunel2.png'> <br> Utilizaremos este puerto en el archivo de configuración de Geyser. Cambiaremos esto la autenticación de los jugadres de bedrock a floodgate, para que no tengan que verificar con una cuenta de Java. <img src='/capturaFloodgate.png'> <br> lo siguiente que cambiamos, es el puerto que escuchará las solicitudes de Bedrock.
7. Ahora en la versión de Minecraft Bedrock añadiremos el servidor de esta forma. <img src='/capturaServerBedrock.png' width='800' height='500'> <br>Escribimos la **dirección IP/nombre y el puerto** que nos indica playit.gg.

Con esto los jugadores de Bedrock ya se podrían conectar a nuestro servidor, pero si lo habéis probado o intentáis que un jugador de Java se conecte no podrá, ya que tenemos que crear un túnel en playit de la misma forma que lo hemos hecho en Bedrock y utilizaremos esa IP/nombre para conectar a los jugadores de Java.

<img src='/capturaMinecraft.png' width='600' height='500'> <br>
Si hemos configurado bien este último paso deberíamos de poder conectarnos tanto desde Java cómo Bedrock. Ahora lo siguiente es como conectarse desde consolas, hay varios métodos y dependiendo de la consola podréis usar unos u otros, yo aquí os explico los que recomiendo.

## Configurar DNS en PS4 o Xbox
Este método es relativamente sencillo, tendremos que configurar nuestra conexión de red y cambiarle el DNS primario y secundario. 
1. Ir al menú principal -> Configuración -> Red -> Configurar conexión a internet
2. Elegir usar cable **LAN o Wi-Fi** dependiendo de la conexión que estéis usando.
3. Seleccionamos **creación de red personalizada** y **dirección IP automática**.
4. El nombre de DHCP, seleccionamos **No especificar**.
5. En configuración de DNS elegimos **manual**.
6. Ahora en el primer campo escribiremos la dirección DNS que hará de puente para nuestro servidor, esta la podemos encontrar en el [Github de BedrockConnect](https://github.com/Pugmatt/BedrockConnect), en mi caso uso la de Playstation que es **45.55.68.52** y de secundario usamos 8.8.8.8.
Aquí dejo un par de vídeos, que explican cómo configurarlo. [Xbox](https://www.youtube.com/watch?v=g8mHvasVHMs) [Nintendo Switch](https://www.youtube.com/watch?v=zalT_oR1nPM)
## Crear script para ejecutar el servidor de un solo clic.

- Iremos donde se encuentra el ejecutable de playit y crearemos un acceso directo -> Clic derecho -> Crear acceso directo.
- Movemos el acceso directo a nuestra carpeta donde se encuentran los archivos del servidor.
- Creamos un archivo de texto en esta carpeta y añadimos estas líneas 
```bash 
start .\Playit.gg.lnk
java -Xms4G -Xmx6G -jar .\paper-"TuVersionDePaper" --nogui
```
Y ahora, **muy importante**, guardarlo cómo archivo .bat. Archivo -> Guardar como -> Tipo: Todos los archivos -> Y lo llamamos algo como **run.bat**. <br><img src='/capturaScript.png'> <br>
Ahora si lo ejecutamos, abrirá la aplicación de **playit** y el **servidor**. 