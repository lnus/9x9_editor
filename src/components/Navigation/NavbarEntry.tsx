import { ReactNode } from 'react';
import { Anchor, Button, Tooltip } from '@mantine/core';
import { Link } from 'react-router-dom';

export const NavbarEntry = ({
  href,
  icon,
  tooltipLabel,
  content,
}: {
  href: string;
  icon: ReactNode;
  tooltipLabel: string;
  content: string; // Maybe change to React.ReactNode
}) => {
  return (
    <Tooltip label={tooltipLabel} position="right" offset={5}>
      <Link to={href}>
        <Button fullWidth leftSection={icon} variant="light">
          {content}
        </Button>
      </Link>
    </Tooltip>
  );
};
