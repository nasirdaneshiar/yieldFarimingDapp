import React, { Component } from "react";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import Main from './Main'
import ParticleSettings from './ParticleSettings'

class App extends Component {

    async  UNSAFE_componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData()
    }

    async  loadWeb3(){
        if(window.ethereuem){
            console.log('hi1')
            window.web3 = new Web3(window.ethereum)
            await window.ethereuem.enable()
        } else if(window.web3) {
            console.log('hi2')
            window.web3 = new Web3(window.ethereum)
            
        } else {
            console.log('hi3')
            window.alert('No etherium browser detected! you can chack out metamask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.requestAccounts()
        this.setState({account: accounts[0]})
        const networkId = await web3.eth.net.getId()
        this.setState({loading: true})
        
        // Load Tether Contract
        const tetherData = Tether.networks[networkId]
        if(tetherData) {
            const tether = new web3.eth.Contract(Tether.abi,tetherData.address)
            this.setState({tether:tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString() })
            console.log({balance: tetherBalance})
        } else {
            window.alert('Tether token not deployed!')
        }

        // Load RWD contract
        const rwdData = RWD.networks[networkId]
        if(rwdData) {
            const rwd = new web3.eth.Contract(RWD.abi,rwdData.address)
            console.log(rwd)
            this.setState({rwd:rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString() })
            console.log({balance: rwdBalance})
        } else {
            window.alert('Rwd token not deployed!')
        }

        // Load Decentral Bank contract
        const decentralBankData = DecentralBank.networks[networkId]
        if(decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi,decentralBankData.address)
            this.setState({decentralBank:decentralBank})
            let decentralBankBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: decentralBankBalance.toString() })
            
        } else { 
            window.alert('Decentral Bank not deployed!')
        }

        this.setState({loading: false})
    }

    // two functions one that stakes and one that unstake
    
    // staking function
    stakeTokens = (amount) => {
        this.state.loading=true
        this.state.tether.methods.approve(this.state.decentralBank._address,amount).send({from:this.state.account})
        console.log('hi4444444@@@:')
        this.state.decentralBank.methods.depositTokens(amount).send({from:this.state.account}).on('transactionHash', (hash)=>{
        this.state.loading=false
        })
        console.log('hi5555555@@@:')
    }

    // unstaking function
    unstakeTokens = () => {
        this.state.loading=true
        this.state.decentralBank.methods.unstakeTokens().send({from:this.state.account}).on('transactionHash', (hash)=>{
        this.state.loading=false
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            account:'0x0',
            tether:{},
            rwd:{}, 
            decentralBank:{},
            tetherBalance:'0',
            rwdBalance:'0',
            stakingBalance:'0',
            loading: true

        }
    }

    render() {
        let content
        {this.state.loading ? 
            content=<p id='loader' className="text-center" style={{margin:'30px',color:'black'}}>LOADING PLEASE...</p>: 
            content= 
            <Main
            tetherBalance={this.state.tetherBalance}
            rwdBalance={this.state.rwdBalance}
            stakingBalance={this.state.stakingBalance}
            stakeTokens = {this.stakeTokens}
            unstakeTokens = {this.unstakeTokens}
            />}
        return(
        <div className="App" style={{position:'relative'}}>
            <div style={{position:'absolute'}}>
                <ParticleSettings />
            </div>
            
            <Navbar account={this.state.account}/>
            <div className="container-fluid mt-5">
                <div className="row">
                    <main role='main' className="col-lg-12 ml-auto mr-auto" style={{maxWidth: '600px', minHeight:'100vm'}}>
                        <div>
                            {content}
                        </div>
                    </main>

                </div>
                
            </div>
            
        </div>
        )
    }
}

export default App;