// stores/userStore.js
import { ref, onMounted, onUnmounted } from "vue";
import { defineStore } from "pinia";

const webapp = window.Telegram.WebApp;

export const useUserStore = defineStore("userStore", () => {
  const colorScheme = ref("");
  const conditions = ref(null);
  const giveaway = ref(null);

  const setGiveaway = (newGiveaway) => {
    giveaway.value = newGiveaway;
  };

  const setConditions = (newConditions) => {
    conditions.value = newConditions;
  };

  const getColorScheme = () => {
    let theme = getComputedStyle(document.documentElement)
        .getPropertyValue("--tg-color-scheme")
        .trim();
    return theme || "light";
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
    document.body.style.backgroundColor = "#EFF0FF";
    document.body.style.color = "#1B1C37";
  };

  const switchToDark = () => {
    webapp.setHeaderColor("#1B1C37");
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
    conditions,
    giveaway,
    setConditions,
    setGiveaway,
  };
}, {
  persist: {
    // Define what you want to persist; by default, all data is persisted
    key: 'userStore', // optional custom storage key
    paths: ['colorScheme', 'conditions', 'giveaway'], // specify which properties to persist
  },
});
