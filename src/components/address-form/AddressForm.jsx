import cross from '../../assets/cross.png';
import logo from '../../assets/icon.png';
import './AddressForm.scss';

const AddressForm = (props) => {

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