// Sea of Thieves Community Events Data
const events = [
    {
        id: 1,
        location: "Plunder Valley",
        utcTime: "2025-08-30T13:00:00Z",
        description: "Spot 1"
    },
    {
        id: 2,
        location: "Thieves Haven",
        utcTime: "2025-08-30T18:00:00Z",
        description: "Spot 2"
    },
    {
        id: 3,
        location: "Cannon Cove",
        utcTime: "2025-08-30T23:00:00Z",
        description: "Spot 3"
    },
    {
        id: 4,
        location: "Snake Island",
        utcTime: "2025-08-31T05:00:00Z",
        description: "Spot 4"
    },
    {
        id: 5,
        location: "Shipwreck Bay",
        utcTime: "2025-08-31T13:00:00Z",
        description: "Spot 5"
    },
    {
        id: 6,
        location: "Plunder Valley",
        utcTime: "2025-08-31T18:00:00Z",
        description: "Spot 6"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayUserTimezone();
    renderEvents();
    
    // Update times every minute
    setInterval(renderEvents, 60000);
});

// Display user's timezone
function displayUserTimezone() {
    const timezoneElement = document.getElementById('user-timezone');
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneElement.textContent = userTimezone;
}

// Format date and time
function formatDateTime(date, includeDate = true) {
    const options = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    
    if (includeDate) {
        options.weekday = 'short';
        options.month = 'short';
        options.day = 'numeric';
    }
    
    return date.toLocaleString('en-US', options);
}

// Get event status
function getEventStatus(eventTime) {
    const now = new Date();
    const eventDate = new Date(eventTime);
    const timeDiff = eventDate - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    if (timeDiff < 0) {
        return 'past';
    } else if (hoursDiff <= 2) {
        return 'urgent';
    } else {
        return 'upcoming';
    }
}

// Render all events
function renderEvents() {
    const container = document.getElementById('events-container');
    container.innerHTML = '';
    
    events.forEach(event => {
        const eventElement = createEventElement(event);
        container.appendChild(eventElement);
    });
}

// Create individual event element
function createEventElement(event) {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-card';
    
    const utcDate = new Date(event.utcTime);
    const localDate = new Date(event.utcTime);
    const status = getEventStatus(event.utcTime);
    
    // Add status class
    eventDiv.classList.add(status);
    
    const localTime = formatDateTime(localDate);
    // Format UTC time in UTC timezone, not local timezone
    const utcTime = utcDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });
    const dateOnly = localDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
    
    let statusText = '';
    let statusClass = '';
    
    switch(status) {
        case 'past':
            statusText = 'Past';
            statusClass = 'past';
            break;
        case 'urgent':
            statusText = 'Starting Soon!';
            statusClass = 'urgent';
            break;
        case 'upcoming':
            statusText = 'Upcoming';
            statusClass = 'upcoming';
            break;
    }
    
    eventDiv.innerHTML = `
        <div class="event-number">${event.description}</div>
        <div class="event-location">${event.location}</div>
        <div class="event-date">${dateOnly}</div>
        <div class="event-time local">${localTime}</div>
        <div class="event-time utc">UTC: ${utcTime}</div>
        <div class="status-badge ${statusClass}">${statusText}</div>
    `;
    
    return eventDiv;
}

// Add some pirate-themed console messages
console.log('🏴‍☠️ Ahoy matey! Welcome to the Sea of Thieves Community Events!');
console.log('⚓ All times are automatically converted to your local timezone');
