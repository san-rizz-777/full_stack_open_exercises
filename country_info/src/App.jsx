import { useState, useEffect} from 'react'
import data_service from './backend/server.js'

function App() {
const [allCountries, setAllCountries] = useState([])   ///All countries in db
const [country, setCountry] = useState('')    //country in input
const [countryData, setCountryData] = useState({'capital': ["None"] , 'area' : 0, 'languages' : {"none" : "nope"}, "flags" : {'png' : "", 'svg' : "", 'alt' : ""}})
const [countryList, setCountryList] = useState([])    //list to showcase in search
const [errorMessage, setErrorMessage] = useState(null) //error message

///getting all the countries
useEffect(() => {
   ///get all the data
   const  fetchData = data_service.get_all_data();
   fetchData.then((data) =>
   {
       const countries = []
       for (let key in data) {
           countries.push(data[key].name.common);
       }
       setAllCountries(countries);
       console.log(countries);
   })
}, [])


    ///To update the info added in tht input block
    const handleCountryName = (e) =>
    {
        setCountry(e.target.value);
        setCountryList([]);
        handleCountryMatch();
        setErrorMessage(null);
        console.log(country)
    }

    ///to make list of countries that matched
    const handleCountryMatch = () => {
    ///clear previous guy
       // setCountryList([]);
        console.log(countryList);
         for (let country_ in allCountries) {
             ///if string includes the substring

             if(allCountries[country_].includes(country))
             {
                 console.log(allCountries[country_]);
                 if(countryList.length!==10)
                 {
                     //if(countryList.find(allCountries[country_])===undefined){
                     const newCountryList =  countryList.concat(allCountries[country_]);

                     //Remove the duplicates
                     const newCountryList1 = newCountryList.filter((it,id) => newCountryList.indexOf(it)===id);

                     console.log(newCountryList1);
                     setCountryList(newCountryList1);
                     //}
                 }
                 else{
                     ///display some error message
                     setCountryList([]);
                     setErrorMessage("Too many matches, specify another filter!!!");
                     break;
                 }
             }
         }
    }

    const handleCountrySearch = () => {
    ///Getting the promise
            const country_data = data_service.get_country_data(country.toLowerCase());
            country_data.then((country_i) => {
                console.log(country_i);
                setCountryData(country_i);
            })
            console.log("Clickeddd")
    }

    ///For showcasing the language (loop over the object)
    const loopOverLanguage = () => {
    const listItems = []
        ///looping over the object and making a array of li
    for(let key in countryData.languages) {
        const val = countryData.languages[key];
        listItems.push(<li key={key}>{val}</li>);
    }

    return listItems;
    }


////to show the filtered countries
const handleShowcaseCountries = () => {
    const listItems = []
    for(let index in countryList) {
        listItems.push(<li key={countryList[index]}>{countryList[index]}</li>);
    }
    return listItems;
}


  return (
<div>
    find countries <input onChange={handleCountryName}/>
    <button onClick={handleCountrySearch}>Search</button>
    <br/>
    <p>{errorMessage!==null?errorMessage : ""}</p>
    {errorMessage===null?<ul>{handleShowcaseCountries()}</ul> : ""}
    <h1>{country}</h1>
    <p>Capital :- {countryData.capital[0]}</p>
    <p>Area :- {countryData.area}</p>
    <h2>Languages :- </h2>
    <ul>{loopOverLanguage()}</ul>
    <img src={countryData.flags.png} alt={countryData.flags.alt}/>
</div>
  )
}

export default App
