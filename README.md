# 🏴‍☠️ Sea of Thieves Community Events

A beautiful, responsive GitHub Pages site that displays Sea of Thieves community events with automatic timezone conversion.

## ✨ Features

- **Automatic Timezone Conversion**: All times are automatically converted to the visitor's local timezone
- **Real-time Updates**: Times update every minute to show current status
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Event Status Indicators**: 
  - 🟢 Upcoming events
  - 🔴 Urgent events (starting within 2 hours)
  - ⚫ Past events
- **Pirate-themed Design**: Beautiful nautical color scheme and typography
- **No Dependencies**: Pure HTML, CSS, and JavaScript - no external libraries required

## 🚀 Quick Start

1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "GitHub Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
3. **Your site will be live** at `https://yourusername.github.io/repository-name`

## 📅 Current Events

The site currently displays these community events:

- **Spot 1**: Plunder Valley - August 30th, 1:00 PM UTC
- **Spot 2**: Thieves Haven - August 30th, 6:00 PM UTC  
- **Spot 3**: Cannon Cove - August 30th, 11:00 PM UTC
- **Spot 4**: Snake Island - August 31st, 5:00 AM UTC
- **Spot 5**: Shipwreck Bay - August 31st, 1:00 PM UTC
- **Spot 6**: Plunder Valley - August 31st, 6:00 PM UTC

## 🛠️ Customization

### Adding New Events

Edit the `script.js` file and add new events to the `events` array:

```javascript
{
    id: 7,
    location: "Your Location",
    utcTime: "2024-09-01T15:00:00Z", // Use ISO 8601 format
    description: "Spot 7"
}
```

### Changing the Design

- **Colors**: Modify the CSS variables in `styles.css`
- **Fonts**: Update the Google Fonts link in `index.html`
- **Layout**: Adjust the grid settings in `styles.css`

### Updating Event Data

Simply edit the `events` array in `script.js` to:
- Add new events
- Remove old events
- Update times or locations

## 🌐 How It Works

1. **Timezone Detection**: Uses the browser's `Intl.DateTimeFormat()` API to detect the user's timezone
2. **Time Conversion**: Converts UTC times to local times using JavaScript's built-in Date methods
3. **Real-time Updates**: Refreshes event status every minute
4. **Status Calculation**: Determines if events are past, upcoming, or urgent based on current time

## 📱 Browser Support

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid
- CSS Flexbox
- Intl.DateTimeFormat API

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Ahoy matey!** ⚓ Set sail for adventure with your community events!
