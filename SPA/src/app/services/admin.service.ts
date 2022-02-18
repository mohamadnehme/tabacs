import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl + 'admin/';
  value = new BehaviorSubject(0);
  valueCfa = this.value.asObservable();

  constructor(private http: HttpClient) { }

  getValue(){
    return this.http.get(environment.apiUrl + "values");
  }
  getTabacs(category){
    return this.http.get(this.baseUrl + "GetTabacs?category="+category);
  }
  addTabac(tabac, category){
    return this.http.post(this.baseUrl + "Add",{
      Name: tabac.name,
      Description: tabac.description,
      QuantityPerTable: tabac.quantityPerTable,
      PriceInCfa: tabac.priceInCfa,
      Category: category
    });
  }
  getTabac(id){
    return this.http.get(this.baseUrl + "GetTabac?id="+id);
  }
  updateTabac(tabac,id,categoryId){
    return this.http.put(this.baseUrl + "Update",{
      Id: id,
      Name: tabac.name,
      Description: tabac.description,
      QuantityPerTable: tabac.quantityPerTable,
      PriceInCfa: tabac.priceInCfa,
      Category: categoryId
    });
  }
  deleteTabac(id){
    return this.http.delete(this.baseUrl + "Delete?id="+id);
  }
  search(name, category){
    return this.http.get(this.baseUrl + "SearchByName?name="+name+"&category="+category);
  }
  setCfa(cfa){
    this.value.next(cfa);
    return this.http.put(this.baseUrl + "updateCfa?cfa="+cfa,{});
  }
  getTransactions(){
    return this.http.get(this.baseUrl + "GetTransactions");
  }
  getTransaction(id){
    return this.http.get(this.baseUrl + "GetTransaction?id="+id);
  }
  addTransaction(trans){
    return this.http.post(this.baseUrl + "AddTransaction",{
      Title: trans.title,
      From: trans.from,
      To: trans.to,
      Date: trans.date,
      NbOfShipment: trans.nbOfShipment
    });
  }
  deleteTrans(id){
    return this.http.delete(this.baseUrl + "deleteTrans?id="+id);
  }
  getTabacsList(){
    return this.http.get(this.baseUrl + "getTabacsList");
  }
  addShipments(tabacs, transId, name, total){
    return this.http.post(this.baseUrl + "addShipments/"+transId+"/"+name+"/"+total,tabacs);
  }
  getShipments(chargeId){
    return this.http.get(this.baseUrl + "getShipments?chargeId="+chargeId);
  }
  checkShipment(chargeId, tid){
    return this.http.post(this.baseUrl + "checkShipment/"+chargeId+"/"+tid,{});
  }
  getTransHistory(){
    return this.http.get(this.baseUrl + "getHistory");
  }
  deleteShipment(s){
    return this.http.post(this.baseUrl + "deleteShipment",s);
  }
  getDepositors(){
    return this.http.get(this.baseUrl + "GetDepositors");
  }
  addDepositor(dep){
    return this.http.post(this.baseUrl + "AddDepositor", dep);
  }
  updateDeposit(id,deposit){
    return this.http.post(this.baseUrl + "AddDeposit/"+id, deposit);
  }
  getDeposits(id){
    return this.http.get(this.baseUrl + "GetDeposit/" + id);
  }
  getCharge(transId){
    return this.http.get(this.baseUrl + "GetCharges?transId="+transId);
  }
  getChargeHistory(transId){
    return this.http.get(this.baseUrl + "GetChargesHistory?transId="+transId);
  }
  deleteCharge(c: any){
    return this.http.delete(this.baseUrl + "deleteCharge/"+c.id);
  }
  addPayment(coins,orderId){
    return this.http.post(environment.apiUrl +"users/addPayment/"+orderId,coins);
  }
  customerList(){
    return this.http.get(this.baseUrl + "getCustomers");
  }
  customerListE(){
    return this.http.get(environment.apiUrl + "users/" + "getCustomersE");
  }
}
