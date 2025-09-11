<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const enrutador = useRouter()

const filas = 6
const columnas = 7

const tablero = ref(Array.from({ length: filas }, () => Array(columnas).fill(null)))
const turno = ref('amarillo')
const partidaActual = ref(1)
const victoriasAmarillo = ref(0)
const victoriasRojo = ref(0)
const derrotasAmarillo = ref(0)
const derrotasRojo = ref(0)
const juegoTerminado = ref(false)
const ganador = ref(null) // 'amarillo' | 'rojo' | null

const mostrarAyuda = ref(false)

function reiniciarTablero() {
    tablero.value = Array.from({ length: filas }, () => Array(columnas).fill(null))
    juegoTerminado.value = false
    ganador.value = null
    partidaActual.value++
    turno.value = partidaActual.value % 2 === 1 ? 'amarillo' : 'rojo'
}

function colocarFicha(fila, columna) {
    if (juegoTerminado.value) return
    if (!tablero.value[fila][columna]) {
        tablero.value[fila][columna] = turno.value
        if (verificarGanador(fila, columna, turno.value)) {
            juegoTerminado.value = true
            ganador.value = turno.value
            if (turno.value === 'amarillo') {
                victoriasAmarillo.value++
                derrotasRojo.value++
            } else {
                victoriasRojo.value++
                derrotasAmarillo.value++
            }
        } else if (tablero.value.flat().every(celda => celda)) {
            juegoTerminado.value = true
            ganador.value = null
        } else {
            turno.value = turno.value === 'amarillo' ? 'rojo' : 'amarillo'
        }
    }
}

function verificarGanador(fila, columna, color) {
    return (
        contarConsecutivas(fila, columna, 0, 1, color) + contarConsecutivas(fila, columna, 0, -1, color) > 2 ||
        contarConsecutivas(fila, columna, 1, 0, color) + contarConsecutivas(fila, columna, -1, 0, color) > 2 ||
        contarConsecutivas(fila, columna, 1, 1, color) + contarConsecutivas(fila, columna, -1, -1, color) > 2 ||
        contarConsecutivas(fila, columna, 1, -1, color) + contarConsecutivas(fila, columna, -1, 1, color) > 2
    )
}

function contarConsecutivas(fila, columna, dFila, dColumna, color) {
    let contador = 0
    let f = fila + dFila
    let c = columna + dColumna
    while (
        f >= 0 &&
        f < filas &&
        c >= 0 &&
        c < columnas &&
        tablero.value[f][c] === color
    ) {
        contador++
        f += dFila
        c += dColumna
    }
    return contador
}

function regresar() {
    enrutador.push('/')
}

function abrirAyuda() {
    mostrarAyuda.value = true
}

function cerrarAyuda() {
    mostrarAyuda.value = false
}
</script>

<template>
    <div class="juego-bg min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <!-- Botón regresar en esquina superior izquierda -->
        <button class="btn btn-back fw-bold shadow" @click="regresar">
            Regresar
        </button>
        <!-- Botón ayuda -->
        <button class="btn btn-info btn-ayuda fw-bold shadow" @click="abrirAyuda">
            Ayuda
        </button>
        <!-- Modal de ayuda -->
        <div class="modal fade" :class="{ show: mostrarAyuda }" tabindex="-1"
            :style="{ display: mostrarAyuda ? 'block' : 'none' }" aria-modal="true" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg modal-ayuda">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">Reglas del juego</h5>
                        <button type="button" class="btn-close" @click="cerrarAyuda"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">El juego se juega en un tablero de <b>7 columnas</b> y <b>6
                                    filas</b>.</li>
                            <li class="list-group-item">Cada jugador (amarillo y rojo) coloca una ficha en cualquier
                                celda vacía durante su turno.</li>
                            <li class="list-group-item">El equipo amarillo comienza la primera partida, el rojo la
                                segunda, y así sucesivamente.</li>
                            <li class="list-group-item">Gana el equipo que logre <b>4 fichas seguidas</b> de su color en
                                cualquier dirección (horizontal, vertical o diagonal).</li>
                            <li class="list-group-item">Si el tablero se llena y nadie logra conectar 4, la partida
                                termina en empate.</li>
                            <li class="list-group-item">Las victorias y derrotas de cada equipo se muestran arriba del
                                tablero.</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-gradient fw-bold" @click="cerrarAyuda">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row w-100 mb-4 justify-content-center">
            <div class="col-12 col-md-4 mb-3">
                <div class="card text-center border-warning shadow-lg">
                    <div class="card-header bg-warning text-dark fw-bold fs-5">Equipo Amarillo</div>
                    <div class="card-body bg-light bg-opacity-75">
                        <p class="card-text mb-1 fs-5">Victorias: <span class="fw-bold text-warning">{{
                                victoriasAmarillo }}</span></p>
                        <p class="card-text fs-5">Derrotas: <span class="fw-bold text-danger">{{ derrotasAmarillo
                                }}</span></p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 mb-3">
                <div class="card text-center border-danger shadow-lg">
                    <div class="card-header bg-danger text-white fw-bold fs-5">Equipo Rojo</div>
                    <div class="card-body bg-light bg-opacity-75">
                        <p class="card-text mb-1 fs-5">Victorias: <span class="fw-bold text-danger">{{ victoriasRojo
                                }}</span></p>
                        <p class="card-text fs-5">Derrotas: <span class="fw-bold text-warning">{{ derrotasRojo }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center w-100">
            <div class="col-12 d-flex justify-content-center">
                <div class="tablero-bg rounded-4 p-2 p-sm-3 shadow-lg mb-3 mx-auto tablero-responsive">
                    <table class="table table-borderless mb-0">
                        <tbody>
                            <tr v-for="(fila, filaIndex) in tablero" :key="filaIndex">
                                <td v-for="(celda, columnaIndex) in fila" :key="columnaIndex" class="p-1">
                                    <div class="rounded-circle border border-3 ficha" :class="{
                                        'bg-warning ficha-amarilla': celda === 'amarillo',
                                        'bg-danger ficha-roja': celda === 'rojo',
                                        'bg-light ficha-vacia': !celda,
                                        'border-warning': celda === 'amarillo',
                                        'border-danger': celda === 'rojo',
                                        'border-secondary': !celda,
                                        'cell-hover-yellow': !celda && !juegoTerminado && turno === 'amarillo',
                                        'cell-hover-red': !celda && !juegoTerminado && turno === 'rojo'
                                    }" style="cursor:pointer; transition: box-shadow 0.2s, transform 0.2s;"
                                        @click="colocarFicha(filaIndex, columnaIndex)">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-12 text-center mt-3">
                <h4 v-if="!juegoTerminado" class="fw-bold mb-2 text-white">
                    Turno:
                    <span :class="turno === 'amarillo' ? 'text-warning' : 'text-danger'">
                        {{ turno === 'amarillo' ? 'Amarillo' : 'Rojo' }}
                    </span>
                </h4>
                <h4 v-if="juegoTerminado && ganador !== null" class="fw-bold mb-2 text-uppercase text-white">
                    ¡Equipo
                    <span :class="ganador === 'amarillo' ? 'text-warning' : 'text-danger'">
                        {{ ganador === 'amarillo' ? ' Amarillo ' : ' Rojo ' }}
                    </span>
                    gana!
                </h4>
                <h4 v-if="juegoTerminado && ganador === null" class="fw-bold mb-2 text-uppercase text-white">
                    ¡Empate!
                </h4>
                <button class="btn btn-gradient mt-2 px-4 py-2 fw-bold shadow" @click="reiniciarTablero">
                    Reiniciar partida
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.juego-bg {
    background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80');
    background-size: cover;
    background-blend-mode: multiply;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* Botón regresar en esquina superior izquierda */
.btn-back {
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 10;
    border-radius: 30px;
    padding: 0.5em 1.5em;
    font-size: 1rem;
    background: rgba(30, 60, 114, 0.7);
    color: #fff;
    border: none;
    box-shadow: 0 2px 8px rgba(30, 60, 114, 0.18);
    transition: transform 0.2s, box-shadow 0.2s;
}

/* Botón ayuda */
.btn-ayuda {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 10;
    border-radius: 30px;
    padding: 0.5em 1.5em;
    font-size: 1rem;
    background: #17a2b8;
    color: #fff;
    border: none;
    box-shadow: 0 2px 8px rgba(30, 60, 114, 0.18);
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn-ayuda:hover {
    background: #138496;
    color: #fff;
    transform: scale(1.08);
    box-shadow: 0 6px 24px rgba(23, 162, 184, 0.3);
}

/* Modal ayuda */
.modal-ayuda {
    max-width: 98vw;
}

.modal.fade {
    display: none;
    background: rgba(30, 60, 114, 0.45);
}

.modal.show {
    display: block;
    background: rgba(30, 60, 114, 0.45);
}

.modal-content {
    border-radius: 18px;
    overflow: hidden;
}

@media (max-width: 600px) {
    .modal-dialog {
        max-width: 98vw;
        margin: 0.5rem auto;
    }

    .btn-back,
    .btn-ayuda {
        position: static;
        display: block;
        margin: 0 auto 1rem auto;
        top: unset;
        left: unset;
        right: unset;
        width: 90%;
        max-width: 300px;
    }
}

@media (max-width: 768px) {

    .btn-back,
    .btn-ayuda {
        position: static;
        display: block;
        margin: 0 auto 1rem auto;
        top: unset;
        left: unset;
        right: unset;
        width: 50%;
        max-width: 300px;
    }
}

.tablero-bg {
    background: rgba(30, 60, 114, 0.85);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(30, 60, 114, 0.25);
    min-width: 420px;
    max-width: 520px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table-borderless>tbody>tr>td.p-1 {
    padding: 4px !important;
}

.ficha {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    margin: 0;
    box-shadow: 0 2px 8px rgba(42, 82, 152, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow 0.2s, transform 0.2s;
}

@media (max-width: 600px) {
    .tablero-bg {
        min-width: unset;
        max-width: 98vw;
        padding: 0.5rem !important;
    }

    .tablero-responsive {
        max-width: 98vw;
        min-width: 98vw;
        padding: 0.5rem !important;
    }

    .ficha {
        width: 28px !important;
        height: 28px !important;
        min-width: 28px !important;
        min-height: 28px !important;
    }

    .table-borderless>tbody>tr>td.p-1 {
        padding: 2px !important;
    }
}

.ficha-amarilla {
    background: radial-gradient(circle at 30% 30%, #f9d423 70%, #fff700 100%) !important;
    border: 3px solid #fff;
    animation: pop 0.2s;
}

.ficha-roja {
    background: radial-gradient(circle at 30% 30%, #ff4e50 70%, #ff0000 100%) !important;
    border: 3px solid #fff;
    animation: pop 0.2s;
}

.ficha-vacia {
    background: rgba(255, 255, 255, 0.5) !important;
}

.cell-hover-yellow:hover {
    box-shadow: 0 0 0 6px #f9d42388;
    transform: scale(1.08);
    background: #fffbe6 !important;
}

.cell-hover-red:hover {
    box-shadow: 0 0 0 6px #ff4e5088;
    transform: scale(1.08);
    background: #ffeaea !important;
}

.btn-gradient {
    background-color: white;
    color: #000000;
    border: none;
    border-radius: 30px;
    box-shadow: 0 4px 16px rgba(249, 212, 35, 0.3);
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn-gradient:hover {
    background-color: white;
    transform: scale(1.08);
    box-shadow: 0 6px 24px rgba(255, 78, 80, 0.3);
}

.card {
    border-radius: 18px;
    box-shadow: 0 4px 18px rgba(30, 60, 114, 0.18);
    border-width: 2px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    background: rgba(255, 255, 255, 0.15);
}

.card:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 32px rgba(30, 60, 114, 0.25);
}

.card-header.bg-warning {
    background: linear-gradient(90deg, #f9d423 60%, #fff700 100%);
    color: #1e3c72 !important;
    font-size: 1.3rem;
    letter-spacing: 1px;
    border-bottom: 2px solid #f9d423;
}

.card-header.bg-danger {
    background: linear-gradient(90deg, #ff4e50 60%, #ff0000 100%);
    color: #fff !important;
    font-size: 1.3rem;
    letter-spacing: 1px;
    border-bottom: 2px solid #ff4e50;
}

.card-body {
    padding: 1.2rem 1rem;
    background: rgba(255, 255, 255, 0.35) !important;
    border-radius: 0 0 18px 18px;
}

.card-text {
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 1px 4px rgba(30, 60, 114, 0.10);
}

.card-text .fw-bold.text-warning {
    text-shadow: 0 1px 8px #f9d42355;
}

.card-text .fw-bold.text-danger {
    text-shadow: 0 1px 8px #ff4e5055;
}

@keyframes pop {
    0% {
        transform: scale(0.7);
    }

    80% {
        transform: scale(1.15);
    }

    100% {
        transform: scale(1);
    }
}
</style>