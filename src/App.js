import logo from './logo.svg';
import './App.css';

import { Component, useEffect, useState, createRef } from 'react';
import StorageBoi from './StorageBoi.json'
import { Contract, ethers, BigNumber } from 'ethers'
import { render } from '@testing-library/react';
//import ContractInteraction from './ContractInteraction';

const storageBoiAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(storageBoiAddress, StorageBoi.abi, provider);


class App extends Component {

  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    //const provider = new ethers.providers.Web3Provider(window.ethereum);
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    this.setState({ account: await signer.getAddress() })

    const contract = new ethers.Contract(storageBoiAddress, StorageBoi.abi, provider);
    let num = await contract.myNumber();
    console.log("My Number: ", Number(num));
    this.setState({ MyNumber: Number(num) });

    this.setState({contract});
  }

  changeNumber(content) {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(storageBoiAddress, StorageBoi.abi, signer);
    contract.setNumber(BigNumber.from(content)).then((transferResult) => {
      console.dir(transferResult)
      alert("Transaction Sent")
    })
  }

  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      MyNumber: 0,
      want: 0
    }
    this.changeNumber = this.changeNumber.bind(this)
  }

  render() {
    return (
      <div className="container">
        <h1>Hello, World!</h1>
        <p>Your account: {this.state.account}</p>
        <p>Your Number: {this.state.MyNumber}</p>
        <form onSubmit={(event) => {
            event.preventDefault()
            this.changeNumber(event.target[0].value)
          }}>
            <input id="newTask" ref={(input) => this.want = input} type="text" className="form-control" placeholder="Add task..." required />
            <input type="submit"/>
          </form>
      </div>
      
    );
  }
}

export default App;
