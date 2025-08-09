'use client';

import { createPortal } from 'react-dom';
import React from 'react';

interface PortalProps {
  children: React.ReactNode;
}

export function Portal({ children }: PortalProps) {
  if (typeof window === 'undefined') return null;
  const el = document.getElementById('achievements-portal');
  return el ? createPortal(children, el) : null;
}
