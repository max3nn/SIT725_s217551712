CREATE DATABASE IF NOT EXISTS locate_a_socket;
USE locate_a_socket;

CREATE TABLE IF NOT EXISTS stations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    availability VARCHAR(50),
    image VARCHAR(255)
);

INSERT INTO stations (name, location, type, availability, image) VALUES 
('Central Park Charger', 'Central Park, NY', 'Type 2', 'Available', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80'),
('Downtown Fast Charge', '123 Main St', 'CCS', 'Occupied', 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80'),
('Mall Station', 'Shopping Mall L2', 'CHAdeMO', 'Available', 'https://images.unsplash.com/photo-1565514020176-dbf2277f1c77?auto=format&fit=crop&w=600&q=80');