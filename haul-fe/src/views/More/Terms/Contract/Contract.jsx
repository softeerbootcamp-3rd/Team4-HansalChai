import Header from "../../../../components/Header/Header.jsx";
import Margin from "../../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../../components/MobileLayout/MobileLayout.jsx";
import NavigationBar from "../../../../components/NavigationBar/NavigationBar.jsx";
import styled from "styled-components";
import Typography from "../../../../components/Typhography/Typhography.jsx";
import Contracts from "../../../../data/Contracts.js";

const contractType = {
  services: "이용약관",
  privacy: "개인정보 처리방침",
  transportation: "화물자동차 운송주선약관",
  location: "위치기반서비스 이용약관"
};

const ContractView = styled.pre`
  width: 100%;
  height: calc(100vh - 10px - 24px - 32px - 83px);
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  overflow-y: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
  ${({ theme }) => theme.font.medium12};
`;

const Contract = ({ type }) => {
  return (
    <MobileLayout>
      <Header home={true} back={true}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          {contractType[type]}
        </Typography>
      </Header>
      <Margin height="32px" />
      <ContractView>{Contracts[type]}</ContractView>
      <NavigationBar selected="more" />
    </MobileLayout>
  );
};

export default Contract;
