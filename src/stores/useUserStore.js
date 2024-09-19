import { ref, onMounted, onUnmounted } from "vue";
import { defineStore } from "pinia";

const webapp = window.Telegram.WebApp;

export const useUserStore = defineStore("userStore", () => {
  const colorScheme = ref("");

  const getColorScheme = () => {
    let theme = getComputedStyle(document.documentElement)
      .getPropertyValue("--tg-color-scheme")
      .trim();
    if (!theme) {
      return "light";
    } else {
      return theme;
    }
  };

  const handleColorSchemeChange = () => {
    colorScheme.value = getColorScheme();
    if (colorScheme.value === "dark") {
      switchToDark();
    } else {
      switchToLight();
    }
  };

  const switchToLight = () => {
    webapp.setHeaderColor("#EFF0FF");
    webapp.bottomBarColor("#FFFFFF");
    document.body.style.backgroundColor = "#EFF0FF";
    document.body.style.color = "#1B1C37";
  };

  const switchToDark = () => {
    webapp.setHeaderColor("#1B1C37");
    webapp.bottomBarColor("#262744");
    document.body.style.backgroundColor = "#1B1C37";
    document.body.style.color = "#FFFFFF";
  };

  onMounted(() => {
    handleColorSchemeChange();

    const observer = new MutationObserver(handleColorSchemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
      childList: false,
      subtree: false,
    });

    onUnmounted(() => {
      observer.disconnect();
    });
  });

  return {
    colorScheme,
  };
});
