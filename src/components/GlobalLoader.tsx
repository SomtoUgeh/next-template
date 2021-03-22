import { Spinner } from './Loaders';
import { css } from '@emotion/react';
import { useIsFetching } from 'react-query';

export function GlobalLoader() {
  const isFetching = useIsFetching();

  return (
    <Spinner
      css={css`
        top: 0.5rem;
        right: 0.5rem;
        position: absolute;
        transition: 0.3s ease;
        vertical-align: middle;
      `}
      style={{
        opacity: isFetching ? 1 : 0,
      }}
    />
  );
}
