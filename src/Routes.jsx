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

const indexRoute = layoutRoute.createRoute({
  path: '/',
  component: Home,
});

const shopRoute = layoutRoute.createRoute({
  path: '/shop',
  component: Shop,
});

const mineRoute = layoutRoute.createRoute({
  path: '/mine',
  component: Mine,
});

const routeConfig = rootRoute.addChildren([
  layoutRoute.addChildren([indexRoute, shopRoute, mineRoute]),
]);

const router = createReactRouter({
  routeConfig,
  defaultPreload: 'intent',
});

export default router;
