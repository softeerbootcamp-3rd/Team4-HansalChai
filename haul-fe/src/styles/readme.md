# styles

스타일에 관련한 파일들을 모은 폴더입니다.

---

## GlobalStyle.jsx

필요한만큼 각 선택자의 기본 스타일을 해제하는 파일입니다.
기본적으로 styled-reset 라이브러리의 reset이 적용되어있습니다.

|선택자|해제한 스타일|
|---|-----|
|html, body, #root|width, height, background-color|
|html, body, #root ::-webkit-scrollbar|display|
|html|-webkit-text-size-adjust, text-size-adjust|
|*|box-sizing, outline, margin, padding, -ms-overflow-style, scrollbar-width|
|*::-webkit-scrollbar|display|
|a|text-decoration|
|input|border, outline, background, min-width|
|input:focus|outline|
|input.textarea|resize, background|
|button|border, outline, background|
|img|border, background-repeat|
|input[type='radio'], input[typ'radio']:checked|apperance, width, height, border-radius, margin-right|
|select|-o-appearance, -webkit-appearance, -moz-appearance, appearance|

---

## theme

자주 사용한 css테마를 모은 폴더입니다.