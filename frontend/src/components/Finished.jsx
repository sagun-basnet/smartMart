import React from "react";
import { useParams } from "react-router-dom";

const Finished = () => {
  const { id } = useParams();
  return <div>Finished: {id}</div>;
};

export default Finished;
