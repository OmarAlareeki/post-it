import React from "react";
import { useState, useEffect } from "react";
import { db, storage, auth } from "../../config/fire-config";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";
import { Image } from "react-bootstrap";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import style from "../../styles/UserProfile.module.css";
import {
  Grid,
  Button,
  Input,
  FormControl,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import PasswordIcon from "@mui/icons-material/Password";
import { useRouter } from "next/router";
import { onAuthStateChanged } from 'firebase/auth'


function UserProfile() {
  const router = useRouter();
  const id = router && router.query.uid;
  const [user, setUser] = useState([]);
  const [postCount, setPostCount] = useState([]);
  const [displayUrl, setDisplayUrl] = useState("");
  const [progress, setProgress] = useState("getUpload");
  const [showIcons, setShowIcons] = useState(false);  

  // setUserProfile(true);
  useEffect(async () => {
    if (!id) return false;
    const postsRef = collection(db, "posts");
    const docRef = doc(db, "users", id);
    let q;
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = { ...docSnap.data(), id: docSnap.id };
      setUser([userData]);
    }

    q = query(postsRef, where("userId", "==", id));
    onSnapshot(q, (snap) => {
      const queryList = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostCount(queryList);
    });
  }, [id]);

  onAuthStateChanged(auth, (user)=>
    user? "": router.push('/')
  )
  const handleImageUpload = (e) => {
    const userImage = e.target.files[0];
    const imageRef = ref(storage, `userProfileImages/${userImage.name}`);
    const uploadImages = uploadBytesResumable(imageRef, userImage);
    uploadImages.on(
      "state_changed",
      (snapshot) => {
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("uploading", process);
        setProgress("uploading");
      },
      (error) => {
        console.log("Encounter ", error);
      },
      () => {
        getDownloadURL(
          ref(storage, `userProfileImages/${userImage.name}`)
        ).then((url) => {
          setDisplayUrl(url);
          console.log(url);
          setProgress("uploaded");
          setShowIcons(true);
        });
      }
    );
  };
  const imageContent = () => {
    switch (progress) {
      case "getUpload":
        return <div>Preview new photo here!</div>;
      case "uploading":
        return <div>{displayUrl ? displayImage(displayUrl) : ""}</div>;
      case "uploaded":
        return <div>{displayUrl ? displayImage(displayUrl) : ""}</div>;
      case "failedUpload":
        return <div> Upload failed </div>;
    }
  };

  const displayImage = (dUrl) => {
    return (
      <>
      {progress === "uploading" ? (
          <div className={style.loader}>
            <TailSpin color="#ef9d06" height={40} width={40} />
          </div>
        ) : (
          <div>
            <Image
              src={dUrl}
              alt={dUrl}
              height={200}
              width={200}
              className={style.userImage}
            />

            <RiCloseCircleFill
              style={{
                fill: "#D50005",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => deleteImage(dUrl)}
            />

            <IoMdCheckmarkCircle
              style={{
                fill: "#008000",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={(e) => handleSubmit()}
            />
          </div>
        )}
      </>
    );
  };

  const deleteImage = (dUrl) => {
    setDisplayUrl("");
    const deleteRef = ref(storage, dUrl);
    deleteObject(deleteRef)
      .then(() => {
        setProgress("getUpload");
        setShowIcons(false);
      })
      .catch((error) => {
        console.error("error occurd: ", error);
      });
  };

  const handleSubmit = () => {
    const docRef = doc(db, "users", id);
    updateDoc(docRef, { photo: displayUrl })
      .then(() => {
        setDisplayUrl("");
        setShowIcons(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding Document: ", error);
      });
  };

  return (
      <main className={style.UserProfileContainer}>
        {user?.map((data) => (
          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            key={data.id}
          >
            <Grid item xs={12} sm={6}>
              <img src={data.photo} className={style.DisplayImagediv} />
              <div>
                <FormControl onSubmit={() => handleSubmit()}>
                  <label htmlFor="contained-button-file">
                    <Input
                      id="contained-button-file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleImageUpload(e);
                      }}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      color="success"
                      justify="center"
                      disabled={showIcons}
                      size="small"
                      sx={{ margin: 2, backgroundColor: "#ef9d06" }}
                    >
                      Change Photo
                    </Button>
                  </label>
                </FormControl>
                <div style={{ display: "flex" }}>{imageContent()}</div>
              </div>
            </Grid>

            <Grid item xs={20} sm={6} className={style.DisplayCard}>
              <TableContainer style={{ overflow: "hidden" }}>
                <Paper variant="outlined">
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    fontWeight="bold"
                    fontSize="25px"
                  >
                    {data.name}
                  </Typography>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Typography
                            variant="body1"
                            gutterBottom
                            // fontSize={20}
                          >
                            Email :
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            gutterBottom
                            // fontSize={15}
                          >
                            {data.email}
                          </Typography>
                        </TableCell>
                      </TableRow>


                      {data.provider === 'Post-It Signup'?<TableRow>
                        <TableCell colSpan={2}>
                          <Button
                            variant="outlined"
                            startIcon={<PasswordIcon />}
                            size="small"
                            onClick={()=>{
                              router.push('/signIn/changePassword')
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

                      </TableRow>: <></>}


                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Typography
                            variant="body1"
                            gutterBottom
                            // fontSize={20}
                          >
                            Account Creation Date :
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            gutterBottom
                            // fontSize={15}
                          >
                            {data.accountCreatedDate
                              .toDate()
                              .toLocaleDateString()}
                          </Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Typography
                            variant="body1"
                            gutterBottom
                            // fontSize={20}
                          >
                            Saved Post :
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            gutterBottom
                            // fontSize={15}
                          >
                            {data.savedPosts.length}
                          </Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Typography
                            variant="body1"
                            gutterBottom
                            // fontSize={20}
                          >
                            My Posts :
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            gutterBottom
                            // fontSize={15}
                          >
                            {postCount.length}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </TableContainer>
            </Grid>
          </Grid>
        ))}
      </main>
  );
}
export default UserProfile;

{
  /* <TextField
    ref="phone"
    name="phone"
    type="text"
    value="phone"
  /> 
  <IMaskInput
      mask="(0)999 999 9999"
      value="phone"
      disabled={false}
      maskChar=" "
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    /> */
}

{
  /* import PostsListContainer from "./PostsListContainer";
//import DeleteConfirmation from "./DeleteConfirmation";
import DeleteIcon from "@mui/icons-material/Delete";

  // const [dTitle, setDTitle] = useState("");
  // const [uid, setUid] = useState(null);
  // const [displayConfirmationModal, setDisplayConfirmationModal] =
  //   useState(false);
  // const [deleteMessage, setDeleteMessage] = useState(null);
  
  <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => showDeleteModal(data.uid, data.email)}
            >
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                Delete My Account
              </Typography>
            </Button>
          </Grid>
        </Grid>
      ))}
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        dTitle={dTitle}
        id={uid}
        message={deleteMessage}
      /> */
}
// Show Delete Popup.
// const showDeleteModal = (uid, email) => {
//   setDTitle(email);
//   setUid(uid);
//   setDeleteMessage(
//     `Are you sure you want to delete this Account? Email : ${dTitle}`
//   );
//   setDisplayConfirmationModal(true);
// };

// // Hide the modal
// const hideConfirmationModal = () => {
//   setDisplayConfirmationModal(false);
// };

// // Handle the actual deletion of the item
// const submitDelete = async (dTitle, uid) => {
//   setConfirmationMessage(`${dTitle}  was deleted successfully.`);
//   await deleteDoc(doc(db, "users", uid));
//   setDisplayConfirmationModal(false);
//   handleClick();
// };
