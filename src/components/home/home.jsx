import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/icon.png';
import addIcon from '../../assets/icons/add-24px.svg';
import './home.scss';
import AddressBookService from "../../services/AddressBookService";
import Display from '../display/Display';

class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            contactArray: []

        }
    }

    componentDidMount() {
        this.getAllContacts();
      }

    addressBookService = new AddressBookService();

    getAllContacts = () => {
        this.addressBookService.getAllContacts().then(data => {
            this.setState({ contactArray: data.data.data })
            console.log("Data after get ", data.data);
        }).catch(error => {
            console.log("Error after ", error);
        })
    }
    render() {
        return (
            <div className="main">
                <header className="header-content header">
                    <div className="logo-content">
                        <img src={logo} alt="" />
                        <div>
                            <span className="address-text">ADDRESS</span> <br />
                            <span className="address-text address-book">BOOK</span>
                        </div>
                    </div>
                </header>
                <div className="main-content">
                    <div className="header-content">
                        <div className="contact-detail-text">
                            Person Details
                        </div>
                        <Link to="/AddressForm" className="add-button flex-row-center"><img src={addIcon} alt="" />Add Person</Link>
                    </div>
                    <div className="table-main">
                        <Display contactArray={this.state.contactArray} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;