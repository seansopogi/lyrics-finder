/* ===========================
   LYRICS FINDER - JAVASCRIPT
   =========================== */

// ==========================================
// API CONFIGURATION
// ==========================================

/**
 * LRCLIB API Configuration
 * Free lyrics API - No authentication required
 * Base URL: https://lrclib.net/api
 */
const API_CONFIG = {
  BASE_URL: 'https://lrclib.net/api',
  ENDPOINTS: {
    SEARCH: '/search',
    GET: '/get'
  }
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Validates user input and checks if it's not empty
 * @param {string} input - User input to validate
 * @returns {boolean} - True if valid, false if empty
 */
function isValidInput(input) {
  return input.trim().length > 0;
}

/**
 * Displays error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
  const errorContainer = document.getElementById('errorContainer');
  errorContainer.textContent = message;
  errorContainer.classList.remove('error-hidden');

  // Auto-hide error after 5 seconds
  setTimeout(() => {
    errorContainer.classList.add('error-hidden');
  }, 5000);
}

/**
 * Shows loading spinner and message
 */
function showLoading() {
  document.getElementById('loadingMessage').classList.remove('loading-hidden');
  document.getElementById('searchBtn').disabled = true;
}

/**
 * Hides loading spinner and message
 */
function hideLoading() {
  document.getElementById('loadingMessage').classList.add('loading-hidden');
  document.getElementById('searchBtn').disabled = false;
}

/**
 * Hides error container
 */
function clearError() {
  document.getElementById('errorContainer').classList.add('error-hidden');
}

// ==========================================
// API FUNCTIONS
// ==========================================

/**
 * Searches for songs using LRCLIB API
 * API Endpoint: /search
 * @param {string} searchQuery - Song name or artist to search
 * @returns {Promise<Array>} - Array of song results
 */
async function searchSongs(searchQuery) {
  try {
    // Construct search URL with query parameter
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH}?q=${encodeURIComponent(
      searchQuery
    )}`;

    console.log('Searching for songs:', url);

    // Make API call using fetch
    const response = await fetch(url);

    // Handle API response errors
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Parse JSON response
    const data = await response.json();
    console.log('Search results:', data);

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves full lyrics for a specific song
 * API Endpoint: /get
 * @param {number} id - Song ID from search results
 * @returns {Promise<Object>} - Song data with full lyrics
 */
async function getLyricsById(id) {
  try {
    // Construct URL to get specific song lyrics
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET}/${id}`;

    console.log('Fetching lyrics for ID:', id);

    // Make API call
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch lyrics');
    }

    // Parse and return song data with lyrics
    const data = await response.json();
    console.log('Lyrics data:', data);

    return data;
  } catch (error) {
    throw error;
  }
}

// ==========================================
// DOM MANIPULATION FUNCTIONS
// ==========================================

/**
 * Displays search results as clickable cards
 * @param {Array} results - Array of song results from API
 */
function displaySearchResults(results) {
  const resultsList = document.getElementById('resultsList');
  resultsList.innerHTML = '';

  if (results.length === 0) {
    resultsList.innerHTML = '<p class="no-results">No songs found. Try a different search.</p>';
    document.getElementById('resultsContainer').classList.remove('hidden');
    return;
  }

  // Create card for each search result
  results.forEach((song) => {
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';

    resultCard.innerHTML = `
      <div class="result-title">${song.trackName}</div>
      <div class="result-artist">By ${song.artistName}</div>
      <div class="result-album">${song.albumName || 'Unknown Album'}</div>
    `;

    // Click to view full lyrics
    resultCard.addEventListener('click', () => {
      viewLyrics(song);
    });

    resultsList.appendChild(resultCard);
  });

  // Show results container
  document.getElementById('resultsContainer').classList.remove('hidden');
}

/**
 * Displays full lyrics for a selected song
 * @param {Object} song - Song object with lyrics data
 */
function displayLyrics(song) {
  const lyricsContainer = document.getElementById('lyricsContainer');
  const lyricsContent = document.getElementById('lyricsContent');

  // Update song information
  document.getElementById('songTitle').textContent = song.trackName;
  document.getElementById('songArtist').textContent = `By ${song.artistName}`;
  document.getElementById('songAlbum').textContent = song.albumName || 'Unknown Album';

  // Display lyrics or message if not available
  if (song.plainLyrics) {
    lyricsContent.textContent = song.plainLyrics;
  } else {
    lyricsContent.innerHTML = '<div class="no-lyrics">Lyrics not available for this song.</div>';
  }

  // Update favorite button state
  const isFavorited = isSongFavorited(song.trackName, song.artistName);
  const favoriteBtn = document.getElementById('addFavoriteBtn');
  if (isFavorited) {
    favoriteBtn.textContent = '✓ Already Favorited';
    favoriteBtn.classList.add('favorited');
  } else {
    favoriteBtn.textContent = '⭐ Add to Favorites';
    favoriteBtn.classList.remove('favorited');
  }

  // Show lyrics container and hide results
  document.getElementById('resultsContainer').classList.add('hidden');
  lyricsContainer.classList.remove('hidden');
}

/**
 * Clears lyrics display from DOM
 */
function clearLyricsDisplay() {
  document.getElementById('lyricsContainer').classList.add('hidden');
}

/**
 * Checks if a song is already in favorites
 * @param {string} trackName - Song title
 * @param {string} artistName - Artist name
 * @returns {boolean} - True if favorited, false otherwise
 */
function isSongFavorited(trackName, artistName) {
  const favorites = JSON.parse(localStorage.getItem('favoritesSongs')) || [];
  return favorites.some(
    (fav) =>
      fav.trackName.toLowerCase() === trackName.toLowerCase() &&
      fav.artistName.toLowerCase() === artistName.toLowerCase()
  );
}

/**
 * Adds song to favorites using localStorage
 * @param {Object} song - Song object to add
 */
function addToFavorites(song) {
  let favorites = JSON.parse(localStorage.getItem('favoritesSongs')) || [];

  // Check if already favorited
  if (isSongFavorited(song.trackName, song.artistName)) {
    showError('This song is already in your favorites!');
    return;
  }

  // Add to favorites
  favorites.push({
    trackName: song.trackName,
    artistName: song.artistName,
    albumName: song.albumName
  });

  localStorage.setItem('favoritesSongs', JSON.stringify(favorites));
  updateFavoritesList();

  // Update button state
  const favoriteBtn = document.getElementById('addFavoriteBtn');
  favoriteBtn.textContent = '✓ Already Favorited';
  favoriteBtn.classList.add('favorited');

  showError('Song added to favorites!');
}

/**
 * Removes song from favorites
 * @param {string} trackName - Song title
 * @param {string} artistName - Artist name
 */
function removeFromFavorites(trackName, artistName) {
  let favorites = JSON.parse(localStorage.getItem('favoritesSongs')) || [];
  favorites = favorites.filter(
    (fav) =>
      !(
        fav.trackName.toLowerCase() === trackName.toLowerCase() &&
        fav.artistName.toLowerCase() === artistName.toLowerCase()
      )
  );

  localStorage.setItem('favoritesSongs', JSON.stringify(favorites));
  updateFavoritesList();
}

/**
 * Updates favorites list display in DOM
 * Shows saved favorite songs as clickable cards
 */
function updateFavoritesList() {
  const favorites = JSON.parse(localStorage.getItem('favoritesSongs')) || [];
  const favoritesList = document.getElementById('favoritesList');
  const favoritesSection = document.getElementById('favoritesSection');

  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesSection.classList.add('hidden');
    return;
  }

  favoritesSection.classList.remove('hidden');

  // Create card for each favorite song
  favorites.forEach((fav) => {
    const favoriteCard = document.createElement('div');
    favoriteCard.className = 'favorite-item';

    favoriteCard.innerHTML = `
      <div class="favorite-title">${fav.trackName}</div>
      <div class="favorite-artist">${fav.artistName}</div>
      <button class="remove-favorite" aria-label="Remove ${fav.trackName}">✕</button>
    `;

    // Click to search and view this song
    favoriteCard.addEventListener('click', (e) => {
      if (!e.target.classList.contains('remove-favorite')) {
        searchAndViewSong(fav.trackName, fav.artistName);
      }
    });

    // Remove favorite button
    favoriteCard.querySelector('.remove-favorite').addEventListener('click', (e) => {
      e.stopPropagation();
      removeFromFavorites(fav.trackName, fav.artistName);
    });

    favoritesList.appendChild(favoriteCard);
  });
}

// ==========================================
// MAIN SEARCH AND VIEW FUNCTIONS
// ==========================================

/**
 * Stores current song for favorite button
 */
let currentSong = null;

/**
 * Searches for a song and displays full lyrics
 * @param {string} trackName - Song title
 * @param {string} artistName - Artist name
 */
async function searchAndViewSong(trackName, artistName) {
  try {
    clearError();
    showLoading();

    const query = `${trackName} ${artistName}`;
    const results = await searchSongs(query);

    if (results.length === 0) {
      hideLoading();
      showError('Song not found. Please try another search.');
      return;
    }

    // Get the first result with full lyrics
    const song = results[0];
    const fullSong = await getLyricsById(song.id);

    currentSong = fullSong;
    displayLyrics(fullSong);
    document.getElementById('resultsContainer').classList.add('hidden');
  } catch (error) {
    console.error('Search and view error:', error);
    showError(error.message || 'Failed to fetch lyrics. Please try again.');
  } finally {
    hideLoading();
  }
}

/**
 * Main function to handle song search
 * Validates input, fetches data, and displays search results
 */
async function searchSongsHandler() {
  try {
    clearError();

    // Get search query from input
    const query = document.getElementById('searchInput').value.trim();

    // Validate input
    if (!isValidInput(query)) {
      showError('Please enter a song name or artist');
      return;
    }

    // Show loading state
    showLoading();

    // Fetch search results from API
    const results = await searchSongs(query);

    // Display results in DOM
    displaySearchResults(results);

    // Clear input field
    document.getElementById('searchInput').value = '';
  } catch (error) {
    console.error('Search error:', error);
    showError(error.message || 'Failed to search songs. Please try again.');
  } finally {
    hideLoading();
  }
}

/**
 * Views full lyrics for a song from search results
 * @param {Object} song - Song object from search results
 */
async function viewLyrics(song) {
  try {
    showLoading();

    // Fetch full lyrics for selected song
    const fullSong = await getLyricsById(song.id);

    currentSong = fullSong;
    displayLyrics(fullSong);
  } catch (error) {
    console.error('View lyrics error:', error);
    showError('Failed to load lyrics for this song.');
  } finally {
    hideLoading();
  }
}

// ==========================================
// THEME TOGGLE
// ==========================================

/**
 * Toggles between light and dark mode
 * Saves preference to localStorage
 */
function toggleTheme() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark-mode');

  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  const themeBtn = document.getElementById('themeToggle');
  themeBtn.textContent = isDarkMode ? '☀️' : '🌙';
}

/**
 * Loads saved theme preference on page load
 */
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  const themeBtn = document.getElementById('themeToggle');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀️';
  } else {
    themeBtn.textContent = '🌙';
  }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Load theme preference
  loadThemePreference();

  // Load favorites on page load
  updateFavoritesList();

  // Search button click handler
  document.getElementById('searchBtn').addEventListener('click', searchSongsHandler);

  // Enter key in search input
  document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchSongsHandler();
    }
  });

  // Theme toggle button
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Back button - return to search results
  document.getElementById('backBtn').addEventListener('click', () => {
    clearLyricsDisplay();
    document.getElementById('resultsContainer').classList.remove('hidden');
  });

  // Add to favorites button
  document.getElementById('addFavoriteBtn').addEventListener('click', () => {
    if (currentSong) {
      addToFavorites(currentSong);
    }
  });

  // Clear favorites button
  document.getElementById('clearFavorites').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all favorites?')) {
      localStorage.removeItem('favoritesSongs');
      updateFavoritesList();
    }
  });

  // Auto-trim whitespace from input
  document.getElementById('searchInput').addEventListener('blur', (e) => {
    e.target.value = e.target.value.trim();
  });
});
