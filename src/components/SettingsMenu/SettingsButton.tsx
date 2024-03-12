// TODO: Use if needed, but for now just use ActionButton from @mantine/core

import { ActionIcon, Tooltip } from '@mantine/core';
import React from 'react';

export const SettingsButton = ({
  tooltipLabel,
  onClick,
  icon,
}: {
  tooltipLabel: string;
  onClick: () => void;
  icon: React.ReactNode;
}) => {
  return (
    <Tooltip
      label={tooltipLabel}
      position="left"
      transitionProps={{ duration: 100, transition: 'rotate-left' }}
    >
      <ActionIcon
        onClick={onClick}
        variant="subtle"
        aria-label={tooltipLabel} // Might change this
      >
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};
