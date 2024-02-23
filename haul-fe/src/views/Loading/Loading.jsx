import styled from "styled-components";
import MobileLayout from "../../components/MobileLayout/MobileLayout";
import Typography from "../../components/Typhography/Typhography";
import Flex from "../../components/Flex/Flex";
import Margin from "../../components/Margin/Margin";
import LoadingGif from "../../assets/gifs/Loading.gif";

const LoadingPage = styled.div`
  width: 100%;
  height: 100vh;
  ${props => props.theme.flex.flexCenter};
`;

const ImgBox = styled.img`
  width: 20%;
`;

const Loading = () => {
  return (
    <MobileLayout>
      <LoadingPage>
        <Flex kind="flexColumnCenter">
          <ImgBox src={LoadingGif} />
          <Margin height="50px" />
          <Typography font="bold20" color="subColor">
            잠시만 기다려주세요...
          </Typography>
        </Flex>
      </LoadingPage>
    </MobileLayout>
  );
};

export default Loading;
