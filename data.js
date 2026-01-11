// Indian Cities with Coordinates and National Highway Network
class IndianPathFinder {
    constructor() {
        this.cities = {};
        this.initializeCities();
        this.initializeHighways();
    }

    initializeCities() {
        this.cities = {
            // Metro Cities
            'Delhi': { lat: 28.7041, lon: 77.1025, neighbors: {} },
            'Mumbai': { lat: 19.0760, lon: 72.8777, neighbors: {} },
            'Chennai': { lat: 13.0827, lon: 80.2707, neighbors: {} },
            'Kolkata': { lat: 22.5726, lon: 88.3639, neighbors: {} },
            'Bengaluru': { lat: 12.9716, lon: 77.5946, neighbors: {} },
            'Hyderabad': { lat: 17.3850, lon: 78.4867, neighbors: {} },
            
            // Other Major Cities
            'Ahmedabad': { lat: 23.0225, lon: 72.5714, neighbors: {} },
            'Pune': { lat: 18.5204, lon: 73.8567, neighbors: {} },
            'Jaipur': { lat: 26.9124, lon: 75.7873, neighbors: {} },
            'Lucknow': { lat: 26.8467, lon: 80.9462, neighbors: {} },
            'Kanpur': { lat: 26.4499, lon: 80.3319, neighbors: {} },
            'Nagpur': { lat: 21.1458, lon: 79.0882, neighbors: {} },
            'Indore': { lat: 22.7196, lon: 75.8577, neighbors: {} },
            'Bhopal': { lat: 23.2599, lon: 77.4126, neighbors: {} },
            'Visakhapatnam': { lat: 17.6868, lon: 83.2185, neighbors: {} },
            'Patna': { lat: 25.5941, lon: 85.1376, neighbors: {} },
            'Chandigarh': { lat: 30.7333, lon: 76.7794, neighbors: {} },
            'Coimbatore': { lat: 11.0168, lon: 76.9558, neighbors: {} },
            'Kochi': { lat: 9.9312, lon: 76.2673, neighbors: {} },
            'Guwahati': { lat: 26.1445, lon: 91.7362, neighbors: {} },
            'Thiruvananthapuram': { lat: 8.5241, lon: 76.9366, neighbors: {} },
            'Bhubaneswar': { lat: 20.2961, lon: 85.8245, neighbors: {} },
            'Amritsar': { lat: 31.6340, lon: 74.8723, neighbors: {} },
            'Varanasi': { lat: 25.3176, lon: 82.9739, neighbors: {} },
            'Surat': { lat: 21.1702, lon: 72.8311, neighbors: {} },
            'Ludhiana': { lat: 30.9010, lon: 75.8573, neighbors: {} },
            'Agra': { lat: 27.1767, lon: 78.0081, neighbors: {} },
            'Nashik': { lat: 19.9975, lon: 73.7898, neighbors: {} },
            'Faridabad': { lat: 28.4089, lon: 77.3178, neighbors: {} },
            'Meerut': { lat: 28.9845, lon: 77.7064, neighbors: {} },
            'Rajkot': { lat: 22.3039, lon: 70.8022, neighbors: {} },
            'Jodhpur': { lat: 26.2389, lon: 73.0243, neighbors: {} },
            'Kota': { lat: 25.2138, lon: 75.8648, neighbors: {} },
            'Jammu': { lat: 32.7266, lon: 74.8570, neighbors: {} },
            'Madurai': { lat: 9.9252, lon: 78.1198, neighbors: {} },
            'Vijayawada': { lat: 16.5062, lon: 80.6480, neighbors: {} },
            'Ranchi': { lat: 23.3441, lon: 85.3096, neighbors: {} },
            'Raipur': { lat: 21.2514, lon: 81.6296, neighbors: {} },
            'Allahabad': { lat: 25.4358, lon: 81.8463, neighbors: {} },
            'Jabalpur': { lat: 23.1815, lon: 79.9864, neighbors: {} },
            'Gwalior': { lat: 26.2183, lon: 78.1828, neighbors: {} },
            'Vadodara': { lat: 22.3072, lon: 73.1812, neighbors: {} },
            'Shimla': { lat: 31.1048, lon: 77.1734, neighbors: {} },
            'Dehradun': { lat: 30.3165, lon: 78.0322, neighbors: {} },
            'Mysuru': { lat: 12.2958, lon: 76.6394, neighbors: {} },
            'Tiruchirappalli': { lat: 10.7905, lon: 78.7047, neighbors: {} },
            'Kozhikode': { lat: 11.2588, lon: 75.7804, neighbors: {} },
            'Mangalore': { lat: 12.9141, lon: 74.8560, neighbors: {} },
            'Jamshedpur': { lat: 22.8046, lon: 86.2029, neighbors: {} },
            'Dhanbad': { lat: 23.7957, lon: 86.4304, neighbors: {} },
            'Guntur': { lat: 16.3067, lon: 80.4365, neighbors: {} },
            'Bareilly': { lat: 28.3670, lon: 79.4304, neighbors: {} },
            'Moradabad': { lat: 28.8389, lon: 78.7738, neighbors: {} },
            'Gorakhpur': { lat: 26.7606, lon: 83.3732, neighbors: {} },
            'Bikaner': { lat: 28.0229, lon: 73.3119, neighbors: {} },
            'Udaipur': { lat: 24.5854, lon: 73.7125, neighbors: {} },
            'Sonipat': { lat: 28.9931, lon: 77.0151, neighbors: {} },
            'Rohtak': { lat: 28.8955, lon: 76.6066, neighbors: {} }
        };
    }

    initializeHighways() {
        // NH1: Delhi to Amritsar
        this.addEdge('Delhi', 'Sonipat', 45, 'NH1');
        this.addEdge('Sonipat', 'Panipat', 35, 'NH1');
        this.addEdge('Panipat', 'Karnal', 40, 'NH1');
        this.addEdge('Karnal', 'Ambala', 50, 'NH1');
        this.addEdge('Ambala', 'Ludhiana', 90, 'NH1');
        this.addEdge('Ludhiana', 'Jalandhar', 60, 'NH1');
        this.addEdge('Jalandhar', 'Amritsar', 80, 'NH1');
        
        // NH2: Delhi to Kolkata
        this.addEdge('Delhi', 'Faridabad', 25, 'NH2');
        this.addEdge('Faridabad', 'Mathura', 110, 'NH2');
        this.addEdge('Mathura', 'Agra', 60, 'NH2');
        this.addEdge('Agra', 'Kanpur', 280, 'NH2');
        this.addEdge('Kanpur', 'Allahabad', 200, 'NH2');
        this.addEdge('Allahabad', 'Varanasi', 120, 'NH2');
        this.addEdge('Varanasi', 'Kolkata', 680, 'NH2');
        
        // NH3: Agra to Mumbai
        this.addEdge('Agra', 'Gwalior', 120, 'NH3');
        this.addEdge('Gwalior', 'Jhansi', 100, 'NH3');
        this.addEdge('Jhansi', 'Bhopal', 300, 'NH3');
        this.addEdge('Bhopal', 'Indore', 190, 'NH3');
        this.addEdge('Indore', 'Dhule', 150, 'NH3');
        this.addEdge('Dhule', 'Nashik', 130, 'NH3');
        this.addEdge('Nashik', 'Mumbai', 170, 'NH3');
        
        // NH4: Mumbai to Chennai
        this.addEdge('Mumbai', 'Pune', 150, 'NH4');
        this.addEdge('Pune', 'Satara', 110, 'NH4');
        this.addEdge('Satara', 'Kolhapur', 120, 'NH4');
        this.addEdge('Kolhapur', 'Belgaum', 100, 'NH4');
        this.addEdge('Belgaum', 'Hubli', 100, 'NH4');
        this.addEdge('Hubli', 'Davangere', 140, 'NH4');
        this.addEdge('Davangere', 'Chitradurga', 80, 'NH4');
        this.addEdge('Chitradurga', 'Tumkur', 130, 'NH4');
        this.addEdge('Tumkur', 'Bengaluru', 70, 'NH4');
        this.addEdge('Bengaluru', 'Krishnagiri', 90, 'NH4');
        this.addEdge('Krishnagiri', 'Vellore', 80, 'NH4');
        this.addEdge('Vellore', 'Chennai', 130, 'NH4');
        
        // NH5: Chennai to Kolkata
        this.addEdge('Chennai', 'Vijayawada', 450, 'NH5');
        this.addEdge('Vijayawada', 'Visakhapatnam', 350, 'NH5');
        this.addEdge('Visakhapatnam', 'Bhubaneswar', 450, 'NH5');
        this.addEdge('Bhubaneswar', 'Kolkata', 440, 'NH5');
        
        // NH6: Kolkata to Mumbai
        this.addEdge('Kolkata', 'Kharagpur', 110, 'NH6');
        this.addEdge('Kharagpur', 'Balasore', 120, 'NH6');
        this.addEdge('Balasore', 'Cuttack', 200, 'NH6');
        this.addEdge('Cuttack', 'Sambalpur', 300, 'NH6');
        this.addEdge('Sambalpur', 'Raipur', 350, 'NH6');
        this.addEdge('Raipur', 'Nagpur', 300, 'NH6');
        this.addEdge('Nagpur', 'Aurangabad', 500, 'NH6');
        this.addEdge('Aurangabad', 'Mumbai', 350, 'NH6');
        
        // NH7: Varanasi to Kanyakumari
        this.addEdge('Varanasi', 'Rewa', 250, 'NH7');
        this.addEdge('Rewa', 'Jabalpur', 130, 'NH7');
        this.addEdge('Jabalpur', 'Nagpur', 260, 'NH7');
        this.addEdge('Nagpur', 'Hyderabad', 500, 'NH7');
        this.addEdge('Hyderabad', 'Kurnool', 200, 'NH7');
        this.addEdge('Kurnool', 'Bengaluru', 350, 'NH7');
        this.addEdge('Bengaluru', 'Dharmapuri', 150, 'NH7');
        this.addEdge('Dharmapuri', 'Salem', 70, 'NH7');
        this.addEdge('Salem', 'Madurai', 300, 'NH7');
        this.addEdge('Madurai', 'Tirunelveli', 150, 'NH7');
        this.addEdge('Tirunelveli', 'Kanyakumari', 90, 'NH7');
        
        // NH8: Delhi to Mumbai
        this.addEdge('Delhi', 'Gurgaon', 30, 'NH8');
        this.addEdge('Gurgaon', 'Jaipur', 260, 'NH8');
        this.addEdge('Jaipur', 'Ajmer', 130, 'NH8');
        this.addEdge('Ajmer', 'Udaipur', 270, 'NH8');
        this.addEdge('Udaipur', 'Ahmedabad', 250, 'NH8');
        this.addEdge('Ahmedabad', 'Vadodara', 110, 'NH8');
        this.addEdge('Vadodara', 'Surat', 130, 'NH8');
        this.addEdge('Surat', 'Mumbai', 250, 'NH8');
        
        // Direct connections
        this.addEdge('Delhi', 'Jaipur', 280, 'NH8');
        this.addEdge('Delhi', 'Chandigarh', 250, 'NH1');
        this.addEdge('Chandigarh', 'Shimla', 110, 'NH22');
        this.addEdge('Delhi', 'Dehradun', 240, 'NH72');
        this.addEdge('Mumbai', 'Ahmedabad', 530, 'NH48');
        this.addEdge('Mumbai', 'Pune', 150, 'NH48');
        this.addEdge('Bengaluru', 'Chennai', 350, 'NH44');
        this.addEdge('Bengaluru', 'Hyderabad', 570, 'NH44');
        this.addEdge('Chennai', 'Hyderabad', 670, 'NH65');
        this.addEdge('Kolkata', 'Patna', 560, 'NH19');
        this.addEdge('Patna', 'Varanasi', 240, 'NH19');
        this.addEdge('Hyderabad', 'Nagpur', 500, 'NH44');
        this.addEdge('Jaipur', 'Ahmedabad', 660, 'NH48');
        this.addEdge('Ahmedabad', 'Rajkot', 220, 'NH47');
        this.addEdge('Kochi', 'Thiruvananthapuram', 200, 'NH66');
        this.addEdge('Guwahati', 'Shillong', 100, 'NH40');
        
        // Additional connections
        this.addEdge('Bengaluru', 'Mysuru', 150);
        this.addEdge('Bengaluru', 'Coimbatore', 350);
        this.addEdge('Chennai', 'Coimbatore', 500);
        this.addEdge('Hyderabad', 'Vijayawada', 270);
        this.addEdge('Pune', 'Nagpur', 700);
        this.addEdge('Lucknow', 'Kanpur', 80);
        this.addEdge('Lucknow', 'Varanasi', 300);
        this.addEdge('Bhopal', 'Indore', 190);
        this.addEdge('Ahmedabad', 'Vadodara', 110);
        this.addEdge('Kolkata', 'Bhubaneswar', 440);
        this.addEdge('Patna', 'Ranchi', 350);
        this.addEdge('Jodhpur', 'Jaipur', 330);
        this.addEdge('Udaipur', 'Jaipur', 400);
    }

    addEdge(city1, city2, distance, highway = null) {
        if (this.cities[city1] && this.cities[city2]) {
            this.cities[city1].neighbors[city2] = { distance, highway };
            this.cities[city2].neighbors[city1] = { distance, highway };
        }
    }

    // Haversine formula for distance calculation
    haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    toRad(degrees) {
        return degrees * Math.PI / 180;
    }

    // Dijkstra's Algorithm
    dijkstra(start, end) {
        if (!this.cities[start] || !this.cities[end]) {
            return { distance: Infinity, path: [], details: [] };
        }

        const distances = {};
        const previous = {};
        const priorityQueue = new PriorityQueue();
        
        // Initialize distances
        for (const city in this.cities) {
            distances[city] = Infinity;
            previous[city] = null;
        }
        distances[start] = 0;
        priorityQueue.enqueue(start, 0);

        while (!priorityQueue.isEmpty()) {
            const currentCity = priorityQueue.dequeue().element;
            
            if (currentCity === end) {
                break;
            }

            for (const neighbor in this.cities[currentCity].neighbors) {
                const edge = this.cities[currentCity].neighbors[neighbor];
                const newDist = distances[currentCity] + edge.distance;
                
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    previous[neighbor] = {
                        city: currentCity,
                        highway: edge.highway,
                        distance: edge.distance
                    };
                    priorityQueue.enqueue(neighbor, newDist);
                }
            }
        }

        // Reconstruct path
        const path = [];
        const details = [];
        let current = end;
        
        while (current !== null) {
            path.unshift(current);
            const prev = previous[current];
            
            if (prev) {
                details.unshift({
                    from: prev.city,
                    to: current,
                    distance: prev.distance,
                    highway: prev.highway || 'Direct Route'
                });
            }
            
            current = prev ? prev.city : null;
        }

        return {
            distance: distances[end],
            path: path,
            details: details
        };
    }

    // Multi-stop routing
    findPathWithWaypoints(waypoints) {
        if (waypoints.length < 2) {
            return { distance: 0, path: waypoints, details: [] };
        }

        let totalDistance = 0;
        let fullPath = [];
        let fullDetails = [];

        for (let i = 0; i < waypoints.length - 1; i++) {
            const start = waypoints[i];
            const end = waypoints[i + 1];
            const result = this.dijkstra(start, end);

            if (result.distance === Infinity) {
                return { distance: Infinity, path: [], details: [] };
            }

            totalDistance += result.distance;
            
            if (i === 0) {
                fullPath = result.path;
                fullDetails = result.details;
            } else {
                fullPath = [...fullPath, ...result.path.slice(1)];
                fullDetails = [...fullDetails, ...result.details];
            }
        }

        return {
            distance: totalDistance,
            path: fullPath,
            details: fullDetails
        };
    }

    // Find nearby cities
    findNearbyCities(city, radius) {
        if (!this.cities[city]) return [];

        const base = this.cities[city];
        const nearby = [];

        for (const otherCity in this.cities) {
            if (otherCity === city) continue;

            const other = this.cities[otherCity];
            const distance = this.haversineDistance(
                base.lat, base.lon,
                other.lat, other.lon
            );

            if (distance <= radius) {
                nearby.push({
                    city: otherCity,
                    distance: Math.round(distance)
                });
            }
        }

        return nearby.sort((a, b) => a.distance - b.distance);
    }

    // Get all city names
    getCityNames() {
        return Object.keys(this.cities).sort();
    }

    // Get city coordinates
    getCityCoordinates(city) {
        return this.cities[city] ? [this.cities[city].lat, this.cities[city].lon] : null;
    }
}

// Priority Queue for Dijkstra's Algorithm
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// Initialize global instance
const pathFinder = new IndianPathFinder();