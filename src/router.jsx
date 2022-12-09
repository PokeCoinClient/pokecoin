import {
  createReactRouter,
  createRouteConfig,
  Outlet,
} from '@tanstack/react-router';
import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Mine from './pages/Mine';
import Cards from './pages/Cards';

const rootRoute = createRouteConfig({
  component: () => {
    return (
      <Container maxW="container.xl">
        <Navbar />
        <Box h="94vh">
          <Outlet />
        </Box>
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

const cardsRoute = rootRoute.createRoute({
  path: '/cards',
  component: Cards,
});

const mineRoute = rootRoute.createRoute({
  path: '/mine',
  component: Mine,
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  cardsRoute,
  mineRoute,
]);

const router = createReactRouter({
  routeConfig,
  defaultPreload: 'intent',
});

export default router;
