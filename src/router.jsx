import {
  createReactRouter,
  createRouteConfig,
  Link,
  Outlet,
  useRouter,
} from '@tanstack/react-router';
import React from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
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
import { useAuth } from './contexts/AuthContext';
import Mine from './pages/Mine';
import ChangePassword from './pages/user/ChangePassword';
import User from './pages/user/User';
import Sidebar from './components/Sidebar';

const rootRoute = createRouteConfig({
  component: () => {
    return (
      <Box p={5} width={'100vw'} h={'100vh'}>
        <Navbar />
        <Flex
          justifyContent={'space-between'}
          flexDir={{ base: 'column-reverse', md: 'row' }}
          mt={'1vh'}
          height={'90vh'}
        >
          <Box pr={{ md: '1vw' }} pt={['1vh', '1vh', '0vh']}>
            <Sidebar />
          </Box>
          <Box
            padding={4}
            overflow={'auto'}
            flexGrow={1}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(6.8px)',
              borderRadius: '10px',
            }}
          >
            <Outlet />
          </Box>
        </Flex>
      </Box>
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

const profileLayoutRoute = rootRoute.createRoute({
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

const userRoute = profileLayoutRoute.createRoute({
  path: '/',
  component: User,
});

const userPassword = profileLayoutRoute.createRoute({
  path: 'change-password',
  component: ChangePassword,
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  cardsRoute,
  authenticatedRoute.addChildren([
    mineRoute,
    profileLayoutRoute.addChildren([userRoute, userPassword]),
  ]),
]);

const router = createReactRouter({
  routeConfig,
  defaultPreload: 'intent',
});

export default router;
