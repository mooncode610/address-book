import React, { useState } from "react";
import { Link } from 'react-router-dom';
import cross from '../../assets/cross.png';
import logo from '../../assets/icon.png';
import './AddressForm.scss';
import AddressBookService from "../../services/AddressBookService";
var addressBookService = new AddressBookService();

const AddressForm = (props) => {

    let initialValue = {
        name: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        id: '',
        isUpdate: false,
        error: {
            name: '',
            phoneNumber: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        }

    }

    const [formValue, setForm] = useState(initialValue);

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const validData = async () => {
        let isError = false;
        let error = {
            name: '',
            phoneNumber: '',
            address: '',
            city: '',
            state: '',
            zipCode: ''

        }
        if (!formValue.name.match('^[A-Z]{1}[a-zA-Z]{2,}')) {
            error.name = 'Name error'
            isError = true;
        }
        if (!formValue.phoneNumber.match('^[+]?([0-9]{2})?[789]{1}[0-9]{9}$')) {
            error.phoneNumber = 'Phone number error'
            isError = true;
        }
        if (!formValue.address.match('^[a-zA-Z0-9]{3,}([\\s]?[a-zA-Z0-9]{3,})*')) {
            error.address = 'Address error'
            isError = true;
        }
        if (!formValue.zip.match('^[0-9]{3}[\\s]?[0-9]{3}$')) {
            error.zip = 'zip error'
            isError = true;
        }

        if (formValue.city.length < 1) {
            error.city = 'city is required'
            isError = true;
        }
        if (formValue.state.length < 1) {
            error.state = 'state is required'
            isError = true;
        }

        await setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
        console.log("save");

        if (await validData()) {
            console.log('error', formValue);
            return;
        }
        let object = {
            name: formValue.name,
            phoneNumber: formValue.phoneNumber,
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            zip: formValue.zip,
            id:''
        }
        addressBookService.addAddressBookData(object).then(data => {
            console.log("data added successfully");
        }).catch(err => {
            console.log("error occured while adding", err);
        })
    }


    return(
    <div className="address-main">
    <header class="header-content header">
        <div className="logo-content">
          <img src={logo } alt="" />
          <div>
            <span class="address-text">ADDRESS</span><br />
            <span class="address-text book-text">BOOK</span>
          </div>
        </div>
      </header>
      <div className="form-content">
                <form className="form" action="#">
                    <div className="form-head">
                        <h1 className="form-head-title">Person Address Form</h1>
                        <Link to="/home" class="cross"><img src={cross}alt="cross" /></Link>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="name">Full Name</label>
                        <input className="input" type="text" id="name" name="name" onChange={changeValue} autocomplete="disable" required />
                        <div className="error" id="name-error">{formValue.error.name}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="phoneNumber">Phone Number</label>
                        <input className="input" type="tel" id="phoneNumber" name="phoneNumber" onChange={changeValue} autocomplete="disable" required />
                        <div className="error" id="phoneNumber-error">{formValue.error.phoneNumber}</div>
                    </div>
                    <div className="row-content">
                        <div className="text-row">
                            <label className="label text" htmlFor="address">Address</label>
                            <textarea id="address" className="input" name="address" onChange={changeValue} placeholder="" style={{ height: "100px" }} autocomplete="disable"></textarea>
                            <div className="error" id="address-error">{formValue.error.address}</div>


                        </div>
                    </div>
                    <div className="row-content location-row">
                        <div>
                            <label className="label text" htmlFor="city">City</label>
                            <select id="city" onChange={changeValue} name="city">
                                <option value="" disabled selected hidden>Select City</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Pune">Pune</option>
                            </select>
                            <div className="error" id="zip-error">{formValue.error.city}</div>

                        </div>
                        <div className="state-row">
                            <label className="label text" htmlFor="state">State</label>
                            <select id="state" onChange={changeValue} name="state">
                                <option value="" disabled selected hidden>Select State</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Maharastra">Maharashtra</option>
                            </select>
                            <div className="error" id="zip-error">{formValue.error.state}</div>
                        </div>
                        <div>
                            <label className="label text" htmlFor="zip">Zipcode</label>
                            <input className="input" type="text" id="zip" name="zip" onChange={changeValue} required autocomplete="disable" />
                            <div className="error" id="zip-error">{formValue.error.zip}</div>


                        </div>
                    </div>
                    <div className="buttonParent">
                        <div className="submit-reset">
                            <button type="submit" class="button submitButton" id="submitButton" onClick={save}>
                                Add
                            </button>
                            <button type="reset" class="resetButton button" id="resetButton" onclick="reset()"
                            >Reset</button>
                        </div>
                    </div>
                </form>
      </div>
      </div>
    );
}

export default AddressForm;