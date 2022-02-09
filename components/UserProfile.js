import { useState, useEffect } from "react";
import { db, auth } from "../config/fire-config";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";

const UserProfile = () => {
  return (
    <main>
      <NavBar />
      <div>
        <img></img>
      </div>
      <div>
        <table>
          <tr>
            <th>Name: </th>
            <td>usersName</td>
          </tr>
          <tr>
            <th>Email:</th>
            <th>Phone:</th>
          </tr>
          <tr>
            <td>userEmail</td>
            <td>450-522-4545</td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>userPassword</td>
          </tr>
          <tr>
            <th>ZipCode:</th>
            <td>userzipCode</td>
          </tr>
        </table>
      </div>
    </main>
  );
};
