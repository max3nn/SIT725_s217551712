# SIT725 - Task 5.1P

## Student Information
- **Student ID:** s217551712
- **Name:** Antheis Maxenn
- **Task:** 5.1P - User Story and Sprint Backlog Decomposition

---

## User Story

**As a** student looking for local events, **I want to** browse and search for events on an interactive map with filters, **so that** I can easily discover activities happening near my location and decide what to attend.

---

## Sprint Backlog Tasks

| Task # | Task Description | Estimated Hours |
|--------|-----------------|-----------------|
| 1 | Set up MongoDB schema for events collection with geospatial indexing (coordinates field) | 2 |
| 2 | Create GET /api/events endpoint that accepts query parameters (category, date, radius) | 3 |
| 3 | Implement geospatial query logic using MongoDB's $near operator for location-based search | 4 |
| 4 | Build HTML page with Google Maps API integration and map container | 2 |
| 5 | Write JavaScript function to fetch user's current location using browser geolocation API | 1 |
| 6 | Create map markers for each event returned from the API and display on Google Maps | 3 |
| 7 | Implement filter UI with dropdowns for category, date range, and distance radius | 2 |
| 8 | Add event listener to filter form that triggers API call with selected filter parameters | 2 |
| 9 | Create info window component that displays event details when marker is clicked | 2 |
| 10 | Implement marker clustering for better performance when many events are in the same area | 3 |
| 11 | Add loading spinner while fetching events and hide when map is populated | 1 |
| 12 | Write error handling for failed API calls and display user-friendly error messages | 2 |
| 13 | Style the map page with CSS to make it responsive on mobile devices | 3 |
| 14 | Test map functionality with different filter combinations and validate results | 2 |
| 15 | Test geolocation across different browsers (Chrome, Firefox, Safari) | 2 |

**Total Estimated Hours:** 34 hours

---

**Submitted By:** Antheis Maxenn (s217551712)  
**Date:** December 8, 2025  
**Unit:** SIT725 - Web Application Development