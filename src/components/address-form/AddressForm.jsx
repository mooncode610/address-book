import React, { useState, useEffect } from "react";
import { Link, useParams} from 'react-router-dom';
import cross from '../../assets/cross.png';
import logo from '../../assets/icon.png';
import './AddressForm.scss';
import AddressBookService from "../../services/AddressBookService";


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
    const addressBookService = new AddressBookService();
    const [formValue, setForm] = useState(initialValue);
    const [displayMeassage, setDisplayMessage] = useState("");
    const params = useParams();
    useEffect(() => {
        if (params.id) {
            getDataById(params.id);
        }
    },[]);

    const getDataById = (id) => {
        addressBookService.getContact(id).then((data) => {
            console.log("Data is   ", data.data.data);
            let object = data.data.data;
            setData(object);
        }).catch((error) => {
            console.log("Error is ", error);
        });
    };

    const setData = (object) => {
        console.log(object);
        setForm({
            ...formValue, ...object, isUpdate: true,
        });
    };
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
            zip: ''

        }
        const regName = /^[A-Z]{1}[A-Za-z]{2,}([\s]?([a-zA-Z]+))*$/
        if (formValue.name.length < 1 || !regName.test(formValue.name)) {
            error.name = 'Name Invalid'
            isError = true;
        }
        const regPhoneNumber = /^[+]?([0-9]{2})?[789]{1}[0-9]{9}$/
        if (formValue.phoneNumber.length < 1 || !regPhoneNumber.test(formValue.phoneNumber)) {
            error.phoneNumber = 'Phone Number Invalid'
            isError = true;
        }
        const regAddress = /^[a-zA-Z0-9]{3,}([\s]?[a-zA-Z0-9]{3,})*$/
        if (formValue.address.length < 1 || !regAddress.test(formValue.address)) {
            error.address = 'Address incorrect'
            isError = true;
        }
        const regZip = /^[0-9]{3}[\s]?[0-9]{3}$/
        if (formValue.zip.length < 1 || !regZip.test(formValue.zip)) {
            error.zip = 'Zip incorrect'
            isError = true;
        }

        if (formValue.city.length < 1) {
            error.city = 'City is required'
            isError = true;
        }
        if (formValue.state.length < 1) {
            error.state = 'State is required'
            isError = true;
        }

        await setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
        if (await validData()) {
            console.log('error', formValue);
            return;
        }

        let object = {
            name: formValue.name,
            phoneNumber: formValue.phoneNumber,
            city: formValue.city,
            state: formValue.state,
            address: formValue.address,
            id: '',
            zip: formValue.zip,
        }

        if (formValue.isUpdate) {
            addressBookService.updateContact(object, params.id).then((data) => {
                setDisplayMessage("Contact Updated Successfully");
                console.log("Data after update", data);
                reset();
                setTimeout(() => {
                    setDisplayMessage("");
                    window.location.replace("/");
                }, 1000);
            }).catch((error) => {
                setDisplayMessage("Error while updating contact");
                console.log("Error while updating", error);
                setTimeout(() => {
                    setDisplayMessage("");
                }, 1000);
            });
        } else {
            addressBookService.addAddressBookData(object).then((data) => {
                setDisplayMessage("Contact Added Successfully");
                console.log("Data added");
                reset();
                setTimeout(() => {
                    setDisplayMessage("");
                    window.location.replace("/");
                }, 1000);
            }).catch((error) => {
                setDisplayMessage("Error while adding contact");
                console.log("Error while adding employee");
                setTimeout(() => {
                    setDisplayMessage("");
                }, 1000);
            });
        }
    }
    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
        console.log(formValue);
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
                <form className="form" action="#" onSubmit={save}>
                    <div className="form-head">
                        <h1 className="form-head-title">Person Address Form</h1>
                        <Link to="/home" class="cross"><img src={cross}alt="cross" /></Link>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="name">Full Name</label>
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} autoComplete="disable" required />
                        <div className="error" id="name-error">{formValue.error.name}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="phoneNumber">Phone Number</label>
                        <input className="input" type="tel" id="phoneNumber" name="phoneNumber" value={formValue.phoneNumber}onChange={changeValue} autoComplete="disable" required />
                        <div className="error" id="phoneNumber-error">{formValue.error.phoneNumber}</div>
                    </div>
                    <div className="row-content">
                        <div className="text-row">
                            <label className="label text" htmlFor="address">Address</label>
                            <textarea id="address" className="input" name="address" value={formValue.address} onChange={changeValue} placeholder="" style={{ height: "100px" }} autoComplete="disable"></textarea>
                            <div className="error" id="address-error">{formValue.error.address}</div>


                        </div>
                    </div>
                    <div className="row-content location-row">
                        <div>
                            <label className="label text" htmlFor="city">City</label>
                            <select id="city" onChange={changeValue} name="city"value={formValue.city} >
                                <option value="" disabled selected hidden>Select City</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Pune">Pune</option>
                            </select>
                            <div className="error" id="zip-error">{formValue.error.city}</div>

                        </div>
                        <div className="state-row">
                            <label className="label text" htmlFor="state">State</label>
                            <select id="state" onChange={changeValue} name="state" value={formValue.state}>
                                <option value="" disabled selected hidden>Select State</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Maharastra">Maharashtra</option>
                            </select>
                            <div className="error" id="zip-error">{formValue.error.state}</div>
                        </div>
                        <div>
                            <label className="label text" htmlFor="zip">Zipcode</label>
                            <input className="input" type="text" id="zip" name="zip" value={formValue.zip}onChange={changeValue} required autoComplete="disable" />
                            <div className="error" id="zip-error">{formValue.error.zip}</div>


                        </div>
                    </div>
                    <div className="buttonParent">
                        <button type="submit" className="button submitButton" id="addButton" >{formValue.isUpdate ? 'Submit' : 'Submit'}</button>
                        <button type="reset" onClick={reset} className="button resetButton">Reset</button>
                    </div>
                    <div className="displaymessage">
                        {displayMeassage}
                    </div>
                </form>
      </div>
      </div>
    );
}

export default AddressForm;