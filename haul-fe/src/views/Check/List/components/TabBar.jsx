import styled from "styled-components";
import Margin from "../../../../components/Margin/Margin.jsx";
import Flex from "../../../../components/Flex/Flex.jsx";

const TabBarFrame = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexRow};
  justify-content: start;
`;

const TabBarItem = styled.button`
  width: fit-content;
  height: 24px;
  ${({ theme }) => theme.font.semiBold20};
  ${({ theme }) => theme.flex.flexRowCenter};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.selectCircle : theme.colors.tabBarEntry};
`;

const TabBar = ({ tabBarList, setSelected, selected }) => {
  return (
    <TabBarFrame>
      {tabBarList.map((item, index) => {
        return (
          <Flex kind={"flexCenter"} key={`tabbar${index}`}>
            <TabBarItem
              selected={selected === index}
              onClick={() => setSelected(() => index)}
            >
              {item}
            </TabBarItem>
            <Margin width="20px" />
          </Flex>
        );
      })}
    </TabBarFrame>
  );
};

export default TabBar;
