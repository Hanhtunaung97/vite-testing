import { Drawer } from "flowbite";
import { toast, url } from "./functions";
import { drawer, recordEdit, recordGroup, recordUiTemplate } from "./selectors";

export const createRecord = (record) => {
  const recordUi = recordUiTemplate.content.cloneNode(true);
  recordUi.querySelector("tr").setAttribute("data-id", record.id);
  recordUi.querySelector(".record-title").innerText = record.title;
  recordUi.querySelector(".record-short-name").innerText = record.short_name;
  recordUi.querySelector(".record-fee").innerText = record.fee;
  recordUi.querySelector(".record-id").innerText = record.id;
  return recordUi;
};

export const renderRecord = (lists) => {
  recordGroup.innerHTML = ``;
  lists.forEach((list) => recordGroup.append(createRecord(list)));
};

const options = {
  method: "DELETE",
  redirect: "follow",
};
export const deleteRecord = (id) => {
  fetch(url("/courses/" + id), options).then((res) => {
    if (res.status === 204) {
      toast("record has been deleted!");
    }
  });
};

// export const updateRecord = (id) => {
//   fetch(url("/courses/" + id))
//     .then((res) => res.json())
//     .then((json) => {
//       recordEdit.querySelector("#editCourseId").value = json.id;
//       recordEdit.querySelector("#editCourseTitle").value = json.title;
//       recordEdit.querySelector("#editShortName").value = json.short_name;
//       recordEdit.querySelector("#editFee").value = json.fee;

      
//       drawer.show();
//     });
// };
