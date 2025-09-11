import { createApp } from "vue";
import { router } from "./routes/routes.js";
import App from "./App.vue";

const myApp = createApp(App);

myApp.use(router);

myApp.mount("#app");
