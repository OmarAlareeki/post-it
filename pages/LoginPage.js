import React from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { Flex, Box, Button, Text, Stack, Heading } from "@chakra-ui/core";
import { useAuth } from "../config/auth";

function LoginPage() {
  const { user } = useAuth();
  return (
    <div>
      <Container>
        <Flex>
          <Box w={500} p={4} my={12} mx="auto">
            <Heading as="h2" mt={8} textAlign="center">
              Welcome to Post It
            </Heading>
            <Text mt={8} textAlign="center">{`${user
              ? "You are signed in"
              : "Login Please"}`}</Text>
            <Stack
              mt={8}
              alignItems="center"
              justifyContent="center"
              isInline
              width="100%"
            >
              <Button
                variant="solid"
                variantColor="blue"
                width="100%"
                isDisabled={!user}
              >
                <Link href="/authenticatedRoute">
                  <a>Go to authenticated route</a>
                </Link>
              </Button>
              <Button
                variant="solid"
                variantColor="green"
                width="100%"
                isDisabled={user}
              >
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Container>
    </div>
  );
}

export default LoginPage;
