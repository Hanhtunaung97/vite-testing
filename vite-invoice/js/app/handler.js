import { Offcanvas } from "bootstrap";
import { createItem } from "./products";
import { addNewRecord, costTotal, updateExistedRecord } from "./record";
import { inventoryBtn, itemLists, myInventory, productSelect, recordForm, totalCost } from "./selectors";
import { products } from "./variables";

export const recordFormHandler = (event) => {
  event.preventDefault();
  const data = new FormData(recordForm);

  const currentProduct = products.find(
    (product) => product.id == data.get("productSelect")
  );
  const isExistedProduct = document.querySelector(
    `[row-product-id='${currentProduct.id}']`
  );

  if (isExistedProduct) {
    updateExistedRecord(currentProduct, data.get("quantityInput"));
  } else {
    addNewRecord(currentProduct, data.get("quantityInput"));
  }

  recordForm.reset();
};
console.log("record Form");

export const newItemFormHandler = (event) => {
  console.log("new Item form");
  event.preventDefault();
  const newProduct = {};
  const formData = new FormData(newItemForm);
  newProduct.id = products[products.length - 1].id + 1;
  newProduct.name = formData.get("new_item_name");
  newProduct.price = formData.get("new_item_price");

  itemLists.append(createItem(newProduct));
  productSelect.append(new Option(newProduct.name, newProduct.id));
  products.push(newProduct);

  newItemForm.reset();
};

export const printerHandler = () => {
  print();
  document.querySelectorAll(".record-row").forEach((el) => el.remove());
  totalCost.innerText = 0;
};

export const inventoryBtnHandler=() => {
  console.log("inventory start");
  const inventoryOffcanvas=new Offcanvas(myInventory,{backdrop :"static"});
  inventoryOffcanvas.show();
  myInventory.addEventListener("hide.bs.offcanvas",() => {
    console.log("your offcanvas close");
  })
}