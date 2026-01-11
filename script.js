// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Map
    const map = L.map('map').setView([20.5937, 78.9629], 5);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
    }).addTo(map);

    // Map controls
    document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn());
    document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());
    document.getElementById('locate-me').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                map.setView([position.coords.latitude, position.coords.longitude], 12);
            });
        }
    });
    document.getElementById('reset-view').addEventListener('click', () => {
        map.setView([20.5937, 78.9629], 5);
    });

    // Initialize variables
    let markers = [];
    let routeLines = [];
    let currentRoute = null;

    // Populate city list in datalist
    const cityList = document.getElementById('city-list');
    const cities = pathFinder.getCityNames();
    
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        cityList.appendChild(option);
    });

    // Auto-complete for city inputs
    setupAutocomplete('start-city');
    setupAutocomplete('end-city');
    setupAutocomplete('nearby-city');

    function setupAutocomplete(inputId) {
        const input = document.getElementById(inputId);
        input.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const filtered = cities.filter(city => 
                city.toLowerCase().includes(value)
            );
            
            if (filtered.length > 0 && value.length > 2) {
                showSuggestions(this, filtered);
            }
        });
    }

    function showSuggestions(input, suggestions) {
        // Remove existing suggestions
        const existing = document.getElementById('suggestions-' + input.id);
        if (existing) existing.remove();
        
        const container = document.createElement('div');
        container.id = 'suggestions-' + input.id;
        container.className = 'suggestions';
        
        suggestions.slice(0, 5).forEach(city => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = city;
            item.addEventListener('click', () => {
                input.value = city;
                container.remove();
            });
            container.appendChild(item);
        });
        
        input.parentNode.appendChild(container);
    }

    // Waypoints management
    const waypointsContainer = document.getElementById('waypoints-container');
    const addWaypointBtn = document.getElementById('add-waypoint');
    let waypointCount = 0;

    addWaypointBtn.addEventListener('click', function() {
        addWaypointField();
    });

    function addWaypointField(initialValue = '') {
        const waypointId = `waypoint-${waypointCount++}`;
        const waypointDiv = document.createElement('div');
        waypointDiv.className = 'waypoint-item';
        waypointDiv.innerHTML = `
            <input type="text" id="${waypointId}" 
                   placeholder="Add waypoint..." 
                   value="${initialValue}"
                   list="city-list">
            <button type="button" class="remove-waypoint">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        waypointsContainer.appendChild(waypointDiv);
        
        // Setup autocomplete for new waypoint
        const input = waypointDiv.querySelector('input');
        setupAutocompleteDynamic(input);
        
        // Remove button event
        waypointDiv.querySelector('.remove-waypoint').addEventListener('click', function() {
            waypointDiv.remove();
        });
    }

    function setupAutocompleteDynamic(input) {
        input.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const filtered = cities.filter(city => 
                city.toLowerCase().includes(value)
            );
            
            if (filtered.length > 0 && value.length > 2) {
                showSuggestions(this, filtered);
            }
        });
    }

    // Get waypoints values
    function getWaypoints() {
        const waypointInputs = waypointsContainer.querySelectorAll('input');
        const waypoints = [];
        
        waypointInputs.forEach(input => {
            if (input.value && cities.includes(input.value)) {
                waypoints.push(input.value);
            }
        });
        
        return waypoints;
    }

    // Find Route Button
    document.getElementById('find-route').addEventListener('click', findRoute);

    function findRoute() {
        const startCity = document.getElementById('start-city').value;
        const endCity = document.getElementById('end-city').value;
        const waypoints = getWaypoints();
        
        if (!cities.includes(startCity) || !cities.includes(endCity)) {
            alert('Please select valid start and end cities from the list.');
            return;
        }

        // Show loading state
        const routeBtn = document.getElementById('find-route');
        const originalText = routeBtn.innerHTML;
        routeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finding Route...';
        routeBtn.disabled = true;

        // Clear previous route
        clearRoute();

        // Calculate route
        const allPoints = [startCity, ...waypoints, endCity];
        const result = pathFinder.findPathWithWaypoints(allPoints);

        if (result.distance === Infinity) {
            alert('No route found between the selected cities.');
            resetRouteButton(routeBtn, originalText);
            return;
        }

        // Display route on map
        displayRouteOnMap(result.path, result.details);
        
        // Update route details
        updateRouteDetails(result);
        
        // Store current route
        currentRoute = result;
        
        resetRouteButton(routeBtn, originalText);
    }

    function resetRouteButton(button, originalText) {
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 500);
    }

    // Clear Route Button
    document.getElementById('clear-route').addEventListener('click', clearRoute);

    function clearRoute() {
        // Clear markers
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
        
        // Clear route lines
        routeLines.forEach(line => map.removeLayer(line));
        routeLines = [];
        
        // Reset route details
        document.getElementById('total-distance').textContent = '-';
        document.getElementById('travel-time').textContent = '-';
        document.getElementById('fuel-needed').textContent = '-';
        
        const stepsList = document.getElementById('steps-list');
        stepsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-directions"></i>
                <p>Enter cities to find route details</p>
            </div>
        `;
        
        currentRoute = null;
    }

    // Display route on map
    function displayRouteOnMap(path, details) {
        // Clear previous markers and lines
        markers.forEach(marker => map.removeLayer(marker));
        routeLines.forEach(line => map.removeLayer(line));
        
        markers = [];
        routeLines = [];
        
        // Add markers for each city in path
        path.forEach((city, index) => {
            const coords = pathFinder.getCityCoordinates(city);
            if (!coords) return;
            
            let markerColor;
            if (index === 0) markerColor = '#e74c3c'; // Start - Red
            else if (index === path.length - 1) markerColor = '#2ecc71'; // End - Green
            else markerColor = '#3498db'; // Waypoints - Blue
            
            const marker = L.circleMarker(coords, {
                color: markerColor,
                fillColor: markerColor,
                fillOpacity: 0.8,
                radius: 8
            }).addTo(map);
            
            marker.bindPopup(`
                <b>${city}</b><br>
                ${index === 0 ? 'Start Point' : index === path.length - 1 ? 'Destination' : 'Waypoint'}<br>
                ${coords[0].toFixed(4)}°, ${coords[1].toFixed(4)}°
            `);
            
            markers.push(marker);
        });
        
        // Draw route lines
        details.forEach(segment => {
            const startCoords = pathFinder.getCityCoordinates(segment.from);
            const endCoords = pathFinder.getCityCoordinates(segment.to);
            
            if (startCoords && endCoords) {
                const line = L.polyline([startCoords, endCoords], {
                    color: '#f39c12',
                    weight: 4,
                    opacity: 0.7,
                    dashArray: '5, 10'
                }).addTo(map);
                
                line.bindPopup(`
                    <b>${segment.from} to ${segment.to}</b><br>
                    Distance: ${segment.distance} km<br>
                    Highway: ${segment.highway}
                `);
                
                routeLines.push(line);
            }
        });
        
        // Fit bounds to show entire route
        if (markers.length > 0) {
            const group = new L.featureGroup(markers);
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    // Update route details display
    function updateRouteDetails(result) {
        const totalDistance = result.distance;
        const travelTimeHours = totalDistance / 60; // Assuming 60 km/h average
        const hours = Math.floor(travelTimeHours);
        const minutes = Math.round((travelTimeHours - hours) * 60);
        const fuelNeeded = (totalDistance / 15).toFixed(1); // Assuming 15 km/liter
        
        // Update summary
        document.getElementById('total-distance').textContent = `${totalDistance.toFixed(1)} km`;
        document.getElementById('travel-time').textContent = `${hours}h ${minutes}m`;
        document.getElementById('fuel-needed').textContent = `${fuelNeeded} L`;
        
        // Update steps list
        const stepsList = document.getElementById('steps-list');
        stepsList.innerHTML = '';
        
        result.details.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'step-item';
            stepDiv.innerHTML = `
                <div class="step-header">
                    <strong>${step.from} → ${step.to}</strong>
                    <span class="step-highway">${step.highway}</span>
                </div>
                <div class="step-info">
                    <span class="step-distance">${step.distance} km</span>
                    <span class="step-number">Step ${index + 1}/${result.details.length}</span>
                </div>
            `;
            stepsList.appendChild(stepDiv);
        });
    }

    // Find Nearby Cities
    document.getElementById('find-nearby').addEventListener('click', findNearbyCities);
    document.getElementById('radius-slider').addEventListener('input', function() {
        document.getElementById('radius-value').textContent = `${this.value} km`;
    });

    function findNearbyCities() {
        const city = document.getElementById('nearby-city').value;
        const radius = parseInt(document.getElementById('radius-slider').value);
        
        if (!cities.includes(city)) {
            alert('Please enter a valid city name.');
            return;
        }
        
        const nearby = pathFinder.findNearbyCities(city, radius);
        const nearbyList = document.getElementById('nearby-list');
        
        if (nearby.length === 0) {
            nearbyList.innerHTML = '<div class="empty-state">No cities found within the specified radius.</div>';
            return;
        }
        
        nearbyList.innerHTML = '';
        nearby.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'nearby-item';
            itemDiv.innerHTML = `
                <span>${item.city}</span>
                <span class="nearby-distance">${item.distance} km</span>
            `;
            nearbyList.appendChild(itemDiv);
        });
    }

    // Quick Routes
    document.querySelectorAll('.quick-btn').forEach(button => {
        button.addEventListener('click', function() {
            const start = this.dataset.start;
            const end = this.dataset.end;
            
            document.getElementById('start-city').value = start;
            document.getElementById('end-city').value = end;
            
            // Clear waypoints
            waypointsContainer.innerHTML = '';
            waypointCount = 0;
            
            // Find route
            setTimeout(() => findRoute(), 100);
        });
    });

    // Initialize with a sample route
    setTimeout(() => {
        document.getElementById('start-city').value = 'Delhi';
        document.getElementById('end-city').value = 'Mumbai';
        findRoute();
    }, 1000);

    // Add CSS for suggestions
    const style = document.createElement('style');
    style.textContent = `
        .suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            z-index: 1000;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .suggestion-item {
            padding: 10px 15px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
        }
        
        .suggestion-item:hover {
            background: #f5f5f5;
        }
        
        .suggestion-item:last-child {
            border-bottom: none;
        }
        
        .step-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;
            font-size: 0.9rem;
            color: #666;
        }
        
        .step-number {
            background: #eee;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 0.8rem;
        }
    `;
    document.head.appendChild(style);
});