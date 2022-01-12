import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../config/firebase-admin";
import firebaseClient from "../config/firebase-client";
import firebase from "firebase/app";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/core";
import Home from './postsList'

function Authenticated({ session }) {
  firebaseClient();
  if (session) {
    return (
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as="h2" mb={12} textAlign="center">
            Authenticated
          </Heading>
          <Box>
            <Text textAlign="center">{session}</Text>
            <Text textAlign="center" mt={8}>
              User can explore now!
              <Home />
            </Text>
          </Box>
          <Box my={12} mx="auto" width="500px">
            <Button
              width="100%"
              variant="solid"
              variantColor="red"
              onClick={async () => {
                await firebase.auth().signOut();
                window.location.href = "/";
              }}
            >
              Sign out
            </Button>
          </Box>
        </Box>
      </Flex>
    );
  } else {
    return (
      <Box>
        <Text>loading</Text>
      </Box>
    );
  }
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { session: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return { props: {} };
  }
}
export default Authenticated;
