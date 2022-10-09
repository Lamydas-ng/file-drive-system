
import { createApp } from "vue";
import App from "./App.vue";
import toast from "./components/toast/Toast.vue";
import modal from "./components/Modal.vue";
import icons from "./components/icons/all";

const app = createApp(App);

// Register all icons
for (const [key, value] of Object.entries(icons)) {
  app.component(key, value);
}

app.directive("focus", {
  mounted(el) {
    el.focus();
  }

})
app.component("app-toast", toast);
app.component("app-modal", modal);
app.mount("#app");
