# CLM Group of Construction — Inline-Editing CMS

Pixel-perfect clone of **[https://www.clmconstruction.in/](https://www.clmconstruction.in/)** engineered with a custom **Inline-Editing CMS Architecture**.

---

## 🚀 Live Local URL
- **Local Preview Server**: [http://localhost:3000](http://localhost:3000)
- **Vite Dev Server**: `npm run dev` (starts on port 5173 with HMR)

---

## 🔑 Admin Authentication & Inline Editing Workflow

### 1. How to Enter Admin Mode
There are two ways to activate the Admin Inline Editor:
- **Hidden Trigger (Requested)**: **Triple-click** the copyright text in the footer:
  `© 2026 CLM Group of Construction. All rights reserved. Quality is Our Blueprint.`
- **Keyboard Shortcut**: Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd> (or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd> on Mac).
- **Subtle Admin Link**: Click the "Admin" button next to the back-to-top arrow in the footer.

### 2. Mock Credentials
- **Username**: `admin`
- **Password**: `admin123`

---

## ✏️ Inline Editing Features

1. **Direct On-Page Editing (`<EditableField />`)**:
   - In Admin Mode, all headings, paragraphs, taglines, phone numbers, and addresses transform into editable inputs and auto-expanding textareas.
   - Inputs inherit the **exact typography, font-size, weight, and color** of the live site, highlighted with an orange dashed border for instant visual feedback.

2. **Dynamic Collection Management (Services, Projects, Contractors)**:
   - Every grid features a visually matching **"Add New +"** card at the end of the collection.
   - Clicking **"Add New +"** inserts a new item directly into state, instantly editable in place.
   - Existing cards can also be removed using the delete button on each card in Admin mode.

3. **Persistent Floating "Save Changes" Button**:
   - When edits are made (`hasUnsavedChanges = true`), a vibrant **Green floating button** appears in the bottom right corner with an unsaved changes counter.
   - Clicking **"Save Changes"** commits all updates to `localStorage`, clears the unsaved flag, and displays a success notification.
   - Edits persist across page refreshes and browser restarts.

4. **Admin Toolbar & Reset Option**:
   - An admin bar is fixed to the top of the viewport indicating editor status.
   - Includes **"Reset Defaults"** to restore factory content at any time, plus a quick **"Exit Editor"** button.

---

## 🛠️ Tech Stack & Architecture

- **React 19**
- **Vite 8**
- **Tailwind CSS 4**
- **Lucide React** (Official icon set)
- **Custom React Context CMS Store (`CMSContext.jsx`)**
- **Node.js HTTP Server (`server.cjs`)**

---

## 💻 Commands

```bash
# Start Vite development server (HMR)
npm run dev

# Build production bundle to dist/
npm run build

# Start production server on port 3000
npm start
```
