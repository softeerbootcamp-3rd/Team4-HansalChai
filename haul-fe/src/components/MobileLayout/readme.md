# MobileLayout

모바일 레이아웃을 주기 위한 컴포넌트입니다.

이 컴포넌트를 두룰 시에 Global Variable, maxDeviceWidth로 고정이 되며, 밖 영역은 검정색으로 변경됩니다.

기본적으로 minDeviceWidth이 설정되지만 minWidth 속성을 통해 변경할 수 있습니다.

모바일 뷰가 필요한 페이지마다 이를 최상위에 두고 작업을 진행합니다.

```jsx
<MobileLayout>{ 페이지 코드 }</MobileLayout>
<MobileLayout minWidth="320px">{ 페이지 코드 }</MobileLayout>
```
