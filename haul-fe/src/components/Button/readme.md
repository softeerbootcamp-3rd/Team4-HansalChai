# BottomButton

<img width="482" alt="image" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/100525337/e44b7c30-44b8-4fbf-bfad-fa9f32e336e5">

## Props

- role - string
  - 버튼의 역할을 나타내는 props
  - 가능한 값
    - “main”
    - “sub”
- disabled - boolean [Optional]
  - 버튼의 활성 여부를 나타내는 props
  - 가능한 값
    - true
    - false(기본값)
- onClick = function [Optional]
  - 클릭 시 실행 할 handler props
- type = string [Optional]
  - 버튼의 타입을 나타내는 props
  - 가능한 값
    - "submit"
    - "button"
- form = string [Optional]
  - 버튼과 연결할 form 태그의 id를 전달하는 props
  - 가능한 값
    - "someFormID"
- children - any
  - 버튼 하위 요소를 나타내는 props - 텍스트만 쓸 것!
  - 가능한 값
