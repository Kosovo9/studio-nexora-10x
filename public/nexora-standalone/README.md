# 🚀 Nexora AI Platform - UI Standalone

## 📋 Descripción

Implementación completa y optimizada del UI de Nexora AI Platform. Código de nivel ingenieril con las mejores prácticas de performance, accesibilidad y UX.

## ✨ Características

- ✅ **Menú móvil completo** con animaciones suaves
- ✅ **Animaciones de scroll** con Intersection Observer
- ✅ **Formulario de contacto** con validación en tiempo real
- ✅ **Diseño 100% responsive**
- ✅ **Optimizado para performance**
- ✅ **Accesibilidad WCAG 2.1**
- ✅ **SEO optimizado**

## 🛠️ Instalación y Uso

### Opción 1: Uso Directo

1. Abre `index.html` en tu navegador
2. ¡Listo! La página funcionará completamente

### Opción 2: Servidor Local

```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server -p 8000

# Con PHP
php -S localhost:8000
```

Luego visita: `http://localhost:8000`

## 📁 Estructura de Archivos

```
nexora-standalone/
├── index.html      # Estructura HTML
├── styles.css      # Estilos CSS optimizados
├── script.js       # JavaScript funcional
└── README.md       # Este archivo
```

## 🎨 Personalización

### Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-blue: #3a4a9f;
    --dark-blue: #0d102a;
    --border-color: #f0b90b;
    /* ... más variables */
}
```

### Contenido

Modifica el contenido directamente en `index.html`:

- Títulos y textos
- Enlaces
- Estadísticas
- Mensajes del chat

## 🔧 Funcionalidades Técnicas

### Menú Móvil
- Animación suave de entrada/salida
- Focus trap para accesibilidad
- Cierre con ESC
- Overlay con blur

### Animaciones de Scroll
- Intersection Observer API
- Optimizado para performance
- Delays escalonados
- Soporte para reduced motion

### Formulario
- Validación en tiempo real
- Sanitización de inputs
- Estados de carga
- Mensajes de éxito/error
- Accesibilidad completa

## 📱 Responsive Breakpoints

- **Desktop**: > 992px
- **Tablet**: 768px - 992px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ♿ Accesibilidad

- ARIA labels completos
- Navegación por teclado
- Focus management
- Screen reader friendly
- Soporte para reduced motion

## ⚡ Optimizaciones de Performance

- CSS variables para fácil mantenimiento
- Debounce/throttle en eventos
- Lazy loading de animaciones
- Intersection Observer (no polling)
- Will-change para animaciones
- Contain CSS para optimización

## 🌐 Compatibilidad

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Opera: ✅
- Mobile browsers: ✅

## 📝 Notas

- Las imágenes de avatar son placeholders - reemplázalas con URLs reales
- El formulario simula el envío - conéctalo a tu backend
- Font Awesome se carga desde CDN - verifica conexión a internet

## 🔗 Integración con Next.js

Para usar en tu proyecto Next.js, puedes:

1. Copiar los estilos a `globals.css`
2. Convertir HTML a componentes React
3. Usar los estilos como referencia para tus componentes

## 📄 Licencia

Código optimizado para Studio Nexora 10x

---

**Desarrollado con ❤️ para Nexora AI Platform**

