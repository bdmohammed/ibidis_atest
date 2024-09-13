//@ts-nocheck
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name: string, params: {}) {
  navigationRef.current?.navigate(name, params);
}
