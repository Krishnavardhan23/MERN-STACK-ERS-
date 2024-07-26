import React, { useState } from 'react';
import "../assets/styles/Home4.css";

const Home4 = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (activeTab === 'reviews') {
      return (
          <div className="reviews">
            {/* <center><h2>Why Customers Us?</h2></center> */}
          <div className='box'>
            <div id="heading">
                <h2>Victor.J</h2>
                <hr className="divider" />
            </div>
            <div id="content">
              <h4>
                ERS has been an absolute game-changer for me in terms of my professional growth and development. 
                What I love best about ERS is how it has empowered me to take control of my career journey. 
                The user-friendly interface and intuitive design have made it incredibly easy for me to navigate and utilize the platform.
              </h4>
            </div>
          </div>
          <div className='box'>
            <div id="heading">
                <h2>Shreya P</h2>
                <hr className="divider" />
            </div>
            <div id="content">
              <h4>
                I tried to avoid having 10 different platforms to manage our employees and there is no other
                platform that combines engagement, growth, and feedback like ERS does. That was a final driver for our decision to make the switch.
              </h4>
            </div>
          </div>
          <div className='box'>
            <div id="heading">
                <h2>Anushka Sharma</h2>
                <hr className="divider" />
            </div>
            <div id="content">
              <h4>
                Having everything in one platform with all our data intertwined gives us insights on what we can do as a people and culture
                team, and even as an organization to support or address areas of opportunity. 
              </h4>
            </div>
          </div>
          <div className='box'>
            <div id="heading">
                <h2>Daniel Jones</h2>
                <hr className="divider" />
            </div>
            <div id="content">
              <h4>
                We Choose ERS because it did Performance management,really really well  and it had the functions we were looking for.
                It felt like the perfect fit for us.
              </h4>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 'updates') {
      return (
        <div className="updates">
          <h1>....NO UPDATES...STAY TUNED</h1>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="Home4-main">
        <h3 className={activeTab === 'reviews' ? 'active' : ''} onClick={() => handleTabClick('reviews')}>Reviews</h3>
        <h3 className={activeTab === 'updates' ? 'active' : ''} onClick={() => handleTabClick('updates')}>Updates</h3>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Home4;
