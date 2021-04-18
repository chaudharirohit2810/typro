import React from "react";

const ProgressBar = (props) => {
  let { bgcolor, completed, label } = props;

  const containerStyles = {
    height: 20,
    width: "90%",
    backgroundColor: "#ececec",
    borderRadius: 50,
    // margin: "20px 10px",
  };

  const fillerStyles = {
    height: "100%",
    width: completed > 150 ? "100%" : `calc(${(completed * 2) / 3}%)`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={{ margin: "0px 10px 20px" }}>
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>0 wpm</span>
        <span>150wpm</span>
      </div>
      <div style={{ display: "flex" }}>
        <div style={containerStyles}>
          <div style={fillerStyles}>
            <span style={labelStyles}>{`${completed}wpm`}</span>
          </div>
        </div>
        <span style={{ marginLeft: "1rem" }}>{label}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
