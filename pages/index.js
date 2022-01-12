
import { useState, useEffect } from "react";
import { db } from "../config/fire-config";
import Head from "next/head";
import Style from "../styles/Home.module.css";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import PostsListContainer from "../components/PostsListContainer";
import NavBar from "../components/NavBar/NavBar";
import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "../config/auth";
import { Container } from "react-bootstrap";
import { Flex, Box, Button, Text, Stack, Heading } from "@chakra-ui/core";

const Home = () => {
    const { user } = useAuth();
  return (
    <NavBar />
    <PostsListContainer />);

		<Container>
			<Flex>
				<Box w={500} p={4} my={12} mx="auto">
					<Heading as="h2" mt={8} textAlign="center">
						Welcome to Post It
          </Heading>
					<Text mt={8} textAlign="center">{`${ 
						user ? "You are signed in" : "Login Please" }`}</Text>
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
	);
};
export default Home;

