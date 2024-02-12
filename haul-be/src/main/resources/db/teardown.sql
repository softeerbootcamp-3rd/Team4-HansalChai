SET
REFERENTIAL_INTEGRITY FALSE;
TRUNCATE TABLE car;
TRUNCATE TABLE reservation;
SET
REFERENTIAL_INTEGRITY TRUE;

INSERT INTO car (type, model, photo, width, length, height, weight, category, isboxtruck, created_at, updated_at)
VALUES
    ('TRUCK500', '0.5톤트럭 모델', 'truck500_photo.jpg', 200, 300, 400, 1000, 'DEFAULT', true,  NOW(), NOW()),
    ('TRUCK1000', '1톤트럭 모델', 'truck1000_photo.jpg', 250, 350, 450, 1500, 'DEFAULT', true,  NOW(), NOW()),
    ('TRUCK5000', '5톤트럭 모델', 'truck5000_photo.jpg', 300, 400, 500, 5000, 'DEFAULT', false,  NOW(), NOW()),
    ('TRUCK8000', '8톤트럭 모델', 'truck8000_photo.jpg', 350, 450, 550, 8000, 'IS_REFRIGERABLE', true,  NOW(), NOW()),
    ('TRUCK15000', '15톤트럭 모델', 'truck15000_photo.jpg', 400, 500, 600, 15000, 'IS_FREEZABLE', false,  NOW(), NOW());
