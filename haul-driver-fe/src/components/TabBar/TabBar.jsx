import styled from "styled-components";
import Margin from "../Margin/Margin.jsx";
import Flex from "../Flex/Flex.jsx";

const TabBarFrame = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexRow};
  justify-content: start;
`;

const TabBarItem = styled.button`
  width: fit-content;
  height: 24px;
  margin: 0 10px;
  ${({ theme }) => theme.font.semiBold20};
  ${({ theme }) => theme.flex.flexRowCenter};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.selectCircle : theme.colors.tabBarEntry};
  border-bottom: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.colors.selectCircle}` : 'none'};
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
          </Flex>
        );
      })}
    </TabBarFrame>
  );
};

export default TabBar;
