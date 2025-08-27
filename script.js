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
    createFloatingDots();
    displayUserTimezone();
    renderEvents();
    setInterval(renderEvents, 60000);
    setInterval(updateCountdowns, 1000);
});

// Create floating background dots
function createFloatingDots() {
    const dotsContainer = document.getElementById('floating-dots');
    
    if (!dotsContainer) {
        console.error('Floating dots container not found!');
        return;
    }
    
    const numberOfDots = 25; // Increased number of dots for better effect
    
    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        // Random size between 3px and 12px (made slightly larger for visibility)
        const size = Math.random() * 9 + 3;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        
        // Random horizontal position
        dot.style.left = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        const delay = Math.random() * 8;
        const duration = Math.random() * 6 + 8; // 8-14 seconds
        dot.style.animationDelay = delay + 's';
        dot.style.animationDuration = duration + 's';
        
        // Random opacity for variety
        const opacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
        dot.style.opacity = opacity;
        
        dotsContainer.appendChild(dot);
    }
}

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
    // Format UTC date and time together
    const utcDateFormatted = utcDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });
    const utcDateTime = `${utcDateFormatted}, ${utcTime}`;
    
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
        <div class="event-time local">${localTime}</div>
        <div class="event-location">${event.location}</div>
        <div class="event-time utc">UTC: ${utcDateTime}</div>
        <div class="status-badge ${statusClass}">${statusText}</div>
    `;
    
    // Add click handler to copy Discord timestamp
    eventDiv.addEventListener('click', () => copyDiscordTimestamp(event));
    
    return eventDiv;
}

// Copy Discord timestamp to clipboard
function copyDiscordTimestamp(event) {
    const utcDate = new Date(event.utcTime);
    const unixTimestamp = Math.floor(utcDate.getTime() / 1000);
    const discordTimestamp = `PopUp Plunder - ${event.description} - ${event.location} <t:${unixTimestamp}:R>`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(discordTimestamp).then(() => {
        showCopyNotification(discordTimestamp);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = discordTimestamp;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyNotification(discordTimestamp);
    });
}

// Update the next event countdown
function updateCountdowns() {
    const now = new Date();
    const upcomingEvents = events.filter(event => new Date(event.utcTime) > now);
    
    if (upcomingEvents.length > 0) {
        const nextEvent = upcomingEvents[0];
        const countdown = calculateCountdown(nextEvent.utcTime);
        const countdownElement = document.getElementById('next-event-countdown');
        countdownElement.innerHTML = `
            <div class="countdown-display">
                <span class="countdown-label">Next Pop-Up Plunder: ${nextEvent.description} in</span>
                <span class="countdown-timer">${countdown}</span>
            </div>
        `;
    } else {
        const countdownElement = document.getElementById('next-event-countdown');
        countdownElement.innerHTML = `
            <div class="countdown-display">
                <span class="countdown-label">All events have completed!</span>
            </div>
        `;
    }
}

// Calculate countdown for a specific event
function calculateCountdown(utcTime) {
    const now = new Date();
    const eventTime = new Date(utcTime);
    const timeDiff = eventTime - now;
    
    if (timeDiff <= 0) {
        return 'Event has started!';
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Show copy notification
function showCopyNotification(text) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">📋</div>
            <div class="notification-text">
                <div class="notification-title">Copied to clipboard!</div>
                <div class="notification-message">${text}</div>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add some pirate-themed console messages
console.log('🏴‍☠️ Ahoy matey! Welcome to the Sea of Thieves Community Events!');
console.log('⚓ All times are automatically converted to your local timezone');
