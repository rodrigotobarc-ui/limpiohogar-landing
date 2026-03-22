# SDD — LimpioHogar Landing Page
**Version:** 1.0  
**Fecha:** Marzo 2026  
**Stack:** HTML5 + CSS3 + Vanilla JavaScript + Vercel  
**Diseño Figma:** https://www.figma.com/make/AXwdsAf44QQ1J27T1dXzxM/Landing-page-agencia-aseo?t=sbKSfYTj0mRKKzat-0  

---

## 1. Resumen Ejecutivo

LimpioHogar es una agencia de intermediación de servicios de aseo doméstico y de oficinas en Chile. Este documento describe el diseño técnico completo del Landing Page público, cuyo objetivo es:

1. Captar clientes potenciales que buscan servicios de aseo
2. Reclutar trabajadoras de aseo para la red de la agencia

El sitio es una **Single Page Application estática** (HTML + CSS + Vanilla JS), sin frameworks, desplegada en Vercel con dominio propio `limpiohogar.cl`.

---

## 2. Stack Tecnológico

| Componente | Tecnología |
|------------|------------|
| Frontend | HTML5 + CSS3 + Vanilla JavaScript |
| Hosting | Vercel (plan Hobby, gratuito) |
| Repositorio | GitHub |
| Formularios | Formspree (plan gratuito, 2 formularios) |
| Base de datos | Supabase (PostgreSQL, plan gratuito) |
| Dominio | limpiohogar.cl (NIC Chile) |
| Correo | contacto@limpiohogar.cl |
| WhatsApp | WhatsApp Business (eSIM Entel) |
| SEO | Meta tags + Google Search Console |
| CI/CD | GitHub → Vercel (auto-deploy en push) |

---

## 3. Estructura de Archivos

```
limpiohogar/
├── index.html
├── vercel.json
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   ├── main.js          # navegación, scroll, animaciones
│   ├── formspree.js     # envío formularios via Formspree
│   └── supabase.js      # inserción en Supabase (form trabajadoras)
└── assets/
    ├── images/
    └── icons/
```

---

## 4. Sistema de Diseño

### Paleta de colores

```css
--color-primary:    #1E2D4E;  /* azul marino — títulos, navbar, footer */
--color-accent:     #4CAF9A;  /* verde menta — botones CTA, íconos, highlights */
--color-bg:         #FFFFFF;  /* blanco — fondo general */
--color-bg-alt:     #F5F7FA;  /* gris muy claro — secciones alternas */
--color-text:       #333333;  /* texto cuerpo */
--color-text-light: #666666;  /* subtítulos, placeholders */
```

### Tipografía

```css
font-family: 'Inter', 'Poppins', sans-serif;  /* Google Fonts */
font-size-base: 16px;
```

### Componentes base

```css
--border-radius-btn:  50px;   /* botones redondeados */
--border-radius-card: 12px;   /* tarjetas */
--shadow-card: 0 4px 20px rgba(0,0,0,0.08);
--breakpoint-mobile: 768px;
```

---

## 5. Secciones del Landing (orden de aparición)

### 5.1 Navbar

- **Logo:** ícono estrella + texto "LimpioHogar" (color primario)
- **Links:** Servicios | Cómo Funciona | Precios | Trabaja con Nosotros | Contacto
- **CTA:** Botón "Contactar" (fondo verde menta, texto blanco, border-radius 50px)
- **Comportamiento:** sticky en scroll, fondo blanco con box-shadow sutil
- **Mobile:** ícono hamburguesa → menú dropdown animado

### 5.2 Hero

- **Layout:** dos columnas (texto izquierda, imagen derecha)
- **Título:** "Tu hogar impecable," (color primario, bold)
- **Título línea 2:** "sin esfuerzo" (color acento, bold)
- **Subtítulo:** "Servicios profesionales de aseo doméstico en Chile. Confianza, calidad y dedicación para tu hogar."
- **CTA primario:** Botón "Cotizar por WhatsApp" (fondo primario, ícono chat)
- **CTA secundario:** Botón "Ver Precios" (borde primario, fondo transparente)
- **Imagen:** foto de hogar o espacio interior limpio y ordenado, bordes redondeados
- **Mobile:** una columna, imagen debajo del texto

### 5.3 Cómo Funciona

- **Título:** "¿Cómo funciona?"
- **Subtítulo:** "Simple, rápido y efectivo"
- **Layout:** 3 columnas con ícono SVG, número de paso, título y descripción

| Paso | Título | Descripción |
|------|--------|-------------|
| 1 | Contáctanos | Escríbenos por WhatsApp o completa nuestro formulario. Te responderemos en minutos. |
| 2 | Agenda tu servicio | Elige fecha, hora y tipo de servicio. Nos adaptamos a tu horario. |
| 3 | Disfruta tu hogar | Nuestro equipo dejará tu hogar impecable. Garantía de satisfacción. |

- **Íconos SVG:** chat (paso 1), calendario (paso 2), check (paso 3)
- **Mobile:** una columna apilada

### 5.4 Misión y Visión

- **Layout:** dos columnas
- **Misión** (fondo blanco):
  - Ícono objetivo (SVG, color acento)
  - Título: "Nuestra Misión"
  - Texto: "Brindar servicios de aseo doméstico de excelencia que mejoren la calidad de vida de nuestros clientes, ofreciendo soluciones personalizadas con un equipo profesional comprometido con la limpieza, el orden y la satisfacción total."
- **Visión** (fondo primario, texto blanco):
  - Ícono ojo (SVG, color acento)
  - Título: "Nuestra Visión"
  - Texto: "Ser la empresa líder en servicios de aseo doméstico en Chile, reconocida por nuestra confiabilidad, profesionalismo y compromiso con el bienestar de nuestros clientes, expandiendo nuestra presencia a nivel nacional."
- **Mobile:** una columna apilada

### 5.5 Planes y Precios

- **Título:** "Planes y Precios"
- **Subtítulo:** "Elige el plan que mejor se adapte a tus necesidades"
- **Layout:** 3 tarjetas, la del centro destacada con badge "Más Popular"

| Plan | Precio | Descripción | Incluye |
|------|--------|-------------|---------|
| Plan Básico | $35.000/visita | Ideal para mantención regular | Limpieza general pisos, baños y cocina, desempolvado. Hasta 80m² |
| **Plan Premium** ⭐ | $55.000/visita | Para un hogar impecable | Todo básico + limpieza profunda baños/cocina, ventanas, aspirado alfombras. Hasta 120m² |
| Plan Deluxe | $85.000/visita | Servicio completo y exclusivo | Todo premium + electrodomésticos, organización espacios, patios y terrazas. Hasta 200m² |

- **CTA por tarjeta:** Botón "Contratar" → abre WhatsApp con mensaje pre-escrito según plan
- **Plan Premium:** tarjeta con fondo primario, texto blanco, botón color acento
- **Mobile:** tarjetas apiladas verticalmente

#### Links WhatsApp por plan

```
Plan Básico:
https://wa.me/569XXXXXXXX?text=Hola%20LimpioHogar%2C%20quiero%20contratar%20el%20Plan%20B%C3%A1sico%20de%20%2435.000

Plan Premium:
https://wa.me/569XXXXXXXX?text=Hola%20LimpioHogar%2C%20quiero%20contratar%20el%20Plan%20Premium%20de%20%2455.000

Plan Deluxe:
https://wa.me/569XXXXXXXX?text=Hola%20LimpioHogar%2C%20quiero%20contratar%20el%20Plan%20Deluxe%20de%20%2485.000
```

> ⚠️ Reemplazar `569XXXXXXXX` con el número real de WhatsApp Business una vez activada la eSIM.

### 5.6 Trabaja con Nosotros

- **Título:** "¿Quieres trabajar con nosotros?"
- **Subtítulo:** "Únete a nuestro equipo de profesionales del aseo. Regístrate y te contactamos."
- **Layout:** formulario centrado con ancho máximo 600px

#### Campos del formulario

| Campo | Tipo | Validación |
|-------|------|------------|
| Nombre | text | required |
| Apellido | text | required |
| Teléfono | tel | required |
| Dirección | text | required |
| Correo electrónico | email | required |
| Mensaje | textarea | opcional |

- **Botón submit:** "Quiero trabajar con ustedes" (fondo primario, full width)
- **Destino:** Formspree (correo) + Supabase (base de datos)
- **Feedback:** mensaje de éxito/error inline sin recargar la página

### 5.7 Contacto

- **Título:** "Contáctanos"
- **Subtítulo:** "Estamos aquí para ayudarte. Escríbenos y te responderemos pronto."
- **Layout:** dos columnas

**Columna izquierda:**
- Ícono + "Teléfono" + número real
- Ícono + "Email" + contacto@limpiohogar.cl
- Ícono + "Ubicación" + Santiago, Región Metropolitana, Chile
- Foto de hogar limpio (reemplaza la foto del electricista)

**Columna derecha — formulario:**

| Campo | Tipo | Validación |
|-------|------|------------|
| Nombre completo | text | required |
| Email | email | required |
| Teléfono | tel | opcional |
| Mensaje | textarea | required |

- **Botón submit:** "Enviar mensaje" (fondo primario, full width)
- **Destino:** solo Formspree (correo a contacto@limpiohogar.cl)
- **Feedback:** mensaje de éxito/error inline sin recargar la página

### 5.8 Footer

- **Fondo:** color primario (#1E2D4E), texto blanco
- **Layout:** 4 columnas

| Columna | Contenido |
|---------|-----------|
| 1 | Logo LimpioHogar + descripción breve + RUT SpA |
| 2 | Navegación: Servicios, Cómo Funciona, Precios, Contacto |
| 3 | Servicios: Limpieza General, Limpieza Profunda, Mantención Regular, Servicio Personalizado |
| 4 | Contacto: teléfono, correo, Santiago Chile |

- **Copyright:** "© 2026 LimpioHogar SpA. Todos los derechos reservados."
- **Mobile:** 2 columnas o apilado

---

## 6. Integraciones

### 6.1 WhatsApp Business

Todos los botones CTA del Hero usan este link base:

```
https://wa.me/569XXXXXXXX?text=Hola%20LimpioHogar%2C%20quiero%20solicitar%20informaci%C3%B3n
```

El botón flotante de WhatsApp (esquina inferior derecha, siempre visible) usa el mismo link del Hero.

### 6.2 Formspree

Dos formularios independientes:

```javascript
// Formulario Contacto (clientes)
POST https://formspree.io/f/{FORM_ID_CONTACTO}

// Formulario Trabaja con Nosotros
POST https://formspree.io/f/{FORM_ID_TRABAJA}
```

> ⚠️ Reemplazar `{FORM_ID_CONTACTO}` y `{FORM_ID_TRABAJA}` con los IDs reales de Formspree.

Implementación en `js/formspree.js`:

```javascript
async function submitForm(formId, data) {
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.ok;
}
```

### 6.3 Supabase (solo formulario Trabaja con Nosotros)

#### Tabla: `candidatas`

```sql
CREATE TABLE candidatas (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre      varchar(100) NOT NULL,
  apellido    varchar(100) NOT NULL,
  telefono    varchar(20)  NOT NULL,
  direccion   varchar(255) NOT NULL,
  correo      varchar(100) NOT NULL,
  mensaje     text,
  estado      varchar(20)  DEFAULT 'pendiente',
  created_at  timestamp    DEFAULT now()
);

-- RLS: solo permite INSERT desde frontend anónimo
ALTER TABLE candidatas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_only" ON candidatas FOR INSERT WITH CHECK (true);
```

Implementación en `js/supabase.js`:

```javascript
const SUPABASE_URL = 'https://XXXXXXXX.supabase.co';
const SUPABASE_ANON_KEY = 'eyXXXXXXXX';

async function insertCandidata(data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/candidatas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(data)
  });
  return response.ok;
}
```

> ⚠️ Reemplazar `SUPABASE_URL` y `SUPABASE_ANON_KEY` con los valores reales del proyecto Supabase.

---

## 7. SEO

### Meta tags requeridos en `<head>`

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LimpioHogar - Servicio de Aseo Profesional en Santiago Chile</title>
<meta name="description" content="Agencia de aseo domiciliario en Chile. Conectamos hogares y oficinas con trabajadoras de confianza. Plan Básico desde $35.000.">
<meta name="keywords" content="servicio aseo Santiago, limpieza domicilio Chile, trabajadora aseo, limpieza hogar">
<meta property="og:title" content="LimpioHogar - Aseo Profesional en Chile">
<meta property="og:description" content="Conectamos hogares con trabajadoras de aseo de confianza.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.limpiohogar.cl">
<link rel="canonical" href="https://www.limpiohogar.cl">
```

### Post-lanzamiento

1. Registrar en Google Search Console
2. Crear y subir `sitemap.xml`
3. Crear `robots.txt`
4. Verificar Core Web Vitals en PageSpeed Insights

---

## 8. Responsive

| Sección | Desktop 1440px | Mobile 390px |
|---------|---------------|--------------|
| Navbar | Links horizontales + CTA | Hamburguesa + dropdown |
| Hero | 2 columnas | 1 columna, imagen debajo |
| Cómo Funciona | 3 columnas | 1 columna apilada |
| Misión/Visión | 2 columnas | 1 columna apilada |
| Precios | 3 tarjetas | Tarjetas apiladas |
| Trabaja / Contacto | 2 columnas | 1 columna |
| Footer | 4 columnas | 2 columnas |

---

## 9. Plan de Trabajo

| # | Tarea | Descripción |
|---|-------|-------------|
| 0 | Cuentas | Crear GitHub, Vercel, Formspree, Supabase |
| 1 | Figma MCP | Conectar Claude Code con Figma via MCP |
| 2 | Export assets | Exportar SVG/PNG de íconos e imágenes desde Figma |
| 3 | Claude Code | Generar HTML/CSS/JS basado en diseño Figma + este SDD |
| 4 | Formspree | Configurar 2 formularios, obtener IDs, integrar |
| 5 | Supabase | Crear tabla candidatas, obtener URL y anon key, integrar |
| 6 | WhatsApp | Activar eSIM, configurar WhatsApp Business, actualizar links |
| 7 | GitHub | Subir código al repositorio |
| 8 | Vercel | Conectar GitHub, primer deploy automático |
| 9 | Dominio | Conectar limpiohogar.cl a Vercel (post SpA) |
| 10 | SEO | Google Search Console, sitemap, robots.txt |

---

## 10. Pendientes Pre-Lanzamiento

- [ ] Constitución SpA LimpioHogar (contador)
- [ ] Registro dominio limpiohogar.cl en NIC Chile (requiere RUT SpA)
- [ ] Correo corporativo contacto@limpiohogar.cl (post dominio)
- [ ] Activación eSIM Entel → número WhatsApp Business → actualizar links
- [ ] Reemplazar imagen electricista por foto hogar limpio en Figma
- [ ] Obtener IDs de Formspree y reemplazar en código
- [ ] Obtener URL y anon key de Supabase y reemplazar en código
- [ ] Número de teléfono real para el footer y sección Contacto

---

*LimpioHogar SpA | Santiago, Chile | Marzo 2026*
