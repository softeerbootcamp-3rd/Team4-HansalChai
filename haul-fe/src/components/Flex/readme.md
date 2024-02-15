# Flex

프로젝트에서 플렉스를 주기 위해 매번 박스를 만들고 플렉스를 줄 필요 없이, Flex를 쉽게 주기 위한 컴포넌트입니다.

## props

1. kind

   어떤 Flex 종류를 줄지 선택하는 props 입니다. 이는 theme에 적용되어져있는 style을 지원합니다.

   ```jsx
   flexCenter: `
           display: flex;
           justify-content: center;
           align-items: center;
         `,
     flexCenterColumn: `
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
         `,
     flexBetween: `
       display: flex;
       justify-content: space-between;
       align-items: center;
       `,
   ```

## ex) 예시 사용 코드

```jsx
<Flex kind="flexBetween">
  <div>ex</div>
  <div>ex</div>
</Flex>
```
