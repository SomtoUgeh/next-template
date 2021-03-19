import { css } from '@emotion/react';
import { useIsFetching } from 'react-query';
import { Spinner } from './Loaders';

export function GlobalLoader() {
  const isFetching = useIsFetching();

  return (
    <Spinner
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
