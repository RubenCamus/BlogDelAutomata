---
layout: '../../layouts/Layout.astro
title: 'Routing con Angular'
description: "Aprendiendo a hacer routing básico con Angular"
date: '16 Marzo 2026'
author: 'Ruben C'
---
Una de las características principales de **Angular** es el **Routing**, que sirve para crear una **SPA** (Single-Page Application) de forma optimizada.

> En una **MPA** (Multi-Page Application) cuando pulsamos un enlace realiza una petición al servidor y carga una página totalmente nueva.
>
> En una **SPA** el cliente hace una solicitud al servidor para cargar un index.html y en el cliente tendremos un router que se encarga de ir cargando el contenido según la URL.

Las **rutas** gestionan que componentes se cargarán según la URL.

## Como implementar routing con Angular

Si tenemos un entorno creado con **Angular-Cli** dentro de app hay un fichero llamado _app.routes.ts_, sino lo creamos.
Dentro de este archivo definiremos todas nuestras rutas que apuntarán hacia nuestros componentes.

```javascript
import { HomePage } from './components/home';

export const routes: Routes (
    { 
        path: '',
        component: HomePage,
    }
)
```
Actualizamos la llamada que hace bootstrapApplication() en _main.ts_ para que incluya la configuración de enrutado.

```javascript
import {routes} from './app/app.routes';

bootstrapApplication(App,{providers:[provideProtractorTestingSupport(), provideRouter(routes)]})
.catch((err) => console.error(err));
```
Lo siguiente que necesitamos es que nuestra app sepa donde cargar los componentes enrutados, en _app.ts_ importaremos las librerias de enrutado y
añadiremos al componente los imports necesarios y colocaremos en el template el **RouterLink** y **RouterOutlet**.

```javascript
import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  template: `
  <main>
    <a [routerLink]="['/']"> <img src="miLogo" alt="logo"> </img> </a>
    <section>
      <router-outlet/>
    </section>
    <footer></footer>
  </main>`,
  styleUrls: ['./app.css'],
})
export class App {}
```
- Router-outlet es un placeholder para los componentes de la URL que son cargados.
- RouterLink convierte un elemento en un enlace que navega hacia la ruta indicada.

Con esto ya tendríamos un enrutado básico con Angular.