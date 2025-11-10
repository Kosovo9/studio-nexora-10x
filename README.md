# Studio Nexora 10x 🚀

Proyecto base sólido y limpio para Studio Nexora - Fotos Profesionales con IA

## 🎯 Características

- ✅ Next.js 16 con App Router
- ✅ TypeScript configurado estrictamente
- ✅ Tailwind CSS para estilos
- ✅ Clerk para autenticación
- ✅ Supabase para base de datos
- ✅ Stripe para pagos
- ✅ Three.js para componentes 3D
- ✅ Build limpio sin errores

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start
```

## 📁 Estructura del Proyecto

```
studio-nexora-10x/
├── src/
│   ├── app/              # App Router
│   │   ├── (auth)/       # Rutas de autenticación
│   │   ├── (main)/       # Rutas principales
│   │   ├── (admin)/      # Panel administración
│   │   └── api/          # API routes
│   ├── components/
│   │   ├── ui/           # Componentes base
│   │   └── shared/       # Componentes compartidos
│   ├── lib/              # Configuraciones y utilidades
│   └── types/            # Tipos TypeScript
└── public/               # Archivos estáticos
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Stripe
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...

# Google AI
NEXT_PUBLIC_GOOGLE_AI_API_KEY=...
GOOGLE_AI_API_KEY=...
```

## 📦 Dependencias Principales

- `next`: 16.0.1
- `react`: 19.2.0
- `@clerk/nextjs`: ^6.34.5
- `@supabase/supabase-js`: ^2.80.0
- `stripe`: ^19.3.0
- `three`: ^0.181.1
- `tailwindcss`: ^4

## 🚀 Deployment

### Vercel

1. Conecta el repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Requisitos

- Node.js >= 22.0.0

## 📝 Notas

- Proyecto base limpio sin errores de compilación
- Arquitectura escalable y mantenible
- Listo para desarrollo continuo
