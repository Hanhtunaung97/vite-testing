import Swal from "sweetalert2";
import Toastify from 'toastify-js';
import { records, totalCost } from "./selectors";

export const createRecordRow = (product, quantity) => {
  const tr = document.createElement("tr");
  tr.setAttribute("row-product-id", product.id);
  tr.classList.add("record-row");
  const cost = product.price * quantity;
  tr.innerHTML = `
      <td class='row-num'></td>
      <td>${product.name}</td>
      <td class="text-end">${product.price}</td>
      <td class="text-end row-quantity-control">
        <i class='bi bi-dash row-quantity-decrement'></i>
        <span class="row-quantity">
        ${quantity}
        </span>
        <i class='bi bi-plus row-quantity-increment'></i>
      </td>
      <td class="text-end row-control">
      <span class='row-cost'>${cost}</span>
      <button class='btn btn-sm btn-primary row-delete '>
        <i class='bi bi-trash3'></i>
      </button>
      </td>
      `;

  const deleteRow = () => {
    // if (confirm("Are U sure to delete ?")) {
    //   tr.remove();
    // }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#333333",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        tr.remove();
        Toastify({

          text: "successfully Deleted",
          
          duration: 3000
          
          }).showToast();
        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: "top-end",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.onmouseenter = Swal.stopTimer;
        //     toast.onmouseleave = Swal.resumeTimer;
        //   }
        // });
        // Toast.fire({
        //   icon: "success",
        //   title: "successfully Deleted"
        // });
      }
    });
  };

  const rowDelete = tr.querySelector(".row-delete");
  rowDelete.addEventListener("click", deleteRow);

  const rowQuantityIncrement = tr.querySelector(".row-quantity-increment");
  rowQuantityIncrement.addEventListener("click", () => {
    updateExistedRecord(product, 1);
  });

  const rowQuantityDecrement = tr.querySelector(".row-quantity-decrement");
  rowQuantityDecrement.addEventListener("click", () => {
    const row = document.querySelector(`[row-product-id='${product.id}']`);
    const currentRowQuantity = row.querySelector(".row-quantity");
    currentRowQuantity.innerText > 1 && updateExistedRecord(product, -1);
  });

  return tr;
};

export const addNewRecord = (product, quantity) => {
  records.append(createRecordRow(product, quantity));
};

export const updateExistedRecord = ({ id, price }, quantity) => {
  const row = document.querySelector(`[row-product-id='${id}']`);
  const currentRowQuantity = row.querySelector(".row-quantity");
  const currentRowCost = row.querySelector(".row-cost");

  currentRowQuantity.innerText =
    parseFloat(currentRowQuantity.innerText) + parseFloat(quantity);

  currentRowCost.innerText = currentRowQuantity.innerText * price;

};
export const costTotal = () => {
  // let total = 0;
  // const rowCosts = document.querySelectorAll(".row-cost");
  // console.log([...rowCosts]);
  // rowCosts.forEach((rowCost) => {
  //   total += parseFloat(rowCost.innerText);
  // });

  totalCost.innerText = [...document.querySelectorAll(".row-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );
  // return total;
};
export const recordObserver=() => {
  console.log("observer start working");
  const observerOptions = {
    childList: true,
    subtree: true,
  };
  
  const observer = new MutationObserver(() => {
    console.log("I am watching");
    costTotal();
  });
  observer.observe(records, observerOptions);
}
