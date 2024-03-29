import {
  Center,
  Flex,
  IconButton,
  Image,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { Link as NavLink, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import IconSvg from '../assets/icon.svg';
import Login from './Login';
import { useAuth } from '../contexts/AuthContext';
import { CardsIcon } from './Icons.jsx';
import { FiLogOut, FiHome, FiShoppingCart, FiUser } from 'react-icons/fi';
import { GiCardPick } from 'react-icons/gi';
import { Icon } from '@chakra-ui/icons';
import ToggleButton from './ToggleButton.jsx';
import { getUserBalance } from '../service/AuthService.js';

const NAV_LINKS = [
  { name: 'Home', path: '/', icon: FiHome, needsAuth: false },
  { name: 'Shop', path: '/shop', icon: FiShoppingCart, needsAuth: false },
  { name: 'Cards', path: '/cards', icon: CardsIcon, needsAuth: false },
  { name: 'MyCards', path: '/userCards', icon: CardsIcon, needsAuth: true },
  { name: 'Mine', path: '/mine', icon: GiCardPick, needsAuth: true },
  { name: 'User', path: '/profile', icon: FiUser, needsAuth: true },
];

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const { data: userBalance } = useQuery({
    queryKey: ['balance'],
    queryFn: () => getUserBalance(user.token),
    enabled: isAuthenticated,
  });

  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      h={'7vh'}
      pr={3}
      pl={3}
      mt={3}
      boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
      borderRadius={'5px'}
      borderWidth={'1px'}
    >
      <Flex display="flex" gap={1} alignItems="center">
        <Image src={IconSvg} height="40px" />
        <NavLink to="/">
          <Text
            display={['none', 'none', 'block']}
            fontSize={['sm', 'sm', 'md']}
          >
            Pokecoin
          </Text>
        </NavLink>
      </Flex>
      <Spacer />
      <Flex h="60%" gap={[1, 2, 5]}>
        {NAV_LINKS.map((link) => {
          if (link.needsAuth && !isAuthenticated) {
            return null;
          }
          return (
            <Flex
              alignItems="center"
              justifyContent={'center'}
              borderRadius={'5px'}
              h="100%"
              width="100%"
              key={link.name}
              bg="#f8d077"
            >
              <Link
                as={NavLink}
                h="100%"
                width="100%"
                to={link.path}
                borderRadius={'5px'}
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.3)',
                }}
                activeProps={{
                  style: { fontWeight: 'bold' },
                }}
              >
                <Center h="100%" width="100%" p={3}>
                  {
                    <Icon
                      as={link.icon}
                      boxSize={{ base: 4, sm: 6, md: 6 }}
                      color={'black'}
                    />
                  }
                  <Text
                    display={['none', 'none', 'block']}
                    fontSize={['sm', 'sm', 'md']}
                    ml={1}
                    color={'black'}
                  >
                    {link.name}
                  </Text>
                </Center>
              </Link>
            </Flex>
          );
        })}
      </Flex>
      <Spacer />
      <Flex h="60%" justifyContent="flex-end" alignItems="center" gap={2}>
        <ToggleButton />
        {isAuthenticated ? (
          <>
            <Flex
              alignItems="center"
              justifyContent={'center'}
              borderRadius={'5px'}
              h="100%"
              width="100%"
              bg="#f8d077"
            >
              <Text
                fontWeight={'bold'}
                fontSize={['sm', 'md']}
                p={1}
                color={'black'}
              >
                {userBalance?.amount}
              </Text>
            </Flex>
            <IconButton
              bg="#f8d077"
              h="100%"
              onClick={() => {
                logout();
                navigate({ to: '/' });
              }}
              color={'black'}
              icon={<FiLogOut />}
              aria-label={'Logout'}
            />
          </>
        ) : (
          <Login />
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
