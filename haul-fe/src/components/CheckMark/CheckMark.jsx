import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

const PREDEFINED_SIZE_MAP = {
  small: '16px',
  medium: '26px',
  large: '52px',
  xLarge: '72px',
  xxLarge: '96px',
};

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const scale = keyframes`
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`;

const fill = keyframes`
  100% {
    box-shadow: inset 0 0 0 100vh var(--checkmark-fill-color);
  }
`;

const CheckmarkSVG = styled.svg`
  border-radius: 50%;
  stroke: var(--checkmark-arrow-color);
  stroke-width: var(--checkmark-arrow-thickness);
  stroke-miterlimit: 10;
  animation: ${fill} 0.4s ease-in-out 0.4s forwards,
              ${scale} 0.3s ease-in-out 0.9s both;
`;

const Circle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: var(--checkmark-arrow-thickness);
  stroke-miterlimit: 10;
  stroke: var(--checkmark-fill-color);
  fill: none;
  animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

const Path = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
`;

export default function Checkmark({ size, color }) {
  const computedSize = PREDEFINED_SIZE_MAP[size] || size;
  const style = { 
    '--checkmark-fill-color': color || '#000B49', 
    '--checkmark-arrow-color': '#fff',
    '--checkmark-arrow-thickness': '5',
    width: computedSize, 
    height: computedSize 
  };

  return (
    <CheckmarkSVG style={style} viewBox="0 0 52 52">
      <Circle cx="26" cy="26" r="25" fill="none" />
      <Path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </CheckmarkSVG>
  );
}

Checkmark.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

Checkmark.defaultProps = {
  size: 'large',
};
