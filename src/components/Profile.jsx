import React from 'react'

const Profile = () => {
  return (
    <div>
    <div>
      <div>
    <section>
      <div className="row">
        <h1>Our Team</h1>
      </div>
      <div className="row">
        
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src="/sidh.png" />
            </div>
            <h3>Sidhh Javalkoti</h3>
            <p>Data Science</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
    
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src="profile-img-2.png" />
            </div>
            <h3>Kshitij Kamble</h3>
            <p>Developer</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
    
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src="/pratik.png" />
            </div>
            <h3>Pratik Mandolikar</h3>
            <p>Designer</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
 <style>
    {`
    * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  background-color: rgb(213, 213, 234);;
}
  .card:first-child {
  margin-left: 60px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 2em 1em;
  text-align: center;
  justify-content: center;

}
.column {
  width: 100%;
  padding: 0.5em 0;
}
h1 {
  width: 100%;
  text-align: center;
  font-size: 3.5em;
  color: #1f003b;
}
.card {
  box-shadow: 0 0 1.2em rgba(25, 0, 58, 0.1);
  padding: 1.5em 0.5em;
  border-radius: 0.6em;
  color: #1f003b;
  cursor: pointer;
  transition: 0.3s;
  background-color: #ffffff;
}
.card .img-container {
  width: 4.5em;
  height: 4.5em;
  background-color: #a993ff;
  padding: 0.2em;
  border-radius: 50%;
  margin: 0 auto 1em auto;
}
.card img {
  width: 100%;
  border-radius: 50%;
}
.card h3 {
    font-size: 1em;
  font-weight: 500;
  margin-bottom: 0.2em;
}
.card p {
    font-size: 0.75em;
  font-weight: 300;
  text-transform: uppercase;
  margin: 0.em 0 1em 0;
  letter-spacing: 1px;
}
.icons {
  width: 80%;
  min-width: 180px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.card a {
  text-decoration: none;
  color: inherit;
  font-size: 1.4em;
}
.card:hover {
  background: linear-gradient(#6045ea, #8567f7);
  color: #ffffff;
}
.card:hover .img-container {
  transform: scale(1.15);
}
@media screen and (min-width: 768px) {
  section {
    padding: 1em 7em;
  }
}
@media screen and (min-width: 992px) {
  section {
    padding: 1em;
  }
  .card {
    padding: 5em 1em;
  }
  .column {
    flex: 0 0 25%;
    max-width: 25%;
    padding: 0 0.5em;
  }
}`}
 </style>
    </div>
    </div>
  )
}

export default Profile
