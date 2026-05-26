/**
 * TechCatalog — app.js (Enhanced v2)
 * Funcionalidades:
 *  - Renderizado dinámico de tarjetas desde un array de datos
 *  - Filtro en tiempo real por título y descripción
 *  - Filtro por categoría
 *  - Ordenamiento (precio, nombre)
 *  - Carrito de compras con drawer lateral
 *  - Modal de detalle de producto
 *  - Toast notifications
 *  - Newsletter form
 *  - Announcement bar
 *  - Back to top
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
    longDescription:
      "El MacBook Pro M3 redefine lo que es posible en un portátil profesional. Con el revolucionario chip M3 Pro, obtienes hasta 18 núcleos de CPU y 30 núcleos de GPU, entregando un rendimiento extraordinario para creadores de contenido, desarrolladores y profesionales exigentes. Su pantalla Liquid Retina XDR de 14.2\" con ProMotion adaptativo de hasta 120Hz ofrece colores increíblemente fieles. Batería de hasta 22 horas de duración real.",
    price: "$1,999",
    priceNum: 1999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    imageAlt: "MacBook Pro sobre una mesa de madera",
    specs: ["Chip M3 Pro", "18 núcleos CPU", "Pantalla 14.2\" XDR", "22h batería", "16GB RAM", "512GB SSD"],
    stock: 8,
    rating: 4.9,
    reviews: 347
  },
  {
    id: 2,
    title: "Sony WH-1000XM5",
    badge: "Audio",
    description:
      "Los mejores auriculares inalámbricos del mercado con cancelación de ruido líder en la industria, 30 horas de batería y audio Hi-Res.",
    longDescription:
      "Los Sony WH-1000XM5 establecen el estándar en cancelación de ruido activa con 8 micrófonos y dos procesadores de ruido. Disfruta 30 horas de música continua con ANC activado. El audio Hi-Res certificado con soporte LDAC reproduce audio inalámbrico a 3x la calidad del Bluetooth estándar. La diadema rediseñada ofrece comodidad excepcional para sesiones largas.",
    price: "$349",
    priceNum: 349,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    imageAlt: "Auriculares Sony sobre fondo blanco",
    specs: ["ANC de 8 micrófonos", "30h batería", "Audio Hi-Res", "LDAC 3x calidad", "Carga rápida 3min=3h", "Multipoint 2 dispositivos"],
    stock: 24,
    rating: 4.8,
    reviews: 892
  },
  {
    id: 3,
    title: "Samsung Galaxy S25 Ultra",
    badge: "Smartphone",
    description:
      "El smartphone insignia de Samsung con cámara de 200MP, S Pen integrado, pantalla Dynamic AMOLED de 6.8\" y procesador Snapdragon 8 Elite.",
    longDescription:
      "El Galaxy S25 Ultra es la cúspide de la innovación móvil de Samsung. Su sistema de cámara cuádruple liderado por un sensor de 200MP captura detalles increíbles incluso en condiciones de baja luz. El S Pen integrado ha evolucionado con menor latencia y nuevas capacidades de IA. La pantalla Dynamic AMOLED 2X de 6.8\" con brillo máximo de 2,600 nits es visible incluso bajo el sol directo.",
    price: "$1,299",
    priceNum: 1299,
    image: "https://images.unsplash.com/photo-1610945264803-c22b62831d62?w=600&q=80",
    imageAlt: "Smartphone Samsung Galaxy moderno",
    specs: ["Cámara 200MP", "S Pen integrado", "Pantalla 6.8\" AMOLED", "Snapdragon 8 Elite", "5,000mAh batería", "12GB RAM"],
    stock: 15,
    rating: 4.7,
    reviews: 514
  },
  {
    id: 4,
    title: "iPad Pro M4",
    badge: "Tablet",
    description:
      "La tablet más delgada de Apple con pantalla OLED Ultra Retina XDR de 13\", chip M4, compatible con Apple Pencil Pro y Magic Keyboard.",
    longDescription:
      "El iPad Pro M4 es el dispositivo más delgado que Apple ha creado jamás: solo 5.1mm de grosor. Su pantalla Tandem OLED Ultra Retina XDR de 13\" ofrece negro absoluto y brillo máximo de 1,600 nits para HDR. El chip M4 trae el motor Neural más avanzado, capaz de procesar 38 billones de operaciones por segundo. Compatible con el nuevo Apple Pencil Pro con motor háptico.",
    price: "$1,099",
    priceNum: 1099,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    imageAlt: "iPad Pro con teclado Magic Keyboard",
    specs: ["Chip M4", "Pantalla OLED 13\"", "5.1mm delgadez", "Apple Pencil Pro", "WiFi 6E + 5G", "16GB RAM"],
    stock: 11,
    rating: 4.9,
    reviews: 228
  },
  {
    id: 5,
    title: "Dell UltraSharp U2724D",
    badge: "Monitor",
    description:
      "Monitor 4K IPS de 27\" con cobertura del 99% del espacio de color sRGB, hub USB-C integrado y brillo máximo de 400 nits. Ideal para profesionales.",
    longDescription:
      "El Dell UltraSharp U2724D es la elección definitiva para diseñadores, fotógrafos y editores que demandan precisión de color absoluta. Con panel IPS 4K (3840x2160) de 27\", cobertura del 100% del espacio de color sRGB y del 98% del DCI-P3, cada píxel es perfecto. El hub USB-C integrado entrega hasta 90W de carga y conectividad centralizada. Brillo de 400 nits con anti-glare.",
    price: "$689",
    priceNum: 689,
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&q=80",
    imageAlt: "Monitor Dell UltraSharp en un escritorio",
    specs: ["Resolución 4K UHD", "Panel IPS 27\"", "99% sRGB", "USB-C 90W", "400 nits", "Anti-glare"],
    stock: 6,
    rating: 4.8,
    reviews: 183
  },
  {
    id: 6,
    title: "Logitech MX Master 3S",
    badge: "Periférico",
    description:
      "El ratón inalámbrico más avanzado para productividad. Sensor de 8,000 DPI, rueda de desplazamiento MagSpeed electromagnética y 70 días de batería.",
    longDescription:
      "El MX Master 3S eleva el estándar del ratón de productividad con su sensor Darkfield de 8,000 DPI que funciona sobre cualquier superficie, incluyendo vidrio. La rueda MagSpeed electromagnética puede desplazarse 1,000 líneas por segundo silenciosamente. Los clics son 90% más silenciosos que los ratones estándar. Conecta hasta 3 dispositivos y cambia entre ellos con un botón. 70 días de batería con 1 minuto de carga para 3 horas.",
    price: "$99",
    priceNum: 99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    imageAlt: "Ratón Logitech MX Master en escritorio",
    specs: ["Sensor 8,000 DPI", "Rueda MagSpeed", "70 días batería", "3 dispositivos", "Carga USB-C", "90% más silencioso"],
    stock: 42,
    rating: 4.7,
    reviews: 1204
  },
  {
    id: 7,
    title: "ASUS ROG Strix Scar 18",
    badge: "Gaming",
    description:
      "Laptop gaming de élite con pantalla QHD+ 240Hz, RTX 4090 de laptop, procesador Intel Core i9 y sistema de refrigeración líquida ROG.",
    longDescription:
      "El ROG Strix SCAR 18 es la laptop gaming más poderosa que ASUS ha creado. La RTX 4090 con 175W TGP entrega el mayor rendimiento gráfico posible en formato portátil. La pantalla QHD+ de 18\" a 240Hz con tiempo de respuesta de 3ms es perfecta para shooters competitivos. El procesador Intel Core i9-14900HX con 24 núcleos garantiza que no haya cuello de botella. El sistema ROG Intelligent Cooling con módulo de vapor mantiene temperaturas óptimas.",
    price: "$3,499",
    priceNum: 3499,
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&q=80",
    imageAlt: "Laptop gaming con pantalla iluminada",
    specs: ["RTX 4090 175W", "Intel i9-14900HX", "Pantalla QHD+ 240Hz", "32GB DDR5", "2TB NVMe SSD", "ROG Cooling Liquid"],
    stock: 3,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 8,
    title: "Apple Watch Ultra 2",
    badge: "Wearable",
    description:
      "El smartwatch más robusto de Apple. Titanio aeroespacial, pantalla de 2,000 nits, GPS de doble frecuencia y hasta 60 horas de batería en modo bajo consumo.",
    longDescription:
      "El Apple Watch Ultra 2 está diseñado para atletas de élite y aventureros. El cuerpo de titanio grado 2 aeroespacial de 49mm es más resistente que cualquier otro Apple Watch. La pantalla LTPO OLED Micro-Led alcanza 2,000 nits de brillo, visible en condiciones de sol extremo. GPS de doble frecuencia L1/L5 para rutas precisas en montaña y mar. Certificado MIL-STD-810H y resistente a 100m bajo el agua.",
    price: "$799",
    priceNum: 799,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80",
    imageAlt: "Smartwatch con correa deportiva",
    specs: ["Titanio aeroespacial 49mm", "2,000 nits pantalla", "GPS doble frecuencia L1/L5", "60h modo bajo consumo", "100m resistencia agua", "MIL-STD-810H"],
    stock: 18,
    rating: 4.8,
    reviews: 431
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
const sortSelect     = document.getElementById("sort-select");
const catBtns        = document.querySelectorAll(".cat-btn");

// Cart
const cartBtn        = document.getElementById("cart-btn");
const cartDrawer     = document.getElementById("cart-drawer");
const cartOverlay    = document.getElementById("cart-overlay");
const cartClose      = document.getElementById("cart-close");
const cartCount      = document.getElementById("cart-count");
const cartItems      = document.getElementById("cart-items");
const cartEmpty      = document.getElementById("cart-empty");
const cartFooter     = document.getElementById("cart-footer");
const cartTotal      = document.getElementById("cart-total");
const cartShopLink   = document.getElementById("cart-shop-link");

// Modal
const modalOverlay   = document.getElementById("modal-overlay");
const productModal   = document.getElementById("product-modal");
const modalClose     = document.getElementById("modal-close");
const modalContent   = document.getElementById("modal-content");

// Newsletter
const newsletterForm    = document.getElementById("newsletter-form");
const newsletterSuccess = document.getElementById("newsletter-success");

// Back to top
const backToTop         = document.getElementById("back-to-top");

// Announcement
const announcementBar   = document.getElementById("announcement-bar");
const closeAnnouncement = document.getElementById("close-announcement");

/* =====================================================
   3. STATE
   ===================================================== */
let cart           = [];
let activeCategory = "all";
let currentSort    = "default";

/* =====================================================
   4. RENDERIZAR TARJETAS
   ===================================================== */

/**
 * Genera las estrellas de rating como HTML
 */
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "⯨" : "") + "☆".repeat(empty);
}

/**
 * Crea un elemento HTML de tarjeta de producto.
 */
function createCard(product) {
  const article = document.createElement("article");
  article.className = "card";
  article.dataset.id = product.id;

  const stockLabel = product.stock <= 5
    ? `<span class="stock-low">Solo ${product.stock} disponibles</span>`
    : `<span class="stock-ok">En stock</span>`;

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
      <div class="card__overlay">
        <button class="card__quick-view" data-id="${product.id}" aria-label="Vista rápida de ${product.title}">
          Vista rápida
        </button>
      </div>
    </div>
    <div class="card__body">
      <div class="card__meta">
        <span class="card__badge">${product.badge}</span>
        ${stockLabel}
      </div>
      <h2 class="card__title">${product.title}</h2>
      <p class="card__desc">${product.description}</p>
      <div class="card__rating" aria-label="${product.rating} de 5 estrellas, ${product.reviews} reseñas">
        <span class="card__stars">${renderStars(product.rating)}</span>
        <span class="card__reviews">(${product.reviews.toLocaleString()})</span>
      </div>
    </div>
    <div class="card__footer">
      <span class="card__price">${product.price}</span>
      <button class="card__btn" data-id="${product.id}" aria-label="Agregar ${product.title} al carrito">
        + Carrito
      </button>
    </div>
  `;

  return article;
}

/**
 * Obtiene y filtra/ordena los productos a mostrar
 */
function getFilteredProducts() {
  const query = searchInput.value.trim().toLowerCase();

  let filtered = products.filter(p => {
    const catMatch = activeCategory === "all" || p.badge === activeCategory;
    const haystack = (p.title + " " + p.description + " " + p.badge).toLowerCase();
    const searchMatch = query === "" || haystack.includes(query);
    return catMatch && searchMatch;
  });

  // Sort
  switch (currentSort) {
    case "price-asc":
      filtered.sort((a, b) => a.priceNum - b.priceNum);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.priceNum - a.priceNum);
      break;
    case "name-asc":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      break; // original order
  }

  return filtered;
}

/**
 * Renderiza el catálogo con los productos filtrados/ordenados
 */
function renderCatalog() {
  const filtered = getFilteredProducts();
  catalogGrid.innerHTML = "";

  if (filtered.length === 0) {
    noResults.hidden = false;
    noResultsTerm.textContent = searchInput.value.trim();
    resultsCount.textContent = "";
  } else {
    noResults.hidden = true;
    filtered.forEach(product => {
      const card = createCard(product);
      catalogGrid.appendChild(card);
    });
    updateResultsCount(filtered.length, products.length);
  }

  clearBtn.hidden = searchInput.value.trim().length === 0;
}

/* =====================================================
   5. FILTRADO Y ORDENAMIENTO
   ===================================================== */

/**
 * Actualiza el contador de resultados.
 */
function updateResultsCount(visible, total) {
  if (searchInput.value.trim() === "" && activeCategory === "all") {
    resultsCount.textContent = `${total} productos en total`;
  } else {
    resultsCount.textContent =
      visible === 1
        ? `1 resultado encontrado`
        : `${visible} resultados encontrados`;
  }
}

/**
 * Filtra y re-renderiza
 */
function filterCatalog() {
  renderCatalog();
}

/**
 * Limpia el campo de búsqueda y restaura todos los productos.
 */
function clearSearch() {
  searchInput.value = "";
  clearBtn.hidden   = true;
  noResults.hidden  = true;
  renderCatalog();
  searchInput.focus();
}

/* =====================================================
   6. CARRITO DE COMPRAS
   ===================================================== */

/**
 * Agrega un producto al carrito
 */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`✓ ${product.title} agregado al carrito`);
  animateCartBtn();
}

/**
 * Elimina un ítem del carrito
 */
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

/**
 * Cambia la cantidad de un ítem
 */
function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

/**
 * Actualiza la interfaz del carrito
 */
function updateCartUI() {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.priceNum * i.qty, 0);

  // Count badge
  cartCount.textContent = totalItems;
  cartCount.classList.toggle("has-items", totalItems > 0);

  // Empty state
  cartEmpty.hidden   = cart.length > 0;
  cartFooter.hidden  = cart.length === 0;

  // Items list
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <img class="cart-item-img" src="${item.image}" alt="${item.imageAlt}" loading="lazy" />
      <div class="cart-item-info">
        <p class="cart-item-title">${item.title}</p>
        <p class="cart-item-price">${item.price}</p>
        <div class="cart-item-qty">
          <button class="qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Disminuir cantidad">−</button>
          <span class="qty-num" aria-label="${item.qty} unidades">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-delta="1" aria-label="Aumentar cantidad">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Eliminar ${item.title}">✕</button>
    `;
    cartItems.appendChild(li);
  });

  // Total
  cartTotal.textContent = `$${totalPrice.toLocaleString()}`;

  // Save to sessionStorage
  try {
    sessionStorage.setItem("tc-cart", JSON.stringify(cart));
  } catch (e) {}
}

/**
 * Abre / cierra el drawer del carrito
 */
function openCart() {
  cartDrawer.hidden = false;
  cartDrawer.setAttribute("aria-hidden", "false");
  cartOverlay.setAttribute("aria-hidden", "false");
  cartOverlay.classList.add("visible");
  cartDrawer.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("visible");
  document.body.style.overflow = "";
  setTimeout(() => {
    cartDrawer.setAttribute("aria-hidden", "true");
    cartOverlay.setAttribute("aria-hidden", "true");
  }, 300);
}

function animateCartBtn() {
  cartBtn.classList.add("bounce");
  setTimeout(() => cartBtn.classList.remove("bounce"), 400);
}

/* =====================================================
   7. MODAL DE PRODUCTO
   ===================================================== */

function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  modalContent.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-wrapper">
        <img class="modal-img" src="${product.image}" alt="${product.imageAlt}" />
        <span class="modal-badge">${product.badge}</span>
      </div>
      <div class="modal-info">
        <h2 id="modal-title" class="modal-title">${product.title}</h2>
        <div class="modal-rating" aria-label="${product.rating} de 5 estrellas">
          <span class="card__stars">${renderStars(product.rating)}</span>
          <span class="card__reviews">${product.rating} · ${product.reviews.toLocaleString()} reseñas</span>
        </div>
        <p class="modal-desc">${product.longDescription}</p>
        <ul class="modal-specs" aria-label="Especificaciones">
          ${product.specs.map(s => `<li class="modal-spec">✓ ${s}</li>`).join("")}
        </ul>
        <div class="modal-footer">
          <span class="modal-price">${product.price}</span>
          <button class="btn-accent modal-add-btn" data-id="${product.id}">
            + Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  `;

  productModal.setAttribute("aria-hidden", "false");
  modalOverlay.setAttribute("aria-hidden", "false");
  productModal.classList.add("open");
  modalOverlay.classList.add("visible");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  productModal.classList.remove("open");
  modalOverlay.classList.remove("visible");
  document.body.style.overflow = "";
  setTimeout(() => {
    productModal.setAttribute("aria-hidden", "true");
    modalOverlay.setAttribute("aria-hidden", "true");
  }, 300);
}

/* =====================================================
   8. TOAST NOTIFICATIONS
   ===================================================== */
const toastContainer = document.getElementById("toast-container");

function showToast(message, duration = 3000) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("toast--visible"));
  });

  setTimeout(() => {
    toast.classList.remove("toast--visible");
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* =====================================================
   9. MODO OSCURO / CLARO
   ===================================================== */
const THEME_KEY = "techcatalog-theme";

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
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
}

function toggleTheme() {
  const isDark = body.classList.contains("dark-mode");
  applyTheme(isDark ? "light" : "dark");
}

function loadSavedTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}

  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
}

/* =====================================================
   10. BACK TO TOP
   ===================================================== */
function handleScroll() {
  backToTop.hidden = window.scrollY < 400;

  // Sticky header shadow
  const header = document.getElementById("site-header");
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
}

/* =====================================================
   11. NEWSLETTER
   ===================================================== */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("nl-email").value.trim();
  if (!email || !email.includes("@")) {
    showToast("⚠ Por favor ingresa un correo válido");
    return;
  }
  newsletterForm.hidden = true;
  newsletterSuccess.hidden = false;
  showToast("✓ ¡Suscripción exitosa!");
}

/* =====================================================
   12. ANNOUNCEMENT BAR
   ===================================================== */
function initAnnouncementBar() {
  const dismissed = sessionStorage.getItem("tc-ann-dismissed");
  if (dismissed) {
    announcementBar.hidden = true;
    return;
  }

  closeAnnouncement.addEventListener("click", () => {
    announcementBar.style.height = announcementBar.offsetHeight + "px";
    requestAnimationFrame(() => {
      announcementBar.classList.add("dismissing");
      setTimeout(() => {
        announcementBar.hidden = true;
        sessionStorage.setItem("tc-ann-dismissed", "1");
      }, 350);
    });
  });
}

/* =====================================================
   13. EVENTOS
   ===================================================== */

// Search
searchInput.addEventListener("input", filterCatalog);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { clearSearch(); searchInput.blur(); }
});
clearBtn.addEventListener("click", clearSearch);
btnReset.addEventListener("click", clearSearch);

// Sort
sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;
  renderCatalog();
});

// Category buttons
catBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    catBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    renderCatalog();
  });
});

// Theme toggle
themeToggle.addEventListener("click", toggleTheme);
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch(e) {}
    if (!saved) applyTheme(e.matches ? "dark" : "light");
  });
}

// Cart events (delegated)
cartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
if (cartShopLink) {
  cartShopLink.addEventListener("click", closeCart);
}

document.addEventListener("click", (e) => {
  // Add to cart (card button)
  if (e.target.matches(".card__btn")) {
    addToCart(parseInt(e.target.dataset.id, 10));
  }
  // Quick view
  if (e.target.matches(".card__quick-view")) {
    openProductModal(parseInt(e.target.dataset.id, 10));
  }
  // Cart qty buttons
  if (e.target.matches(".qty-btn")) {
    changeQty(parseInt(e.target.dataset.id, 10), parseInt(e.target.dataset.delta, 10));
  }
  // Cart remove buttons
  if (e.target.matches(".cart-item-remove")) {
    removeFromCart(parseInt(e.target.dataset.id, 10));
  }
  // Modal add to cart
  if (e.target.matches(".modal-add-btn")) {
    addToCart(parseInt(e.target.dataset.id, 10));
    closeProductModal();
    openCart();
  }
});

// Modal close
modalClose.addEventListener("click", closeProductModal);
modalOverlay.addEventListener("click", closeProductModal);

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (productModal.classList.contains("open")) closeProductModal();
    if (cartDrawer.classList.contains("open")) closeCart();
  }
});

// Newsletter
if (newsletterForm) {
  newsletterForm.addEventListener("submit", handleNewsletterSubmit);
}

// Back to top
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
window.addEventListener("scroll", handleScroll, { passive: true });

/* =====================================================
   14. INICIALIZACIÓN
   ===================================================== */

function loadCartFromSession() {
  try {
    const saved = sessionStorage.getItem("tc-cart");
    if (saved) {
      cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch (e) {}
}

function init() {
  loadSavedTheme();
  renderCatalog();
  loadCartFromSession();
  initAnnouncementBar();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}