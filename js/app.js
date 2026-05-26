/**
 * TechCatalog — app.js
 * Funcionalidades:
 *  - Renderizado dinámico de tarjetas desde un array de datos
 *  - Filtro en tiempo real por título y descripción
 *  - Alternancia modo claro / oscuro
 *  - Manejo de DOM puro (sin frameworks)
 */

"use strict";

/* =====================================================
   1. DATOS DEL CATÁLOGO
   ===================================================== */
const products = [
  {
    id: 1,
    title: "MacBook Pro M3",
    badge: "Laptop",
    description:
      "El portátil de Apple más potente. Chip M3 Pro con hasta 18 núcleos de CPU, pantalla Liquid Retina XDR de 14.2\" y batería de 22 horas.",
    price: "$1,999",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    imageAlt: "MacBook Pro sobre una mesa de madera"
  },
  {
    id: 2,
    title: "Sony WH-1000XM5",
    badge: "Audio",
    description:
      "Los mejores auriculares inalámbricos del mercado con cancelación de ruido líder en la industria, 30 horas de batería y audio Hi-Res.",
    price: "$349",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    imageAlt: "Auriculares Sony sobre fondo blanco"
  },
  {
    id: 3,
    title: "Samsung Galaxy S25 Ultra",
    badge: "Smartphone",
    description:
      "El smartphone insignia de Samsung con cámara de 200MP, S Pen integrado, pantalla Dynamic AMOLED de 6.8\" y procesador Snapdragon 8 Elite.",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1610945264803-c22b62831d62?w=600&q=80",
    imageAlt: "Smartphone Samsung Galaxy moderno"
  },
  {
    id: 4,
    title: "iPad Pro M4",
    badge: "Tablet",
    description:
      "La tablet más delgada de Apple con pantalla OLED Ultra Retina XDR de 13\", chip M4, compatible con Apple Pencil Pro y Magic Keyboard.",
    price: "$1,099",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    imageAlt: "iPad Pro con teclado Magic Keyboard"
  },
  {
    id: 5,
    title: "Dell UltraSharp U2724D",
    badge: "Monitor",
    description:
      "Monitor 4K IPS de 27\" con cobertura del 99% del espacio de color sRGB, hub USB-C integrado y brillo máximo de 400 nits. Ideal para profesionales.",
    price: "$689",
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&q=80",
    imageAlt: "Monitor Dell UltraSharp en un escritorio"
  },
  {
    id: 6,
    title: "Logitech MX Master 3S",
    badge: "Periférico",
    description:
      "El ratón inalámbrico más avanzado para productividad. Sensor de 8,000 DPI, rueda de desplazamiento MagSpeed electromagnética y 70 días de batería.",
    price: "$99",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    imageAlt: "Ratón Logitech MX Master en escritorio"
  },
  {
    id: 7,
    title: "ASUS ROG Strix Scar 18",
    badge: "Gaming",
    description:
      "Laptop gaming de élite con pantalla QHD+ 240Hz, RTX 4090 de laptop, procesador Intel Core i9 y sistema de refrigeración líquida ROG.",
    price: "$3,499",
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&q=80",
    imageAlt: "Laptop gaming con pantalla iluminada"
  },
  {
    id: 8,
    title: "Apple Watch Ultra 2",
    badge: "Wearable",
    description:
      "El smartwatch más robusto de Apple. Titanio aeroespacial, pantalla de 2,000 nits, GPS de doble frecuencia y hasta 60 horas de batería en modo bajo consumo.",
    price: "$799",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80",
    imageAlt: "Smartwatch con correa deportiva"
  }
];

/* =====================================================
   2. REFERENCIAS AL DOM
   ===================================================== */
const catalogGrid    = document.getElementById("catalog-grid");
const searchInput    = document.getElementById("search-input");
const clearBtn       = document.getElementById("clear-search");
const noResults      = document.getElementById("no-results");
const noResultsTerm  = document.getElementById("no-results-term");
const resultsCount   = document.getElementById("results-count");
const btnReset       = document.getElementById("btn-reset");
const themeToggle    = document.getElementById("theme-toggle");
const body           = document.body;

/* =====================================================
   3. RENDERIZAR TARJETAS
   ===================================================== */

/**
 * Crea un elemento HTML de tarjeta de producto.
 * @param {Object} product – objeto de datos del producto
 * @returns {HTMLElement} elemento article
 */
function createCard(product) {
  const article = document.createElement("article");
  article.className = "card";
  article.dataset.id = product.id;

  // Preparar descripción con términos resaltados
  article.innerHTML = `
    <div class="card__image-wrapper">
      <img
        class="card__image"
        src="${product.image}"
        alt="${product.imageAlt}"
        loading="lazy"
        decoding="async"
        onerror="this.src='https://placehold.co/600x375/e8e4dd/6b6560?text=${encodeURIComponent(product.title)}'"
      />
    </div>
    <div class="card__body">
      <span class="card__badge">${product.badge}</span>
      <h2 class="card__title">${product.title}</h2>
      <p class="card__desc">${product.description}</p>
    </div>
    <div class="card__footer">
      <span class="card__price">${product.price}</span>
      <button class="card__btn" aria-label="Ver detalles de ${product.title}">Ver más</button>
    </div>
  `;

  return article;
}

/**
 * Renderiza todos los productos en el grid.
 */
function renderCatalog() {
  catalogGrid.innerHTML = "";
  products.forEach(product => {
    const card = createCard(product);
    catalogGrid.appendChild(card);
  });
  updateResultsCount(products.length, products.length);
}

/* =====================================================
   4. FILTRADO DINÁMICO
   ===================================================== */

/**
 * Actualiza el contador de resultados.
 * @param {number} visible – número de tarjetas visibles
 * @param {number} total   – total de tarjetas
 */
function updateResultsCount(visible, total) {
  if (searchInput.value.trim() === "") {
    resultsCount.textContent = `${total} productos en total`;
  } else {
    resultsCount.textContent =
      visible === 1
        ? `1 resultado encontrado`
        : `${visible} resultados encontrados`;
  }
}

/**
 * Filtra las tarjetas según el término de búsqueda.
 * Muestra u oculta tarjetas y el mensaje de "sin resultados".
 */
function filterCatalog() {
  const query   = searchInput.value.trim().toLowerCase();
  const cards   = catalogGrid.querySelectorAll(".card");
  let   visible = 0;

  cards.forEach(card => {
    const id      = parseInt(card.dataset.id, 10);
    const product = products.find(p => p.id === id);
    const haystack = (product.title + " " + product.description + " " + product.badge).toLowerCase();

    if (haystack.includes(query)) {
      card.classList.remove("hidden");
      card.removeAttribute("aria-hidden");
      visible++;
    } else {
      card.classList.add("hidden");
      card.setAttribute("aria-hidden", "true");
    }
  });

  // Mostrar / ocultar mensaje de sin resultados
  if (visible === 0) {
    noResults.hidden      = false;
    noResultsTerm.textContent = searchInput.value.trim();
    resultsCount.textContent  = "";
  } else {
    noResults.hidden = true;
    updateResultsCount(visible, products.length);
  }

  // Mostrar / ocultar botón de limpiar
  clearBtn.hidden = query.length === 0;
}

/* =====================================================
   5. MODO OSCURO / CLARO
   ===================================================== */
const THEME_KEY = "techcatalog-theme";

/**
 * Aplica un tema al body y guarda preferencia en localStorage.
 * @param {"dark"|"light"} theme
 */
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    themeToggle.setAttribute("aria-label", "Cambiar a modo claro");
  } else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    themeToggle.setAttribute("aria-label", "Cambiar a modo oscuro");
  }

  // Persistir en localStorage
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // localStorage puede no estar disponible en algunos contextos
  }
}

/**
 * Alterna entre modo claro y oscuro.
 */
function toggleTheme() {
  const isDark = body.classList.contains("dark-mode");
  applyTheme(isDark ? "light" : "dark");
}

/**
 * Carga el tema guardado o detecta la preferencia del sistema.
 */
function loadSavedTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(THEME_KEY);
  } catch (e) {
    // silent
  }

  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
}

/* =====================================================
   6. EVENTOS
   ===================================================== */

// Filtro en tiempo real al escribir
searchInput.addEventListener("input", filterCatalog);

// Soporte para la tecla Escape (limpiar búsqueda)
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    clearSearch();
    searchInput.blur();
  }
});

// Botón limpiar (X)
clearBtn.addEventListener("click", clearSearch);

// Botón "Limpiar búsqueda" del mensaje sin resultados
btnReset.addEventListener("click", clearSearch);

// Alternar tema
themeToggle.addEventListener("click", toggleTheme);

// Detectar cambio de preferencia del sistema operativo
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    // Solo cambiar automáticamente si el usuario no ha elegido manualmente
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch(e) {}
    if (!saved) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}

/* =====================================================
   7. HELPERS
   ===================================================== */

/**
 * Limpia el campo de búsqueda y restaura todos los productos.
 */
function clearSearch() {
  searchInput.value = "";
  clearBtn.hidden   = true;
  noResults.hidden  = true;

  const cards = catalogGrid.querySelectorAll(".card");
  cards.forEach(card => {
    card.classList.remove("hidden");
    card.removeAttribute("aria-hidden");
  });

  updateResultsCount(products.length, products.length);
  searchInput.focus();
}

/* =====================================================
   8. INICIALIZACIÓN
   ===================================================== */

/**
 * Punto de entrada principal — ejecuta cuando el DOM está listo.
 */
function init() {
  loadSavedTheme();
  renderCatalog();
}

// Ejecutar init cuando el DOM esté completamente cargado
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}