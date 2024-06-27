import React from "react";

const HomeComponent = () => {
  return (
    <main>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/5905443/pexels-photo-5905443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="d-block w-100"
              alt="homePage"
            />
            <div className="carousel-content-1">
              <h2>Student</h2>
              <p>You can experience an extraordinary learning journey.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/159675/books-stairs-reading-read-159675.jpeg"
              className="d-block w-100"
              alt="homePage"
            />
            <div className="carousel-content-2">
              <h2>Instructor</h2>
              <p className="fs-5">
                We offer an unparalleled opportunity to showcase your expertise.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </main>
  );
};

export default HomeComponent;
