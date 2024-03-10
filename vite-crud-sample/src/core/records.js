import { toast, url } from "./functions";
import { recordGroup, recordUiTemplate } from "./selectors";

export const createRecord = (record) => {
  const recordUi = recordUiTemplate.content.cloneNode(true);
  recordUi.querySelector("tr").setAttribute("data-id", record.id);
  recordUi.querySelector(".record-id").innerText = record.id;
  recordUi.querySelector(".record-title").innerText = record.title;
  recordUi.querySelector(".record-short-name").innerText = record.short_name;
  recordUi.querySelector(".record-fee").innerText = record.fee;
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
  fetch(url("/courses/" + id),options).then(res=>{
    if(res.status===204){
        toast("course deleted!")
    }
  });
};
