import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Stack,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/core";

export default function Login({ props }) {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <Flex>
      <Box w={500} p={4} my={12} mx="auto">
        <Heading textAlign="center" as="h2">
          Login
        </Heading>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="emailAddress"
            value={email}
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="pass"
            value={pass}
            aria-describedby="password-helper-text"
          />
        </FormControl>
        <Stack justify="center" mt={6} isInline spacing={10}>
          <Button
            minWidth="40%"
            variant="solid"
            variantColor="blue"
            isDisabled={email === "" || pass === ""}
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "An error occurred.",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
          >
            Create account
          </Button>
          <Button
            minWidth="40%"
            variant="solid"
            variantColor="green"
            isDisabled={email === "" || pass === ""}
            onClick={async () => {
              await firebase
                .auth()
                .signInWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "An error occurred.",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
          >
            Log in
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
