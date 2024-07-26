import React from 'react';
import '../assets/styles/Home2.css';

const Home2 = () => {
  return (
    <div className="Home2-main">
      <div className="Home2-Left">
        <div className="head1">
          <h1>Create Your Organization and Track Your Employees Effortlessly</h1>
        </div>
        <div className="head2">
          <img src='./Home2.jpg' alt="Header Image" />
        </div>
        <div className="head3">
          <h3>Performance Management Software that slashes 90% admin workload</h3>
        </div>
      </div>
      <div className="Home2-Right">
        <form>
          <h2>Request demo</h2>
          <div className="form-group">
            <label htmlFor="email">Mail Id:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number:</label>
            <input type="text" id="number" name="number" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Home2;
