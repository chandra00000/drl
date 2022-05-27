import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private tokens:any = 'token';
  private createCustomer:any = 'create_customer';
  private createCustomerScreen:any = 'create_customer_screen';

  constructor() { }

  public setCustomer(data:any){
    const jsonData = JSON.stringify(data)
    localStorage.setItem(this.createCustomer, jsonData)
  }

  public getCustomer() {
    const data = JSON.parse((localStorage.getItem(this.createCustomer)))
    if(data==null){
      return false;
    }
    return data;
  }
 
  public removeCustomer() {
      localStorage.removeItem(this.createCustomer)
  }

  public setScreen(data:any){
    const jsonData = JSON.stringify(data)
    localStorage.setItem(this.createCustomerScreen, jsonData)
  }

  public getScreen() {
    const data = JSON.parse((localStorage.getItem(this.createCustomerScreen)))
    if(data==null){
      return false;
    }
    return data;
  }
 
  public removeScreen() {
      localStorage.removeItem(this.createCustomerScreen)
  }

  public addTourId(data:any){
    localStorage.setItem("tour_id", data)
  }
  public addTaskId(data:any){
    localStorage.setItem("task_id", data)
  }
  public getTourId(){
    return localStorage.getItem("tour_id")
  }
  public getTaskId(){
    return localStorage.getItem("task_id")
  }
  public clearAll(){
    localStorage.clear();
  }
  public clearTourId(){
    localStorage.removeItem("tour_id")
  }
  public clearTaskId(){
    localStorage.removeItem("task_id")
  }


}
