# Watermark Script

Script Node.js para agregar marcas de agua diagonales a imágenes usando la librería Sharp.

## Características

- **Texto de marca de agua**: "STUDIO NEXORA • PAGO REQUERIDO"
- **Fuente**: Helvetica Bold (con fallback a Arial)
- **Opacidad**: 40%
- **Posición**: Diagonal centro (de esquina inferior izquierda a superior derecha)
- **Tamaño**: ~70% del ancho de la imagen
- **Efecto**: Blending 'overlay' con desenfoque gaussiano de 1px
- **Formatos soportados**: JPG, JPEG, PNG, WebP, TIFF, BMP

## Instalación

```bash
npm install sharp
```

## Uso

1. Coloca las imágenes a procesar en el directorio `./test_images/`
2. Ejecuta el script:

```bash
node scripts/watermark.js
```

3. Las imágenes con marca de agua se guardarán en `./test_images/watermarked/`

## Estructura de directorios

```
.
├── scripts/
│   ├── watermark.js
│   └── README.md
├── test_images/
│   ├── imagen1.jpg
│   ├── imagen2.png
│   └── watermarked/
│       ├── imagen1.jpg
│       └── imagen2.png
```

## Ejemplo de salida

```
🎨 Starting watermark process...
Input directory: ./test_images
Output directory: ./test_images/watermarked
Watermark text: "STUDIO NEXORA • PAGO REQUERIDO"
Opacity: 40%
Blur: 1px gaussian
---
Found 3 image(s) to process:
  - test1.jpg
  - test2.png
  - test3.jpg
---
Processing: ./test_images/test1.jpg
✓ Watermarked: ./test_images/watermarked/test1.jpg
Processing: ./test_images/test2.png
✓ Watermarked: ./test_images/watermarked/test2.png
Processing: ./test_images/test3.jpg
✓ Watermarked: ./test_images/watermarked/test3.jpg
---
🎉 Process completed: 3/3 images watermarked successfully

📁 Generated files:
  - ./test_images/watermarked/test1.jpg
  - ./test_images/watermarked/test2.png
  - ./test_images/watermarked/test3.jpg
```

## Configuración

Puedes modificar los parámetros en el archivo `watermark.js`:

- `WATERMARK_TEXT`: Texto de la marca de agua
- `OPACITY`: Opacidad (0.0 - 1.0)
- `BLUR_SIGMA`: Intensidad del desenfoque gaussiano
- `INPUT_DIR`: Directorio de imágenes de entrada
- `OUTPUT_DIR`: Directorio de salida

## Requisitos

- Node.js 14+
- Sharp library
- Imágenes en formatos soportados