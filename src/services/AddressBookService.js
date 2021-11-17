import config from "../config/config";
import AxiosService from './axios-service'

export default class AddressBookService{
    baseUrl = config.baseUrl;
    addAddressBookData(data){
        return AxiosService.postService(`${this.baseUrl}/addressbook/create/`, data);
    }
    getAllContacts() {
        return AxiosService.getService(`${this.baseUrl}addressbook/`);
    }
    getContact(id) {
        return AxiosService.getService(`${this.baseUrl}addressbook/get/${id}`);
    }
    updateContact(data, id) {
        return AxiosService.putService(`${this.baseUrl}addressbook/update/${id}`, data);
    }
    deleteContact(id) {
        return AxiosService.deleteService(`${this.baseUrl}addressbook/delete/${id}`);
    }
}