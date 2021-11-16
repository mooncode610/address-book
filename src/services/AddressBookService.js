import config from "../config/config";
import AxiosService from './axios-service'

export default class AddressBookService{
    baseUrl = config.baseUrl;
    addAddressBookData(data){
        return AxiosService.postService(`${this.baseUrl}AddressBookDB`, data);
    }
}