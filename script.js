/* ============================================
   CARRUSEL
   ============================================ */
let currentSlide = 0;
let totalSlides = 0;
let carouselInterval = null;
let touchStartX = 0;
let touchEndX = 0;

function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;

  totalSlides = slides.length;
  const dotsContainer = document.getElementById('carouselDots');

  // Crear dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  // Soporte de swipe táctil
  const track = document.getElementById('carouselTrack');
  if (track) {
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  // Auto-play
  startAutoPlay();

  // Pausar al hover
  const container = document.querySelector('.carousel-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
  }
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + totalSlides) % totalSlides;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function carouselNext() {
  goToSlide(currentSlide + 1);
  resetAutoPlay();
}

function carouselPrev() {
  goToSlide(currentSlide - 1);
  resetAutoPlay();
}

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  const threshold = 50;
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      carouselNext();
    } else {
      carouselPrev();
    }
  }
}

function startAutoPlay() {
  stopAutoPlay();
  carouselInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}

function stopAutoPlay() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

/* ============================================
   MODO OSCURO - Toggle con persistencia
   ============================================ */
function initDarkMode() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  // Cargar preferencia guardada
  const savedTheme = localStorage.getItem('blog-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon();
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('blog-theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

/* ============================================
   SCROLL PROGRESS + BACK TO TOP
   ============================================ */
function initScrollFeatures() {
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  if (scrollProgress || backToTop) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Barra de progreso
      if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
      }

      // Botón volver arriba
      if (backToTop) {
        if (scrollTop > 400) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    }, { passive: true });
  }

  // Click en botón volver arriba
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ============================================
   CARRUSEL DE VIDEOS
   ============================================ */
let vcurrentSlide = 0;
let vtotalSlides = 0;
let vcarouselInterval = null;

function initVideoCarousel() {
  const slides = document.querySelectorAll('.vslide');
  if (slides.length === 0) return;

  vtotalSlides = slides.length;
  const dotsContainer = document.getElementById('videoCarouselDots');

  // Crear dots
  for (let i = 0; i < vtotalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir al video ${i + 1}`);
    dot.addEventListener('click', () => goToVideoSlide(i));
    dotsContainer.appendChild(dot);
  }

  // Soporte swipe
  const track = document.getElementById('videoCarouselTrack');
  if (track) {
    track.addEventListener('touchstart', (e) => {
      vtouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = vtouchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? videoCarouselNext() : videoCarouselPrev();
      }
    }, { passive: true });
  }
}

let vtouchStartX = 0;

function goToVideoSlide(index) {
  const slides = document.querySelectorAll('.vslide');
  const dots = document.querySelectorAll('#videoCarouselDots .carousel-dot');
  if (slides.length === 0) return;

  slides[vcurrentSlide].classList.remove('active');
  dots[vcurrentSlide].classList.remove('active');

  vcurrentSlide = (index + vtotalSlides) % vtotalSlides;

  slides[vcurrentSlide].classList.add('active');
  dots[vcurrentSlide].classList.add('active');
}

function videoCarouselNext() {
  goToVideoSlide(vcurrentSlide + 1);
}

function videoCarouselPrev() {
  goToVideoSlide(vcurrentSlide - 1);
}

/* ============================================
   MENÚ MÓVIL
   ============================================ */
function toggleMenu() {
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('menuOverlay');
  menu.classList.toggle('open');
  overlay.hidden = !menu.classList.contains('open');
}

function closeMenu() {
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('menuOverlay');
  menu.classList.remove('open');
  overlay.hidden = true;
}

/* ============================================
   BÚSQUEDA EN TIEMPO REAL
   ============================================ */
const searchData = [];

function buildSearchIndex() {
  // Indexar tarjetas de temas
  document.querySelectorAll('#temasGrid .card').forEach(card => {
    searchData.push({
      type: 'tema',
      title: card.querySelector('h3')?.textContent.trim() || '',
      desc: card.querySelector('.text')?.textContent.trim() || '',
      icon: 'fa-book-open',
      target: '#temas',
      element: card
    });
  });

  // Indexar sección "¿Qué es la comunicación?"
  const introSection = document.querySelector('#que-es');
  if (introSection) {
    const introTitle = introSection.querySelector('.section-title')?.textContent.trim() || '';
    const infoItems = introSection.querySelectorAll('.info-item h4');
    const infoDescs = [];
    infoItems.forEach(item => infoDescs.push(item.textContent.trim()));
    searchData.push({
      type: 'sección',
      title: introTitle,
      desc: 'Elementos: ' + infoDescs.join(', '),
      icon: 'fa-comments',
      target: '#que-es',
      element: introSection
    });
  }

  // Indexar dato curioso
  const datoSection = document.querySelector('#dato-curioso');
  if (datoSection) {
    searchData.push({
      type: 'dato curioso',
      title: '¿Sabías que? — Estudio de Mehrabian',
      desc: '55% lenguaje corporal, 38% tono de voz, 7% palabras',
      icon: 'fa-lightbulb',
      target: '#dato-curioso',
      element: datoSection
    });
  }

  // Indexar estadísticas
  const statsSection = document.querySelector('#stats');
  if (statsSection) {
    searchData.push({
      type: 'estadísticas',
      title: 'La Comunicación en Números',
      desc: 'Datos clave: 55%, 86%, 7 microexpresiones, 38%',
      icon: 'fa-chart-bar',
      target: '#stats',
      element: statsSection
    });
  }

  // Indexar reflexión final
  const retoSection = document.querySelector('#reto');
  if (retoSection) {
    const retoTitle = retoSection.querySelector('.section-title')?.textContent.trim() || '';
    const retoText = retoSection.querySelector('p')?.textContent.trim() || '';
    searchData.push({
      type: 'sección',
      title: retoTitle,
      desc: retoText.substring(0, 120) + '...',
      icon: 'fa-brain',
      target: '#reto',
      element: retoSection
    });
  }

  // Indexar carrusel de reflexiones
  const carruselSection = document.querySelector('#carrusel-section');
  if (carruselSection) {
    searchData.push({
      type: 'carrusel',
      title: 'Reflexiones del Equipo',
      desc: 'Citas inspiradoras sobre comunicación efectiva, asertiva y tech',
      icon: 'fa-quote-left',
      target: '#carrusel-section',
      element: carruselSection
    });
  }

  // Indexar sección de videos
  const videosSection = document.querySelector('#videos');
  if (videosSection) {
    searchData.push({
      type: 'videos',
      title: 'Videos sobre Comunicación',
      desc: '5 videos: asertiva, microexpresiones, lenguaje, tipos, no verbal',
      icon: 'fa-play-circle',
      target: '#videos',
      element: videosSection
    });
  }

  // Indexar integrantes
  document.querySelectorAll('.profile-card').forEach(card => {
    searchData.push({
      type: 'integrante',
      title: card.querySelector('h3')?.textContent.trim() || '',
      desc: card.querySelector('.role')?.textContent.trim() || '',
      icon: 'fa-user',
      target: '#integrantes',
      element: card
    });
  });

  // Indexar galería
  document.querySelectorAll('.gallery-item').forEach(item => {
    searchData.push({
      type: 'evidencia',
      title: item.dataset.title || '',
      desc: 'Por: ' + (item.dataset.author || ''),
      icon: 'fa-file-pdf',
      target: '#galeria',
      element: item
    });
  });
}

function performSearch() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('searchResults');

  if (!query) {
    resultsContainer.hidden = true;
    return;
  }

  const results = searchData.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.desc.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="search-no-results">
        <i class="fas fa-search"></i>
        <p>No se encontraron resultados para "<strong>${escapeHtml(query)}</strong>"</p>
      </div>`;
    resultsContainer.hidden = false;
    return;
  }

  resultsContainer.innerHTML = results.map((result, index) => `
    <div class="search-result-item" data-index="${index}" onclick="navigateToResult(${index})">
      <i class="fas ${result.icon}"></i>
      <div class="result-text">
        <h4>${highlightText(result.title, query)}</h4>
        <p>${highlightText(result.desc.substring(0, 80), query)}</p>
      </div>
    </div>
  `).join('');

  // Guardar resultados actuales para navegación
  resultsContainer._currentResults = results;
  resultsContainer.hidden = false;
}

function navigateToResult(index) {
  const resultsContainer = document.getElementById('searchResults');
  const results = resultsContainer._currentResults;
  if (!results || !results[index]) return;

  const result = results[index];

  // Cerrar búsqueda
  resultsContainer.hidden = true;
  document.getElementById('searchInput').value = '';

  // Resetear filtros activos
  resetAllFilters();

  // Navegar a la sección
  const target = document.querySelector(result.target);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Efecto de highlight
    if (result.element) {
      result.element.style.transition = 'box-shadow 0.3s ease';
      result.element.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.4)';
      setTimeout(() => {
        result.element.style.boxShadow = '';
      }, 2000);
    }
  }
}

function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return escaped.replace(regex, '<mark style="background:#667eea33;color:inherit;padding:0 2px;border-radius:2px;">$1</mark>');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resetAllFilters() {
  // Resetear filtros de temas
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === 'all') btn.classList.add('active');
  });
  document.querySelectorAll('#temasGrid .card.filterable').forEach(card => {
    card.classList.remove('hidden-card');
    card.classList.add('fade-in-card');
  });
  const noFilterResults = document.getElementById('noFilterResults');
  if (noFilterResults) noFilterResults.hidden = true;

  // Resetear filtros de galería
  document.querySelectorAll('.filter-btn[data-gallery]').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.gallery === 'all') btn.classList.add('active');
  });
  document.querySelectorAll('.gallery-item.filterable-gallery').forEach(item => {
    item.classList.remove('hidden-gallery');
  });
  const noGalleryResults = document.getElementById('noGalleryResults');
  if (noGalleryResults) noGalleryResults.hidden = true;
}

/* ============================================
   FILTROS DE TEMÁTICAS
   ============================================ */
function initThemeFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const cards = document.querySelectorAll('#temasGrid .card.filterable');
  const noResults = document.getElementById('noFilterResults');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Actualizar botón activo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let visibleCount = 0;

      cards.forEach(card => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          card.classList.remove('hidden-card');
          card.classList.add('fade-in-card');
          visibleCount++;
        } else {
          card.classList.add('hidden-card');
          card.classList.remove('fade-in-card');
        }
      });

      if (noResults) {
        noResults.hidden = visibleCount > 0;
      }
    });
  });
}

/* ============================================
   FILTROS DE GALERÍA
   ============================================ */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-gallery]');
  const items = document.querySelectorAll('.gallery-item.filterable-gallery');
  const noResults = document.getElementById('noGalleryResults');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const gallery = btn.dataset.gallery;

      // Actualizar botón activo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let visibleCount = 0;

      items.forEach(item => {
        const author = item.dataset.author;
        const shouldShow = gallery === 'all' || author === gallery;

        if (shouldShow) {
          item.classList.remove('hidden-gallery');
          visibleCount++;
        } else {
          item.classList.add('hidden-gallery');
        }
      });

      if (noResults) {
        noResults.hidden = visibleCount > 0;
      }
    });
  });
}

/* ============================================
   MODAL DE PDF
   ============================================ */
function openPdfModal(pdfPath, title) {
  const modal = document.getElementById('pdfModal');
  const modalTitle = modal.querySelector('#modalTitle span');
  const pdfFrame = document.getElementById('pdfFrame');
  const pdfLink = document.getElementById('pdfLink');

  modalTitle.textContent = title;
  pdfFrame.src = pdfPath;
  pdfLink.href = pdfPath;

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  const pdfFrame = document.getElementById('pdfFrame');

  modal.hidden = true;
  pdfFrame.src = '';
  document.body.style.overflow = '';
}

/* ============================================
   FORMULARIO DE CONTACTO - Validación
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const charCount = document.getElementById('charCount');
  const submitBtn = document.getElementById('submitBtn');

  // Contador de caracteres
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      const count = messageInput.value.length;
      charCount.textContent = count;
      if (count > 500) {
        charCount.parentElement.style.color = '#e74c3c';
      } else {
        charCount.parentElement.style.color = '';
      }
    });
  }

  // Validación en tiempo real
  if (nameInput) {
    nameInput.addEventListener('blur', () => validateField(nameInput, 'nameError', validateName));
    nameInput.addEventListener('input', () => clearError('nameError', nameInput));
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => validateField(emailInput, 'emailError', validateEmail));
    emailInput.addEventListener('input', () => clearError('emailError', emailInput));
  }

  if (subjectInput) {
    subjectInput.addEventListener('blur', () => validateField(subjectInput, 'subjectError', validateSubject));
    subjectInput.addEventListener('change', () => clearError('subjectError', subjectInput));
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => validateField(messageInput, 'messageError', validateMessage));
    messageInput.addEventListener('input', () => clearError('messageError', messageInput));
  }

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, 'nameError', validateName);
    const isEmailValid = validateField(emailInput, 'emailError', validateEmail);
    const isSubjectValid = validateField(subjectInput, 'subjectError', validateSubject);
    const isMessageValid = validateField(messageInput, 'messageError', validateMessage);

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      submitForm(form, submitBtn);
    } else {
      showFormStatus('error', 'Por favor, corrige los errores antes de enviar.');
    }
  });
}

function validateField(input, errorId, validatorFn) {
  const errorEl = document.getElementById(errorId);
  if (!input || !errorEl) return false;

  const result = validatorFn(input.value);

  if (result.valid) {
    errorEl.textContent = '';
    input.classList.remove('error');
    input.classList.add('valido');
  } else {
    errorEl.textContent = result.message;
    input.classList.remove('valido');
    input.classList.add('error');
  }

  return result.valid;
}

function clearError(errorId, input) {
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = '';
  if (input) input.classList.remove('error');
}

function validateName(value) {
  if (!value.trim()) return { valid: false, message: 'El nombre es obligatorio.' };
  if (value.trim().length < 2) return { valid: false, message: 'El nombre debe tener al menos 2 caracteres.' };
  return { valid: true, message: '' };
}

function validateEmail(value) {
  if (!value.trim()) return { valid: false, message: 'El correo es obligatorio.' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) return { valid: false, message: 'Ingresa un correo válido.' };
  return { valid: true, message: '' };
}

function validateSubject(value) {
  if (!value) return { valid: false, message: 'Selecciona un asunto.' };
  return { valid: true, message: '' };
}

function validateMessage(value) {
  if (!value.trim()) return { valid: false, message: 'El mensaje es obligatorio.' };
  if (value.trim().length < 10) return { valid: false, message: 'El mensaje debe tener al menos 10 caracteres.' };
  if (value.length > 500) return { valid: false, message: 'El mensaje no puede exceder los 500 caracteres.' };
  return { valid: true, message: '' };
}

function showFormStatus(type, message) {
  const statusEl = document.getElementById('formStatus');
  if (!statusEl) return;

  statusEl.textContent = message;
  statusEl.className = 'form-status ' + type;
  statusEl.hidden = false;

  if (type === 'success') {
    setTimeout(() => {
      statusEl.hidden = true;
    }, 5000);
  }
}

function submitForm(form, submitBtn) {
  // Simular envío (en producción aquí iría la llamada al backend)
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

  setTimeout(() => {
    showFormStatus('success', '¡Mensaje enviado con éxito! Te responderemos pronto.');
    form.reset();
    document.getElementById('charCount').textContent = '0';

    // Limpiar estados visuales
    form.querySelectorAll('.valido, .error').forEach(el => {
      el.classList.remove('valido', 'error');
    });

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
  }, 1500);
}

function resetForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.querySelectorAll('.valido, .error').forEach(el => {
    el.classList.remove('valido', 'error');
  });

  document.querySelectorAll('.form-error').forEach(el => {
    el.textContent = '';
  });

  const charCount = document.getElementById('charCount');
  if (charCount) charCount.textContent = '0';

  const statusEl = document.getElementById('formStatus');
  if (statusEl) statusEl.hidden = true;
}

/* ============================================
   CERRAR BÚSQUEDA AL HACER CLICK FUERA
   ============================================ */
document.addEventListener('click', (e) => {
  const searchContainer = document.querySelector('.search-container');
  const searchResults = document.getElementById('searchResults');
  if (searchContainer && searchResults && !searchContainer.contains(e.target)) {
    setTimeout(() => {
      searchResults.hidden = true;
    }, 200);
  }
});

/* ============================================
   CERRAR MODAL CON ESC
   ============================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('pdfModal');
    if (modal && !modal.hidden) {
      closePdfModal();
      return;
    }
    closeMenu();
    return;
  }

  // Navegación del carrusel con flechas
  if (e.key === 'ArrowLeft') {
    carouselPrev();
  } else if (e.key === 'ArrowRight') {
    carouselNext();
  }
});

/* ============================================
   CERRAR MODAL AL HACER CLICK FUERA
   ============================================ */
document.addEventListener('click', (e) => {
  const modal = document.getElementById('pdfModal');
  if (modal && !modal.hidden && e.target === modal) {
    closePdfModal();
  }
});

/* ============================================
   INICIALIZACIÓN
   ============================================ */
window.addEventListener('load', function () {
  // Cerrar menú al hacer click en links
  const links = document.querySelectorAll('#menu a');
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('menuOverlay');

  links.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      overlay.hidden = true;
    });
  });

  // Inicializar búsqueda
  buildSearchIndex();
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(performSearch, 300);
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        clearTimeout(searchTimeout);
        performSearch();
      }
    });
  }

  // Inicializar filtros
  initThemeFilters();
  initGalleryFilters();

  // Inicializar formulario
  initContactForm();

  // Inicializar carrusel
  initCarousel();

  // Inicializar carrusel de videos
  initVideoCarousel();

  // Inicializar modo oscuro
  initDarkMode();

  // Inicializar scroll progress + back to top
  initScrollFeatures();

  // Animación de scroll reveal para secciones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});
