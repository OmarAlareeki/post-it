import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../config/fire-config";
import { Form, Button, Col, Row, Image } from "react-bootstrap";
import PhoneInput from "react-phone-number-input/input";
import style from "../styles/postItem.module.css";
import { doc, setDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { RiCloseCircleFill } from "react-icons/ri";
import { TailSpin } from "react-loader-spinner";
import zipcodes from "zipcodes";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from 'next/router'

const PostItem = () => {
  const [freeItem, setFreeItem] = useState(false);
  const [postId, setPostId] = useState("");
  const [data, setData] = useState({
    title: "",
    category: "",
    zip: "",
    email: "",
    price: "",
    userId: "",
    imageUrls: "",
    description: "",
  });
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [imageTitles, setImageTitles] = useState([]);
  const [displayUrl, setDisplayUrl] = useState([]);
  const [progress, setProgress] = useState("getUpload");
  const [agreedToTermsAndConditions, setAgreedtoTermsAndConditions] =
    useState(false);
  const [currUser, setCurrUser] = useState("");
  const [validate, setValidate] = useState(false);
  const router  = useRouter();
  
  onAuthStateChanged(auth, (user) =>{
    user ? setCurrUser(user) : setCurrUser("")
    user ? "": router.push("/")
  }
  );

  useEffect(() => {
    setPostId(_.uniqueId(data.category));
  }, [data.category]);

  const toggleFree = () => {
    setFreeItem(!freeItem);
    setData({ ...data, price: "0" });
  };

  const agreeToTerms = () =>
    setAgreedtoTermsAndConditions(!agreedToTermsAndConditions);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setDoc(doc(db, "posts", postId), {
      title: data.title,
      zip: data.zip,
      email: data.email,
      phone: phoneNumber,
      category: data.category,
      price: data.price,
      description: data.description,
      imageUrls: displayUrl,
      postDate: new Date(),
      userId: currUser.uid,
      userName: currUser.displayName,
      userImage: currUser.photoURL,
    })
      .then((doc) => {
        Router.push("/posted");
        setData({
          title: "",
          category: "",
          zip: "",
          email: "",
          phone: "",
          price: "",
          description: "",
        });
        setDisplayUrl([]);
        setImageTitles([]);
        setPhoneNumber(undefined);
        setProgress("getUpload");
        console.log("document written: ", postId);
      })
      .catch((error) => {
        console.error("Error adding Document: ", error);
      });
  };
  const imageContent = () => {
    switch (progress) {
      case "getUpload":
        return <div>...</div>;
      case "uploading":
        return <div>uploading...</div>;
      case "uploaded":
        return (
          <div>
            {" "}
            {displayUrl.map((srcUrl) => {
              return (
                <Image
                  key={srcUrl}
                  src={srcUrl}
                  alt={srcUrl}
                  height={100}
                  width={100}
                  className={style.postImage}
                />
              );
            })}
          </div>
        );
      case "failedUpload":
        return <div> Upload failed </div>;
    }
  };
  const handleImageUpload = (e) => {
    if (data.category) {
      const image = e.target.files[0];
      setImageTitles([...imageTitles, image.name]);
      const imageRef = ref(storage, `postImages/${image.name}`);
      const uploadImages = uploadBytesResumable(imageRef, image);
      uploadImages.on(
        "state_changed",
        (snapshot) => {
          const process =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("uploading", process);
          setProgress("uploading");
        },
        (error) => {
          console.log("Encounter ", error);
        },
        () => {
          getDownloadURL(ref(storage, `postImages/${image.name}`)).then(
            (url) => {
              setDisplayUrl([...displayUrl, url]);
              setProgress("uploaded");
            }
          );
        }
      );
    } else {
      alert("Please provide post details first. Thank you");
    }
  };
  return (
    <div className="m-auto p-3 w-75 m">
      <h1 className="d-flex justify-content-center mt-4">Post an Item</h1>
      {/* Post item form and validation */}
      <Form
        onSubmit={handleSubmit}
        validated={
          data.title &&
          data.category &&
          data.zip &&
          data.email &&
          data.phone &&
          data.price &&
          data.description &&
          agreedToTermsAndConditions
        }
      >
        <Form.Group className="my-2 align-item-center" controlId="formTitle">
          <Row>
            <Col md="2" className="d-flex align-items-center">
              <Form.Label className="mb-0">Title:</Form.Label>
            </Col>
            <Col md="10">
              <Form.Control
                value={data.title}
                required
                type="text"
                placeholder="Item Name"
                min-length={4}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide item name.
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="itemCategoryValidation" className="my-2">
          <Row>
            <Col md="2" className="d-flex align-items-center">
              <Form.Label>Category:</Form.Label>
            </Col>
            <Col md="10">
              <Form.Select
                aria-label="item-category"
                required
                onChange={(e) => setData({ ...data, category: e.target.value })}
                value={data.category}
              >
                <option>Select a category</option>
                <option value="appliance"> Appliance </option>
                <option value="babyAndKids">Baby and Kids</option>
                <option value="clothing"> Clothing </option>
                <option value="electronics"> Electronics</option>
                <option value="furniture"> Furniture </option>
                <option value="garden"> Garden </option>
                <option value="homeDecor"> Home Decor </option>
                <option value="tools"> Tools </option>
                <option value="toysAndGames"> Toys and Games </option>
                <option value="vehicles"> Vehicles </option>
                <option value="others"> Others </option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          Please choose a catagory.
        </Form.Control.Feedback>
        <Form.Group
          controlId="itemOwnerZipValidation"
          className="my-2 justify-content-center"
        >
          <Row>
            <Col md="2" className="d-flex align-items-center">
              <Form.Label className="mb-0">Zip:</Form.Label>
            </Col>
            <Col md="10">
              <Form.Control
                value={data.zip}
                type="zip"
                placeholder="00000"
                minLength={5}
                maxLength={10}
                required
                onChange={(e) => setData({ ...data, zip: e.target.value })}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          Please provide a valid zip of your address.
        </Form.Control.Feedback>
        <Form.Group controlId="itemOwnerEmailValidation" className="my-2">
          <Row>
            <Col md="2" className="d-flex align-items-center">
              <Form.Label className="mb-0">Email:</Form.Label>
            </Col>
            <Col md="10">
              <Form.Control
                value={data.email}
                type="email"
                placeholder="example@domain.com"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          Please provide a valid Email.
        </Form.Control.Feedback>

          <Form.Group controlId="itemDescriptionValidation" className="my-2">
            <Row>
              <Col md="2">
                <Form.Label className="mb-0 d-flex">Description:</Form.Label>
              </Col>
              <Col md="10">
                <Form.Group>
                <Editor
                  apiKey = {process.env.NEXT_PUBLIC_TINY_API_KEY}
                  value={data.description}
                  init={{
                    height: 300,
                    menubar: false
                  }}
                  onEditorChange={(e) =>
                    setData({ ...data, description: e})}
                    area-describedby="descriptionHelp"
                />
                  <Form.Text id="descriptionHelp" muted>
                    Providing description is optional. However, items with
                    detaild description sell faster!
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="my-2">
            <Row>
              <Col md="2">
                <Form.Label className="mt-2 d-flex">Add photos: </Form.Label>
              </Col>
              <Col md="10">

                <Form.Control
                  value={data.description}
                  as="textarea"
                  placeholder="Description"
                  rows={4}
                  area-describedby="descriptionHelp"
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
                <Form.Text id="descriptionHelp" muted>
                  Providing description is optional. However, items with detaild
                  description sell faster!
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="my-2">
          <Row>
            <Col md="2">
              <Form.Label className="mt-2">Add photos: </Form.Label>
            </Col>
            <Col md="10">
              <Form.Control
                type="file"
                multiple
                required
                name="image"
                onChange={(e) => {
                  handleImageUpload(e);
                }}
                //   isInvalid={}
                area-describedby="fileDescription"
              />

              <Form.Control.Feedback type="invalid" tooltip>
                {/* {errors.file} */}
              </Form.Control.Feedback>
              <Form.Text id="fileDescription" muted>
                Add your cover photo first. Please provide accurate and detailed
                pictures.
              </Form.Text>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group />
        <Row>
          <Col md="2" />
          <Col md="10">{imageContent()}</Col>
        </Row>
        <Form.Group className="d-flex flex-column justify-content-">
          <Row>
            <Col md="2" />
            <Col md="10" className="d-flex my-3">{imageContent()}</Col>
          </Row>
          <Form.Group className="d-flex flex-column">
            <Row>
              <Col md="2" />
              <Col md="10">
                <Form.Check
                  className="d-flex my-2"
                  required
                  name="terms"
                  label="	&nbsp; Agree to terms and conditions"
                  onChange={agreeToTerms}
                />
              </Col>
            </Row>
            <Row className={style.lastRow}>
              <Col md="2" />
              <Col md="4">
                <Button type="submit" className={style.submitButton}>POST IT</Button>
              </Col>
              <Col md="4">
                <Button
                  className={style.cancelButton}
                  onClick={() => {
                    imageTitles.map((name) => {
                      const deleteRef = ref(storage, `postImages/${name}`);
                      deleteObject(deleteRef)
                        .then(() => {
                          console.log("picture deleted");
                        })
                        .catch((error) => {
                          console.error("error occurd: ", error);
                        });
                    });
                    router.push('/')
                  }}
                >
                  Cancel
                </Button>
              </Col>
             
            </Row>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default PostItem;
