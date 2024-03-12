import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { SchematicsPage } from './pages/Schematics.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/schematics',
    element: <SchematicsPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
