import './App.css';
import {useState,useEffect} from 'react'
import { FormControl, Select,MenuItem, Card, CardContent } from '@mui/material';
import InfoBox from './Components/InfoBox';
import Map from './Components/Map';
import Table from './Components/Table';
import LineGraph from './Components/LineGraph';
import { prettyPrintStat, sortData } from './util';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryinfo, setCountryinfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter] = useState({lat:34.80746,lng:-40.4796});//center of pacific ocena
  const [mapZoom,setMapZoom] = useState(3);//see entire map
  const [mapCountries,setMapCountries]=useState([]);
  const [casesType,setCasesType]=useState('active')
  //useEffect - hook in react. runs code based on condition 
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response=>response.json())
    .then(data=>{
      setCountryinfo(data);
    })
  },[]);
  useEffect(() =>{ 
    //async request to server and wait for response and do something with info
    const getCountriesData=async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>
        response.json())
      .then((data)=>{
        const countries_new=data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }
        ));
        //map returns an array of items 
        const sortedData=sortData(data)
        setCountries(countries_new);
        setTableData(sortedData);
        setMapCountries(data);
      });
    };
    getCountriesData();
  },[countries])
  const onCountryChange=async (event)=>{
    const countryCode=event.target.value;
    setCountry(countryCode);
    const url=countryCode==='worldwide'
    ?'https://disease.sh/v3/covid-19/all':
    `https:disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then(response => response.json())
    .then((data)=>{
      setCountryinfo(data);
      setCountry(countryCode);
      setMapCenter({lat:data.countryInfo.lat,lng:data.countryInfo.long})
      setMapZoom(4);
    });
    //https://disease.sh/v3/covid-19/all -> worldwide
    //https://disease.sh/v3/covid-19/countries/{countryname}
  }
  return (
    <div className="app">
    <div className="app__left">
    <div className="app__header">
    <h1>COVID-19 TRACKER</h1>
      {/* app__dropdown - them naming - component__element */}
      <FormControl className="app__dropdown">
        <Select variant='outlined' onChange={onCountryChange} value={country}>
          <MenuItem value='worldwide'>Worldwide</MenuItem>
          {
            countries.map(country =>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
    <div className="app__stats">
      <InfoBox 
      active={casesType==='active'}
      onClick={e=>setCasesType('active')}
      title='Today Cases' 
      total={prettyPrintStat(countryinfo.active)} 
      cases={prettyPrintStat(countryinfo.todayCases)}>
      </InfoBox>
      <InfoBox 
      active={casesType==='recovered'}
      onClick={e=>setCasesType('recovered')}
      title='Recovered' total={prettyPrintStat(countryinfo.recovered)} cases={prettyPrintStat(countryinfo.todayRecovered)}></InfoBox>
      <InfoBox 
      active={casesType==='deaths'}
      onClick={e=>setCasesType('deaths')}
      title='Deaths' total={prettyPrintStat(countryinfo.deaths)} cases={prettyPrintStat(countryinfo.todayDeaths)}></InfoBox>
    </div>
    <Map 
    casesType={casesType}
    countries={mapCountries} center={mapCenter} zoom={mapZoom}></Map>
    </div>
      <Card className="app__right"> 
      <CardContent>
        <h3> Active cases by country</h3>
        <Table countries={tableData}></Table>
        <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
        <LineGraph className="app__graph" casesType={casesType}></LineGraph>
      </CardContent>  
      </Card>
    </div>
  );
}

export default App;
