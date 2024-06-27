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
        zIndex: "1000",
      }}
    >
      <div
        className="position-absolute top-50 start-50 translate-middle"
        style={{ width: "40vw" }}
      >
        <div class="card text-center">
          <div class="card-body">Loading...(The render server is waking)</div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Loading;
