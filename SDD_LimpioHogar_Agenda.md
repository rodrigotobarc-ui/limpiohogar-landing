# SDD — LimpioHogar Agenda
**Version:** 1.0  
**Fecha:** Marzo 2026  
**Tipo:** Progressive Web App (PWA)  
**Stack:** Blazor WASM + Supabase  
**URL:** app.limpiohogar.cl  
**Diseño Figma:** https://www.figma.com/make/ObKQ3mtX4ovGjtAmQbEKBg/Mobile-PWA-for-LimpioHogar?p=f&t=xUkZEBk2JiFSaoDN-0&fullscreen=1  

---

## 1. Resumen Ejecutivo

LimpioHogar Agenda es la aplicación de gestión interna de la agencia. Permite administrar trabajadoras, clientes, servicios agendados y pagos/comisiones desde cualquier dispositivo móvil sin necesidad de instalarla desde una tienda de apps.

**Usuarios:**
- **Rodrigo Tobar** — administrador, acceso total
- **Asistente** — acceso operacional (sin pagos/comisiones)

---

## 2. Stack Tecnológico

| Componente | Tecnología |
|------------|------------|
| Frontend | Blazor WASM (.NET 9) |
| PWA | Blazor PWA template |
| UI | MudBlazor |
| Backend/DB | Supabase (PostgreSQL + Auth + Realtime) |
| Hosting | Vercel (mismo proyecto, subdominio app.) |
| Repositorio | GitHub (limpiohogar-agenda) |
| Notificaciones WhatsApp | WhatsApp Business API (wa.me links) |
| Notificaciones correo | Supabase Edge Functions + Resend |
| CI/CD | GitHub → Vercel (auto-deploy en push) |

---

## 3. Estructura de Archivos

```
limpiohogar-agenda/
├── LimpioHogar.Agenda.sln
├── src/
│   └── LimpioHogar.Agenda.Client/      # Blazor WASM PWA
│       ├── Pages/
│       │   ├── Trabajadoras/
│       │   │   ├── Index.razor
│       │   │   ├── Detalle.razor
│       │   │   └── Formulario.razor
│       │   ├── Clientes/
│       │   │   ├── Index.razor
│       │   │   ├── Detalle.razor
│       │   │   └── Formulario.razor
│       │   ├── Agenda/
│       │   │   ├── Index.razor         # vista calendario
│       │   │   ├── Semana.razor        # vista semanal
│       │   │   └── Formulario.razor    # agendar servicio
│       │   ├── Pagos/
│       │   │   ├── Index.razor
│       │   │   └── Resumen.razor       # comisiones del mes
│       │   └── Auth/
│       │       └── Login.razor
│       ├── Services/
│       │   ├── SupabaseService.cs
│       │   ├── TrabajadoraService.cs
│       │   ├── ClienteService.cs
│       │   ├── ServicioService.cs
│       │   └── PagoService.cs
│       ├── Models/
│       │   ├── Trabajadora.cs
│       │   ├── Cliente.cs
│       │   ├── Servicio.cs
│       │   └── Pago.cs
│       ├── wwwroot/
│       │   ├── manifest.json           # PWA manifest
│       │   ├── service-worker.js       # PWA offline
│       │   └── icons/                  # íconos PWA
│       └── Program.cs
```

---

## 4. Modelo de Datos

### 4.1 Tabla: `trabajadoras`

```sql
CREATE TABLE trabajadoras (
  id                uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre            varchar(100) NOT NULL,
  apellido          varchar(100) NOT NULL,
  telefono          varchar(20)  NOT NULL,
  email             varchar(100),
  direccion         varchar(255),
  comuna            varchar(100),
  estado_migratorio varchar(50)  DEFAULT 'no_informado',
  -- valores: regular | en_tramite | irregular | no_informado
  activa            boolean      DEFAULT true,
  notas             text,
  created_at        timestamp    DEFAULT now()
);
```

### 4.2 Tabla: `clientes`

```sql
CREATE TABLE clientes (
  id        uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre    varchar(100) NOT NULL,
  apellido  varchar(100) NOT NULL,
  telefono  varchar(20)  NOT NULL,
  email     varchar(100),
  direccion varchar(255) NOT NULL,
  comuna    varchar(100) NOT NULL,
  tipo      varchar(20)  DEFAULT 'casa',
  -- valores: casa | oficina
  notas     text,
  activo    boolean      DEFAULT true,
  created_at timestamp   DEFAULT now()
);
```

### 4.3 Tabla: `servicios`

```sql
CREATE TABLE servicios (
  id               uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  trabajadora_id   uuid    REFERENCES trabajadoras(id) NOT NULL,
  cliente_id       uuid    REFERENCES clientes(id) NOT NULL,
  fecha            date    NOT NULL,
  hora             time    NOT NULL,
  plan             varchar(20) NOT NULL,
  -- valores: basico | premium | deluxe
  estado           varchar(20) DEFAULT 'pendiente',
  -- valores: pendiente | confirmado | realizado | cancelado
  monto_total      integer NOT NULL,
  monto_trabajadora integer NOT NULL,
  monto_agencia    integer NOT NULL,
  notas            text,
  created_at       timestamp DEFAULT now()
);
```

### 4.4 Tabla: `pagos`

```sql
CREATE TABLE pagos (
  id           uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  servicio_id  uuid    REFERENCES servicios(id) NOT NULL,
  fecha_pago   date    NOT NULL,
  monto        integer NOT NULL,
  tipo         varchar(20) NOT NULL,
  -- valores: ingreso_cliente | egreso_trabajadora
  confirmado   boolean DEFAULT false,
  notas        text,
  created_at   timestamp DEFAULT now()
);
```

### 4.5 Montos por plan

```
Plan Básico:   monto_total=35000 | monto_trabajadora=25000 | monto_agencia=10000
Plan Premium:  monto_total=55000 | monto_trabajadora=40000 | monto_agencia=15000
Plan Deluxe:   monto_total=85000 | monto_trabajadora=65000 | monto_agencia=20000
```

---

## 5. Módulos de la App

### 5.1 Autenticación

- Login con email + password via Supabase Auth
- Dos roles: `admin` (Rodrigo) y `asistente`
- Sesión persistente en el dispositivo (PWA)
- Sin registro público — solo admin puede crear usuarios

### 5.2 Dashboard (pantalla de inicio)

Resumen del día al abrir la app:

- Servicios de hoy (lista con trabajadora, cliente, hora, estado)
- Servicios pendientes de confirmación
- Comisiones del mes en curso
- Accesos rápidos: + Agendar | + Trabajadora | + Cliente

### 5.3 Trabajadoras

| Acción | Descripción |
|--------|-------------|
| Listar | Tarjetas con nombre, teléfono, estado, activa/inactiva |
| Buscar | Filtro por nombre o comuna |
| Crear | Formulario completo |
| Editar | Mismo formulario |
| Ver detalle | Historial de servicios de esa trabajadora |
| Desactivar | Toggle activa/inactiva (no elimina) |

**Solo rol admin** puede ver estado migratorio.

### 5.4 Clientes

| Acción | Descripción |
|--------|-------------|
| Listar | Tarjetas con nombre, teléfono, comuna, tipo |
| Buscar | Filtro por nombre o comuna |
| Crear | Formulario completo |
| Editar | Mismo formulario |
| Ver detalle | Historial de servicios de ese cliente |
| Desactivar | Toggle activo/inactivo |

### 5.5 Agenda

**Vista principal: Semana**
- Calendario semanal con servicios del día
- Código de color por estado:
  - 🟡 Pendiente
  - 🟢 Confirmado
  - ✅ Realizado
  - 🔴 Cancelado
- Tap en servicio → ver detalle
- Botón + → agendar nuevo servicio

**Formulario agendar servicio:**

| Campo | Tipo | Detalle |
|-------|------|---------|
| Trabajadora | select | Lista de trabajadoras activas |
| Cliente | select | Lista de clientes activos |
| Fecha | date picker | No permite fechas pasadas |
| Hora | time picker | Intervalos de 30 min |
| Plan | select | Básico / Premium / Deluxe |
| Notas | textarea | Opcional |

Al guardar:
- Calcula montos automáticamente según plan
- Cambia estado a `pendiente`
- Dispara notificaciones (ver sección 6)

**Cambio de estado:**
- Pendiente → Confirmado → Realizado
- Cualquier estado → Cancelado

### 5.6 Pagos y Comisiones

**Solo rol admin.**

**Vista pagos del servicio:**
- Al marcar servicio como `realizado` → se crean automáticamente 2 registros de pago:
  - `ingreso_cliente`: monto_total (por confirmar)
  - `egreso_trabajadora`: monto_trabajadora (por confirmar)
- Toggle para confirmar cada pago

**Vista resumen mensual:**
- Selector mes/año
- Total servicios realizados
- Total ingresos brutos
- Total pagado a trabajadoras
- **Comisión neta de la agencia**
- Desglose por trabajadora

---

## 6. Notificaciones

### 6.1 WhatsApp a la trabajadora

Al agendar un servicio, se genera un link directo:

```
https://wa.me/569{telefono_trabajadora}?text=Hola+{nombre}%2C+tienes+un+servicio+agendado+
el+{fecha}+a+las+{hora}+en+{direccion_cliente}%2C+{comuna}.+Plan+{plan}.+
Confirma+tu+asistencia.+-+LimpioHogar
```

El link abre WhatsApp con mensaje pre-escrito. El coordinador solo presiona enviar.

### 6.2 WhatsApp al cliente

Al confirmar un servicio:

```
https://wa.me/569{telefono_cliente}?text=Hola+{nombre}%2C+confirmamos+tu+servicio+
de+aseo+el+{fecha}+a+las+{hora}.+La+trabajadora+es+{nombre_trabajadora}.+
Valor+a+cancelar%3A+%24{monto_total}.+-+LimpioHogar
```

### 6.3 Correo a Rodrigo

Al agendar un servicio → Supabase Edge Function → Resend API → correo automático con resumen del servicio.

```
Asunto: Nuevo servicio agendado - {fecha}
Cuerpo:
  Trabajadora: {nombre_trabajadora}
  Cliente: {nombre_cliente} - {direccion}
  Fecha: {fecha} {hora}
  Plan: {plan} - ${monto_total}
  Comisión agencia: ${monto_agencia}
```

---

## 7. PWA — Configuración

### 7.1 manifest.json

```json
{
  "name": "LimpioHogar Agenda",
  "short_name": "LimpioHogar",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#1E2D4E",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 7.2 Instalación en iPhone

```
Safari → app.limpiohogar.cl
→ Botón compartir (□↑)
→ "Agregar a pantalla de inicio"
→ Queda como app con ícono LimpioHogar
```

---

## 8. Roles y Permisos

| Módulo | Admin (Rodrigo) | Asistente |
|--------|----------------|-----------|
| Dashboard | ✅ Completo | ✅ Sin comisiones |
| Trabajadoras | ✅ Todo + estado migratorio | ✅ Sin estado migratorio |
| Clientes | ✅ Todo | ✅ Todo |
| Agenda | ✅ Todo | ✅ Todo |
| Pagos | ✅ Todo | ❌ Sin acceso |
| Comisiones | ✅ Todo | ❌ Sin acceso |
| Crear usuarios | ✅ Sí | ❌ No |

---

## 9. Diseño Mobile-First

### Paleta (misma que landing)

```css
--color-primary:  #1E2D4E;  /* azul marino */
--color-accent:   #4CAF9A;  /* verde menta */
--color-bg:       #FFFFFF;
--color-bg-alt:   #F5F7FA;
```

### Navegación mobile

Bottom navigation bar con 4 íconos:
```
🏠 Inicio | 📅 Agenda | 👥 Personas | 💰 Pagos
```

### Componentes MudBlazor principales

- `MudDataGrid` → listados
- `MudDatePicker` → selector fecha
- `MudTimePicker` → selector hora
- `MudSelect` → desplegables
- `MudSnackbar` → notificaciones inline
- `MudBottomNavigation` → nav mobile

---

## 10. Plan de Trabajo

| # | Tarea | Descripción |
|---|-------|-------------|
| 1 | Supabase | Crear proyecto, tablas, RLS, Auth |
| 2 | GitHub | Crear repo limpiohogar-agenda |
| 3 | Blazor WASM | Scaffold proyecto PWA con MudBlazor |
| 4 | Auth | Login + roles admin/asistente |
| 5 | Trabajadoras | CRUD completo |
| 6 | Clientes | CRUD completo |
| 7 | Agenda | Calendario + agendar servicio |
| 8 | Notificaciones | Links WhatsApp + correo Resend |
| 9 | Pagos | Registro y confirmación |
| 10 | Comisiones | Resumen mensual |
| 11 | PWA | manifest.json + service worker + íconos |
| 12 | Vercel | Deploy en app.limpiohogar.cl |

---

## 11. Pendientes Pre-Desarrollo

- [ ] Dominio limpiohogar.cl disponible (post SpA)
- [ ] Subdominio app.limpiohogar.cl configurado en Vercel
- [ ] Proyecto Supabase creado
- [ ] Cuenta Resend para correos transaccionales
- [ ] Número WhatsApp Business activo (eSIM Entel)

---

*LimpioHogar SpA | Santiago, Chile | Marzo 2026*
