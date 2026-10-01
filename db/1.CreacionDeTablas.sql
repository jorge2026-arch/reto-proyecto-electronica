CREATE TABLE administrador (
    identificador INTEGER,
    usuario VARCHAR,
    contrasena VARCHAR
);

CREATE TABLE producto (
    identificador_producto INTEGER,
    modelo_producto VARCHAR,
    precio NUMERIC(10, 2),
    stock INTEGER,
    categoria VARCHAR,
    imagen_url VARCHAR(2048)
);
