import {
  Link,
  Outlet,
  ReactRouter,
  RootRoute,
  Route,
  useNavigate,
} from '@tanstack/react-router';
import React from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Cards from './pages/Cards';
import UserCards from './pages/UserCards.jsx';
import { useAuth } from './contexts/AuthContext';
import Mine from './pages/Mine';
import ChangePassword from './pages/user/ChangePassword';
import User from './pages/user/User';

const rootRoute = new RootRoute({
  component: () => {
    return (
      <Container
        maxW="container.xl"
        minH={'100vh'}
        maxH={'100vh'}
        display={'grid'}
        gridTemplateRows={'auto 1fr'}
      >
        <Navbar />
        <Box
          p={5}
          mt={2}
          mb={3}
          boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
          borderRadius={'5px'}
          borderWidth={'1px'}
          overflow={'auto'}
        >
          <Outlet />
        </Box>
      </Container>
    );
  },
});

const indexRoute = new RootRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const shopRoute = new RootRoute({
  getParentRoute: () => rootRoute,
  path: 'shop',
  component: Shop,
});

const cardsRoute = new RootRoute({
  getParentRoute: () => rootRoute,
  path: 'cards',
  component: Cards,
});

const mineRoute = new RootRoute({
  getParentRoute: () => rootRoute,
  path: 'mine',
  component: Mine,
});

const userCardsRoute = new RootRoute({
  getParentRoute: () => rootRoute,
  path: 'userCards',
  component: UserCards,
});

function AuthenticatedRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    return (
      <Flex h="90%" justifyContent="center">
        <Center flexDirection="column" gap={2}>
          <Text>You are not authenticated. Please login to continue</Text>
          <Button onClick={() => navigate({ to: indexRoute.id })}>
            Return
          </Button>
        </Center>
      </Flex>
    );
  }
  return <Outlet />;
}

const authenticatedRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  component: AuthenticatedRoute,
});

const profileLayoutRoute = new Route({
  getParentRoute: () => authenticatedRoute,
  path: 'profile',
  component: () => {
    const userPages = [
      {
        name: 'Me',
        path: '/profile',
      },
      {
        name: 'Change password',
        path: '/profile/change-password',
      },
    ];
    return (
      <HStack
        alignItems="flex-start"
        minHeight="100%"
        divider={<StackDivider borderColor="gray" />}
        spacing={5}
      >
        <VStack w="15%" alignItems="flex-start">
          {userPages.map((page) => {
            return (
              <Link
                to={page.path}
                key={page.name}
                activeOptions={{ exact: true }}
                activeProps={{
                  style: { fontWeight: 'bold' },
                }}
              >
                <Text fontSize={['sm', 'sm', 'md']}>{page.name}</Text>
              </Link>
            );
          })}
        </VStack>
        <Box flex="1 1 0" minW={0}>
          <Outlet />
        </Box>
      </HStack>
    );
  },
});

const userRoute = new Route({
  getParentRoute: () => profileLayoutRoute,
  path: '/',
  component: User,
});

const userPassword = new Route({
  getParentRoute: () => profileLayoutRoute,
  path: 'change-password',
  component: ChangePassword,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  cardsRoute,
  authenticatedRoute.addChildren([
    mineRoute,
    userCardsRoute,
    profileLayoutRoute.addChildren([userRoute, userPassword]),
  ]),
]);

const router = new ReactRouter({ routeTree });

export default router;
