import React from 'react'

const Feature = () => {
  return (
    <div>
      <div>
    <section>
      <div className="row">
        <h1>Our Features</h1>
      </div>
      <div className="row">
        <div className="column">
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-user"></i>
            </div>
            <h3>User Friendly</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              asperiores natus ad molestiae aliquid explicabo. Iste eaque quo et
              commodi.
            </p>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h3>Super Secure</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              asperiores natus ad molestiae aliquid explicabo. Iste eaque quo et
              commodi.
            </p>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-headset"></i>
            </div>
            <h3>Quick Support</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              asperiores natus ad molestiae aliquid explicabo. Iste eaque quo et
              commodi.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <style>
    {`* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.row {
  display: flex;
  justify-content: right;
  flex-wrap: wrap;
}
.row h1 {
  width: 100%;
  text-align: center;
  font-size: 3.75em;
  margin: 0.6em 0;
  font-weight: 600;
  color: #070024;
}
.column {
  padding: 1em;
}
.card {
  padding: 3.1em 1.25em;
  text-align: center;
  background: linear-gradient(0deg, #397ef6 10px, transparent 10px);
  background-repeat: no-repeat;
  background-position: 0 0.62em;
  box-shadow: 0 0 2.5em rgba(0, 0, 0, 0.15);
  border-radius: 0.5em;
  transition: 0.5s;
  cursor: pointer;
}
.card .icon {
  font-size: 2.5em;
  height: 2em;
  width: 2em;
  margin: auto;
  background-color: #397ef6;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
}
.icon:before {
  position: absolute;
  content: "";
  height: 1.5em;
  width: 1.5em;
  border: 0.12em solid #397ef6;
  border-radius: 50%;
  transition: 0.5s;
}
.card h3 {
  font-size: 1.3em;
  margin: 1em 0 1.4em 0;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: #070024;
}
.card p {
  line-height: 2em;
  color: #625a71;
}
.card:hover {
  background-position: 0;
}
.card:hover .icon:before {
  height: 2.25em;
  width: 2.25em;
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
    padding: 2.5em 0.5em;
  }
  .column {
    flex: 0 0 25%;
    max-width: 25%;
    padding: 0 1em;
  }
}`}
  </style>
    </div>
  )
}

export default Feature
