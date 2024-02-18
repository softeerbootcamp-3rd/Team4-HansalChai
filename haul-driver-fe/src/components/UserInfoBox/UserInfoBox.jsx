import styled from "styled-components";
import Typography from "../Typhography/Typhography";
import TypographySpan from "../Typhography/TyphographySpan";
import UnderBar from "../UnderBar/UnderBar";
import Margin from "../Margin/Margin";
import Flex from "../Flex/Flex";
import UserIcon from "../../assets/svgs/UserCheck.svg";

const Box = styled.div`
  height: auto;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grayBoxBorder};
  background: ${({ theme }) => theme.colors.grayBoxBackground};
  padding: 10px 18px;
`;

const InfoBox = styled.div`
  display: flex;
  gap: 14px;
`;

const UserIconBox = styled.img`
  border-radius: 10px;
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.white};
`;

const UserInfoBox = ({ kind, name, tel }) => {
  const telForm = `tel:${tel}`;
  return (
    <Box>
      {kind == "user" && (
        <Typography font="semiBold16">
          신청하신 <TypographySpan color="subColor">이용자</TypographySpan> 분을
          소개할게요.
        </Typography>
      )}
      {kind == "src" && (
        <Typography font="semiBold16">
          <TypographySpan color="subColor">출발지</TypographySpan>에 오시면
          여기로 전화주세요.
        </Typography>
      )}
      {kind == "dst" && (
        <Typography font="semiBold16">
          <TypographySpan color="subColor">도착지</TypographySpan>에 오시면
          여기로 전화주세요.
        </Typography>
      )}
      <Margin height="10px" />
      <UnderBar />
      <Margin height="10px" />
      <InfoBox>
        <UserIconBox src={UserIcon} />
        {name ? (
          <Flex kind="flexColumnBetween" style={{ margin: "10px 0px" }}>
            <Typography font="semiBold16">{name}</Typography>
            <Typography font="medium16">
              <a
                href={telForm}
                style={{ color: "black", textDecoration: "underline" }}
              >
                {tel}
              </a>
            </Typography>
          </Flex>
        ) : (
          <Flex kind="flexCenter" style={{ margin: "10px 0px" }}>
            <Typography font="semiBold16">{name}</Typography>
            <Typography font="medium16">
              <a
                href="{telForm}"
                style={{ color: "black", textDecoration: "underline" }}
              >
                {tel}
              </a>
            </Typography>
          </Flex>
        )}
      </InfoBox>
    </Box>
  );
};
export default UserInfoBox;
