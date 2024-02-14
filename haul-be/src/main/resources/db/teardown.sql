SET
REFERENTIAL_INTEGRITY FALSE;
TRUNCATE TABLE users;
TRUNCATE TABLE car;
TRUNCATE TABLE reservation;
SET
REFERENTIAL_INTEGRITY TRUE;

INSERT INTO users (name, tel, password, email, photo, role, created_at, updated_at)
VALUES
    ('John Doe', '1234567890', 'password1', 'john@example.com', 'john.jpg', 'CUSTOMER', NOW(), NOW()),
    ('Jane Smith', '9876543210', 'password2', 'jane@example.com', 'jane.jpg', 'CUSTOMER', NOW(), NOW()),
    ('Alice Johnson', '5551234567', 'password3', 'alice@example.com', 'alice.jpg', 'CUSTOMER', NOW(), NOW()),
    ('Bob Brown', '9998887777', 'password4', 'bob@example.com', 'bob.jpg', 'CUSTOMER', NOW(), NOW()),
    ('Charlie Davis', '1112223333', 'password5', 'charlie@example.com', 'charlie.jpg', 'CUSTOMER', NOW(), NOW());


INSERT INTO car (type, model, photo, width, length, height, weight, category, isboxtruck, created_at, updated_at)
VALUES
    ('TRUCK500', '포터2', 'truck500_photo.jpg', 200, 300, 400, 1000, 'DEFAULT', true,  NOW(), NOW()),
    ('TRUCK1000', '포터3', 'truck1000_photo.jpg', 250, 350, 450, 1500, 'DEFAULT', true,  NOW(), NOW()),
    ('TRUCK5000', '포터4', 'truck5000_photo.jpg', 300, 400, 500, 5000, 'DEFAULT', false,  NOW(), NOW()),
    ('TRUCK8000', '포터5', 'truck8000_photo.jpg', 350, 450, 550, 8000, 'IS_REFRIGERABLE', true,  NOW(), NOW()),
    ('TRUCK15000', '포터6', 'truck15000_photo.jpg', 400, 500, 600, 15000, 'IS_FREEZABLE', false,  NOW(), NOW());
