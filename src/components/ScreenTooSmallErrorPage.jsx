import React from "react";

const errorContentStyle = {
    width: "50%",
    margin: "50px auto",
    textAlign: "center",
};

const ScreenTooSmallErrorPage = () => {
    return (
        <p style={errorContentStyle}>
            Thanks for checking out my path-finding web app! Unfortunately it is
            not optimized for mobile so please view on desktop when you get the
            chance 😄
        </p>
    );
};

export default ScreenTooSmallErrorPage;
