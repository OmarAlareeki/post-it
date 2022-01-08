import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../config/firebaseAdmin";
import firebaseClient from "../config/firebaseClient";
import firebase from "firebase/app";

function Authenticated({ session }) {
	firebaseClient();
	if (session) {
		return (
			<div>
				<h3>User session is {session}</h3>
			</div>
		);
	} else {
		return (
			<div>
				<h1>loading</h1>
				</div>
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
