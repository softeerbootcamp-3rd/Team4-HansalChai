# Toast Maker

<img width="692" alt="image" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/100525337/d77236b9-dfd1-4d6a-afed-b0fef98f95a7">

프로젝트에서 사용하는 토스트 컴포넌트 생성 함수입니다.
라이브러리를 사용하지 않고 본 프로젝트에선 직접 개발한 토스트를 사용합니다.

# Props

- type - string
  - Toast의 타입을 결정하는 props
  - 가능한 값
    - “info” - 정보 전달
    - “success” - 성공
    - “warning” - 경고
    - “error” - 에러
- children - string
  - Toast 메세지를 전달하는 props
  - 가능한 값
    - “아무 메세지 string”
    - JSX

모든 Toast 메세지는 하단에 생성되며 3초 뒤 사라집니다.

# 예시

```html
ToastMaker({type:"success", children:"성공!")
```
