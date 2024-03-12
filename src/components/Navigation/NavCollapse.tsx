import { Anchor, AppShell, Burger, Button, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeButton } from '../ColorSchemeToggle/ColorSchemeButton';
import { useAsideContent } from '@/contexts/AsideContentContext';
import React from 'react';
import { IconRectangularPrismPlus } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router-dom';

export function NavCollapse({
  children,
  asideContent,
}: {
  children: React.ReactNode;
  asideContent?: React.ReactNode;
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      aside={{
        width: asideContent ? 80 : 0,
        breakpoint: 'sm',
        collapsed: { mobile: true }, // Always collapsed on mobile
      }}
      padding="md"
    >
      <AppShell.Aside p="md">{asideContent}</AppShell.Aside>
      <AppShell.Header>
        <Group h="100%" grow px="md">
          <Group justify="flex-start">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Anchor href="/" underline="never">
              <Group>
                <IconRectangularPrismPlus size={30} />
                <Title order={3}>eightyone</Title>
              </Group>
            </Anchor>
          </Group>
          <Group justify="flex-end" mr="sm">
            <ColorSchemeButton />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          Test
        </Button>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
