/*
  PhotoSphere - main JavaScript file
  ----------------------------------
  This project currently runs in DEMO MODE. Sample photos come from local
  project assets, and uploaded photos come directly from the user's device.
  No upload is sent to a server and no permanent storage is claimed.
*/

// Change this one URL when a Spring Boot backend is available.
const API_BASE_URL = "http://localhost:8080";
const DEMO_MODE = true;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const VALID_CATEGORIES = ["Nature", "Architecture", "People", "Travel", "Animals"];
const FAVOURITES_STORAGE_KEY = "photosphere-favourites";
const CATEGORY_STORAGE_KEY = "photosphere-category";

// Each sample is a real Pexels photograph. sourcePage opens its public credit.
const samplePhotos = [
  {
    id: "sample-cradle-mountain",
    title: "Stillness at Cradle Mountain",
    photographer: "Isaak Cole",
    category: "Nature",
    description: "Mist lifts gently from the lake as the first light reveals Cradle Mountain. A quiet study of water, rock and morning atmosphere.",
    image: "images/alpine-lake.jpg",
    alt: "Misty sunrise over Cradle Mountain and a still lake",
    location: "Cradle Mountain, Tasmania",
    sourcePage: "https://www.pexels.com/photo/misty-sunrise-at-cradle-mountain-lake-37786590/",
    isUploaded: false
  },
  {
    id: "sample-white-geometry",
    title: "Geometry in White",
    photographer: "Matheus Natan",
    category: "Architecture",
    description: "Curved concrete panels turn a building into an abstract composition. Repeating lines and soft shadows give the white surface a sense of movement.",
    image: "images/white-architecture.jpg",
    alt: "Curved white concrete panels creating an abstract pattern",
    location: "Contemporary architecture study",
    sourcePage: "https://www.pexels.com/photo/curved-white-concrete-panel-1850269/",
    isUploaded: false
  },
  {
    id: "sample-quiet-portrait",
    title: "The Quiet Portrait",
    photographer: "Anh Nguyen",
    category: "People",
    description: "A gentle expression and soft natural light make this an intimate portrait. The simple setting keeps attention on gesture, texture and mood.",
    image: "images/portrait-light.jpg",
    alt: "Portrait of a woman in a sweater in soft natural light",
    location: "Natural-light portrait study",
    sourcePage: "https://www.pexels.com/photo/woman-standing-in-sweater-20867432/",
    isUploaded: false
  },
  {
    id: "sample-venice-afterglow",
    title: "Venice, Afterglow",
    photographer: "Domenico Adornato",
    category: "Travel",
    description: "The Grand Canal glows beneath a warm evening sky. Historic silhouettes and reflections turn a familiar travel destination into a peaceful scene.",
    image: "images/venice-canal.jpg",
    alt: "Sunset over the Grand Canal in Venice",
    location: "Venice, Italy",
    sourcePage: "https://www.pexels.com/photo/stunning-sunset-view-of-venice-grand-canal-39573165/",
    isUploaded: false
  },
  {
    id: "sample-winter-fox",
    title: "A Fox in Winter",
    photographer: "G N",
    category: "Animals",
    description: "A red fox pauses in a snowy landscape, its warm coat standing out against the cold white setting. A fleeting wildlife encounter, carefully observed.",
    image: "images/red-fox.jpg",
    alt: "Red fox standing in a snowy winter landscape",
    location: "Winter wildlife study",
    sourcePage: "https://www.pexels.com/photo/red-fox-in-snowy-winter-setting-outdoors-35986459/",
    isUploaded: false
  },
  {
    id: "sample-lavender-hour",
    title: "Lavender Hour",
    photographer: "Volker Meyer",
    category: "Nature",
    description: "Rows of lavender carry the eye towards the horizon. Violet flowers and open sky create a calm photograph about colour, rhythm and space.",
    image: "images/lavender-field.jpg",
    alt: "A field of purple lavender flowers in bloom",
    location: "Lavender field study",
    sourcePage: "https://www.pexels.com/photo/a-field-of-lavenders-in-bloom-8669165/",
    isUploaded: false
  },
  {
    id: "sample-jaipur-arches",
    title: "Arches of Jaipur",
    photographer: "urtimud.89",
    category: "Architecture",
    description: "The ornate arches of Jaipur's City Palace frame space with colour and symmetry. Details reward a closer look at Rajasthan's architectural craft.",
    image: "images/jaipur-arches.jpg",
    alt: "Ornate arches at the City Palace in Jaipur",
    location: "City Palace, Jaipur, India",
    sourcePage: "https://www.pexels.com/photo/majestic-architecture-of-city-palace-jaipur-32261804/",
    isUploaded: false
  },
  {
    id: "sample-saffron-story",
    title: "Saffron & Story",
    photographer: "Anurag Chandra",
    category: "People",
    description: "A close portrait shaped by expressive detail and a striking saffron garment. The photograph invites the viewer to pause and consider the person beyond the frame.",
    image: "images/street-portrait.jpg",
    alt: "Close portrait of a bearded man wearing a saffron garment",
    location: "Portrait study, India",
    sourcePage: "https://www.pexels.com/photo/closeup-of-a-bearded-man-in-an-orange-toga-14421389/",
    isUploaded: false
  },
  {
    id: "sample-walking-dunes",
    title: "Walking the Dunes",
    photographer: "Maria Camila Castaño",
    category: "Travel",
    description: "A lone traveller crosses a rippled sand dune. The small human figure reveals the scale of the desert and the quiet reward of going a little farther.",
    image: "images/desert-dunes.jpg",
    alt: "A person walking across a large rippled sand dune",
    location: "Desert travel study",
    sourcePage: "https://www.pexels.com/photo/a-person-walking-on-a-sand-dune-7436047/",
    isUploaded: false
  },
  {
    id: "sample-elephant-gaze",
    title: "The Elder’s Gaze",
    photographer: "Magda Ehlers",
    category: "Animals",
    description: "An intimate close-up traces the textured skin and watchful eye of an elephant. Cropping tightly turns a wildlife portrait into a study of wisdom and detail.",
    image: "images/elephant.jpg",
    alt: "Close-up of an elephant's eye and textured skin",
    location: "Wildlife portrait study",
    sourcePage: "https://www.pexels.com/photo/a-close-up-photo-of-elephants-eye-6818990/",
    isUploaded: false
  },
  {
    id: "sample-forest-falls",
    title: "Where the Forest Falls",
    photographer: "Mick Haupt",
    category: "Nature",
    description: "Water threads through a dense green forest, connecting dark rock with soft movement. The scene captures the layered sounds and textures of a woodland waterfall.",
    image: "images/forest-waterfall.jpg",
    alt: "Waterfall flowing through a lush green forest",
    location: "Forest waterfall study",
    sourcePage: "https://www.pexels.com/photo/waterfalls-in-the-middle-of-green-trees-12104361/",
    isUploaded: false
  },
  {
    id: "sample-tokyo-night",
    title: "Tokyo After Dark",
    photographer: "Tutolo Design",
    category: "Travel",
    description: "Signs, footsteps and city light fill a lively Tokyo street after sunset. The photograph holds the energy of a city that seems to begin again at night.",
    image: "images/tokyo-night.jpg",
    alt: "A busy Tokyo street illuminated by signs at night",
    location: "Tokyo, Japan",
    sourcePage: "https://www.pexels.com/photo/bustling-night-street-scene-in-tokyo-japan-30780336/",
    isUploaded: false
  }
];

// This array is the single source of truth for everything shown in the gallery.
let galleryPhotos = [...samplePhotos];
let favouriteIds = loadFavouriteIds();
let activeCategory = "All";
let showFavouritesOnly = false;
let searchTerm = "";

// Upload state is kept separately so object URLs can be released correctly.
let selectedFile = null;
let previewObjectUrl = null;
let currentPhotoId = null;
let pendingDeleteId = null;
let revealObserver = null;
let scrollUpdateRequested = false;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Cache the HTML elements that are used repeatedly.
const photoGrid = document.getElementById("photoGrid");
const galleryCount = document.getElementById("galleryCount");
const totalPhotoCount = document.getElementById("totalPhotoCount");
const activeFilterSummary = document.getElementById("activeFilterSummary");
const emptyState = document.getElementById("emptyState");
const emptyTitle = document.getElementById("emptyTitle");
const emptyMessage = document.getElementById("emptyMessage");
const gallerySearch = document.getElementById("gallerySearch");
const headerSearch = document.getElementById("headerSearch");
const clearSearchButton = document.getElementById("clearSearch");
const favouritesFilter = document.getElementById("favouritesFilter");
const favouriteFilterCount = document.getElementById("favouriteFilterCount");
const uploadForm = document.getElementById("uploadForm");
const photoTitleInput = document.getElementById("photoTitle");
const photographerInput = document.getElementById("photographerName");
const categoryInput = document.getElementById("photoCategory");
const descriptionInput = document.getElementById("photoDescription");
const photoFileInput = document.getElementById("photoFile");
const uploadDropzone = document.getElementById("uploadDropzone");
const filePrompt = document.getElementById("filePrompt");
const imagePreview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");
const previewFileName = document.getElementById("previewFileName");
const previewFileSize = document.getElementById("previewFileSize");
const uploadStatus = document.getElementById("uploadStatus");
const photoDialog = document.getElementById("photoDialog");
const confirmDialog = document.getElementById("confirmDialog");
const navPanel = document.getElementById("navPanel");
const menuToggle = document.getElementById("menuToggle");

/*
  INITIALISATION
  Event listeners are registered once. Rendering functions then update only
  the parts of the page that need to change.
*/
function initialiseWebsite() {
  restoreSavedCategory();
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  setupRevealAnimations();
  setupEventListeners();
  setupActiveNavigation();
  renderGallery();
  updateDescriptionCount();
  updateScrollEffects();
}

function setupEventListeners() {
  // Search is shared by the header field and the larger gallery field.
  gallerySearch.addEventListener("input", function () {
    applySearch(gallerySearch.value);
  });

  headerSearch.addEventListener("input", function () {
    applySearch(headerSearch.value);
  });

  document.getElementById("headerSearchForm").addEventListener("submit", function (event) {
    event.preventDefault();
    closeMobileNavigation();
    document.getElementById("gallery").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
  });

  clearSearchButton.addEventListener("click", function () {
    applySearch("");
    gallerySearch.focus();
  });

  // Category buttons use data-category instead of needing separate handlers.
  document.querySelectorAll("[data-category]").forEach(function (button) {
    button.addEventListener("click", function () {
      activeCategory = button.dataset.category;
      saveCategory();
      renderGallery();
    });
  });

  favouritesFilter.addEventListener("click", function () {
    showFavouritesOnly = !showFavouritesOnly;
    renderGallery();
  });

  document.getElementById("resetFilters").addEventListener("click", resetAllFilters);

  // One delegated listener handles details, favourites and deletion on cards.
  photoGrid.addEventListener("click", handleGalleryButtonClick);

  // Upload form events.
  uploadForm.addEventListener("submit", handlePhotoUpload);
  document.getElementById("cancelUpload").addEventListener("click", function () {
    resetUploadForm();
    showToast("Upload form cleared.");
  });
  photoFileInput.addEventListener("change", function () {
    handleSelectedFile(photoFileInput.files[0]);
  });
  document.getElementById("removeSelectedFile").addEventListener("click", function () {
    resetSelectedFile();
    clearFieldError(photoFileInput, document.getElementById("fileError"));
    photoFileInput.focus();
  });
  descriptionInput.addEventListener("input", updateDescriptionCount);

  // Clear a field's error as soon as the user starts correcting it.
  [photoTitleInput, photographerInput, categoryInput, descriptionInput].forEach(function (input) {
    input.addEventListener("input", function () {
      const errorElement = getErrorElementForInput(input);
      clearFieldError(input, errorElement);
      uploadStatus.hidden = true;
    });
  });

  setupDragAndDrop();

  // Photo details dialog.
  document.getElementById("closeDetails").addEventListener("click", closePhotoDetails);
  document.getElementById("doneDetails").addEventListener("click", closePhotoDetails);
  document.getElementById("detailFavourite").addEventListener("click", function () {
    if (currentPhotoId) toggleFavourite(currentPhotoId);
  });
  document.getElementById("detailDelete").addEventListener("click", function () {
    if (!currentPhotoId) return;
    const idToDelete = currentPhotoId;
    closePhotoDetails();
    openDeleteConfirmation(idToDelete);
  });
  photoDialog.addEventListener("click", function (event) {
    // A click on the native dialog backdrop targets the dialog itself.
    if (event.target === photoDialog) closePhotoDetails();
  });
  photoDialog.addEventListener("close", function () {
    document.body.classList.remove("modal-open");
    currentPhotoId = null;
  });

  // Delete confirmation dialog.
  document.getElementById("cancelDelete").addEventListener("click", closeDeleteConfirmation);
  document.getElementById("confirmDelete").addEventListener("click", deletePendingPhoto);
  confirmDialog.addEventListener("click", function (event) {
    if (event.target === confirmDialog) closeDeleteConfirmation();
  });
  confirmDialog.addEventListener("close", function () {
    document.body.classList.remove("modal-open");
    pendingDeleteId = null;
  });

  // Mobile navigation and backend status check.
  menuToggle.addEventListener("click", toggleMobileNavigation);
  navPanel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileNavigation);
  });
  document.addEventListener("click", function (event) {
    if (navPanel.classList.contains("is-open") && !document.getElementById("siteHeader").contains(event.target)) {
      closeMobileNavigation();
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMobileNavigation();
  });
  document.getElementById("checkBackend").addEventListener("click", checkBackendConnection);

  // Scroll effects use requestAnimationFrame to avoid unnecessary repeated work.
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate);

  // Object URLs use browser memory. Release them when leaving the page.
  window.addEventListener("beforeunload", releaseAllObjectUrls);

  // A file can have an image extension but still contain invalid image data.
  previewImage.addEventListener("error", function () {
    if (!previewObjectUrl) return;
    resetSelectedFile();
    setFieldError(photoFileInput, document.getElementById("fileError"), "This file could not be read as an image. Please choose another file.");
  });
}

/*
  GALLERY RENDERING AND FILTERING
*/
function renderGallery() {
  const visiblePhotos = getFilteredPhotos();

  // map() creates one card per object; join() combines the HTML strings.
  photoGrid.innerHTML = visiblePhotos.map(createPhotoCard).join("");
  photoGrid.hidden = visiblePhotos.length === 0;
  emptyState.hidden = visiblePhotos.length !== 0;

  totalPhotoCount.textContent = galleryPhotos.length;
  galleryCount.textContent = visiblePhotos.length === galleryPhotos.length
    ? `Showing all ${visiblePhotos.length} ${visiblePhotos.length === 1 ? "photograph" : "photographs"}`
    : `Showing ${visiblePhotos.length} of ${galleryPhotos.length} photographs`;

  updateFilterSummary();
  updateFilterButtons();
  updateCategoryCounts();
  updateEmptyState();
  clearSearchButton.hidden = searchTerm.length === 0;
  observeRevealElements(photoGrid);
}

function getFilteredPhotos() {
  const normalisedSearch = searchTerm.trim().toLowerCase();

  return galleryPhotos.filter(function (photo) {
    const matchesCategory = activeCategory === "All" || photo.category === activeCategory;
    const matchesFavourite = !showFavouritesOnly || favouriteIds.has(photo.id);
    const searchableText = `${photo.title} ${photo.photographer} ${photo.category}`.toLowerCase();
    const matchesSearch = normalisedSearch === "" || searchableText.includes(normalisedSearch);
    return matchesCategory && matchesFavourite && matchesSearch;
  });
}

function createPhotoCard(photo, index) {
  const isFavourite = favouriteIds.has(photo.id);
  const uploadedBadge = photo.isUploaded ? '<span class="uploaded-badge">Your upload</span>' : "";
  const deleteButton = photo.isUploaded
    ? `<button class="delete-button" type="button" data-action="delete" aria-label="Delete ${escapeHtml(photo.title)}" title="Delete uploaded photo">${iconMarkup("trash")}</button>`
    : "";
  const description = photo.description || "A personal photograph shared in the PhotoSphere browser demo.";

  return `
    <article class="photo-card reveal" data-photo-id="${escapeHtml(photo.id)}" style="--reveal-delay: ${Math.min(index * 45, 225)}ms">
      <div class="photo-image-area">
        <button class="photo-image-button" type="button" data-action="details" aria-label="View details for ${escapeHtml(photo.title)}">
          <img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt)}" loading="lazy" decoding="async" />
        </button>
        <span class="category-badge">${escapeHtml(photo.category)}</span>
        ${uploadedBadge}
        <button
          class="favourite-button ${isFavourite ? "is-favourite" : ""}"
          type="button"
          data-action="favourite"
          data-photo-id="${escapeHtml(photo.id)}"
          aria-label="${isFavourite ? "Remove" : "Add"} ${escapeHtml(photo.title)} ${isFavourite ? "from" : "to"} favourites"
          aria-pressed="${isFavourite}"
          title="${isFavourite ? "Remove from favourites" : "Add to favourites"}"
        >${iconMarkup("heart")}</button>
      </div>
      <div class="photo-card-content">
        <h3 title="${escapeHtml(photo.title)}">${escapeHtml(photo.title)}</h3>
        <p class="photographer-line">
          <span class="photographer-avatar" aria-hidden="true">${escapeHtml(getInitials(photo.photographer))}</span>
          By ${escapeHtml(photo.photographer)}
        </p>
        <p class="photo-description">${escapeHtml(description)}</p>
        <div class="photo-card-footer">
          <button class="view-details-button" type="button" data-action="details">
            View Details ${iconMarkup("arrow")}
          </button>
          ${deleteButton}
        </div>
      </div>
    </article>`;
}

function handleGalleryButtonClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const card = button.closest("[data-photo-id]");
  if (!card) return;
  const photoId = card.dataset.photoId;

  if (button.dataset.action === "details") openPhotoDetails(photoId);
  if (button.dataset.action === "favourite") toggleFavourite(photoId);
  if (button.dataset.action === "delete") openDeleteConfirmation(photoId);
}

function applySearch(value) {
  searchTerm = value;
  gallerySearch.value = value;
  headerSearch.value = value;
  renderGallery();
}

function resetAllFilters() {
  searchTerm = "";
  gallerySearch.value = "";
  headerSearch.value = "";
  activeCategory = "All";
  showFavouritesOnly = false;
  saveCategory();
  renderGallery();
}

function updateFilterButtons() {
  document.querySelectorAll("[data-category]").forEach(function (button) {
    const isActive = button.dataset.category === activeCategory;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive);
  });
  favouritesFilter.classList.toggle("active", showFavouritesOnly);
  favouritesFilter.setAttribute("aria-pressed", showFavouritesOnly);
}

function updateCategoryCounts() {
  document.querySelectorAll("[data-count-for]").forEach(function (countElement) {
    const category = countElement.dataset.countFor;
    const count = category === "All"
      ? galleryPhotos.length
      : galleryPhotos.filter(function (photo) { return photo.category === category; }).length;
    countElement.textContent = count;
  });

  const currentFavouriteCount = galleryPhotos.filter(function (photo) {
    return favouriteIds.has(photo.id);
  }).length;
  favouriteFilterCount.textContent = currentFavouriteCount;
}

function updateFilterSummary() {
  const summaryParts = [];
  if (searchTerm.trim()) summaryParts.push(`Search: “${searchTerm.trim()}”`);
  if (activeCategory !== "All") summaryParts.push(activeCategory);
  if (showFavouritesOnly) summaryParts.push("Favourites only");
  activeFilterSummary.textContent = summaryParts.length ? summaryParts.join(" · ") : "The complete collection";
}

function updateEmptyState() {
  if (showFavouritesOnly && favouriteIds.size === 0) {
    emptyTitle.textContent = "No favourites yet";
    emptyMessage.textContent = "Select the heart on any photograph to build your personal favourites collection.";
  } else if (showFavouritesOnly) {
    emptyTitle.textContent = "No favourites match";
    emptyMessage.textContent = "None of your favourite photographs match the current category or search. Try clearing the filters.";
  } else {
    emptyTitle.textContent = "No photographs found";
    emptyMessage.textContent = "Try a different title, photographer or category, or clear the filters to see the complete collection.";
  }
}

/*
  FAVOURITES AND LOCAL STORAGE
  Only small ID strings are saved. Large image data is never placed in
  localStorage. Uploaded blob URLs are meaningful only in the current page.
*/
function toggleFavourite(photoId) {
  const photo = findPhotoById(photoId);
  if (!photo) return;

  let message;
  if (favouriteIds.has(photoId)) {
    favouriteIds.delete(photoId);
    message = `Removed “${photo.title}” from favourites.`;
  } else {
    favouriteIds.add(photoId);
    message = `Added “${photo.title}” to favourites.`;
  }

  saveFavouriteIds();

  if (showFavouritesOnly) {
    renderGallery();
  } else {
    updateCardFavouriteButtons(photoId);
    updateCategoryCounts();
  }

  if (currentPhotoId === photoId) updateDetailFavouriteButton(photo);
  showToast(message);
}

function updateCardFavouriteButtons(photoId) {
  const photo = findPhotoById(photoId);
  if (!photo) return;
  const isFavourite = favouriteIds.has(photoId);

  photoGrid.querySelectorAll('[data-action="favourite"]').forEach(function (button) {
    if (button.dataset.photoId !== photoId) return;
    button.classList.toggle("is-favourite", isFavourite);
    button.setAttribute("aria-pressed", isFavourite);
    button.setAttribute("aria-label", `${isFavourite ? "Remove" : "Add"} ${photo.title} ${isFavourite ? "from" : "to"} favourites`);
    button.title = isFavourite ? "Remove from favourites" : "Add to favourites";
  });
}

function loadFavouriteIds() {
  try {
    const savedValue = JSON.parse(localStorage.getItem(FAVOURITES_STORAGE_KEY) || "[]");
    if (!Array.isArray(savedValue)) return new Set();
    // After a refresh only sample IDs are valid; local upload URLs have expired.
    const sampleIds = new Set(samplePhotos.map(function (photo) { return photo.id; }));
    return new Set(savedValue.filter(function (id) { return sampleIds.has(id); }));
  } catch (error) {
    console.warn("Favourites could not be read from localStorage.", error);
    return new Set();
  }
}

function saveFavouriteIds() {
  try {
    localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify([...favouriteIds]));
  } catch (error) {
    console.warn("Favourites could not be saved. They will still work in this session.", error);
  }
}

function restoreSavedCategory() {
  try {
    const savedCategory = localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (savedCategory === "All" || VALID_CATEGORIES.includes(savedCategory)) {
      activeCategory = savedCategory;
    }
  } catch (error) {
    activeCategory = "All";
  }
}

function saveCategory() {
  try {
    localStorage.setItem(CATEGORY_STORAGE_KEY, activeCategory);
  } catch (error) {
    console.warn("The selected category could not be saved.", error);
  }
}

/*
  LOCAL IMAGE SELECTION AND VALIDATION
*/
function handleSelectedFile(file) {
  if (!file) return;
  clearFieldError(photoFileInput, document.getElementById("fileError"));
  uploadStatus.hidden = true;

  const extension = file.name.includes(".") ? file.name.split(".").pop().toLowerCase() : "";
  const hasValidType = ALLOWED_IMAGE_TYPES.includes(file.type) || (file.type === "" && ALLOWED_EXTENSIONS.includes(extension));

  if (!hasValidType) {
    rejectSelectedFile("Please choose a JPG, JPEG, PNG or WebP image.");
    return;
  }
  if (file.size === 0) {
    rejectSelectedFile("This file is empty. Please choose a valid image.");
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    rejectSelectedFile("This image is larger than 5 MB. Please choose a smaller file.");
    return;
  }

  // Revoke the previous preview before replacing it to avoid memory leaks.
  if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);

  selectedFile = file;
  previewObjectUrl = URL.createObjectURL(file);
  previewImage.src = previewObjectUrl;
  previewFileName.textContent = file.name;
  previewFileSize.textContent = `${formatFileSize(file.size)} · Ready for this browser session`;
  filePrompt.hidden = true;
  imagePreview.hidden = false;
}

function rejectSelectedFile(message) {
  resetSelectedFile();
  setFieldError(photoFileInput, document.getElementById("fileError"), message);
  showToast(message, "error");
}

function resetSelectedFile() {
  if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
  previewObjectUrl = null;
  selectedFile = null;
  photoFileInput.value = "";
  previewImage.removeAttribute("src");
  previewFileName.textContent = "";
  previewFileSize.textContent = "";
  imagePreview.hidden = true;
  filePrompt.hidden = false;
}

function setupDragAndDrop() {
  ["dragenter", "dragover"].forEach(function (eventName) {
    uploadDropzone.addEventListener(eventName, function (event) {
      event.preventDefault();
      uploadDropzone.classList.add("is-dragging");
    });
  });

  uploadDropzone.addEventListener("dragleave", function (event) {
    if (!uploadDropzone.contains(event.relatedTarget)) {
      uploadDropzone.classList.remove("is-dragging");
    }
  });

  uploadDropzone.addEventListener("drop", function (event) {
    event.preventDefault();
    uploadDropzone.classList.remove("is-dragging");
    const droppedFile = event.dataTransfer.files[0];
    handleSelectedFile(droppedFile);
  });
}

function validateUploadForm() {
  clearUploadErrors();
  let firstInvalidInput = null;

  if (photoTitleInput.value.trim() === "") {
    setFieldError(photoTitleInput, document.getElementById("titleError"), "Please enter a photo title.");
    firstInvalidInput = firstInvalidInput || photoTitleInput;
  }

  if (photographerInput.value.trim() === "") {
    setFieldError(photographerInput, document.getElementById("photographerError"), "Please enter the photographer's name.");
    firstInvalidInput = firstInvalidInput || photographerInput;
  }

  if (!VALID_CATEGORIES.includes(categoryInput.value)) {
    setFieldError(categoryInput, document.getElementById("categoryError"), "Please select a valid category.");
    firstInvalidInput = firstInvalidInput || categoryInput;
  }

  if (descriptionInput.value.length > 240) {
    setFieldError(descriptionInput, document.getElementById("descriptionError"), "Please keep the description under 240 characters.");
    firstInvalidInput = firstInvalidInput || descriptionInput;
  }

  if (!selectedFile) {
    setFieldError(photoFileInput, document.getElementById("fileError"), "Please choose an image from your computer.");
    firstInvalidInput = firstInvalidInput || photoFileInput;
  }

  if (firstInvalidInput) {
    firstInvalidInput.focus();
    return false;
  }
  return true;
}

function handlePhotoUpload(event) {
  event.preventDefault();
  uploadStatus.hidden = true;

  if (!validateUploadForm()) return;

  // Server mode is intentionally not faked. The initial version uses demo mode.
  if (!DEMO_MODE) {
    uploadStatus.textContent = "Server upload is not implemented in this frontend-only version. Enable DEMO_MODE or connect the Spring Boot endpoint described in the README.";
    uploadStatus.hidden = false;
    showToast("No server upload was made.", "error");
    return;
  }

  // Transfer ownership of the preview URL to the new gallery object.
  // It will now remain alive until this upload is deleted or the page closes.
  const uploadedPhoto = {
    id: `upload-${Date.now()}`,
    title: photoTitleInput.value.trim(),
    photographer: photographerInput.value.trim(),
    category: categoryInput.value,
    description: descriptionInput.value.trim() || "A personal photograph shared in the PhotoSphere browser demo.",
    image: previewObjectUrl,
    alt: `${photoTitleInput.value.trim()} — uploaded by ${photographerInput.value.trim()}`,
    location: "Your local device",
    sourcePage: null,
    fileName: selectedFile.name,
    fileSize: selectedFile.size,
    uploadedAt: new Date().toISOString(),
    isUploaded: true
  };

  galleryPhotos.unshift(uploadedPhoto);
  previewObjectUrl = null; // Prevent resetUploadForm() from revoking the gallery image.
  selectedFile = null;

  resetUploadForm();
  resetAllFilters(); // Ensures the new upload is immediately visible.

  uploadStatus.innerHTML = '<strong>Photo added to this browser session.</strong> It was not sent to a server. <a href="#gallery">View it in the gallery</a>.';
  uploadStatus.hidden = false;
  showToast(`“${uploadedPhoto.title}” was added to the gallery.`);
}

function resetUploadForm() {
  uploadForm.reset();
  resetSelectedFile();
  clearUploadErrors();
  updateDescriptionCount();
  uploadStatus.hidden = true;
}

function clearUploadErrors() {
  [photoTitleInput, photographerInput, categoryInput, descriptionInput, photoFileInput].forEach(function (input) {
    clearFieldError(input, getErrorElementForInput(input));
  });
}

function getErrorElementForInput(input) {
  const errorIds = {
    photoTitle: "titleError",
    photographerName: "photographerError",
    photoCategory: "categoryError",
    photoDescription: "descriptionError",
    photoFile: "fileError"
  };
  return document.getElementById(errorIds[input.id]);
}

function setFieldError(input, errorElement, message) {
  input.setAttribute("aria-invalid", "true");
  errorElement.textContent = message;
}

function clearFieldError(input, errorElement) {
  if (!errorElement) return;
  input.removeAttribute("aria-invalid");
  errorElement.textContent = "";
}

function updateDescriptionCount() {
  document.getElementById("descriptionCount").textContent = `${descriptionInput.value.length} / 240`;
}

/*
  PHOTO DETAILS MODAL
*/
function openPhotoDetails(photoId) {
  const photo = findPhotoById(photoId);
  if (!photo) return;
  currentPhotoId = photoId;

  const detailImage = document.getElementById("detailImage");
  detailImage.src = photo.image;
  detailImage.alt = photo.alt;
  document.getElementById("detailTitle").textContent = photo.title;
  document.getElementById("detailPhotographer").textContent = photo.photographer;
  document.getElementById("detailCategory").textContent = photo.category;
  document.getElementById("detailDescription").textContent = photo.description || "No description was provided for this photograph.";
  document.getElementById("detailLocation").textContent = photo.location;
  document.getElementById("detailCollection").textContent = photo.isUploaded ? "Local browser session" : "PhotoSphere sample collection";
  document.getElementById("detailUploadedBadge").hidden = !photo.isUploaded;
  document.getElementById("detailDelete").hidden = !photo.isUploaded;
  document.getElementById("detailFileRow").hidden = !photo.isUploaded;

  if (photo.isUploaded) {
    document.getElementById("detailFileName").textContent = `${photo.fileName} (${formatFileSize(photo.fileSize)})`;
  }

  const sourceLink = document.getElementById("detailSource");
  sourceLink.hidden = !photo.sourcePage;
  if (photo.sourcePage) sourceLink.href = photo.sourcePage;

  updateDetailFavouriteButton(photo);
  photoDialog.showModal();
  document.body.classList.add("modal-open");
}

function closePhotoDetails() {
  if (photoDialog.open) photoDialog.close();
}

function updateDetailFavouriteButton(photo) {
  const button = document.getElementById("detailFavourite");
  const isFavourite = favouriteIds.has(photo.id);
  button.classList.toggle("is-favourite", isFavourite);
  button.setAttribute("aria-pressed", isFavourite);
  button.querySelector("span").textContent = isFavourite ? "Remove from Favourites" : "Add to Favourites";
}

/*
  DELETE UPLOADED PHOTOS
*/
function openDeleteConfirmation(photoId) {
  const photo = findPhotoById(photoId);
  if (!photo || !photo.isUploaded) {
    showToast("Only your own uploaded photos can be deleted.", "error");
    return;
  }

  pendingDeleteId = photoId;
  document.getElementById("confirmMessage").textContent = `“${photo.title}” will be removed from the current gallery. This cannot be undone.`;
  confirmDialog.showModal();
  document.body.classList.add("modal-open");
}

function closeDeleteConfirmation() {
  if (confirmDialog.open) confirmDialog.close();
}

function deletePendingPhoto() {
  const photo = findPhotoById(pendingDeleteId);
  if (!photo || !photo.isUploaded) {
    closeDeleteConfirmation();
    showToast("This upload is no longer available.", "error");
    return;
  }

  galleryPhotos = galleryPhotos.filter(function (item) {
    return item.id !== pendingDeleteId;
  });
  favouriteIds.delete(photo.id);
  saveFavouriteIds();

  // The deleted photograph no longer needs its browser-created object URL.
  if (photo.image.startsWith("blob:")) URL.revokeObjectURL(photo.image);

  closeDeleteConfirmation();
  renderGallery();
  showToast(`“${photo.title}” was deleted from this session.`);
}

function releaseAllObjectUrls() {
  if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
  galleryPhotos.forEach(function (photo) {
    if (photo.isUploaded && photo.image.startsWith("blob:")) {
      URL.revokeObjectURL(photo.image);
    }
  });
}

/*
  FUTURE BACKEND CONNECTION CHECK
  This performs an honest GET request only when the button is clicked.
  It does not pretend to upload or save anything to a server.
*/
async function checkBackendConnection() {
  const button = document.getElementById("checkBackend");
  const status = document.getElementById("backendStatus");
  const controller = new AbortController();
  const timeout = setTimeout(function () { controller.abort(); }, 4000);

  button.disabled = true;
  button.setAttribute("aria-busy", "true");
  status.className = "backend-status";
  status.textContent = `Trying ${API_BASE_URL}/api/photos …`;

  try {
    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/photos`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    status.className = "backend-status success";
    status.textContent = `The API responded with HTTP ${response.status}. Demo mode is still enabled, so no server data was changed or loaded.`;
  } catch (error) {
    status.className = "backend-status error";
    status.textContent = "Backend not connected. Start the future Spring Boot server on the configured URL and enable CORS. PhotoSphere will continue working in browser-only demo mode.";
  } finally {
    clearTimeout(timeout);
    button.disabled = false;
    button.removeAttribute("aria-busy");
  }
}

/*
  NAVIGATION, SCROLL REVEALS AND SMALL UI HELPERS
*/
function toggleMobileNavigation() {
  const willOpen = !navPanel.classList.contains("is-open");
  navPanel.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-expanded", willOpen);
  menuToggle.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
  document.getElementById("menuIconUse").setAttribute("href", willOpen ? "#icon-close" : "#icon-menu");
}

function closeMobileNavigation() {
  navPanel.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  document.getElementById("menuIconUse").setAttribute("href", "#icon-menu");
}

function setupRevealAnimations() {
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (element) {
      element.classList.add("is-visible");
    });
    return;
  }

  revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -35px" });

  observeRevealElements(document);
}

function observeRevealElements(parent) {
  const elements = parent.querySelectorAll(".reveal:not(.is-visible)");
  elements.forEach(function (element) {
    if (revealObserver) revealObserver.observe(element);
    else element.classList.add("is-visible");
  });
}

function setupActiveNavigation() {
  if (!("IntersectionObserver" in window)) return;
  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-link").forEach(function (link) {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-25% 0px -65%", threshold: 0 });

  ["home", "gallery", "upload", "about"].forEach(function (sectionId) {
    sectionObserver.observe(document.getElementById(sectionId));
  });
}

function requestScrollUpdate() {
  if (scrollUpdateRequested) return;
  scrollUpdateRequested = true;
  window.requestAnimationFrame(function () {
    updateScrollEffects();
    scrollUpdateRequested = false;
  });
}

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? Math.min(scrollTop / scrollableHeight, 1) : 0;
  document.getElementById("scrollProgress").style.transform = `scaleX(${progress})`;
  document.getElementById("siteHeader").classList.toggle("scrolled", scrollTop > 20);

  if (!reducedMotion.matches && scrollTop < window.innerHeight * 1.2) {
    document.getElementById("heroCollage").style.setProperty("--hero-shift", `${Math.min(scrollTop * 0.07, 55)}px`);
  }
}

function showToast(message, type = "success") {
  const toastRegion = document.getElementById("toastRegion");
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "error" : ""}`;
  toast.innerHTML = iconMarkup(type === "error" ? "info" : "check");
  const text = document.createElement("span");
  text.textContent = message;
  toast.appendChild(text);
  toastRegion.appendChild(toast);

  // Keep at most three notifications so the screen does not become crowded.
  while (toastRegion.children.length > 3) toastRegion.firstElementChild.remove();
  window.requestAnimationFrame(function () { toast.classList.add("show"); });
  window.setTimeout(function () {
    toast.classList.remove("show");
    window.setTimeout(function () { toast.remove(); }, 230);
  }, 3600);
}

function findPhotoById(photoId) {
  return galleryPhotos.find(function (photo) { return photo.id === photoId; });
}

function getInitials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(function (part) {
    return part.charAt(0).toUpperCase();
  }).join("");
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function iconMarkup(iconName) {
  return `<svg class="icon" aria-hidden="true"><use href="#icon-${iconName}"></use></svg>`;
}

// Escape user-entered text before placing it in an HTML template string.
function escapeHtml(value) {
  const characters = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return String(value).replace(/[&<>"']/g, function (character) { return characters[character]; });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialiseWebsite);
} else {
  initialiseWebsite();
}
