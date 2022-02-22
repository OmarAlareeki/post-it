import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../config/fire-config";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import style from "../../styles/UserProfile.module.css";
import {
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import PasswordIcon from "@mui/icons-material/Password";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import ProfileImage from "../../components/UserProfilePage/ProfileImage";

function UserProfile() {
  const router = useRouter();
  const uid = router && router.query.uid;

  const [user, setUser] = useState("");
  const [postCount, setPostCount] = useState([]);

  useEffect(async () => {
    if (!uid) return false;
    const postsRef = collection(db, "posts");
    const docRef = doc(db, "users", uid);
    let q;
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = { ...docSnap.data(), id: docSnap.id };
      setUser(userData);
    }

    q = query(postsRef, where("userId", "==", uid));
    onSnapshot(q, (snap) => {
      const queryList = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostCount(queryList);
    });
  }, [uid]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => (user ? "" : router.push("/")));
  });
  return (
    <div className={style.UserProfileContainer}>
      <main>
        <div className={style.ImageBackgroundOvly}></div>
        <div className={style.DataBox}>
          <>
            <ProfileImage photo={user.photo} />
          </>
          <>
            <div className={style.DisplayCard}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        colSpan={2}
                        align="center"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          fontWeight="bold"
                          fontSize="25px"
                          align="center"
                        >
                          {user.name}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        colSpan={2}
                        component="th"
                        scope="row"
                        align="center"
                        sx={{
                          borderBottom: "none",
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                      >
                        <Typography variant="body1" gutterBottom>
                          {user.email}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    {user.provider === "Post-It Signup" ? (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          align="center"
                          sx={{ borderBottom: "none" }}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<PasswordIcon />}
                            size="small"
                            onClick={() => {
                              router.push("/signIn/changePassword");
                            }}
                          >
                            <Typography
                              sx={{ cursor: "pointer" }}
                              variant="body2"
                            >
                              Change Password
                            </Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <></>
                    )}

                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="body1" gutterBottom>
                          Saved Post : {user?.savedPosts?.length}
                        </Typography>
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="body1" gutterBottom>
                          My Posts : {postCount.length}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        colSpan={2}
                        align="center"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="body1" gutterBottom>
                          Account since :{" "}
                          {user.accountCreatedDate
                            ?.toDate()
                            .toLocaleDateString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        </div>
        <div className={style.DivbottomMid}></div>
      </main>
      <div className={style.DivBottomTrapez}></div>
    </div>
  );
}
export default UserProfile;
