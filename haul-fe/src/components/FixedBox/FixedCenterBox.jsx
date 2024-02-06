import { MaxDeviceWidth } from "../../data/GlobalVariable";
import styled, { css } from "styled-components";

const FixedCenterBox = styled.div`
  max-width: ${MaxDeviceWidth};
  width: 100%;
  position: fixed;
  padding: 0 20px;
  left: 50%;
  transform: translateX(-50%);
  ${({ bottom }) =>
    bottom &&
    css`
      bottom: ${bottom};
    `}
`;

export default FixedCenterBox;
