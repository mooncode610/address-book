import config from "../config/config";
import AxiosService from './axios-service'

export default class AddressBookService{
    baseUrl = config.baseUrl;
    addAddressBookData(data){
        return AxiosService.postService(`${this.baseUrl}AddressBookDB`, data);
    }
    getAllContacts() {
        return AxiosService.getService(`${this.baseUrl}AddressBookDB`);
    }
    getContact(id) {
        return AxiosService.getService(`${this.baseUrl}AddressBookDB/${id}`);
    }
    updateContact(data, id) {
        return AxiosService.putService(`${this.baseUrl}AddressBookDB/${id}`, data);
    }
    deleteContact(id) {
        return AxiosService.deleteService(`${this.baseUrl}AddressBookDB/${id}`);
    }
}