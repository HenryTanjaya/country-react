import React from 'react';
import ReactDOM from 'react-dom';



const COUNTRIES =[
  {name:'Indonesia',capital:'Jakarta',continent:'Asia'},
  {name:'Malaysia',capital:'Kuala Lumpur',continent:'Asia'},
  {name:'Egypt',capital:'Cairo',continent:'Africa'},
  {name:'England',capital:'London',continent:'Europe'},
  {name:'South Africa',capital:'Capetown',continent:'Africa'},
  {name:'France',capital:'Paris',continent:'Europe'},
  {name:'Australia',capital:'Canberra',continent:'Australia'},
  {name:'Brasil',capital:'Brasilia',continent:'America'},
];

class DropdownContinent extends React.Component{
  constructor(props){
    super(props);
    this.handleChangeContinent=this.handleChangeContinent.bind(this);
  }

  handleChangeContinent(e){
    this.props.onChangeContinent(e.target.value)
  }

  render(){
    const rows=[];
    const filteredContinent =[]
    let continentChecker=null;
    rows.push(<option>All</option>)
    this.props.countries.forEach(function(countries){
      if(filteredContinent.indexOf(countries.continent)===-1 && continentChecker !== countries.continent){
          filteredContinent.push(countries.continent)
          rows.push(<option>{countries.continent}</option>)
        }
        continentChecker = countries.continent
      }
    )
      return(
        <select onChange={this.handleChangeContinent} value={this.props.chosenContinent}>
          {rows}
        </select>
      )
    }
  }

  class FilteredTable extends React.Component{
    constructor(props){
      super(props);
      this.deleteCountry=this.deleteCountry.bind(this);
    }

    deleteCountry(country){
      this.props.deleteCountry(country);
    }

    render(){
      const chosenContinent = this.props.chosenContinent
      const rows=[];
      this.props.countries.forEach((country)=>{
        if(country.continent===chosenContinent || chosenContinent==="All"){
          rows.push(
            <tr>
              <td>{country.name}</td>
              <td>{country.capital}</td>
              <td>{country.continent}</td>
              <td onClick={()=>this.deleteCountry(country)}>X</td>
            </tr>
          )
        }
      })
      console.log({rows})
      return(
        <tbody>
          {rows}
        </tbody>
      )
    }
  }

class InputCountries extends React.Component{
    constructor(props){
      super(props);
      this.state={
        name:'',
        capital:'',
        continent:'',
      }
      this.addNewCountries=this.addNewCountries.bind(this)
      this.onChangeInputName = this.onChangeInputName.bind(this)
      this.onChangeInputCapital = this.onChangeInputCapital.bind(this)
      this.onChangeInputContinent = this.onChangeInputContinent.bind(this)
    }
    addNewCountries(){
      const temp = this.props.countries.slice(0);
      // this.props.countries.push({name:this.state.name,capital:this.state.capital,continent:this.state.continent})
      temp.push({name:this.state.name,capital:this.state.capital,continent:this.state.continent})
      this.setState({
        name:' ',
        capital:' ',
        continent:' '
      })
      this.props.countriesAdded(temp)
    }

    onChangeInputName(e){
      this.setState({
        name:e.target.value,
      })
    }
    onChangeInputCapital(e){
      this.setState({
        capital:e.target.value,
      })
    }
    onChangeInputContinent(e){
      this.setState({
        continent:e.target.value,
      })
    }

    render(){
      return(
        <div>
          <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChangeInputName}/>
          <input type="text" placeholder="capital" name="capital" value={this.state.capital} onChange={this.onChangeInputCapital}/>
          <input type="text" placeholder="continent" name="continent" value={this.state.continent} onChange={this.onChangeInputContinent}/>
          <button onClick={this.addNewCountries}>Submit</button>
        </div>
      )
    }
}


class FilteredCountries extends React.Component{
constructor(props){
  super(props);
  this.state={
    chosenContinent:'All',
    countriesData:COUNTRIES
  }
  this.handleChangeContinent=this.handleChangeContinent.bind(this)
  this.countriesDataChange=this.countriesDataChange.bind(this)
  this.deleteCountry=this.deleteCountry.bind(this)
}

handleChangeContinent(chosenContinent){
  this.setState({
    chosenContinent:chosenContinent
  })
}

countriesDataChange(countriesAdd){
  this.setState({
      countriesData:countriesAdd
  })
}

deleteCountry(deleteCountry){
  const temp = this.state.countriesData.slice(0);
  temp.splice(this.state.countriesData.indexOf(deleteCountry),1)
  this.setState({
    countriesData:temp
  })
  // console.log(temp)
  // console.log(this.state.countriesData.indexOf(deleteCountry))

}

render(){
    return(
      <div>
        <InputCountries countries={this.state.countriesData} countriesAdded={this.countriesDataChange}/>
        <DropdownContinent countries={this.state.countriesData} chosenContinent={this.state.chosenContinent} onChangeContinent={this.handleChangeContinent}/>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Capital</th>
              <th>Continent</th>
            </tr>
          </thead>
          <FilteredTable countries={this.state.countriesData} chosenContinent={this.state.chosenContinent}  deleteCountry={this.deleteCountry}/>
        </table>
      </div>
    )
  }
}


ReactDOM.render(
  <FilteredCountries countries={COUNTRIES} />,
  document.getElementById('root')
);
