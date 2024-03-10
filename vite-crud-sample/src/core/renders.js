import { url } from "./functions";
import { renderRecord } from "./records";

const render = () => {
  fetch(url("/courses"))
    .then((res) => res.json())
    .then((json) => renderRecord(json));
};
export default render;
