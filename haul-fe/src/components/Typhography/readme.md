# Typhography

프로젝트에서 글자를 쓰기 위한 컴포넌트입니다.
Span의 경우 span태그로 이루어져있으며, 기본은 P태그 기반입니다.

## props

1. font

   이는 글꼴 + 크기로 입력하시면 됩니다. ex) semiBold + 24px ⇒ semiBold24

2. color

   컬러는 theme에 있는 컬러의 이름을 사용하시면 됩니다.

3. singleLine

   글자가 컴포넌트를 넘어갈 시 다음 줄로 가지 않고 … 처리하는 props입니다. true일 경우 한줄로만 표시하고 넘치는건 … 처리합니다.

## ex) 예시 사용 코드

```jsx
<Typography font="bold36" color="subColor">
        테스트 테스트
</Typography>
<Typography font="medium16" color="mainColor">
        테스트 테스트
</Typography>
<Typography font="semiBold20" color="subColor">
        테스트 테스트
</Typography>
```
