import React from "react";
import { useState, useEffect } from "react";
import { db, storage } from "../config/fire-config";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";
import { Image } from "react-bootstrap";
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
  FormControl,
  TextField,
  IMaskInput,
  Paper,
  Typography,
} from "@material-ui/core/";

export default function UserProfile({ id }) {
  const [user, setUser] = useState([]);
  const [displayUrl, setDisplayUrl] = useState([]);
  const [progress, setProgress] = useState("getUpload");

  useEffect(async () => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = { ...docSnap.data(), id: docSnap.id };
      setUser([userData]);
      //});
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
          <Image
            key={user.id}
            src={dUrl}
            alt={dUrl}
            height={200}
            width={200}
            className={style.postImage}
            onClick={() => {
              console.log("image clicked");
            }}
          />
          <div>
            <RiCloseCircleFill
              style={{
                fill: "red",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => deleteImage(dUrl)}
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

  const handleSubmit = async () => {
    try {
      await updateDoc(doc(db, "user", id), {
        photo: displayUrl,
      });
      setDisplayUrl([]);
      setProgress("getUpload");
    } catch {
      (error) => {
        console.error("Error adding Document: ", error);
      };
    }
  };

  return (
    <main className={style.UserProfileContainer}>
      {user.map((data) => (
        <Grid container spacing={12} direction="row" justify="center">
          <Grid item>
            <FormControl>
              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file">
                  <img src={data.photo} className={style.Imagediv} />
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
                  >
                    Change Photo
                  </Button>
                  <>{imageContent()}</>
                  <IoMdAddCircle
                    style={{
                      fill: "green",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSubmit()}
                  />
                </label>
              </Stack>
            </FormControl>
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
                  {/* {/* <TextField
                    ref="phone"
                    name="phone"
                    type="text"
                    value="phone"
                  /> */}
                  {/* <IMaskInput
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
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Delete Account
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
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
