import {
  createReactRouter,
  createRouteConfig,
  Outlet,
} from '@tanstack/react-router';
import React from 'react';
import { Container } from '@chakra-ui/react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Mine from './pages/Mine';

const rootRoute = createRouteConfig();

const layoutRoute = rootRoute.createRoute({
  id: 'layout',
  component: () => {
    return (
      <Container maxW="container.xl" height="98vh">
        <Navbar />
        <Outlet />
      </Container>
    );
  },
});

const Routes = [
  {
    path: '/',
    component: () => <Home />,
  },
  {
    path: '/shop',
    component: () => <Shop />,
  },
  {
    path: '/mine',
    component: () => <Mine />,
  },
];

const routesFactory = Routes.map((route) => {
  return layoutRoute.createRoute({
    id: route.path,
    path: route.path,
    component: route.component,
  });
});

const routeConfig = rootRoute.addChildren([
  layoutRoute.addChildren([...routesFactory]),
]);

const router = createReactRouter({
  routeConfig,
  defaultPreload: 'intent',
});

export default router;
