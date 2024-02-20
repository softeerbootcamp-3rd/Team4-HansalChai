import styled from "styled-components";
import Flex from "../../../../components/Flex/Flex";

const TabBarFrame = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexRow};
  justify-content: start;
  overflow-x: scroll;
  white-space: nowrap;
  position: relative;
  gap: 12px;
  left: -20px;
  padding: 0px 20px;
`;

const TabBarItem = styled.button`
  width: fit-content;
  height: 24px;
  ${({ theme }) => theme.font.semiBold20};
  ${({ theme }) => theme.flex.flexRowCenter};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.selectCircle : theme.colors.tabBarEntry};
  border-bottom: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.colors.selectCircle}` : "none"};
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
