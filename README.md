# 🎵 Lyrics Finder

A modern lyrics search application powered by the free LRCLIB API. Find song lyrics instantly with a clean, intuitive interface. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

- **Real-time Song Search**: Search for songs by name, artist, or album
- **Full Lyrics Display**: View complete lyrics with proper formatting
- **Favorite Songs**: Save your favorite songs for quick access using localStorage
- **Dark Mode Toggle**: Switch between light and dark themes with persistent preference
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Visual feedback during API requests with spinner animation
- **Error Handling**: Comprehensive error messages for failed searches
- **Smooth Animations**: Fade-in effects and hover states for better UX

## 📋 Project Structure

```
lyrics-app/
├── index.html      # Main HTML structure
├── style.css       # Complete styling with responsive design
└── script.js       # Application logic with organized functions
```

## 🔑 API Information

### Base URL
```
https://lrclib.net/api
```

### Endpoints Used

1. **Search for Songs**
   - **Endpoint**: `/search`
   - **Parameters**: `q` (search query)
   - **Example**: `/search?q=Bohemian Rhapsody`
   - **Returns**: Array of matching songs

2. **Get Song Lyrics by ID**
   - **Endpoint**: `/get/{id}`
   - **Parameters**: `id` (song ID from search results)
   - **Example**: `/get/123456`
   - **Returns**: Complete song data with lyrics

3. **Search with Filters** (Optional)
   - **Endpoint**: `/search`
   - **Parameters**: `artist`, `track`, `album`
   - **Example**: `/search?artist=Queen&track=Bohemian`

### Authentication
- **Type**: None
- **Required**: No
- **Cost**: Free - Public API

### Sample JSON Response

**Search Response:**
```json
[
  {
    "id": 2114851,
    "trackName": "Bohemian Rhapsody",
    "artistName": "Queen",
    "albumName": "A Night at the Opera",
    "duration": 354,
    "plainLyrics": "Is this the real life...",
    "syncedLyrics": "[00:00.00]Is this the real life..."
  }
]
```

**Get Lyrics Response:**
```json
{
  "id": 2114851,
  "trackName": "Bohemian Rhapsody",
  "artistName": "Queen",
  "albumName": "A Night at the Opera",
  "duration": 354,
  "plainLyrics": "Is this the real life? Is this just fantasy?",
  "syncedLyrics": "[00:00.00]Is this the real life?[00:02.00]Is this just fantasy?"
}
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API access)

### Setup Instructions

1. **Clone or Download the Project**
   ```bash
   cd lyrics-app
   ```

2. **Open the Application**
   - Simply double-click `index.html` to open in your default browser
   - OR use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```
   - Open `http://localhost:8000` in your browser

3. **Start Searching for Lyrics**
   - Enter a song name, artist, or both in the search bar
   - Click "Search" or press Enter
   - Click on a song from the results to view full lyrics
   - Add songs to favorites for quick access

## 📖 Usage Guide

### Searching for Lyrics
1. Enter a song name or artist in the search input
2. Press Enter or click the "Search" button
3. View search results as clickable cards
4. Click a song card to view its full lyrics

### Managing Favorites
- Click "Add to Favorites" while viewing lyrics
- Access favorites from the "Favorite Songs" section
- Click a favorite song to quickly view its lyrics
- Remove favorites by clicking the ✕ button
- Clear all favorites with the "Clear Favorites" button

### Theme Toggle
- Click the moon/sun icon in the header to toggle between light and dark modes
- Your theme preference is automatically saved

## 💡 Code Organization

### API Functions
- `searchSongs(searchQuery)`: Searches for songs by query
- `getLyricsById(id)`: Fetches full lyrics for a specific song

### DOM Functions
- `displaySearchResults(results)`: Renders search results as cards
- `displayLyrics(song)`: Shows full lyrics and song information
- `updateFavoritesList()`: Renders favorites list
- `toggleTheme()`: Switches between light/dark modes

### Main Functions
- `searchSongsHandler()`: Handles search input and validation
- `viewLyrics(song)`: Fetches and displays full lyrics
- `searchAndViewSong(trackName, artistName)`: Combined search and view

### Utility Functions
- `isValidInput(input)`: Validates user input
- `showError(message)`: Displays error messages
- `showLoading()` / `hideLoading()`: Manages loading states
- `isSongFavorited()`: Checks if song is favorited

## ✅ Error Handling

The app handles the following scenarios:

1. **Empty Search**: Validation message for empty input
2. **No Results Found**: Specific message when search returns no songs
3. **Failed API Call**: Generic error with retry suggestion
4. **Network Failures**: Error handling for connection issues
5. **Unavailable Lyrics**: Message when lyrics aren't available
6. **Auto-clearing Errors**: Errors automatically disappear after 5 seconds

## 🎨 Design Features

- **Card-based Layout**: Search results and favorites as interactive cards
- **Gradient Background**: Purple gradient for visual appeal
- **Responsive Grid**: Results adapt to screen size
- **Dark Mode**: Complete theme system with CSS variables
- **Hover Effects**: Interactive cards with smooth transitions
- **Loading Spinner**: Animated spinner during data fetching
- **Color-Coded Elements**: Purple accent for primary actions

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with multi-column grid (1000px+)
- **Tablet**: Adjusted spacing and grid (768px - 999px)
- **Mobile**: Single column layout (481px - 767px)
- **Small Mobile**: Compact design (<480px)

## 💾 Data Persistence

- **Favorites**: Stored in browser's localStorage
- **Theme Preference**: Saved with every toggle
- **Data Survives**: Page refresh and browser restart

## 📝 Comments in Code

The code includes comprehensive comments explaining:
- Function purposes and parameters
- API endpoint usage
- Async/await patterns
- DOM manipulation logic
- Error handling strategies
- Event listener setup

## 🎯 Next Steps / Future Enhancements

- [ ] Synced lyrics with timestamp display
- [ ] Lyrics export as text file
- [ ] Share lyrics on social media
- [ ] View song duration and other metadata
- [ ] Playlist creation
- [ ] Recently searched songs history
- [ ] Advanced search filters
- [ ] Mobile app version
- [ ] Offline lyrics cache

## ⚡ Performance Tips

- Searches are cached by your browser for faster results
- Favorites load instantly from localStorage
- No external libraries - pure vanilla JavaScript
- Efficient DOM updates only when necessary

## 🔒 Security & Privacy

- No authentication required
- No personal data collected
- Uses public LRCLIB API
- All data stored locally in browser
- No external tracking

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Credits

- **LRCLIB API**: Free lyrics database - [lrclib.net](https://lrclib.net)

---

**Find Your Lyrics Now!** 🎵✨
