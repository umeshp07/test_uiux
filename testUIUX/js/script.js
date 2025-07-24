// Sample Event Data with Categories
const events = [
    {
        id: 'e1',
        title: 'Rock Music Festival',
        date: '2025-08-15',
        time: '18:00',
        location: 'City Arena',
        description: 'An electrifying night of rock music featuring top bands. Get ready to headbang!',
        price: 50,
        image: 'https://placehold.co/600x400/FF6600/FFFFFF?text=Rock+Concert',
        isFeatured: true,
        category: 'Concert'
    },
    {
        id: 'e2',
        title: 'Web Development Workshop',
        date: '2025-09-01',
        time: '10:00',
        location: 'Online (Zoom)',
        description: 'Learn the latest web development techniques from industry experts. Hands-on coding sessions included.',
        price: 25,
        image: 'https://placehold.co/600x400/FF9933/FFFFFF?text=Web+Workshop',
        isFeatured: true,
        category: 'Workshop'
    },
    {
        id: 'e3',
        title: 'Startup Pitch Meetup',
        date: '2025-08-20',
        time: '17:30',
        location: 'Innovation Hub',
        description: 'Network with aspiring entrepreneurs and investors. Witness innovative startup pitches.',
        price: 10,
        image: 'https://placehold.co/600x400/FF6600/FFFFFF?text=Startup+Meetup',
        isFeatured: false,
        category: 'Meetup'
    },
    {
        id: 'e4',
        title: 'Yoga & Wellness Retreat',
        date: '2025-09-10',
        time: '09:00',
        location: 'Mountain View Resort',
        description: 'Rejuvenate your mind and body with a serene yoga and wellness retreat.',
        price: 150,
        image: 'https://placehold.co/600x400/FF9933/000000?text=Yoga+Retreat',
        isFeatured: false,
        category: 'Retreat'
    },
    {
        id: 'e5',
        title: 'Photography Masterclass',
        date: '2025-10-05',
        time: '14:00',
        location: 'Art Gallery Studio',
        description: 'Master the art of photography with renowned photographers. All skill levels welcome.',
        price: 75,
        image: 'https://placehold.co/600x400/FF6600/FFFFFF?text=Photography',
        isFeatured: false,
        category: 'Masterclass'
    },
    {
        id: 'e6',
        title: 'Virtual Reality Expo',
        date: '2025-11-20',
        time: '11:00',
        location: 'Convention Center',
        description: 'Experience the future of technology at the largest VR expo. Demos and expert talks.',
        price: 40,
        image: 'https://placehold.co/600x400/FF9933/FFFFFF?text=VR+Expo',
        isFeatured: false,
        category: 'Expo'
    },
    {
        id: 'e7',
        title: 'Future of AI Webinar',
        date: '2025-09-25',
        time: '16:00',
        location: 'Online (Google Meet)',
        description: 'A deep dive into the latest advancements and ethical considerations in Artificial Intelligence.',
        price: 0,
        image: 'https://placehold.co/600x400/FF6600/FFFFFF?text=AI+Webinar',
        isFeatured: false,
        category: 'Webinar'
    }
];

let currentSelectedEvent = null; // To store the event being viewed/booked
let myBookings = []; // Array to store booked events

const loadingOverlay = document.getElementById('loading-overlay');

// Function to show a specific section and hide others
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');

    // Scroll to the top of the page when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to render event cards
function renderEvents(eventsToRender, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content

    if (eventsToRender.length === 0) {
        const col = document.createElement('div');
        col.className = 'col-12 text-center text-secondary';
        col.textContent = 'No events found for this category.';
        container.appendChild(col);
        return;
    }

    eventsToRender.forEach(event => {
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card h-100 event-card">
                <img src="${event.image}" class="card-img-top" alt="${event.title}">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text text-sm mb-1">${event.date} at ${event.time}</p>
                    <p class="card-text text-sm mb-3">${event.location}</p>
                    <p class="card-text text-lg font-semibold text-primary mb-3">Price: ${event.price === 0 ? 'Free' : '$' + event.price}</p>
                    <button class="btn btn-primary view-details-btn" data-event-id="${event.id}">View Details</button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });

    // Add event listeners to "View Details" buttons
    container.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const eventId = e.target.dataset.eventId;
            const event = events.find(e => e.id === eventId);
            if (event) {
                currentSelectedEvent = event; // Store the selected event
                populateEventDetailModal(event);
                const eventDetailModal = new bootstrap.Modal(document.getElementById('eventDetailModal'));
                eventDetailModal.show();
            }
        });
    });
}

// Function to populate the event detail modal
function populateEventDetailModal(event) {
    document.getElementById('modal-event-image').src = event.image;
    document.getElementById('modal-event-title').textContent = event.title;
    document.getElementById('modal-event-date').textContent = `Date: ${event.date} at ${event.time}`;
    document.getElementById('modal-event-location').textContent = `Location: ${event.location}`;
    document.getElementById('modal-event-description').textContent = event.description;
    document.getElementById('modal-event-price').textContent = event.price === 0 ? 'Free' : `${event.price}`;
}

// Handle "Book Now" button click in the modal
document.getElementById('bookNowBtn').addEventListener('click', () => {
    const eventDetailModal = bootstrap.Modal.getInstance(document.getElementById('eventDetailModal'));
    if (eventDetailModal) {
        eventDetailModal.hide(); // Hide the modal
    }
    // Pre-fill event name in booking form
    document.getElementById('eventName').value = currentSelectedEvent ? currentSelectedEvent.title : '';
    // Set min date for bookingDate to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').min = today;
    // Optionally, pre-fill the date with the event's date if it's in the future
    if (currentSelectedEvent && currentSelectedEvent.date >= today) {
        document.getElementById('bookingDate').value = currentSelectedEvent.date;
    } else {
        document.getElementById('bookingDate').value = today; // Default to today if event date is past or not set
    }

    showSection('booking-form-section'); // Show the booking form
});

// Handle booking form submission
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Show loading animation
    loadingOverlay.classList.remove('hidden');

    // Get form values
    const eventName = document.getElementById('eventName').value;
    const bookingDate = document.getElementById('bookingDate').value;
    const numberOfSeats = document.getElementById('numberOfSeats').value;
    const fullName = document.getElementById('fullName').value;
    const emailAddress = document.getElementById('emailAddress').value;

    // Basic validation (more robust validation would be needed for a production app)
    if (!eventName || !bookingDate || !numberOfSeats || !fullName || !emailAddress) {
        alert('Please fill in all required fields.');
        loadingOverlay.classList.add('hidden'); // Hide loading if validation fails
        return;
    }

    // Simulate booking process (e.g., sending data to a server)
    console.log('Booking Details:', {
        eventName,
        bookingDate,
        numberOfSeats,
        fullName,
        emailAddress,
        eventId: currentSelectedEvent ? currentSelectedEvent.id : 'N/A'
    });

    // Add booking to myBookings array
    myBookings.push({
        eventId: currentSelectedEvent ? currentSelectedEvent.id : 'N/A',
        title: eventName,
        date: bookingDate,
        seats: numberOfSeats,
        name: fullName,
        email: emailAddress,
        image: currentSelectedEvent ? currentSelectedEvent.image : 'https://placehold.co/600x400/CCCCCC/000000?text=No+Image'
    });

    // Simulate network delay
    setTimeout(() => {
        loadingOverlay.classList.add('hidden'); // Hide loading animation

        // Display confirmation message
        document.getElementById('confirmed-email').textContent = emailAddress;
        document.getElementById('confirmed-event-name').textContent = eventName;
        showSection('confirmation-section');

        // Optionally, reset the form
        document.getElementById('bookingForm').reset();
        currentSelectedEvent = null; // Clear selected event
    }, 1500); // 1.5 second delay
});

// Function to render My Bookings
function renderMyBookings() {
    const myBookingsList = document.getElementById('my-bookings-list');
    myBookingsList.innerHTML = ''; // Clear previous content
    const noBookingsMessage = document.getElementById('no-bookings-message');

    if (myBookings.length === 0) {
        noBookingsMessage.classList.remove('hidden');
        return;
    } else {
        noBookingsMessage.classList.add('hidden');
    }

    myBookings.forEach(booking => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4'; // Responsive grid for bookings
        col.innerHTML = `
            <div class="card h-100 event-card">
                <img src="${booking.image}" class="card-img-top" alt="${booking.title}">
                <div class="card-body">
                    <h5 class="card-title">${booking.title}</h5>
                    <p class="card-text"><strong>Date:</strong> ${booking.date}</p>
                    <p class="card-text"><strong>Seats:</strong> ${booking.seats}</p>
                    <p class="card-text"><strong>Booked by:</strong> ${booking.name}</p>
                    <p class="card-text"><strong>Email:</strong> ${booking.email}</p>
                </div>
            </div>
        `;
        myBookingsList.appendChild(col);
    });
}

// Event filtering logic
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        e.target.classList.add('active');

        const category = e.target.dataset.category;
        let filteredEvents = [];
        if (category === 'all') {
            filteredEvents = events;
        } else {
            filteredEvents = events.filter(event => event.category === category);
        }
        renderEvents(filteredEvents, 'all-events-grid');
    });
});


// Initial rendering of events when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const featuredEvents = events.filter(event => event.isFeatured);
    renderEvents(featuredEvents, 'featured-events-grid');
    renderEvents(events, 'all-events-grid'); // Render all events initially
    showSection('homepage'); // Ensure homepage is shown on load
});
