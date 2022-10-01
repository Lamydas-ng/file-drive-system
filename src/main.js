
import { createApp } from "vue";
import App from "./App.vue";
import toast from "./components/toast/Toast.vue";
import icons from "./components/icons/all";

const app = createApp(App);

// Register all icons
for (const [key, value] of Object.entries(icons)) {
  app.component(key, value);
}

app.component("app-toast", toast);
app.mount("#app");
