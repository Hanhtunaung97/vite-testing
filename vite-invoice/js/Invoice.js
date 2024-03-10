import { inventoryBtnHandler, newItemFormHandler, printerHandler, recordFormHandler } from "./app/handler";
import { productItemRender, productOptionRender } from "./app/products";
import { recordObserver } from "./app/record";
import { inventoryBtn, newItemForm, printer, recordForm } from "./app/selectors";

export default class Invoice {
  observer(){
recordObserver();
  }
  initialRender() {
    productOptionRender();
    productItemRender();
  }
  listener() {
    recordForm.addEventListener("submit", recordFormHandler);
    newItemForm.addEventListener("submit",newItemFormHandler);
    printer.addEventListener("click",printerHandler);
    inventoryBtn.addEventListener("click",inventoryBtnHandler);
  }
  init() {

    console.log("Invoice app Start");
    this.observer();
    this.initialRender();
    this.listener();
  }
}
