import React from "react";
import { useState, useEffect } from "react";
import { db, storage } from "../config/fire-config";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";
import { Image } from "react-bootstrap";
//import DeleteConfirmation from "./DeleteConfirmation";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import style from "../styles/UserProfile.module.css";
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
// import DeleteIcon from "@mui/icons-material/Delete";

function UserProfile({ id, handleClick, setConfirmationMessage }) {
  const [user, setUser] = useState([]);
  const [displayUrl, setDisplayUrl] = useState([]);
  const [progress, setProgress] = useState("getUpload");
  // const [dTitle, setDTitle] = useState("");
  // const [uid, setUid] = useState(null);
  // const [displayConfirmationModal, setDisplayConfirmationModal] =
  //   useState(false);
  // const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(async () => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = { ...docSnap.data(), id: docSnap.id };
      setUser([userData]);
    }
  }, [id]);

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

  const handleImageUpload = (e) => {
    console.log(e.target);
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
        });
      }
    );
  };

  const deleteImage = (url, e) => {
    e.preventDefault();
    setDisplayUrl([]);
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef)
      .then(() => {
        console.log("picture deleted");
      })
      .catch((error) => {
        console.error("error occurd: ", error);
      });
  };

  const handleSubmit = (url, event) => {
    console.log(displayUrl);
    event.preventDefault();
    try {
      updateDoc(doc(db, "user", id), {
        photo: url,
      });
      setDisplayUrl([]);
      setProgress("getUpload");
    } catch {
      (error) => {
        console.error("Error adding Document: ", error);
      };
    }
  };

  const displayImage = (dUrl) => {
    return (
      <div className={style.imageContainer}>
        <div className={style.imageDiv}>
          <Image
            key={user.id}
            src={dUrl}
            alt={dUrl}
            height={200}
            width={200}
            className={style.userImage}
            onClick={() => {
              console.log("image clicked");
            }}
          />
          <div style={{ display: "flex", justifyContent: "spaceAround" }}>
            <RiCloseCircleFill
              style={{
                fill: "red",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={(e) => deleteImage(dUrl, e)}
            />
            <IoMdAddCircle
              style={{
                fill: "green",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={(e) => handleSubmit(dUrl, e)}
            />
          </div>
        </div>
        {progress === "uploading" ? (
          <div className={style.loader}>
            <TailSpin color="#ef9d06" height={40} width={40} />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };
  // //Show Delete Popup.
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

  return (
    <main className={style.UserProfileContainer}>
      {user.map((data) => (
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-evenly"
          key={data.id}
        >
          <Grid item xs={12} sm={3}>
            <img src={data.photo} className={style.DisplayImagediv} />
            <div>
              <FormControl>
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
                    color="secondary"
                    justify="center"
                    size="small"
                    sx={{ margin: 2, backgroundColor: "#ef9d06" }}
                  >
                    Change Photo
                  </Button>

                  <>{imageContent()}</>
                </label>
              </FormControl>
            </div>
          </Grid>

          <Grid item xs={12} sm container>
            <TableContainer>
              <Paper elevation={12} variant="outlined" width={500}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  fontWeight="bold"
                  fontSize="25px"
                  p="10px"
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
                          p="5px"
                          wrap="nowrap"
                        >
                          Email
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="body2" gutterBottom fontSize={15}>
                          {data.email}
                        </Typography>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Typography
                          variant="body1"
                          gutterBottom
                          p="5px"
                          wrap="nowrap"
                        >
                          Phone
                        </Typography>
                      </TableCell>

                      <TableCell width={150} align="right">
                        <Typography variant="body2" gutterBottom fontSize={13}>
                          250-1245-5646
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Typography
                          variant="body1"
                          gutterBottom
                          p="5px"
                          wrap="nowrap"
                        >
                          Signup Method:
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="body2" gutterBottom fontSize={13}>
                          {data.provider.split(".")[0].toUpperCase()}
                        </Typography>
                      </TableCell>

                      <TableCell />
                      <TableCell />
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Typography
                          variant="body1"
                          gutterBottom
                          p="5px"
                          wrap="nowrap"
                        >
                          ZipCode
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="body2" gutterBottom fontSize={13}>
                          {data.zipCode}
                        </Typography>
                      </TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row" width={300}>
                        <Typography
                          variant="body1"
                          gutterBottom
                          p="5px"
                          wrap="nowrap"
                        >
                          Account Creation Date
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" gutterBottom fontSize={13}>
                          {data.accountCreatedDate.toDate().toLocaleDateString}
                        </Typography>
                      </TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </TableContainer>
          </Grid>
          {/* <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => showDeleteModal(data.uid, data.email)}
            >
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                Delete My Account
              </Typography>
            </Button>
          </Grid> */}
        </Grid>
      ))}
      {/* <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        dTitle={dTitle}
        id={uid}
        message={deleteMessage}
      /> */}
    </main>
  );
}
export default UserProfile;

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
