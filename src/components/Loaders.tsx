import * as React from 'react';
import styled from '@emotion/styled';
import { Spinner as VerifySpinner, SpinnerProps } from '@chakra-ui/react';

export function Spinner(props: SpinnerProps) {
  return <VerifySpinner size="sm" {...props} />;
}

export function FullPageSpinner(props: SpinnerProps) {
  return (
    <SpinnerContainer>
      <Spinner {...props} />
    </SpinnerContainer>
  );
}

const SpinnerContainer = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
`;
