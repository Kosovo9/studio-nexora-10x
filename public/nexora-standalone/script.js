/**
 * NEXORA AI PLATFORM - JAVASCRIPT OPTIMIZADO
 * Ingeniería de Sistemas de Alto Nivel
 * Performance, Accesibilidad y UX Premium
 */

(function() {
    'use strict';

    // ===== CONFIGURACIÓN =====
    const CONFIG = {
        animationThreshold: 0.1,
        animationRootMargin: '0px',
        debounceDelay: 250,
        formSubmitDelay: 2000
    };

    // ===== UTILIDADES =====
    const utils = {
        /**
         * Debounce function para optimizar eventos
         */
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Throttle function para eventos de scroll
         */
        throttle: function(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Validación de email
         */
        validateEmail: function(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        /**
         * Sanitizar input para prevenir XSS
         */
        sanitize: function(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }
    };

    // ===== MOBILE NAVIGATION =====
    const MobileNav = {
        init: function() {
            this.hamburgerMenu = document.getElementById('hamburger-menu');
            this.mobileNav = document.getElementById('mobile-nav');
            this.closeButton = document.getElementById('close-button');
            this.overlay = document.getElementById('mobile-nav-overlay');
            this.body = document.body;

            if (!this.hamburgerMenu || !this.mobileNav) return;

            this.bindEvents();
        },

        bindEvents: function() {
            this.hamburgerMenu.addEventListener('click', () => this.open());
            this.closeButton.addEventListener('click', () => this.close());
            if (this.overlay) {
                this.overlay.addEventListener('click', () => this.close());
            }

            // Cerrar con ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen()) {
                    this.close();
                }
            });

            // Prevenir scroll del body cuando el menú está abierto
            this.mobileNav.addEventListener('transitionend', () => {
                if (this.isOpen()) {
                    this.body.style.overflow = 'hidden';
                } else {
                    this.body.style.overflow = '';
                }
            });
        },

        open: function() {
            this.mobileNav.classList.add('is-active');
            this.hamburgerMenu.setAttribute('aria-expanded', 'true');
            this.hamburgerMenu.setAttribute('aria-label', 'Cerrar menú');
            
            // Focus trap
            this.trapFocus();
        },

        close: function() {
            this.mobileNav.classList.remove('is-active');
            this.hamburgerMenu.setAttribute('aria-expanded', 'false');
            this.hamburgerMenu.setAttribute('aria-label', 'Abrir menú');
            this.body.style.overflow = '';
            
            // Devolver focus al botón hamburguesa
            this.hamburgerMenu.focus();
        },

        isOpen: function() {
            return this.mobileNav.classList.contains('is-active');
        },

        trapFocus: function() {
            const focusableElements = this.mobileNav.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            this.mobileNav.addEventListener('keydown', function trapHandler(e) {
                if (e.key !== 'Tab') return;

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }
    };

    // ===== SCROLL ANIMATIONS =====
    const ScrollAnimations = {
        init: function() {
            this.animatedElements = document.querySelectorAll('.animate-on-scroll');
            if (this.animatedElements.length === 0) return;

            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                    root: null,
                    rootMargin: CONFIG.animationRootMargin,
                    threshold: CONFIG.animationThreshold
                }
            );

            this.observeElements();
        },

        observeElements: function() {
            this.animatedElements.forEach(el => {
                this.observer.observe(el);
            });
        },

        handleIntersection: function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optimización: dejar de observar una vez animado
                    this.observer.unobserve(entry.target);
                }
            });
        }
    };

    // ===== FORM VALIDATION & SUBMISSION =====
    const ContactForm = {
        init: function() {
            this.form = document.getElementById('contact-form');
            if (!this.form) return;

            this.nameInput = document.getElementById('name');
            this.emailInput = document.getElementById('email');
            this.messageInput = document.getElementById('message');
            this.submitButton = document.getElementById('submit-button');
            this.formSuccess = document.getElementById('form-success');

            this.bindEvents();
        },

        bindEvents: function() {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Validación en tiempo real
            this.nameInput.addEventListener('blur', () => this.validateName());
            this.emailInput.addEventListener('blur', () => this.validateEmail());
            this.messageInput.addEventListener('blur', () => this.validateMessage());

            // Limpiar errores al escribir
            this.nameInput.addEventListener('input', () => this.clearError('name'));
            this.emailInput.addEventListener('input', () => this.clearError('email'));
            this.messageInput.addEventListener('input', () => this.clearError('message'));
        },

        validateName: function() {
            const value = this.nameInput.value.trim();
            const errorEl = document.getElementById('name-error');
            
            if (!value) {
                this.showError('name', 'El nombre es requerido');
                return false;
            }
            
            if (value.length < 2) {
                this.showError('name', 'El nombre debe tener al menos 2 caracteres');
                return false;
            }
            
            this.clearError('name');
            return true;
        },

        validateEmail: function() {
            const value = this.emailInput.value.trim();
            const errorEl = document.getElementById('email-error');
            
            if (!value) {
                this.showError('email', 'El correo electrónico es requerido');
                return false;
            }
            
            if (!utils.validateEmail(value)) {
                this.showError('email', 'Por favor ingresa un correo electrónico válido');
                return false;
            }
            
            this.clearError('email');
            return true;
        },

        validateMessage: function() {
            const value = this.messageInput.value.trim();
            
            if (!value) {
                this.showError('message', 'El mensaje es requerido');
                return false;
            }
            
            if (value.length < 10) {
                this.showError('message', 'El mensaje debe tener al menos 10 caracteres');
                return false;
            }
            
            this.clearError('message');
            return true;
        },

        showError: function(field, message) {
            const errorEl = document.getElementById(`${field}-error`);
            if (errorEl) {
                errorEl.textContent = message;
                errorEl.setAttribute('aria-live', 'polite');
            }
        },

        clearError: function(field) {
            const errorEl = document.getElementById(`${field}-error`);
            if (errorEl) {
                errorEl.textContent = '';
            }
        },

        handleSubmit: function(e) {
            e.preventDefault();

            // Validar todos los campos
            const isNameValid = this.validateName();
            const isEmailValid = this.validateEmail();
            const isMessageValid = this.validateMessage();

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                // Focus en el primer campo con error
                if (!isNameValid) this.nameInput.focus();
                else if (!isEmailValid) this.emailInput.focus();
                else if (!isMessageValid) this.messageInput.focus();
                return;
            }

            // Mostrar estado de carga
            this.setLoadingState(true);

            // Simular envío (en producción, aquí iría la llamada a la API)
            setTimeout(() => {
                this.setLoadingState(false);
                this.showSuccess();
                this.resetForm();
            }, CONFIG.formSubmitDelay);
        },

        setLoadingState: function(loading) {
            if (loading) {
                this.submitButton.disabled = true;
                this.submitButton.classList.add('loading');
                this.submitButton.setAttribute('aria-busy', 'true');
            } else {
                this.submitButton.disabled = false;
                this.submitButton.classList.remove('loading');
                this.submitButton.setAttribute('aria-busy', 'false');
            }
        },

        showSuccess: function() {
            this.formSuccess.classList.add('is-visible');
            this.formSuccess.setAttribute('aria-live', 'polite');
            
            // Scroll suave al mensaje de éxito
            this.formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Ocultar después de 5 segundos
            setTimeout(() => {
                this.formSuccess.classList.remove('is-visible');
            }, 5000);
        },

        resetForm: function() {
            this.form.reset();
            // Limpiar todos los errores
            ['name', 'email', 'message'].forEach(field => {
                this.clearError(field);
            });
        }
    };

    // ===== SMOOTH SCROLL =====
    const SmoothScroll = {
        init: function() {
            // Solo si el navegador soporta smooth scroll
            if ('scrollBehavior' in document.documentElement.style) {
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', (e) => {
                        const href = anchor.getAttribute('href');
                        if (href === '#' || href === '') return;

                        const target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            const headerOffset = 80;
                            const elementPosition = target.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });

                            // Cerrar menú móvil si está abierto
                            if (MobileNav.isOpen()) {
                                MobileNav.close();
                            }
                        }
                    });
                });
            }
        }
    };

    // ===== PERFORMANCE MONITORING =====
    const PerformanceMonitor = {
        init: function() {
            // Solo en desarrollo
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                this.monitor();
            }
        },

        monitor: function() {
            window.addEventListener('load', () => {
                if ('performance' in window) {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log(`Page Load Time: ${pageLoadTime}ms`);
                }
            });
        }
    };

    // ===== HEADER SCROLL EFFECT =====
    const HeaderScroll = {
        init: function() {
            this.header = document.querySelector('.main-header');
            if (!this.header) return;

            let lastScroll = 0;
            const scrollHandler = utils.throttle(() => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 100) {
                    this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    this.header.style.boxShadow = 'none';
                }

                lastScroll = currentScroll;
            }, 100);

            window.addEventListener('scroll', scrollHandler, { passive: true });
        }
    };

    // ===== INICIALIZACIÓN =====
    const App = {
        init: function() {
            // Esperar a que el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                this.start();
            }
        },

        start: function() {
            // Inicializar todos los módulos
            MobileNav.init();
            ScrollAnimations.init();
            ContactForm.init();
            SmoothScroll.init();
            HeaderScroll.init();
            PerformanceMonitor.init();

            // Log de inicialización (solo en desarrollo)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('🚀 Nexora AI Platform - Inicializado correctamente');
            }
        }
    };

    // Iniciar aplicación
    App.init();

    // Exportar para uso global si es necesario
    window.NexoraApp = {
        MobileNav,
        ContactForm,
        utils
    };

})();

