# Gallery-project — PhotoSphere Personal Photo Gallery and Sharing Showcase

PhotoSphere is a frontend-only mini project for **BCS353 — Web Designing Workshop** (B.Tech 2nd year, AKTU). It uses **HTML5, CSS3 and vanilla JavaScript only**. There is no React, Bootstrap, Tailwind, TypeScript or backend dependency in the website code.

## 1. What the website does

- Displays 12 individually credited sample photographs from Pexels.
- Filters photographs by Nature, Architecture, People, Travel and Animals.
- Searches by photo title, photographer name or category.
- Saves favourite photo IDs and the selected category in `localStorage`.
- Shows a favourites-only view and an empty state when nothing matches.
- Opens a larger photo and complete details in an accessible modal.
- Accepts a real JPG, JPEG, PNG or WebP file from the user's computer.
- Validates file type, empty files and the 5 MB size limit.
- Previews the selected file with the browser File API and `URL.createObjectURL()`.
- Adds a valid local image to the same gallery data used by search and filters.
- Deletes user-uploaded images after confirmation and releases their object URLs.
- Includes a real, button-triggered API connection check without inventing server success.
- Works on desktop, tablet and mobile with CSS Grid, Flexbox and media queries.

> **Demo-mode limitation:** an uploaded image is represented by a temporary browser `blob:` URL. It is available in the current open page and may disappear after a refresh or when the tab closes. It is not uploaded to a server and is not permanently stored. Favourite IDs for sample photographs can persist because they are small strings; large image data is deliberately not stored in `localStorage`.

## 2. Project files

```text
PhotoSphere/
├── index.html          Semantic page structure, forms, SVG icons and dialogs
├── style.css           Colours, Grid, Flexbox, animation and responsive rules
├── script.js           Data, search, filters, uploads, favourites and modals
├── README.md           Setup, demonstration and report guide
├── favicon.svg         PhotoSphere browser icon
├── images/             Locally cached sample Pexels photographs
└── backend/
    └── README.md       Future Spring Boot + MySQL integration plan only
```

The `backend` folder intentionally contains **no complicated backend implementation** yet. The frontend works on its own.

## 3. How to run locally

### Quickest method: open the file

Copy the project folder to your computer and double-click `index.html`. The script is a normal deferred JavaScript file, so no module loader or compilation is required. Keep `index.html`, `style.css`, `script.js`, `favicon.svg` and the `images` folder together.

### Recommended for local development: VS Code Live Server

1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. The website opens in your browser. No package installation, compilation or backend is needed for normal use.

Any ordinary static web server can also serve these files. Some browsers apply stricter storage rules to `file://` pages; if favourites do not persist when opened directly, use Live Server. This does not affect the current-session upload demonstration.

## 4. Demonstrate the main workflow

1. Open **Explore Gallery** and try the **Nature** filter.
2. Search for a photographer such as `Matheus Natan`; clear the search afterwards.
3. Click a heart, then choose **Favourites** to show the saved photograph.
4. Click **View Details**, then close the modal with its button, the outside backdrop or Escape.
5. Open **Upload Photo** and enter a title, your name and a category.
6. Choose an image from your computer. Confirm that the preview shows **your actual file**.
7. Submit the form. The new card appears first in the gallery and the count increases.
8. Search for the new title or select its category to prove it uses the same gallery state.
9. Delete the uploaded card and confirm that its object URL is released.
10. Refresh and explain why temporary local uploads disappear while sample favourites remain.

For validation, try submitting an empty form, selecting a non-image file, or choosing an image larger than 5 MB. Errors appear below the relevant field rather than relying only on browser popups.

## 5. Important JavaScript functions

| Function | Purpose |
| --- | --- |
| `initialiseWebsite()` | Restores simple settings, registers events and renders the first gallery. |
| `renderGallery()` | Rebuilds visible cards and updates counts, filters and empty states. |
| `getFilteredPhotos()` | Combines category, favourites and search conditions on the shared array. |
| `createPhotoCard(photo, index)` | Converts one photo object into a readable card template. |
| `handleGalleryButtonClick(event)` | Uses event delegation for details, favourites and delete buttons. |
| `toggleFavourite(photoId)` | Adds/removes an ID and synchronises card and modal buttons. |
| `handleSelectedFile(file)` | Validates a local file and creates its temporary preview URL. |
| `validateUploadForm()` | Checks required metadata and the selected image; focuses the first error. |
| `handlePhotoUpload(event)` | Adds the actual local file preview to `galleryPhotos` in demo mode. |
| `resetSelectedFile()` | Clears the file input and revokes an unused preview object URL. |
| `openPhotoDetails(photoId)` | Fills and opens the native details `<dialog>`. |
| `deletePendingPhoto()` | Removes only a user upload, updates state and revokes its object URL. |
| `checkBackendConnection()` | Makes a real optional GET request and honestly reports success/failure. |
| `escapeHtml(value)` | Escapes user text before inserting it into card HTML templates. |

### Object URL ownership

This is the most important upload detail to explain:

1. Selecting a file creates `previewObjectUrl` with `URL.createObjectURL(file)`.
2. Replacing or cancelling that selection revokes the unused URL.
3. A valid submission transfers that same URL to the new gallery object.
4. Deleting the uploaded photo revokes its URL.
5. Leaving the page releases any remaining preview and uploaded URLs.

This prevents avoidable browser memory leaks. The image itself is always the user's selected file; no sample URL is substituted.

## 6. BCS353 syllabus concepts demonstrated

### HTML5

- Semantic elements: `header`, `nav`, `main`, `section`, `article` and `footer`.
- Headings, paragraphs, lists, figures and image alternative text.
- Forms, labels, text inputs, `select`, `textarea` and `input type="file"`.
- File `accept` attribute and appropriate input attributes.
- Native `dialog` elements for photo details and delete confirmation.
- Hyperlinks, internal section navigation and external photo credits.
- Accessibility through labels, ARIA states, live regions and keyboard controls.

### CSS3

- CSS custom properties, colours, margins, padding and borders.
- Rounded corners, layered shadows and hover/focus states.
- Flexbox for headers, buttons, toolbars and content alignment.
- CSS Grid for hero, photo cards, forms, about cards and endpoint layouts.
- Positioning for sticky navigation, collage images, badges and modal UI.
- Responsive desktop/tablet/mobile media queries.
- Transform-based entrances, modal transitions and scroll reveals.
- `prefers-reduced-motion` support and responsive units.

### JavaScript

- Variables, constants, arrays and objects.
- Functions, parameters, return values and conditional statements.
- `forEach`, `map`, `filter`, `find` and spread syntax.
- DOM selection, creation, class changes and template rendering.
- Click, input, submit, keyboard, drag/drop, scroll and dialog events.
- Event delegation for dynamically generated cards.
- Form validation and helpful error messages.
- Browser File API, `URL.createObjectURL()` and `URL.revokeObjectURL()`.
- JSON and exception handling around `localStorage`.
- `fetch`, `AbortController` and `async`/`await` for the optional API check.

## 7. Future Spring Boot integration

The only frontend API configuration point is at the top of `script.js`:

```js
const API_BASE_URL = "http://localhost:8080";
const DEMO_MODE = true;
```

Planned endpoints:

| Method | Endpoint | Future purpose |
| --- | --- | --- |
| GET | `/api/photos` | Return gallery metadata as JSON. |
| GET | `/api/photos/{id}` | Return one photograph's details. |
| POST | `/api/photos` | Accept `multipart/form-data` image and metadata. |
| DELETE | `/api/photos/{id}` | Delete an uploaded file and its database row. |

A future upload request can be constructed without manually setting the multipart boundary:

```js
const formData = new FormData();
formData.append("photo", selectedFile);
formData.append("title", photoTitleInput.value.trim());
formData.append("photographer", photographerInput.value.trim());
formData.append("category", categoryInput.value);
formData.append("description", descriptionInput.value.trim());

const response = await fetch(`${API_BASE_URL}/api/photos`, {
  method: "POST",
  body: formData
});
```

Only after a real `response.ok` should the interface report a server upload. See `backend/README.md` for the suggested Java structure, validation, MySQL schema and integration order. No database password, API secret or other credential belongs in `script.js`.

## 8. Suggested 10-minute presentation

| Time | Topic |
| --- | --- |
| 0:00–1:00 | Problem statement, project name and HTML/CSS/JavaScript technology choice. |
| 1:00–2:30 | Responsive header, hero, semantic sections and CSS Grid/Flexbox layout. |
| 2:30–4:00 | Gallery objects, rendering, search, category filters and empty state. |
| 4:00–6:30 | Live local file selection, validation, preview and adding the actual image. |
| 6:30–7:30 | Details modal, favourites, localStorage and deleting an upload. |
| 7:30–8:30 | Explain object URL cleanup and why refresh removes temporary uploads. |
| 8:30–9:30 | Show `API_BASE_URL` and the planned Spring Boot/MySQL endpoints. |
| 9:30–10:00 | Limitations, learning outcomes and future scope. |

## 9. Suggested 20–25 page report outline

1. Cover page, certificate and declaration (2–3 pages).
2. Acknowledgement and abstract (1–2 pages).
3. Table of contents and list of figures (1 page).
4. Introduction, problem statement and objectives (2 pages).
5. Requirement analysis and technology selection (2 pages).
6. System design: page flow, gallery data flow and upload flowchart (2–3 pages).
7. Implementation: HTML structure and responsive CSS (3 pages).
8. Implementation: JavaScript gallery, File API and validation (3–4 pages).
9. Testing table: valid/invalid files, search, filters, modal and responsiveness (2 pages).
10. Screenshots with captions (2–3 pages).
11. Limitations, future Spring Boot/MySQL scope and conclusion (1–2 pages).
12. References, including MDN documentation and Pexels photo credits (1 page).

## 10. Credits and references

Sample photographs are cached locally for a reliable demonstration and were obtained from **Pexels**. Each sample object includes its photographer and original public Pexels source page; the details modal links to that credit.

Useful learning references:

- MDN: HTML forms, CSS Grid, Flexbox, media queries and the File API.
- MDN: `URL.createObjectURL()`, `URL.revokeObjectURL()`, `<dialog>` and Web Storage.
- Spring Boot documentation for the future REST API.
- MySQL documentation for future metadata persistence.
