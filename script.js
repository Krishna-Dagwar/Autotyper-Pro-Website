(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const primaryNav = document.querySelector("[data-primary-nav]");
  const header = document.querySelector("[data-site-header]");
  const storageKey = "autotyper-site-theme";

  const readStoredTheme = () => {
    try {
      const value = window.localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // The theme still applies for this page when storage is unavailable.
    }
  };

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const effectiveTheme = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");

  const updateThemeControl = () => {
    if (!themeToggle) return;
    const nextTheme = effectiveTheme() === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    themeToggle.setAttribute("title", `Switch to ${nextTheme} mode`);
  };

  const initialTheme = readStoredTheme();
  if (initialTheme) root.dataset.theme = initialTheme;
  updateThemeControl();

  themeToggle?.addEventListener("click", () => {
    const nextTheme = effectiveTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    storeTheme(nextTheme);
    updateThemeControl();
  });

  systemDark.addEventListener?.("change", () => {
    if (!root.dataset.theme) updateThemeControl();
  });

  const closeMenu = () => {
    if (!menuToggle || !primaryNav) return;
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  };

  menuToggle?.addEventListener("click", () => {
    if (!primaryNav) return;
    const open = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  primaryNav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!primaryNav?.classList.contains("is-open")) return;
    if (primaryNav.contains(event.target) || menuToggle?.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav?.classList.contains("is-open")) {
      closeMenu();
      menuToggle?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeMenu();
  });

  const currentPage = body.dataset.page;
  if (currentPage && primaryNav) {
    const currentLink = primaryNav.querySelector(`[data-page-link="${currentPage}"]`);
    currentLink?.setAttribute("aria-current", "page");
  }

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealItems = [...document.querySelectorAll(".reveal")];
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const badgeWrappers = [...document.querySelectorAll(".store-badge-wrap")];
  if (badgeWrappers.length) {
    window.setTimeout(() => {
      if (!window.customElements?.get("ms-store-badge")) {
        badgeWrappers.forEach((wrapper) => wrapper.classList.add("badge-unavailable"));
      }
    }, 4000);
  }

  const screenshotButtons = [...document.querySelectorAll("[data-screenshot-open]")];
  if (screenshotButtons.length && "HTMLDialogElement" in window) {
    const dialog = document.createElement("dialog");
    dialog.className = "image-dialog";
    dialog.setAttribute("aria-label", "Screenshot preview");

    const bar = document.createElement("div");
    bar.className = "dialog-bar";
    const title = document.createElement("strong");
    const close = document.createElement("button");
    close.type = "button";
    close.className = "icon-button dialog-close";
    close.setAttribute("aria-label", "Close screenshot preview");
    close.textContent = "×";
    bar.append(title, close);

    const image = document.createElement("img");
    image.alt = "";
    image.src = screenshotButtons[0].dataset.image || screenshotButtons[0].querySelector("img")?.src || "";
    dialog.append(bar, image);
    document.body.append(dialog);

    const closeDialog = () => dialog.close();
    close.addEventListener("click", closeDialog);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });

    screenshotButtons.forEach((button) => {
      button.addEventListener("click", () => {
        image.src = button.dataset.image || button.querySelector("img")?.src || "";
        image.alt = button.dataset.alt || button.querySelector("img")?.alt || "Autotyper Pro screenshot";
        title.textContent = button.dataset.title || "Autotyper Pro";
        dialog.showModal();
      });
    });
  }
})();
