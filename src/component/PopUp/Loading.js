import React from "react";

const Loading = ({ loadingPopUp }) => {
  return loadingPopUp ? (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgb(0,0,0,0.7)",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "10",
      }}
    >
      <div className="position-absolute top-50 start-50 translate-middle ">
        <div className="card text-center p-4 " style={{ width: "90%" }}>
          <div className="d-flex justify-content-center text-secondary  mb-1">
            <div className="spinner-border" role="status"></div>
          </div>
          <div>Loading ...</div>
          <div>(Need to wait for the Render server to start initially.)</div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Loading;
