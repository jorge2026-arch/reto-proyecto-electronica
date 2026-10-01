-- Contraseña: Frankcode123. Hash bcrypt generado con 8 saltos.
INSERT INTO administrador (identificador, usuario, contrasena)
VALUES (1, 'Frankcode', '$2b$08$fje/VeGevVN5MiGj9NwcpeR7z7Qzh.cdKTgk2E.Tmk5Q9JXKOXUSS');

INSERT INTO producto
    (identificador_producto, modelo_producto, precio, stock, categoria)
VALUES
    (1,  'iPhone 15',             799.99, 10, 'celular'),
    (2,  'Samsung Galaxy S24',    899.99, 8,  'celular'),
    (3,  'Xiaomi Redmi Note 13',  249.99, 15, 'celular'),
    (4,  'Motorola Edge 40',      399.99, 12, 'celular'),
    (5,  'Google Pixel 8',        699.99, 7,  'celular'),

    (6,  'MacBook Air M2',       1099.99, 6,  'laptop'),
    (7,  'Dell Inspiron 15',      649.99, 9,  'laptop'),
    (8,  'Lenovo IdeaPad 3',      499.99, 11, 'laptop'),
    (9,  'HP Pavilion 14',        749.99, 5,  'laptop'),
    (10, 'ASUS VivoBook 15',      599.99, 8,  'laptop'),

    (11, 'LG UltraGear 27GN800',  349.99, 6,  'monitor'),
    (12, 'Samsung Odyssey G5',    299.99, 10, 'monitor'),
    (13, 'Dell UltraSharp U2723', 579.99, 4,  'monitor'),
    (14, 'AOC 24G2',              179.99, 14, 'monitor'),
    (15, 'ASUS ProArt PA278QV',   399.99, 5,  'monitor'),

    (16, 'Logitech K380',          39.99, 20, 'teclado'),
    (17, 'Razer BlackWidow V3',   129.99, 7,  'teclado'),
    (18, 'Corsair K60 RGB Pro',    109.99, 9,  'teclado'),
    (19, 'Microsoft Wired 600',    24.99, 25, 'teclado'),
    (20, 'Keychron K2',             89.99, 12, 'teclado'),

    (21, 'Logitech MX Master 3S',   99.99, 13, 'mouse'),
    (22, 'Razer DeathAdder V2',     69.99, 10, 'mouse'),
    (23, 'Apple Magic Mouse',       79.99, 6,  'mouse'),
    (24, 'SteelSeries Rival 3',     39.99, 18, 'mouse'),
    (25, 'HP Wireless Mouse 250',   29.99, 22, 'mouse'),

    (26, 'Sony WH-1000XM5',        399.99, 5,  'audifonos'),
    (27, 'Apple AirPods Pro 2',    249.99, 10, 'audifonos'),
    (28, 'JBL Tune 760NC',          79.99, 14, 'audifonos'),
    (29, 'Bose QuietComfort 45',   329.99, 4,  'audifonos'),
    (30, 'HyperX Cloud II',         89.99, 11, 'audifonos');

-- Sincroniza la secuencia para los productos creados posteriormente desde la API.
SELECT setval(
    'producto_identificador_seq',
    (SELECT COALESCE(MAX(identificador_producto), 1) FROM producto)
);
