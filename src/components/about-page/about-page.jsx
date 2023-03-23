import "./about-page.css";
import React from "react";

function template() {
  return (
    <div className="about-page">
      <h1>About the Web App</h1>
      <hr class="section-divider"/>
      <div class="about-box">
        <h1 class="about-title">App Overview</h1>
        <p>Created as part of a group project for the CIS4301 course at the University of Florida, this web application analyzes and 
          visualizes crime data in Los Angeles based on user input through various filtering methods. The application uses two databases: 
          A Los Angeles crime database and a COVID-19 database. More information on these databases can be found on the Data page. 
          Data is visualized through the use of dynamic graphs and trend lines that change depending on user-selected filters.</p>
        <h1 class="about-title">Potential User Interest</h1>
        <p>Our aim in developing this project is to effectively provide freedom to the users in analyzing the local crime trends in LA as per 
          their interest and user-specific filtration of queries, so as to be able to perceive the crime trends not only through textual information 
          but graphically as well, and also observe a change in crime due to the recent surge in Covid-19 cases. It will provide a multi-faceted
          platform enabling all associates, from law enforcement officers and policymakers to residents and migrants to utilize the platform as
          per their interests and power.</p>
        <h1 class="about-title">The Developers</h1>
        <ul>
          <li>Ananya Agrawal</li>
          <li>William Gregory</li>
          <li>Carrima Hewitt</li>
          <li>Maanasi Vadlamani</li>
        </ul>
      </div>
    </div>
  );
};

export default template;
