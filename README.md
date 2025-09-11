
## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Andrew-css/Conecta-4.git
   cd conecta-cuatro
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

## Uso

- En la pantalla de inicio, haz clic en **"Empezar a jugar"** para ir al tablero.
- Selecciona cualquier celda vacía para colocar tu ficha.
- El turno alterna automáticamente entre los equipos.
- El equipo amarillo inicia la primera partida, el rojo la segunda, y así sucesivamente.
- Gana el equipo que logre conectar 4 fichas seguidas en cualquier dirección.
- Puedes consultar las reglas en cualquier momento haciendo clic en el botón **"Ayuda"**.
- Usa el botón **"Regresar"** para volver a la pantalla de inicio.

## Estructura del proyecto

- `src/components/Inicio.vue`: Pantalla de bienvenida y reglas básicas.
- `src/components/Juego.vue`: Tablero de juego, lógica principal y modal de ayuda.
- Estilos personalizados y uso de Bootstrap para una mejor experiencia visual.

## Personalización

Puedes modificar los estilos, imágenes de fondo y reglas en los archivos `.vue` según tus preferencias.

## Créditos

Desarrollado por Andrew-css.

---

¡Diviértete jugando Conecta 4!