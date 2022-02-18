import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl + 'users/';

  getUser(id){
    return this.http.post(this.baseUrl + 'getUser',id);
  }

  getEmail(id){
    return this.http.get(this.baseUrl + 'getEmail?id='+id);
  }

  changePassword(id: string, newPassword: string){
    return this.http.post(this.baseUrl + 'changePass', {
      id,
      newPassword
    });
  }
  sendEmail(email: string){
    return this.http.post(this.baseUrl + 'sendEmail',{
      EmailTo : email
    })
  }
  addOrder(name: any){
    return this.http.post(this.baseUrl + 'AddOrder', {
      customerName: name
    });
  }
  getOrders(){
    return this.http.get(this.baseUrl + 'GetOrders');
  }
  getOrder(id){
    return this.http.get(this.baseUrl + "GetOrder/"+id);
  }
  getTabacsList(){
    return this.http.get(this.baseUrl + "getTabacsList");
  }
  addToOrder(tabacs, cId, total){
    return this.http.post(this.baseUrl + "addToOrder/"+cId+"/"+total, tabacs);
  }
  getOrderDetail(orderId){
    return this.http.get(this.baseUrl + "getOrderDetails/"+orderId);
  }
  checkOrder(orderId, orderDetails){
    return this.http.post(this.baseUrl + "checkOrder/"+orderId,orderDetails);
  }
  getOrderHistory(){
    return this.http.get(this.baseUrl + "GetOrderHistory");
  }
  deleteOrder(id){
    return this.http.delete(this.baseUrl + "deleteOrder/"+id);
  }
  deleteDetailOrder(id){
    return this.http.delete(this.baseUrl + "deleteOrderDetail/"+id);
  }
  getOrderDetailHistory(orderId){
    return this.http.get(this.baseUrl + "GetOrderDetailHistory?orderId="+orderId);
  }
  getPaymentHistory(id){
    return this.http.get(this.baseUrl + "getPaymentsHistory/"+id);
  }
  addCustomer(name){
    return this.http.post(this.baseUrl + "addCustomer/"+name,{});
  }
  OrdersCustomer(id){
    return this.http.get(this.baseUrl + "getOrdersCustomer/"+id);
  }
  getCustomer(id){
    return this.http.get(this.baseUrl + "getCustomer/"+id);
  }
  deleteCustomer(id){
    return this.http.post(this.baseUrl + "deleteCustomer/"+id,{});
  }
  getCustomersHistory(){
    return this.http.get(this.baseUrl + "getCustomersHistory");
  }
  OrdersCustomerHistory(id){
    return this.http.get(this.baseUrl + "getOrdersCustomerHistory/"+id);
  }
  export(list, name){
    return this.http.post(this.baseUrl + "export/"+name,list);
  }
}
