'use client';

import React from 'react';

interface MonitorEffectScriptProps {
  nonce?: string;
}

export function MonitorEffectScript({ nonce }: MonitorEffectScriptProps = {}) {
  const script = `
    (function() {
      try {
        var effect = localStorage.getItem('monitor-preset');
        if (effect && ['none', 'crt', 'lcd', 'vhs'].includes(effect) && effect !== 'none') {
          document.documentElement.classList.add('effect-' + effect);
        }
      } catch (e) {}
    })();
  `;

  return (
    <script nonce={nonce} dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />
  );
}
