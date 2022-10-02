import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [searchCountryData, setSearchCountryData] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState({});
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/all").then((response) => {
      // console.log(response.data);
      setData({ ...response.data });
    });
  }, []);
  useEffect(() => {
    axios
      .get(`https://disease.sh/v3/covid-19/countries`)
      .then((response) => {
        console.log(response.data);
        setSearchData([...response.data]);
      });
  }, []);
  useEffect(()=>{
    axios
      .get(`https://disease.sh/v3/covid-19/countries/${search}`)
      .then((response) => {
        console.log(response.data,"ss");
        setSearchCountryData({...response.data});
      });
  },[search])
  if (toggle) {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  }

  return (
    <>
      <div className="header">
        <h1>WORLD COVID19 TRACKER</h1>
        {toggle ? (
          <button onClick={() => setToggle(!toggle)}>DARK THEME</button>
        ) : (
          <button onClick={() => setToggle(!toggle)}>LIGHT THEME</button>
        )}
      </div>
      <div className="search_result">
  
  <div className="display_flex" >
    <h6>COUNTRY::: <strong>{searchCountryData.country}</strong>  </h6>
  <h6>ACTIVE:::<strong>{searchCountryData.active}</strong></h6>
  <h6>DEATH:::<strong>{searchCountryData.deaths}</strong></h6>
  <h6>RECOVERED:::<strong>{searchCountryData.recovered}</strong></h6>
  <h6>TODAY CASES:::<strong>{searchCountryData.todayCases}</strong></h6>
  <h6>TODAY DEATH:::<strong>{searchCountryData.todayDeaths}</strong></h6>
  <h6>TODAY RECOVERED:::<strong>{searchCountryData.todayRecovered}</strong></h6>
  </div>
  
</div>

      <div className="display_world_status">
        <div className="world_population">
          <div className="left_input">
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value.toUpperCase());
              }}
              placeholder="Enter country code"
            />
          </div>
          <div className="right_population">
            <h2>WORLD POPULATON</h2>
            <h3>{data.population}</h3>
          </div>
        </div>
        <div className="responsive_div">
          <div className="world_cases_total">
            <div className={toggle ? "active_cases" : "active_cases-dark"}>
              <h2>ACTIVE CASES</h2>
              <h3>{data.active}</h3>
            </div>
            <div className={toggle ? "death_cases" : "death_cases-dark"}>
              <h2>TOTAL DEATHS</h2>
              <h3>{data.deaths}</h3>
            </div>
            <div
              className={toggle ? "recovered_cases" : "recovered_cases-dark"}
            >
              <h2>RECOVERED TOLL</h2>
              <h3>{data.recovered}</h3>
            </div>
          </div>
          <div className="current_status">
            <div className={toggle ? "active_current" : "active_current-dark"}>
              <h2>TODAY ACTIVE</h2>
              <h3>{data.todayCases}</h3>
            </div>
            <div className={toggle ? "death_current" : "death_current-dark"}>
              <h2>TODAY DEATHS</h2>
              <h3>{data.todayDeaths}</h3>
            </div>
            <div
              className={
                toggle ? "recovered_current" : "recovered_current-dark"
              }
            >
              <h2>TODAY RECOVERED</h2>
              <h3>{data.todayRecovered}</h3>
            </div>
          </div>
        </div>
      </div>
      
  
  <div className={toggle?"tag_name":"tag_name-dark"} style={{display:"flex",justifyContent:"center"}}>
    <h6 className="tag_name-country">COUNTRY</h6>
  <h6 className="tag_name-active">ACTIVE</h6>
  <h6 className="tag_name-death">DEATH</h6>
  <h6 className="tag_name-recovered">RECOVERED</h6>
  <h6 className="tag_name-today-cases">TODAY CASES</h6>
  <h6 className="tag_name-today-death">TODAY DEATH</h6>
  <h6 className="tag_name-today-recovered">TODAY RECOVERED</h6>
  </div>
  

      <div className="each_country-status">
        {searchData.map((list) => {
          console.log(list.country);
          return (
            <div className="country_list">
              <img className={toggle?"img_dark":"img_light"} src={list.countryInfo.flag} alt="" width="6%" height="6%" />
              <h4 className="list_country">{list.country}</h4>
              <h4 className="list_active">{list.active}</h4>
              <h4 className="list_deaths">{list.deaths}</h4>
              <h4 className="list_recovered">{list.recovered}</h4>
              <h4 className="list_todayCases">{list.todayCases}</h4>
              <h4 className="list_todayDeaths">{list.todayDeaths}</h4>
              <h4 className="list_todayRecovered">{list.todayRecovered}</h4>
            </div>
          );
        })}
  
      </div>
    </>
  );
}

export default App;
