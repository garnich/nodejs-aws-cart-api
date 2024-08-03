-- Creating tables scripts

CREATE TABLE carts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('OPEN', 'ORDERED'))
);

CREATE TABLE cart_items (
    cart_id UUID REFERENCES carts(id),
    product_id UUID,
    count INTEGER,
    PRIMARY KEY (cart_id, product_id)
);

-- Fill tables with test data scripts

INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
('db4dc669-b899-49a5-beca-ae2171285c67', '258c0926-3d00-451f-9544-72c6b2315378', '2024-07-13', '2024-07-13', 'OPEN'),
('f7e02ca1-ef4e-461f-be1c-7ba30381298b', 'd8c78c4f-399c-48a4-92bc-06073844c79b', '2024-07-13', '2024-07-13', 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count) VALUES
('db4dc669-b899-49a5-beca-ae2171285c67', '61f8b05d-7a89-4163-82b5-133aa040ce63', 10),
('db4dc669-b899-49a5-beca-ae2171285c67', 'a297f4f5-6c6e-4638-a6f4-e2b2d60822e0', 30),
('f7e02ca1-ef4e-461f-be1c-7ba30381298b', '61f8b05d-7a89-4163-82b5-133aa040ce63', 20),
('f7e02ca1-ef4e-461f-be1c-7ba30381298b', 'f75483f5-ccb4-4e4e-971a-3317f99607eb', 10);
