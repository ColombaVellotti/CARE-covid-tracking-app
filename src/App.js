import React from 'react';  
import styles from './App.module.css'  
import { Cards, Charts, CountryPicker } from './Components'
import { Header } from "./Components" 
import {fetchData} from './api';  
import logo from './images/image.png';

class App extends React.Component {  
    state = {         
    data: {},  
    country: '',  
    }  
    async componentDidMount(){  
        const data = await fetchData();  
        //console.log(fetchedData);  
        this.setState({data});  
    }  
  
     handleCountryChange = async (country) => {          
        const data = await fetchData(country);  
        this.setState({data: data, country: country});  
     }  
  
    render(){  
        const {data, country } = this.state;  
        return(  
        <div  className={styles.container} >  
            <img className={styles.image} src={logo} alt="Covid-19"/>  
            <Cards data={data}/>  
            <CountryPicker handleCountryChange={this.handleCountryChange}/>  
            <Charts data={data} country={country}/>  
        </div>  
    )  
}  
}  
  
export default App; 