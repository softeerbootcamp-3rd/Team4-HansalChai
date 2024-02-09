import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Header from "../../../components/Header/Header.jsx";
import Typography_Span from "../../../components/Typhography/Typhography_Span.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";

const ChoiceSrc = () => {
  return <MobileLayout> 
    <Margin height="20px" />
    <Header>
      HAUL<Typography_Span color="subColor">.</Typography_Span>
    </Header>
    <Typography></Typography>
  </MobileLayout>;
};

export default ChoiceSrc;
