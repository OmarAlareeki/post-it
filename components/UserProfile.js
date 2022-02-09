import React from "react";
import { useState, useEffect } from "react";
import { db, storage } from "../config/fire-config";
import { RiCloseCircleFill } from "react-icons/ri";
import { TailSpin } from "react-loader-spinner";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import style from "../styles/UserProfile.module.css";
import {
  Grid,
  Button,
  Stack,
  Input,
  TextField,
  IMaskInput,
  Paper,
  Typography,
} from "@material-ui/core/";

export default function UserProfile({ id }) {
  const [data, setData] = useState([]);
  const [displayUrl, setDisplayUrl] = useState([]);
  const [progress, setProgress] = useState("getUpload");

  useEffect(async () => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log(userData);
      setData(userData);
    }
  }, [id]);

  const imageContent = () => {
    switch (progress) {
      case "getUpload":
        return <div>Upload Pictures</div>;
      case "uploading":
        return <div>{displayUrl ? displayImage(displayUrl) : ""}</div>;
      case "uploaded":
        return <div>{displayUrl ? displayImage(displayUrl) : ""}</div>;
      case "failedUpload":
        return <div> Upload failed </div>;
    }
  };

  const updatePhoto = async (e) => {
    const userImage = e.target.file[0];
    const imageRef = ref(storage, `userProfileImages/${data.uid}`);
    const uploadImages = uploadBytesResumable(imageRef, userImage);
    uploadImages.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("uploading", progress);
        setProgress("uploading");
      },
      (error) => {
        console.log("Encounter ", error);
      },
      () => {
        getDownloadURL(ref(storage, `userProfileImages/${data.uid}`)).then(
          (url) => {
            setDisplayUrl(url);
            setProgress("uploaded");
          }
        );
      }
    );
  };

  const deleteImage = (url) => {
    setDisplayUrl(null);
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef)
      .then(() => {
        console.log("picture deleted");
      })
      .catch((error) => {
        console.error("error occurd: ", error);
      });
  };

  const displayImage = (dUrl) => {
    return (
      <div className={style.imageContainer}>
        <div className={style.imageDiv}>
          <div>
            <RiCloseCircleFill
              style={{
                fill: "#ef9d06",
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: "100",
                cursor: "pointer",
              }}
              onClick={() => deleteImage(dUrl)}
            />
          </div>
          <Image
            src={dUrl}
            alt={dUrl}
            height={100}
            width={100}
            className={style.postImage}
            onClick={() => {
              console.log("image clicked");
            }}
          />
        </div>
        );
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

  return (
    <main className={style.UserProfileContainer}>
      <Paper sx={{ p: 2, margin: "auto", flexGrow: 1, maxWidth: "80%" }}>
        <Grid container spacing={12} direction="row" justify="center">
          <Grid item>
            <img src={data.photo} className={style.Imagediv} />
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  component="span"
                  backgroundColor="#00243D"
                  justify="center"
                  size="small"
                  onClick={(e) => {
                    updatePhoto(e);
                  }}
                >
                  Change Photo
                </Button>
                <>{imageContent()}</>
              </label>
            </Stack>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {data.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {data.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Phone: {data.phoneNumber}
                  {/* <TextField
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
                  /> */}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  ZipCode: {data.ZipCode}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Password: {data.password}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  AccountDate: {data.accountCreatedDate}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Delete Account
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
}

{
  /* <table>

  <tbody>
    <tr>
      <th>Name: </th>
      <td>{data.name}</td>
    </tr>
    <tr>
      <th>Email:</th>
      <th>Phone:</th>
    </tr>
    <tr>
      <td>{data.email}</td>
      <td>{data.phoneNumber}</td>
    </tr>
    <tr>
      <th>Password:</th>
      <td>{data.password}</td>
    </tr>
    <tr>
      <th>ZipCode:</th>
      <td>{data.zipCode}</td>
    </tr>
  </tbody>
</table>; */
}
