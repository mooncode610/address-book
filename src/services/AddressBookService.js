import config from "../config/config";
import AxiosService from './axios-service'

export default class AddressBookService{
    baseUrl = config.baseUrl;
    addAddressBookData(data){
        return AxiosService.postService(`${this.baseUrl}create/`, data);
    }
    getAllContacts() {
        return AxiosService.getService(`${this.baseUrl}`);
    }
    getContact(id) {
        return AxiosService.getService(`${this.baseUrl}AddressBookDB/get/`,id);
    }
    updateContact(data, id) {
        return AxiosService.putService(`${this.baseUrl}AddressBookDB/update/`,id, data);
    }
    deleteContact(id) {
        return AxiosService.deleteService(`${this.baseUrl}AddressBookDB/delete/`, id);
    }
}