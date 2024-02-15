# repository

이 폴더에서는 API 연결하는 함수를 정의해둡니다.
모든 API 함수들은 다음과 같은 리턴 값을 가집니다.

1. `success`
   요청이 성공인지, 실패인지를 의미합니다. => true or false
2. `data`
   요청에서 받아온 데이터를 저장합니다.
3. `message`
   요청에서 보내온 데이터나 API함수가 전달하고 싶은 Message를 string형태로 제공합니다.

API 함수 사용 후에 이 3개를 가지고 사용하시면 됩니다.

---

# userRepository

## 1. loginFun

회원 로그인을 위한 API 함수입니다.

### parameter

사용자가 로그인하기 위해 입력한 전화번호와 비밀번호를 입력하면 됩니다.

1. tel
2. password

### 사용법

```js
const { success, data, message } = await loginFun({
  tel: "01012341234",
  password: "12341234"
});
```

## 2. signUpFun

회원가입을 위한 API 함수입니다.

### parameter

사용자가 회원가입할때 입력한 값들을 전달하면 됩니다.

1. name
2. tel
3. password
4. email

### 사용법

```js
const { success, data, message } = await signUpFun({
  name: "김철수",
  tel: "01012341234",
  password: "12341234",
  email: "haul1234@ddd.com"
});
```

---

# reservationRepository

## 1. memberReservationFun

회원이 예약을 진행할때 결과를 불러오는 API함수입니다.
성공 시 리턴 값으로 제공되어지는 운송 정보와 함께 예약번호를 제공받을 수 있습니다.

### parameter

reservation Store에 저장되어있는 모든 reservationState을 인자로 제공합니다.

1. transportType
2. reservationDate
3. reservationTime
4. srcName
5. srcAddress
6. srcCoordinate
7. srcDetailAddress
8. srcTel
9. dstName
10. dstAddress
11. dstCoordinate
12. dstDetailAddress
13. dstTel
14. cargoWeight
15. cargoWidth
16. cargoLength
17. cargoHeight
18. specialNotes

### 사용법

```js
const { success, data, message } = await memberReservationFun(reservationState);
```

## 2. guestReservationFun

비회원이 예약을 진행할때 결과를 불러오는 API함수입니다.
성공 시 리턴 값으로 제공되어지는 운송 정보와 함께 예약번호를 제공받을 수 있습니다.

### parameter

reservation Store에 저장되어있는 모든 reservationState을 인자로 제공합니다.

1. transportType
2. reservationDate
3. reservationTime
4. srcName
5. srcAddress
6. srcCoordinate
7. srcDetailAddress
8. srcTel
9. dstName
10. dstAddress
11. dstCoordinate
12. dstDetailAddress
13. dstTel
14. cargoWeight
15. cargoWidth
16. cargoLength
17. cargoHeight
18. specialNotes
19. guestName
20. guestTel

### 사용법

```js
const { success, data, message } = await guestReservationFun(reservationState);
```

## 3. memberReservationConfirmFun

`memberReservationFun` 에서 제공받은 예약번호를 인자로 보내면 그 예약이 확정이 되는 API함수입니다.

### parameter

`memberReservationFun` 에서 제공받은 예약번호를 보냅니다.

1. reservationId

### 사용법

```js
const { success, data, message } = await guestReservationConfirmFun({
  reservationId: 1
});
```

## 4. guestReservationConfirmFun

`guestReservationFun` 에서 제공받은 예약번호를 인자로 보내면 그 예약이 확정이 되는 API함수입니다.

### parameter

`guestReservationFun` 에서 제공받은 예약번호를 보냅니다.

1. reservationId

### 사용법

```js
const { success, data, message } = await guestReservationConfirmFun({
  reservationId: 1
});
```
