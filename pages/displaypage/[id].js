import { useRouter } from "next/router";
import { doc, onSnapshot, collection, getDoc } from "firebase/firestore";
import { db, storage } from "../../config/fire-config";
import { useState, useEffect } from "react";
import DisplayPost from "../../components/displaypage/DisplayPost.js";
import DisplayPageLayout from "../../components/displaypage/DisplayPageLayout";

export default function Post() {
  const router = useRouter();
  const id = router && router.query.id;

  const [postToDisplay, setPosttoDisplay] = useState(null);

  useEffect(() => {
    if (!id) return false;
    const docRef = doc(db, "posts", id);
    return onSnapshot(docRef, (doc) => {
      const post = { ...doc.data(), id: doc.id };
      setPosttoDisplay(post);
    });
  }, [id]);

  return (
    <DisplayPageLayout>
      {!!postToDisplay ? <DisplayPost post={postToDisplay} /> : "Loading..."}
    </DisplayPageLayout>
  );
}
