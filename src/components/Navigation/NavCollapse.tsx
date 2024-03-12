import { Anchor, AppShell, Burger, Group, NavLink, Skeleton, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';

export function NavCollapse({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      // aside={{
      //   width: 80,
      //   breakpoint: 'sm', // Probably not necessary since it's always collapsed
      //   collapsed: { mobile: true }, // Always collapsed on mobile
      // }}
      padding="md"
    >
      {/* Only render on "/" */}
      {/* <AppShell.Aside p="md">
        <Stack align="center">
          {Array.from({ length: 15 }).map((_, index) => (
            <Skeleton key={index} height={40} width={40} radius="md" />
          ))}
        </Stack>
      </AppShell.Aside> */}
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <MantineLogo size={30} />
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
