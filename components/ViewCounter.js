import { useState } from "react";

const viewCounter = ({ id, viewCount }) => {
  const [views, setViews] = useState(viewCount);

  return <div></div>;
};

export default viewCounter;
