# AGENTS

## Stack
- Angular 22
- TypeScript
- SCSS
- standalone components
- Angular Router
- HttpClient
- Signals
- Reactive Forms

## Arquitectura
- Base modular por `features`.
- La estructura objetivo es `src/app/core`, `src/app/shared` y `src/app/features`.
- No crear carpetas o abstracciones vacías solo por anticipación.
- Mantener la base simple hasta que exista una necesidad real.

## Convenciones
- Usar Angular standalone y Router.
- Preferir componentes, servicios y rutas pequeñas.
- Mantener estilos globales con design tokens propios en SCSS.
- No usar NgRx al inicio.
- No agregar librerías UI externas sin aprobación explícita.

## Ejecución
- No hacer `commit` ni `push`.
- No levantar servidores persistentes.
- Evitar procesos interactivos o en watch salvo que sea necesario.
- Validar con `build`, `test` o `typecheck` puntuales cuando aplique.

## Restricciones
- No usar Tailwind, Angular Material, PrimeNG, Bootstrap ni librerías de charts por ahora.
- No implementar pantalla, login ni integración backend en esta base.
- Stitch es solo referencia visual y de UX, no fuente de código.
- Preservar una dirección de diseño: personal, premium, seria, analítica, refinada y moderna.

