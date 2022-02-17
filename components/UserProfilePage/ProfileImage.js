import { useState } from "react";
import { db, storage } from "../../config/fire-config";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";
import { Image } from "react-bootstrap";
import style from "./ProfileImage.module.css";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { Grid, Button, Input, FormControl, Item } from "@material-ui/core";

const ProfileImage = ({ photo, docRef }) => {
  const [displayUrl, setDisplayUrl] = useState("");
  const [progress, setProgress] = useState("getUpload");
  const [showIcons, setShowIcons] = useState(false);

  //console.log("************userId: " + id);
  //const docRef = doc(db, "users", id);

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
          <div>
            <TailSpin color="#ef9d06" height={40} width={40} />
          </div>
        ) : (
          <>
            <Image
              src={dUrl}
              alt={dUrl}
              height={200}
              width={200}
              className={style.userImage}
            />
            {/* <div> */}
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
            {/* </div> */}
          </>
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
    <Grid item xs={8}>
      <Item>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ height: "190px", display: "flex" }}>
            <img src={photo} className={style.DisplayImage} />
          </div>
          <div style={{ display: "flex" }}>
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
                  color="secondary"
                  justify="center"
                  disabled={showIcons}
                  size="small"
                  sx={{ margin: 1, backgroundColor: "#ef9d06" }}
                >
                  Change Photo
                </Button>
              </label>
            </FormControl>
          </div>

          <div style={{ display: "flex" }}>{imageContent()}</div>
        </div>
      </Item>
    </Grid>
  );
};

export default ProfileImage;
