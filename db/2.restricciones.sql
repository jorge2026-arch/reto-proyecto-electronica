-- Claves primarias
ALTER TABLE administrador
    ADD CONSTRAINT pk_administrador PRIMARY KEY (identificador);

ALTER TABLE producto
    ADD CONSTRAINT pk_producto PRIMARY KEY (identificador_producto);

-- Restricciones CHECK
ALTER TABLE administrador
    ALTER COLUMN identificador SET NOT NULL,
    ALTER COLUMN usuario SET NOT NULL,
    ALTER COLUMN contrasena SET NOT NULL;

ALTER TABLE administrador
    ADD CONSTRAINT chk_usuario_maximo_15
        CHECK (CHAR_LENGTH(usuario) BETWEEN 1 AND 15 AND BTRIM(usuario) <> ''),
    ADD CONSTRAINT chk_contrasena_maximo_60
        CHECK (CHAR_LENGTH(contrasena) BETWEEN 1 AND 60);

ALTER TABLE producto
    ALTER COLUMN identificador_producto SET NOT NULL,
    ALTER COLUMN modelo_producto SET NOT NULL,
    ALTER COLUMN precio SET NOT NULL,
    ALTER COLUMN stock SET NOT NULL,
    ALTER COLUMN categoria SET NOT NULL;

ALTER TABLE producto
    ADD CONSTRAINT chk_precio_mayor_cero
        CHECK (precio > 0 AND precio <= 99999999.99),
    ADD CONSTRAINT chk_stock_no_negativo
        CHECK (stock BETWEEN 0 AND 2147483647),
    ADD CONSTRAINT chk_modelo_no_vacio
        CHECK (BTRIM(modelo_producto) <> ''),
    ADD CONSTRAINT chk_categoria_valida
        CHECK (categoria IN (
            'celular',
            'laptop',
            'monitor',
            'teclado',
            'mouse',
            'audifonos'
        ));

-- Restricciones DEFAULT
CREATE SEQUENCE producto_identificador_seq START WITH 1;

ALTER TABLE producto
    ALTER COLUMN identificador_producto
        SET DEFAULT nextval('producto_identificador_seq');

ALTER TABLE producto
    ALTER COLUMN stock SET DEFAULT 0;
