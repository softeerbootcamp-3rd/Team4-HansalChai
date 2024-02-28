## Theme.jsx

자주 사용하는 스타일을 모아 둔 파일입니다.

root이하 모든 view에서 props.theme.(css유형).(key)의 형태로 사용 가능합니다.

---

## colors

자주 사용하는 색을 모아둔 Object입니다.

| Key                | Value        |
| ------------------ | ------------ |
| white              | #ffffff      |
| black              | #1B1313      |
| mainColor          | #000B49      |
| subColor           | #446EDA      |
| disabledColor      | #D8D9DA      |
| accentColor        | #F3EDC8      |
| realBlack          | #000000      |
| darkGray           | #4D4D4D      |
| gray               | #717171      |
| lightGray          | #E0DEDE      |
| lightBlue          | #2368F7      |
| alertRed           | #D83B3B      |
| grayBoxBorder      | rgba(0, 0, 0, 0.1) |
| grayBoxBackground  | rgba(0, 0, 0, 0.02) |
| successGreen       | #0D9276      |
| unselectedGray     | #ADADAD      |
| cardBackground     | #00000005    |
| cardBorder         | #00000019    |
| carBackground      | #0000000A    |
| inputGray          | rgba(0, 0, 0, 0.04) |
| inputGrayDark      | rgba(0, 0, 0, 0.06) |
| grayText           | rgba(16, 16, 16, 0.5) |
| selectCircle       | #596FB7      |
| successBackground  | #0d927519    |
| errorBackground    | #d83b3b19    |
| warningBackground  | #e6be0019    |
| infoBackground     | #e0dede19    |
| successColor       | #0d9276      |
| errorColor         | #d83b3b      |
| warningColor       | #e6be00      |
| infoColor          | #afafaf      |
| subButtonBackground| #F3EDC8      |
| upperTextColor     | #10101080    |
| radioUnchecked     | #89939e33    |
| tabBarEntry        | #00000033    |
| goButton           | #d9d9d94c    |
| halfGray           | #0000007F    |
| completeGray       | #FCFCFC      |

---

## font

자주 설정하는 글꼴 설정을 모은 Object 입니다.

|font-family|font-size|
|-----|-----|
|bold|12, 14, 16, 20, 24, 32, 36|
|semiBold|12, 14, 16, 18, 20|
|medium|10, 12, 16|
|regular|12, 14, 16|

bold12나 semiBold20 의 형태로 key를 이루어 사용할 수 있습니다.

---

## flex

자주 설정하는 flex 컨테이너 설정 Object입니다.
key값을 Flex 컴포넌트의 kind 속성값으로 주어 적용할 수도 있습니다.

|key|flex-direction|justify-content|align-items|
|---|-----|-----|-----|
|flexCenter| |center|center|
|flexColumn|column| | |
|flexColumnCenter|column|center|center|
|flexColumnBetween|column|space-between| |
|flexColumnAroundAlignCenter|column|center|space-around|
|flexRow| | | |
|flexRowCenter| |center| |
|flexRowAlignCenter| | |center|
|flexBetweenAlignCenter| |center|space-between|
|flexBetweenCenter| |center|space-between|
|flexBetween| | |space-between|

---

## animation

모달 애니메이션을 나타내는 Object입니다.

