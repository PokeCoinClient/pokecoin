import {
  createReactRouter,
  createRouteConfig,
  Outlet,
} from '@tanstack/react-router';
import React from 'react';
import { Container, Flex } from '@chakra-ui/react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Mine from './pages/Mine';

const rootRoute = createRouteConfig({
  component: () => {
    return (
      <Container maxW="container.xl" h="100%">
        <Navbar />
        <Flex justifyContent="space-between" h="90vh">
          <Outlet />
        </Flex>
      </Container>
    );
  },
});

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: Home,
});

const shopRoute = rootRoute.createRoute({
  path: '/shop',
  component: Shop,
});

const mineRoute = rootRoute.createRoute({
  path: '/mine',
  component: Mine,
});

const routeConfig = rootRoute.addChildren([indexRoute, shopRoute, mineRoute]);

const router = createReactRouter({
  routeConfig,
  defaultPreload: 'intent',
});

export default router;
