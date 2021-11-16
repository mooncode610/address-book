import React, { useState,useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import cross from '../../assets/cross.png';
import logo from '../../assets/icon.png';
import './AddressForm.scss';

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
    const [displayMessage, setDisplayMessage] = useState("");
    const {id} = useParams();

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
        console.log(object)
        addressbook.addAddressBook(object).then(data => {
            console.log("data added");
        }).catch(err => {
            console.log("err while add", err);
        })
        navigate('/home')
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
      <div class="form-content">
        <form class="form" action="#" onsubmit="save(event)" onreset="reset()" autocomplete="off">
            <div class="form-head">
                <h1 class="form-head-title">Person Address Form</h1>
                <a href="../pages/Home.html" class="cross">
                <img src={cross} class="cross" alt="cross"/>
                    </a>
            </div>
            <div class="row-content">
                <label class="label text" for="name">Full Name</label>
                <input class="input" type="text" id="name" name="name" required />
                <error-output id="name-error" class="text-error" for="text"></error-output>
              </div>
              <div class="row-content">
                <label class="label text" for="phoneNumber">Phone Number</label>
                <input class="input" type="tel" id="phoneNumber" name="phoneNumber" required />
                <error-output id="phone-error" class="tel-error" for="tel"></error-output>
              </div>
              <div class="row-content">
                <div class="text-row">
                  <label class="label text" for="address">Address</label>
                  <textarea id="address" class="input" name="Address" placeholder="" required></textarea>
                  <error-output id="address-error" class="address-error" for="address"></error-output>
                </div>
              </div>
              <div class="row-content location-row">
                <div>
                  <label class="label text" for="city">City</label>
                  <select id="city" name="City" required>
                    <option value="" disabled selected hidden>Select City</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>
                <div>
                  <label class="label text" for="state">State</label>
                  <select id="state" name="State" required>
                    <option value="" disabled selected hidden>Select State</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>
                <div>
                  <label class="label text" for="zip">Zipcode</label>
                  <input class="input" type="number" id="zip" name="zip" required />
                  <error-output id="zip-error" class="zip-error" for="zip"></error-output>
                </div>
              </div>
              <div class="buttonParent">
                <button type="submit" class="button submitButton" id="submitButton" >
                  Add
                </button>
                <button type="reset" class="resetButton button">Reset</button>
              </div>

        </form>
      </div>
      </div>
    );
}

export default AddressForm;