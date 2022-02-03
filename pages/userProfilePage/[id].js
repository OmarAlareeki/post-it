import { useState, useEffect } from "react";
import { db, auth } from "../../config/fire-config";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";

const userProfilePage = () => {
  const router = useRouter();
  const userId = router && router.query.id;

  console.log(userId);

  return (
    <main>
      <NavBar />

      <div>
        <img />
      </div>
      <div>
        <table>
          <tr>
            <th>Name: </th>
            <td>{userId}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <th>Phone:</th>
          </tr>
          <tr>
            <td>userData.email</td>
            <td>userData.phoneNumber</td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>userData.password</td>
          </tr>
          <tr>
            <th>ZipCode:</th>
            <td>userData.zipCode</td>
          </tr>
        </table>
      </div>
    </main>
  );
};

export default userProfilePage;
