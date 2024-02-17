INSERT INTO users (name, tel, password, email, photo, role, created_at, updated_at)
VALUES
    ('John Doe', '1234567890', 'password1', 'john@example.com', 'john.jpg', 'CUSTOMER', NOW(), NOW()),
    ('Jane Smith', '9876543210', 'password2', 'jane@example.com', 'jane.jpg', 'CUSTOMER', NOW(), NOW()),
    ('Alice Johnson', '5551234567', 'password3', 'alice@example.com', 'alice.jpg', 'CUSTOMER', NOW(), NOW()),
    ('Bob Brown', '9998887777', 'password4', 'bob@example.com', 'bob.jpg', 'CUSTOMER', NOW(), NOW()),
    ('Charlie Davis', '1112223333', 'password5', 'charlie@example.com', 'charlie.jpg', 'CUSTOMER', NOW(), NOW());

INSERT INTO car (type, model, photo, width, length, height, weight, category, isboxtruck, created_at, updated_at)
VALUES
    ('TRUCK500', '뉴다마스', 'damas.png', 175, 126, 126, 500, 'DEFAULT', false,  NOW(), NOW()),
    ('TRUCK1000', '포터2', 'porter2.png', 280, 160, 30, 1000, 'DEFAULT', false,  NOW(), NOW()),
    ('TRUCK1000', '포터2', 'porter2.png', 300, 160, 140, 1000, 'DEFAULT', true,  NOW(), NOW()),
    ('TRUCK1000', '포터2', 'porter2.png', 270, 160, 150, 1000, 'IS_REFRIGERABLE', true,  NOW(), NOW()),
    ('TRUCK1000', '포터2', 'porter2.png', 280, 160, 150, 1000, 'IS_FREEZABLE', true,  NOW(), NOW()),
    ('TRUCK5000', '메가트럭', 'megatruck.png', 460, 230, 40, 5000, 'DEFAULT', false,  NOW(), NOW()),
    ('TRUCK8000', '마이티', 'mighty.png', 430, 180, 40, 8000, 'DEFAULT', false,  NOW(), NOW()),
    ('TRUCK8000', '마이티', 'mighty.png', 430, 190, 190, 8000, 'DEFAULT', true,  NOW(), NOW()),
    ('TRUCK8000', '마이티', 'mighty.png', 430, 180, 180, 8000, 'IS_REFRIGERABLE', true,  NOW(), NOW()),
    ('TRUCK8000', '마이티', 'mighty.png', 430, 190, 190, 8000, 'IS_FREEZABLE', true,  NOW(), NOW()),
    ('TRUCK15000', '파비스', 'pavise.png', 700, 240, 270, 15000, 'DEFAULT', false,  NOW(), NOW()),
    ('TRUCK15000', '파비스', 'pavise.png', 700, 240, 270, 15000, 'DEFAULT', true,  NOW(), NOW()),
    ('TRUCK15000', '파비스', 'pavise.png', 700, 240, 270, 15000, 'IS_REFRIGERABLE', true,  NOW(), NOW()),
    ('TRUCK15000', '파비스', 'pavise.png', 700, 240, 270, 15000, 'IS_FREEZABLE', true,  NOW(), NOW());
