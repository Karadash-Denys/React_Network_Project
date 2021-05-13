import React from "react";
import preloader from "../../assets/imeges/preloader.gif";





const Preloader:React.FC = () => {
  return (
    <div style={{ margin: "10px auto", textAlign: "center" }}>
      <img  src={preloader} alt='' style={{ width: "250px", height: "250px" }}/>
    </div>
  );
};

export default Preloader;
