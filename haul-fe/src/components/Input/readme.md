# Input

<img width="378" alt="image" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/100525337/1d1ae5cd-d873-4d7a-958e-3d9ce8c7b880">

Input에 대한 공용 컴포넌트입니다.

## props

1. `type`

   input에 들어가는 type을 입력해주시면 됩니다.

2. `size`
   1. big
   2. small
3. `placeholder`

   값을 입력하지 보여줄 문자열 입니다.

4. `onChage`

   input에 들어갈 onChage함수를 넣어줍니다. (useRef의 값을 넣는 것을 추천합니다 ⇒ 재랜더링 최소화)

5. `value`

   input의 속성 중 value에 넣을 값을 넣어줍니다.

6. `defaultValue`

   input에 default Value를 지정해줍니다.

7. `readOnly`

   Input에 값을 변동하지 않은건지 true or flase로 값을 넣어줍니다.

8. `unit`

   단위를 삽입하고 싶을시 String 형태로 입력합니다.

9. `textAlign`

   Input에 입력할때 text정렬을 정의합니다 .Right or Left

10. `onlyEnglish`

    영어만 한글만 쓰게 할 것인지

## ex) 예시 사용 코드

```jsx
const inputValue = useRef("");

<Input
    size="big"
    placeholder="Phone Number "
    inputValue={inputValue}
		value={"이걸 넣어줘!!"}
></Input>
<Input
    size="small"
    placeholder="Phone Number "
    onChange={({ target: { value } }) => {
          password.current = value;
        }}
></Input>
```
