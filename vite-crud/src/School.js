import { listeners } from "./core/listeners";
import initialRender from "./core/render";

export default class School {
  init() {
    console.log("school start");
    initialRender();
    listeners();
  }
}
