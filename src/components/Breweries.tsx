import React from 'react';
import { brewery } from "../models/brewery-interface";
import { address } from "../models/address-interface";
import { RouteComponentProps } from "react-router-dom";
import queryString from 'query-string';

interface componentState {
  breweryList:  brewery[],
  city: string,
  state: string
}

class Breweries extends React.Component< RouteComponentProps, componentState> {
  constructor(props: RouteComponentProps) {
    super(props);
    let params = queryString.parse(props.location.search) as unknown as address
    this.state = {
      breweryList:  [],
      city: params.city,
      state: params.state
    }
  }
  componentDidMount(): void {
    this.getCity();
  }
  
  render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Breweries in { this.state.city }, { this.state.state }
          </p>
          <p>Choose a different city.</p>
          <ul>
            {this.state.breweryList.map((brew, index) => (
              <li>
                <p>{ brew.name }, a { brew.breweryType } brewery located at: { brew.address.street }, { brew.address.city }
                , { brew.address.state } { brew.address.zip }, { brew.address.country }.</p>
                <p>For more information, visit <a href={ brew.url }>{brew.url}</a></p>
              </li>
            ))}
          </ul>
          <p></p>
        </header>
      </div>
    );
  }

  private getCity(): void {
    fetch('https://api.openbrewerydb.org/breweries?by_city='+this.state.city)
  	  .then(res => res.json())
  	  .then(result => {
        console.log(result);
        this.getCitySucessful(result);
      });
  } 

  private getCitySucessful(result: any): void {
    let a: Array<brewery> = [];
    
    for(let i = 0; i < result.length; ++i) {
      const addressHelper: address = {
        street: this.cleanData(result[i].street),
        city: this.cleanData(result[i].city),
        state: this.cleanData(result[i].state),
        zip: this.cleanData(result[i].postal_code),
        country: this.cleanData(result[i].country)
      };
      
      const breweryHelper: brewery = {
        name: this.cleanData(result[i].name),
        breweryType: this.cleanData(result[i].brewery_type),
        address: addressHelper,
        url: this.cleanData(result[i].website_url)
      };
      a.push(breweryHelper);
    }

    this.setState({
      breweryList: a
    })
  }

  private cleanData(data: string): string {
    return data.length > 0 ? data : "N/A";
  }
}

export {
  Breweries
}
