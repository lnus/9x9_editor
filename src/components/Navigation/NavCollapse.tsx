import { Anchor, AppShell, Burger, Button, Group, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeButton } from '../ColorSchemeToggle/ColorSchemeButton';
import React from 'react';
import {
  IconEdit,
  IconPackages,
  IconParentheses,
  IconRectangularPrismPlus,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { NavbarEntry } from './NavbarEntry';

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
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      aside={{
        width: 80,
        breakpoint: 'sm',
        collapsed: { mobile: true, desktop: asideContent ? false : true },
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
        <Stack>
          <NavbarEntry href="/" icon={<IconEdit />} tooltipLabel="Editor" content="Editor" />
          <NavbarEntry
            href="/schematics"
            icon={<IconPackages />}
            tooltipLabel="Schematics"
            content="Schematics"
          />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
