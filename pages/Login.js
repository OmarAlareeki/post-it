import React, { useState } from "react";
import Link from "next/link";
import firebaseClient from "../config/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import { useToast } from '@chakra-ui/core'

export default function Login({ props }) {
	firebaseClient();
	const toast = useToast();
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	return (
		<div>
			<h2>Post It</h2>
			<form isRequired>
				<label htmlFor="email">Email address</label>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					id="emailAddress"
					value={email}
					aria-describedby="email-helper-text"/>
			</form>
			<form isRequired>
				<label htmlFor="password">Password</label>
				<input
					onChange={(e) => setPass(e.target.value)}
					type="password"
					id="pass"
					value={pass}
					aria-describedby="password-helper-text"/>
			</form>
			<button
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
								duration: 6000,
								isClosable: true,
							});
						});
				}}>
				Create account
        </button>
			<button
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
								duration: 6000,
								isClosable: true,
							});
						});
				}}>
				Log in
        </button>
		</div>
	);
}
