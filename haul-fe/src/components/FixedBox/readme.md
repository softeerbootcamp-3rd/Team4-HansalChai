# FixedCenterBox

정중앙에 고정되어있는 경우를 위한 컴포넌트입니다. bottom에 해당하는 값만 넣으면 fixed로 고정해주는 값입니다.

## props

1. bottom

   정중앙에서 아래기준으로 얼마나 올라올지에 대한 값입니다. ex) “10px”, “10%”

## 사용 예시 코드

```jsx
<FixedCenterBox bottom="30px">
  <BottomButton role="main" disabled={isButtonDisabled}>
    로그인하기
  </BottomButton>
  <Margin height="10px" />
  <BottomButton role="sub" disabled={false}>
    비회원으로 접속하기
  </BottomButton>
</FixedCenterBox>
```
