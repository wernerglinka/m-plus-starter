/**
 * Header Component
 * Handles mobile menu toggle, header search, and top message functionality
 */

/** localStorage key for dismissed top message */
const TOP_MESSAGE_STORAGE_KEY = 'topMessageDismissed';

/** Expiration in days for the dismissal record */
const TOP_MESSAGE_TTL_DAYS = 7;

/**
 * Initialize header functionality when DOM loads
 */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderSearch();
  initTopMessage();
});

/**
 * Initialize header search form
 * Handles search overlay toggle, form submission, and keyboard shortcuts
 */
function initHeaderSearch() {
  const searchToggle = document.querySelector('.search-icon-toggle');
  const searchOverlay = document.querySelector('.header-search-overlay');
  const searchForm = document.querySelector('.header-search-form');
  const searchInput = document.querySelector('#header-search-input');

  if (!searchToggle || !searchOverlay || !searchForm || !searchInput) {
    return;
  }

  // Toggle search overlay visibility
  searchToggle.addEventListener('click', () => {
    const isActive = searchOverlay.classList.contains('active');

    if (isActive) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  // Open search overlay
  function openSearch() {
    searchOverlay.classList.add('active');
    searchToggle.classList.add('search-active');
    searchToggle.setAttribute('aria-expanded', 'true');

    // Focus input after animation completes
    setTimeout(() => {
      searchInput.focus();
    }, 300);
  }

  // Close search overlay
  function closeSearch() {
    searchOverlay.classList.remove('active');
    searchToggle.classList.remove('search-active');
    searchToggle.setAttribute('aria-expanded', 'false');
    searchInput.value = '';
  }

  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideOverlay = searchOverlay.contains(e.target);
    const isClickOnToggle = searchToggle.contains(e.target);

    if (!isClickInsideOverlay && !isClickOnToggle && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  // Close search on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  // Handle form submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();

    if (query.length === 0) {
      // Focus input if empty
      searchInput.focus();
      return;
    }

    // Redirect to search page with query parameter
    const searchURL = `/search/?q=${encodeURIComponent(query)}`;
    window.location.href = searchURL;
  });

  // Handle keyboard shortcut (Cmd/Ctrl + K) to open search
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (!searchOverlay.classList.contains('active')) {
        openSearch();
      }
    }
  });
}

/**
 * Initialize top message bar
 * Handles dismiss button and localStorage persistence
 */
function initTopMessage() {
  const headerWrapper = document.querySelector('.header-wrapper');
  const topMessage = document.querySelector('.top-message');
  const closeButton = document.querySelector('.top-message-close');

  if (!headerWrapper || !topMessage) {
    return;
  }

  // Check if message was previously dismissed
  const messageId = getMessageId();
  const isDismissed = getDismissedMessageId() === messageId;

  if (isDismissed) {
    // Hide immediately without animation
    headerWrapper.classList.add('is-dismissed');
    topMessage.style.display = 'none';
    return;
  }

  // Handle close button click
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      dismissTopMessage(headerWrapper, messageId);
    });
  }
}

/**
 * Dismiss the top message with animation
 * @param {HTMLElement} headerWrapper - The header wrapper element
 * @param {string} messageId - Unique identifier for the message
 */
function dismissTopMessage(headerWrapper, messageId) {
  headerWrapper.classList.add('is-dismissed');

  // Store dismissal in localStorage with expiration
  setDismissedMessageId(messageId, TOP_MESSAGE_TTL_DAYS);
}

/**
 * Generate a simple hash from the message text for identification
 * This allows the message to reappear when content changes
 * @returns {string} Hash of the message content
 */
function getMessageId() {
  const topMessage = document.querySelector('.top-message-text');
  if (!topMessage) {
    return 'default';
  }

  const text = topMessage.textContent.trim();
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}

/**
 * Store the dismissed message id with a TTL.
 * @param {string} id - Message id (content hash) being dismissed
 * @param {number} days - Days until the dismissal expires
 */
function setDismissedMessageId(id, days) {
  const expires = Date.now() + days * 24 * 60 * 60 * 1000;
  localStorage.setItem(TOP_MESSAGE_STORAGE_KEY, JSON.stringify({ id, expires }));
}

/**
 * Read the currently dismissed message id, honoring expiration.
 * @returns {string|null} Dismissed id, or null if missing/expired/unreadable
 */
function getDismissedMessageId() {
  try {
    const raw = localStorage.getItem(TOP_MESSAGE_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const { id, expires } = JSON.parse(raw);
    if (Date.now() > expires) {
      localStorage.removeItem(TOP_MESSAGE_STORAGE_KEY);
      return null;
    }
    return id;
  } catch {
    return null;
  }
}
