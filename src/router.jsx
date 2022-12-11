import {
  createReactRouter,
  createRouteConfig,
  Outlet,
  useRouter,
} from '@tanstack/react-router';
import React from 'react';
import { Box, Button, Center, Container, Flex, Text } from '@chakra-ui/react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Cards from './pages/Cards';
import User from './pages/User';
import { useAuth } from './contexts/AuthContext';
import Mine from './pages/Mine';

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
  path: 'shop',
  component: Shop,
});

const cardsRoute = rootRoute.createRoute({
  path: 'cards',
  component: Cards,
});

const mineRoute = rootRoute.createRoute({
  path: 'mine',
  component: Mine,
});

function AuthenticatedRoute() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (!isAuthenticated) {
    return (
      <Flex h="90%" justifyContent="center">
        <Center flexDirection="column" gap={2}>
          <Text>You are not authenticated. Please login to continue</Text>
          <Button onClick={() => router.navigate({ to: indexRoute.id })}>
            Return
          </Button>
        </Center>
      </Flex>
    );
  }
  return <Outlet />;
}

const authenticatedRoute = rootRoute.createRoute({
  id: 'authenticated',
  component: AuthenticatedRoute,
});

const userRoute = rootRoute.createRoute({
  path: 'user',
  component: User,
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  cardsRoute,
  mineRoute,
  authenticatedRoute.addChildren([userRoute]),
]);

const router = createReactRouter({
  routeConfig,
  defaultPreload: 'intent',
});

export default router;
