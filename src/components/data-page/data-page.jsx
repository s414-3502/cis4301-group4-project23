import "./data-page.css";
import React from "react";

function template() {
  return (
    <div className="data-page">
      <h1>The Data</h1>
      <hr class="section-divider"/>
      <div class="data" role="region" tabindex="0">
        <h1 class="data-title">DATA SOURCES</h1>
        <table>
          <thead>
          <tr>
            <th>Data</th>
            <th>Source</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Los Angeles Crime Data</td>
            <td>https://lacounty.gov/government/about-la-county/maps-and-geography/</td>
          </tr>
          <tr>
            <td>COVID-19 Data</td>
            <td>https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/g62h-syeh</td>
          </tr>
          </tbody>
        </table>
      </div>
      <hr class="section-divider"/>
      <div class="data" role="region" tabindex="0">
        <h1 class="data-title">CRIME GROUPINGS</h1>
        <table>
          <thead>
          <tr>
            <th>Crime Grouping</th>
            <th>Specific Crimes</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Minor Crimes</td>
            <td>Abortion/Illegal, Bigamy, Blocking Door Induction Center, Bomb Scare,  Brandish Weapon, Child Annoying (17yrs & Under), 
               Child Stealing, Criminal  Threats - No Weapon Displayed, Cruelty To Animals, Disrupt School,  Disturbing The Peace, Drunk Roll,
               Failure To Disperse, Failure To Yield,  False Imprisonment, False Police Report, Firearms Restraining Order  (Firearms Ro), 
               Firearms Temporary Restraining Order (Temp Firearms Ro),  Illegal Dumping, Inciting A Riot, Indecent Exposure, 
               Other Miscellaneous Crime, Peeping Tom, Prowler, Replica Firearms(Sale,Display,Manufacture Or  Distribute), Resisting Arrest, 
               Stalking, Telephone Property - Damage,  Threatening Phone Calls/Letters, Violation Of Court Order, Violation Of  Restraining Order, 
               Violation Of Temporary Restraining Order
            </td>
          </tr>
          <tr>
            <td>Serious or Violent Crimes and Offenders</td>
            <td>Arson, Assault With Deadly Weapon On Police Officer, Assault With Deadly  Weapon, Aggravated Assault, Criminal Homicide, Human Trafficking - Commercial Sex Acts, Human Trafficking - Involuntary Servitude,  Kidnapping, Kidnapping - Grand Attempt, Lynching, Lynching - Attempted,  Manslaughter, Negligent, Pandering, Pimping, Rape, Attempted, Rape,  Forcible, Weapons Possession/Bombing</td>
          </tr>
          <tr>
            <td>Sexual Crimes&nbsp;</td>
            <td>Beastiality, Crime Against Nature Sexual Asslt With Anim, Child  Pornography, Human Trafficking - Commercial Sex Acts, Incest (Sexual Acts  Between Blood Relatives), Letters, Lewd - Telephone Calls, Lewd, Lewd  Conduct, Lewd/Lascivious Acts With Child, Oral Copulation, Pandering,  Pimping, Rape, Attempted, Rape, Forcible, Sex Offender Registrant Out Of  Compliance, Sex,Unlawful(Inc Mutual Consent, Penetration W/ Frgn Obj,  Sexual Penetration W/Foreign Object, Sodomy/Sexual Contact B/W Penis Of  One Pers To Anus Oth</td>
          </tr>
          <tr>
            <td>Battery or Assault</td>
            <td>Beastiality, Crime Against Nature Sexual Asslt With Anim, Child Abuse  (Physical) - Aggravated Assault, Child Abuse (Physical) - Simple Assault,  Criminal Homicide, Intimate Partner - Aggravated Assault, Intimate Partner - Simple Assault, Kidnapping, Kidnapping - Grand Attempt, Lynching,  Lynching - Attempted, Manslaughter, Negligent, Other Assault, Rape,  Attempted, Rape, Forcible, Sex Offender Registrant Out Of Compliance,  Throwing Object At Moving Vehicle</td>
          </tr>
          <tr>
            <td>Child Abuse</td>
            <td>Child Abandonment, Child Abuse (Physical) - Aggravated Assault, Child  Abuse (Physical) - Simple Assault, Child Neglect (See 300 W.I.C.), Child  Pornography, Crm Agnst Chld (13 Or Under) (14-15 &amp; Susp 10 Yrs Older),  Drugs, To A Minor, Lewd/Lascivious Acts With Child</td>
          </tr>
          <tr>
            <td>Gun Crimes&nbsp;</td>
            <td>Discharge Firearms/Shots Fired, Shots Fired At Inhabited Dwelling, Shots Fired At Moving Vehicle, Train Or Aircraft&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td>Robbery or Theft against  Person</td>
            <td>Dishonest Employee - Grand Theft, Dishonest Employee - Petty Theft,  Dishonest Employee Attempted Theft, Document Forgery / Stolen Felony,  Extortion, Pickpocket, Pickpocket, Attempt, Purse Snatching, Purse Snatching  - Attempt, Robbery, Theft From Person - Attempt, Theft Of Identity, Theft  Plain - Attempt, Theft Plain - Petty ($950 &amp; Under), Theft, Person</td>
          </tr>
          <tr>
            <td>Burglaries, Theft, and Property Crimes</td>
            <td>Document Worthless ($200 &amp; Under), Document Worthless ($200.01 &amp;  Over), Embezzlement, Grand Theft ($950.01 &amp; Over), Embezzlement, Petty  Theft ($950 &amp; Under), Grand Theft / Auto Repair, Petty Theft - Auto Repair,  Prowler, Shoplifting - Attempt, Shoplifting - Petty Theft ($950 &amp; Under),  Shoplifting-Grand Theft ($950.01 &amp; Over), Theft From Motor Vehicle - Attempt, Theft From Motor Vehicle - Grand ($950.01 And Over), Theft From  Motor Vehicle - Petty ($950 &amp; Under), Theft, Coin Machine - Attempt, Theft,  Coin Machine - Grand ($950.01 &amp; Over), Theft, Coin Machine - Petty ($950  &amp; Under), Theft-Grand ($950.01 &amp; Over)Excpt,Guns,Fowl,Livestk,Prod,  Throwing Object At Moving Vehicle, Till Tap - Attempt, Till Tap - Grand  Theft ($950.01 &amp; Over), Till Tap - Petty ($950 &amp; Under), Train Wrecking,  Trespassing, Vandalism - Felony ($400 &amp; Over, All Church Vandalisms),  Vandalism - Misdeameanor ($399 Or Under), Vehicle - Attempt Stolen,  Vehicle - Motorized Scooters, Bicycles, And Wheelchairs, Vehicle - Stolen</td>
          </tr>
          <tr>
            <td>Vehicle Related Crimes</td>
            <td>Driving Without Owner Consent (Dwoc), Grand Theft / Auto Repair, Petty  Theft - Auto Repair, Reckless Driving, Shots Fired At Moving Vehicle, Train  Or Aircraft, Theft From Motor Vehicle - Attempt, Theft From Motor Vehicle  - Grand ($950.01 And Over), Theft From Motor Vehicle - Petty ($950 &amp;  Under), Throwing Object At Moving Vehicle, Train Wrecking, Vehicle - Attempt Stolen, Vehicle - Motorized Scooters, Bicycles, And Wheelchairs,  Vehicle - Stolen</td>
          </tr>
          <tr>
            <td>Drugs</td>
            <td>Drugs To A Minor</td>
          </tr>
          <tr>
            <td>Vulnerable Adult Crimes</td>
            <td>Bunco, Attempt, Bunco, Grand Theft, Bunco, Petty Theft</td>
          </tr>
          <tr>
            <td>White Collar Crime</td>
            <td>Bribery, Conspiracy, Contempt Of Court, Contributing, Counterfeit, Credit  Cards, Fraud Use ($950 &amp; Under, Defrauding Innkeeper/Theft Of Services,  $950 &amp; Under, Defrauding Innkeeper/Theft Of Services, Over $950.01,  Dishonest Employee - Grand Theft, Dishonest Employee - Petty Theft,  Dishonest Employee Attempted Theft, Document Forgery / Stolen Felony,  Document Worthless ($200 &amp; Under), Document Worthless ($200.01 &amp;  Over), Embezzlement, Grand Theft ($950.01 &amp; Over), Embezzlement, Petty  Theft ($950 &amp; Under), Extortion, Grand Theft / Insurance Fraud, Theft Of  Identity, Unauthorized Computer Access</td>
          </tr>
          </tbody>
        </table>
      </div>
      <hr class="section-divider"/>
      <div class="data" role="region" tabindex="0">
        <h1 class="data-title">AREAS IN DISTICTS</h1>
        <table>
          <thead>
          <tr>
            <th>Supervisorial District</th>
            <th>Area (Area Name)</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>District 1&nbsp;</td>
            <td>1 (Central), 2 (Rampart), 4 (Hollenbeck), 11 (Northeast)</td>
          </tr>
          <tr>
            <td>District 2</td>
            <td>3 (Southwest), 12 (77th Street), 13 (Newton), 14 (Pacific), 18 (Southeast),  20 (Olympic)</td>
          </tr>
          <tr>
            <td>District 3</td>
            <td>6 (Hollywood), 7 (Wilshire), 8 (West LA), 9 (Van Nuys), 10 (West Valley),  16 (Foothill), 17 (Devonshire), 19 (Mission), 21 (Topanga)</td>
          </tr>
          <tr>
            <td>District 4</td>
            <td>5 (Harbor)</td>
          </tr>
          <tr>
            <td>District 5</td>
            <td>15 (N Hollywood)</td>
          </tr>
          </tbody>
      </table>
      </div>
    </div>
  );
};

export default template;
