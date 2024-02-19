import Flex from "../../../components/Flex/Flex.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import EmptyIcon from "../../../assets/svgs/EmptyIcon.svg";

const EmptyListHolder = () => {
  return (
    <Flex kind={"flexColumnCenter"}>
      <Margin height={"88px"} />
      <img src={EmptyIcon} width={108} />
      <Margin height={"24px"} />
      <Typography font={"semiBold16"} color={"halfGray"}>
        예약할 수 있는 일정이 없어요.
      </Typography>
    </Flex>
  );
};

export default EmptyListHolder;
