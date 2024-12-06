import React from "react";
import loader from "../../../asset/loader/scroll.gif";

const Loader = ({ width = 100, height = 100, alt = "Loading..." }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={loader} alt={alt} style={{ width: `${width}px`, height: `${height}px` }} />
        </div>
    );
};

export default Loader;