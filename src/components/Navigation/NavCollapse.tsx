import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { ColorSchemeButton } from '../ColorSchemeToggle/ColorSchemeButton';
import { useAsideContent } from '@/contexts/AsideContentContext';
import React from 'react';

export function NavCollapse({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
  const { asideContent } = useAsideContent();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      aside={{
        width: 80,
        breakpoint: 'sm', // Probably not necessary since it's always collapsed
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
            <MantineLogo size={30} />
          </Group>
          <Group justify="flex-end">
            <ColorSchemeButton />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Skeleton height={40} mb="md" radius="sm" />
        <Skeleton height={40} mb="md" radius="sm" />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
