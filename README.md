# Agenda

Aplicación de agenda de contactos sencilla construida con HTML y TypeScript.

## Estructura del proyecto

```
├── index.html              # Interfaz principal
├── styles.css              # Estilos
├── src/
│   ├── types.ts            # Tipos e interfaces
│   ├── storage.ts          # Persistencia en localStorage
│   ├── ui.ts               # Renderizado y componentes UI
│   └── app.ts              # Lógica principal y eventos
├── dist/                   # Código compilado (generado por tsc)
├── package.json
├── tsconfig.json
└── .github/
    └── workflows/
        └── trigger-changelog.yml  # Trigger automático de changelog al mergear en main
```

## Funcionalidades

- ➕ Añadir contactos (nombre, teléfono, email, notas)
- ✏️ Editar contactos existentes
- 🗑️ Eliminar contactos con confirmación
- 🔍 Búsqueda en tiempo real por nombre, teléfono o email
- 💾 Persistencia automática en `localStorage`

## Uso

### 1. Instalar dependencias

```bash
npm install
```

### 2. Compilar TypeScript

```bash
npm run build
```

### 3. Abrir en el navegador

Abre `index.html` directamente en tu navegador (o usa una extensión como *Live Server* en VS Code).

## GitHub Actions — Changelog automático

El workflow `.github/workflows/trigger-changelog.yml` se activa automáticamente cada vez que se hace un push (merge) a la rama `main`.

**Configuración necesaria:** Añade un *secret* llamado `PERSONAL_ACCESS_TOKEN` en los ajustes de tu repositorio (Settings → Secrets → Actions) con un token de GitHub con permiso `workflow`.