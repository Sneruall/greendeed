// Context to share the ref
import React, { createContext } from 'react';

export const TargetRefContext = createContext<React.RefObject<HTMLDivElement>>(
  {} as React.RefObject<HTMLDivElement>
);
