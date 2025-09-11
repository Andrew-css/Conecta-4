import { createRouter, createWebHashHistory } from "vue-router";
import Inicio from "../components/Inicio.vue";
import Juego from "../components/Juego.vue";

const routes = [
    {
        path: "/",
        component: Inicio,
    },
    {
        path: "/juego",
        component: Juego,
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
