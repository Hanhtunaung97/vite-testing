import Swal from "sweetalert2";
import { disableForm, enableForm, toast, url } from "./functions";
import { createRecord, deleteRecord, renderRecord } from "./records";
import {
  createCourseForm,
  drawers,
  editCourseForm,
  recordEditDrawer,
  recordGroup,
} from "./selectors";

export const createCourseFormHandler = async (event) => {
  event.preventDefault();
  const formData = new FormData(createCourseForm);
  //   console.log(formData.get("title"));
  //   console.log(formData.get("short_name"));
  //   console.log(formData.get("fee"));

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    title: formData.get("title"),
    short_name: formData.get("short_name"),
    fee: formData.get("fee"),
  });
  const options = {
    method: "POST",
    headers,
    body,
    redirect: "follow",
  };
  disableForm(createCourseForm);
  const res = await fetch(url("/courses"), options);
  const json = await res.json();
  //   console.log(json);
  recordGroup.append(createRecord(json));
  enableForm(createCourseForm);
  toast("course successfully created!");
  createCourseForm.reset();
};

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-delete-btn")) {
    console.log("u del");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const currentRow = event.target.closest("tr");
        const currentId = currentRow.getAttribute("data-id");
        deleteRecord(currentId);
        currentRow.remove();
      }
    });
  } else if (event.target.classList.contains("record-edit-btn")) {
    event.target.toggleAttribute("disabled");
    const currentRow = event.target.closest("tr");
    const currentId = currentRow.getAttribute("data-id");
    fetch(url("/courses/" + currentId))
      .then((res) => res.json())
      .then((json) => {
        event.target.toggleAttribute("disabled");
        recordEditDrawer.querySelector("#editCourseId").value = json.id;
        recordEditDrawer.querySelector("#editCourseTitle").value = json.title;
        recordEditDrawer.querySelector("#editShortName").value =
          json.short_name;
        recordEditDrawer.querySelector("#editFee").value = json.fee;
        drawers.show();
      });
  }
};

export const editCourseFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(editCourseForm);
  const currentId = formData.get("id");
  //   console.log(formData.get("title"));
  //   console.log(formData.get("short_name"));
  //   console.log(formData.get("fee"));

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    title: formData.get("title"),
    short_name: formData.get("short_name"),
    fee: formData.get("fee"),
  });
  const options = {
    method: "PUT",
    headers,
    body,
    redirect: "follow",
  };
  disableForm(editCourseForm);
  fetch(url("/courses/" + currentId), options)
    .then((res) => res.json())
    .then((json) => {
      enableForm(editCourseForm);
      toast("course update successfully");
      editCourseForm.reset();
      drawers.hide();
      const currentRow = document.querySelector(`[data-id='${currentId}']`);
      currentRow.querySelector(".record-id").innerText = json.id;
      currentRow.querySelector(".record-title").innerText = json.title;
      currentRow.querySelector(".record-short-name").innerText =
        json.short_name;
      currentRow.querySelector(".record-fee").innerText = json.fee;
    });
};

export const recordGroupEditableHandler = (event) => {
  if (event.target.classList.contains("editable-cell")) {
    // console.log(event.target);
    const currentText = event.target.innerText;
    const currentId = event.target.closest("tr").getAttribute("data-id");
    const currentColumn = event.target.getAttribute("data-column");
    const currentWidth =
      parseFloat(window.getComputedStyle(event.target).width) - 30;
    console.log(currentWidth);
    const textInput = document.createElement("input");
    textInput.value = currentText;
    textInput.style.width = currentWidth + "px";
    textInput.className=`rounded-lg p-1 text-sm`;
    event.target.innerText = "";
    event.target.append(textInput);
    textInput.focus();
    textInput.addEventListener("change", (event) => {
      // console.log(event.target);
      const newContent = event.target.value;
      event.target.innerText = newContent;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const data = {};
      data[currentColumn] = newContent;
      const body = JSON.stringify(data);
      const options = {
        method: "PATCH",
        headers,
        body,
        redirect: "follow",
      };
      fetch(url("/courses/" + currentId), options)
        .then((res) => res.json())
        .then((json) => {
          toast("course update successfully");
        });
    });
  }
};

export const searchInputHandler=(event) => {
console.log(  event.target.value); 
event.target.previousElementSibling.innerHTML=`
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400 animate-spin">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

`;
fetch(url('/courses?title[like]='+event.target.value)).then(res=>res.json()).then(json=>{
  event.target.previousElementSibling.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>  `;
  if(json.length){
    renderRecord(json);
  }else {
    recordGroup.innerHTML=`
    <tr class="mb-5 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 animate-pulse">
    <td class='px-6 py-4 font-bold text-center' colspan='5'>
    Not Found  <a class="underline" href=http//${location.host}>See All</a>
    </td>
    </tr>
    `
    toast("Not Found","error")

  }
}) 
}
