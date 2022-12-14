import React, { useState } from "react";
import { Link as RouterLinks } from 'react-router-dom'
import { Link, Box, Flex, Button, Stack, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import actions from '../../src/redux/actions/auth'
import axios from 'axios'

const Nav = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const isAuth = useSelector(({auth}) => auth.auth);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch() 

    const handleLogout = async (e) => {
        if (isAuth) {
            setLoading(true);
            await axios.get('/api/user/logout')
            dispatch(actions.logoutAuthUser())
            setLoading(false);
            console.log('Logged Out!')
        }
    }

    return (
        <NavBarContainer {...props}>
            <MenuItem to="/"><Text fontSize='xl' as='b'>Ogie Bank</Text></MenuItem>
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} loading={loading} handleLogout={handleLogout} isAuth={isAuth}/>
        </NavBarContainer>
    );
};

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
            fill="black"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);

const MenuIcon = () => (
    <svg
        width="24px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="black"
    >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
        <Link as={RouterLinks} to={to}>{children}</Link>
    );
};

const MenuLinks = ({ isOpen, loading, handleLogout, isAuth }) => {
    return (
        <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                { isAuth ? null : <MenuItem to="/register">Register</MenuItem>}
                { isAuth ? <MenuItem to="/overview">Overview</MenuItem> : null }
                { isAuth ? <MenuItem to="/transactions">Transactions</MenuItem> : null }
                { isAuth ? <MenuItem to="/budget">Budget</MenuItem> : null }
                { isAuth ? (
                    <Button
                        isLoading={loading}
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        color="white"
                        bg="black"
                        isLoading={loading}
                        onClick={() => handleLogout()}
                    >
                        <MenuItem to="/login">Login</MenuItem>
                    </Button>
                ) }
            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["black", "black", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Nav;