<script setup>
import { ref } from 'vue'

</script>

<template>
  <div class="contenedor">
    <h1>Conecta 4</h1>
    <h2>¡Bienvenido a Conecta 4!</h2>
    <p>El objetivo del juego es alinear cuatro fichas del mismo color en línea recta, ya sea horizontal, vertical o
      diagonalmente.</p>
    <p>Para jugar, simplemente haz clic en la columna donde deseas colocar tu ficha. El juego alternará automáticamente
      entre los dos jugadores.</p>
    <p>¡Diviértete y buena suerte!</p>
    <router-link to="/juego">
      <button>Empezar a jugar</button>
    </router-link>
  </div>
</template>

<style scoped>
.contenedor {
  position: relative; /* Necesario para posicionar ::before */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80');
  background-size: cover;
  background-blend-mode: multiply;
  box-shadow: 0 0 40px 10px rgba(30, 60, 114, 0.2);
}

h1 {
  font-size: 3rem;
  background: linear-gradient(90deg, #f9d423 50%, #ff4e50 50%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5em;
  letter-spacing: 2px;
  position: relative;
  z-index: 10;
}

h2 {
  font-size: 1.5rem;
  color: #000000;
  margin-bottom: 1em;
  text-shadow: 1px 1px 6px #566581;
}

p {
  color: #fff;
  background: rgba(30, 60, 114, 0.5);
  border-radius: 12px;
  padding: 0.7em 1.2em;
  margin-bottom: 0.7em;
  box-shadow: 0 2px 8px rgba(42, 82, 152, 0.15);
}

button {
  background: radial-gradient(circle at 30% 30%, #1f441f 70%, #271010 100%);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  padding: 0.8em 2em;
  margin-top: 1.5em;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(212, 194, 105, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(255, 78, 80, 0.3);
}

/* animación de fichas tipo Conecta 4 */
.contenedor::before {
  content: '';
  position: absolute;
  top: 7%;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  height: 90px;
  z-index: 1;
  pointer-events: none;
  /* Simula la barra del tablero */
  background: #1e3c72;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(30, 60, 114, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.contenedor::after {
  /* Fichas simuladas */
  content: '';
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  z-index: 2;
  pointer-events: none;
  /* Usamos SVG para círculos nítidos */
  background: url("data:image/svg+xml;utf8,<svg width='320' height='60' xmlns='http://www.w3.org/2000/svg'><circle cx='40' cy='30' r='24' fill='%23ff4e50' stroke='white' stroke-width='3'/><circle cx='100' cy='30' r='24' fill='%23f9d423' stroke='white' stroke-width='3'/><circle cx='160' cy='30' r='24' fill='%23ff4e50' stroke='white' stroke-width='3'/><circle cx='220' cy='30' r='24' fill='%23f9d423' stroke='white' stroke-width='3'/><circle cx='280' cy='30' r='24' fill='%23ff4e50' stroke='white' stroke-width='3'/></svg>");
  background-repeat: no-repeat;
  background-size: contain;
}

/* Responsividad para pantallas pequeñas */
@media (max-width: 600px), (max-height: 500px) {
  h1 {
    font-size: 2rem;
    margin-top: 2.5em;
  }
  .contenedor::before {
    top: 2%;
    width: 220px;
    height: 60px;
  }
  .contenedor::after {
    top: 8%;
    width: 200px;
    height: 40px;
    background-size: contain;
  }
}
</style>
