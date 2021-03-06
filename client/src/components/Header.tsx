import { CloseIcon, ExternalLinkIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box, Button, ButtonGroup, Flex, FlexProps, Heading, IconButton, Link as StyledLink, Stack, useDisclosure
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { User } from "../generated/graphql";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import ProfileMenu from "./profiles/ProfileMenu";

import Head from "next/head";
interface HeaderProps extends FlexProps {
  user?: Pick<User, 'id' | 'username'>
}

const Header: React.FC<HeaderProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={3}
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading size="lg" letterSpacing={"tighter"}>
          <Link href={props.user ? "/list" : "/"}>OnlyWeebs</Link>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {
          !props.user ? (
            <ButtonGroup variant="outline">
              <Link href="/signup">
                <Button onClick={onClose}>
                  Sign up
                </Button>
              </Link>
              <Link href="/login">
                <Button onClick={onClose}>
                  Login
                </Button>
              </Link>
              <ColorModeSwitcher />
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <ColorModeSwitcher />
              <ProfileMenu user={props.user} />
            </ButtonGroup>
          )
        }
      </Box>
    </Flex>
  );
};

export default Header;
