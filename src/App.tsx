import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/code-highlight/styles.css';
import { AppShell, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';
import { theme } from './theme';
import { NavCollapse } from './components/Navigation/NavCollapse';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications position="bottom-right" />
        <NavCollapse>
          <Router />
        </NavCollapse>
      </ModalsProvider>
    </MantineProvider>
  );
}
