import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  // background-color: #222;
`;

const Loader = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  animation: ${keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `} 1s linear infinite;
`;

function TerminalLoader() {
    return (
        <Container>
            <Loader />
        </Container>
    );
}

export default TerminalLoader;
