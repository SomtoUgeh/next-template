import { css } from '@emotion/react';
import { useIsFetching } from 'react-query';
import { Spinner } from '@chakra-ui/spinner';
import { SpinnerProps } from '@chakra-ui/react';

export function GlobalLoader() {
  const isFetching = useIsFetching();

  return (
    <Loader
      css={css`
        top: 0.5rem;
        right: 0.5rem;
        position: absolute;
        vertical-align: middle;
      `}
      style={{
        opacity: isFetching ? 1 : 0,
      }}
    />
  );
}

function Loader(props: SpinnerProps) {
  return <Spinner size="sm" {...props} />;
}
