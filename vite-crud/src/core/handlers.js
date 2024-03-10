import Swal from "sweetalert2";
import { disableForm, enableForm, toast, url } from "./functions";
import { createCourseForm, drawer, editCourseForm, recordGroup } from "./selectors";
import { createRecord, deleteRecord} from "./records";

export const createCourseFormHandler = async (event) => {
  event.preventDefault();
  console.log("u submit form");
  const formData = new FormData(createCourseForm);
  // console.log(formData.get("course_title"));
  // console.log(formData.get("short_name"));
  // console.log(formData.get("fee"));

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const jsonData = JSON.stringify({
    title: formData.get("course_title"),
    short_name: formData.get("short_name"),
    fee: formData.get("fee"),
  });
  console.log(jsonData);
  const options = {
    method: "POST",
    headers,
    body: jsonData,
    redirect: "follow",
  };
  // disabled form
  disableForm(createCourseForm);
  const res = await fetch(url("/courses"), options);
  const json = await res.json();
  console.log(json);
  recordGroup.append(createRecord(json));
  createCourseForm.reset();
  // enable form
  enableForm(createCourseForm);
  toast("Course create successfully");
};

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-delete-btn")) {
    console.log("hello");
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
    console.log("u edit");
    event.target.toggleAttribute("disabled");
    const currentRow = event.target.closest("tr");
    const currentId = currentRow.getAttribute("data-id");
    // updateRecord(currentId);
    fetch(url("/courses/" + currentId))
      .then((res) => res.json())
      .then((json) => {
        event.target.toggleAttribute("disabled");
        recordEdit.querySelector("#editCourseId").value = json.id;
        recordEdit.querySelector("#editCourseTitle").value = json.title;
        recordEdit.querySelector("#editShortName").value = json.short_name;
        recordEdit.querySelector("#editFee").value = json.fee;
        drawer.show();
      });
  }
};

export const editCourseFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(createCourseForm);
  const headers = new Headers();
  const currentId=formData.get("id");
  headers.append("Content-Type", "application/json");
  const jsonData = JSON.stringify({
    title: formData.get("course_title"),
    short_name: formData.get("short_name"),
    fee: formData.get("fee"),
  });
  console.log(jsonData);
  const options = {
    method: "PUT",
    headers,
    body: jsonData,
    redirect: "follow",
  };
  disableForm(editCourseForm)
  fetch(url("/courses/" +currentId ), options)
    .then((res) => res.json())
    .then((json) => {
      enableForm(editCourseForm)
      const currentRow=document.querySelector(`[data-id='${currentId}']`)
      currentRow.querySelector(".record-title").innerText = json.title;
  currentRow.querySelector(".record-short-name").innerText = json.short_name;
  currentRow.querySelector(".record-fee").innerText = json.fee;
  // currentRow.querySelector(".record-id").innerText = json.id;
      toast("course update successfully");
      drawer.hide();
      editCourseForm.reset();
    });
};
