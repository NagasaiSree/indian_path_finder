# India Path Finder 

A Google Maps-like pathfinding web application for India's national highway network using Dijkstra's algorithm.

## Features

- **Interactive Map**: Visual route planning with OpenStreetMap
- **50+ Indian Cities**: Major cities across India with real coordinates
- **National Highways**: 8+ national highways with accurate distances
- **Dijkstra's Algorithm**: Optimal pathfinding between any two cities
- **Multi-stop Planning**: Add waypoints for complex journeys
- **Route Details**: Distance, estimated time, fuel calculation
- **Nearby Cities**: Find cities within a specified radius
- **Quick Routes**: Predefined popular routes
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Leaflet.js for interactive maps
- Dijkstra's Algorithm for pathfinding
- OpenStreetMap for map tiles
- Font Awesome for icons

## How to Use

1. **Open** `index.html` in a modern web browser
2. **Select** start city and destination from the dropdown
3. **Add** optional waypoints if needed
4. **Click** "Find Optimal Route" to calculate the shortest path
5. **View** the route on the map and detailed breakdown
6. **Use** quick routes for popular journeys

## National Highways Included

- NH1: Delhi to Amritsar
- NH2: Delhi to Kolkata (Grand Trunk Road)
- NH3: Agra to Mumbai
- NH4: Mumbai to Chennai
- NH5: Chennai to Kolkata
- NH6: Kolkata to Mumbai
- NH7: Varanasi to Kanyakumari (Longest NH)
- NH8: Delhi to Mumbai

## Algorithm Details

The application uses **Dijkstra's Algorithm** to find the shortest path between cities:

1. Each city is a vertex in the graph
2. Roads are weighted edges (distance in km)
3. Algorithm finds the minimum distance path
4. Returns complete route with distances and highways used

## Future Enhancements

- Real-time traffic data integration
- Toll cost calculation
- Alternative routes (A* algorithm)
- Public transport options
- User accounts and saved routes
- Weather information
- Road condition alerts

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## License

MIT License - Free for educational and personal use

## Acknowledgments

- OpenStreetMap contributors for map data
- Indian Ministry of Road Transport and Highways for NH data

- Dijkstra's algorithm for pathfinding
