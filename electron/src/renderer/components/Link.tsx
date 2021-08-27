import React from 'react';
import { Link as RRLink } from 'react-router-dom';

export default function Link({ href, children }) {
  return <RRLink to={href}>{children}</RRLink>;
}
