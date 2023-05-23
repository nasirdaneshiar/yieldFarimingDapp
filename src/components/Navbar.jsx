import React from "react";
import bank from '../bank.png'

function Navbar(props){
    return(
        <div>
            <nav className="navbar navbar-dark fixed-top shadow p-0" style={{backgroundColor:'black', height:'50px'}}>
                <a className="navbar-brand col-sm-3 col-md-2 m2-0" 
                style={{color:'white'}}>
                <img src={bank} width='50' height='30' className='d-inline-block align-top'/>
                &nbsp; DAPP Yield Staking (Decentralized Banking) 
                </a>
                <ul className="navbar-nav px-4">
                    <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
                        <small style={{color:'white'}}>Account Number:{props.account}</small>
                    </li>
                </ul>
            </nav>
        </div>
    )
}


export default Navbar;