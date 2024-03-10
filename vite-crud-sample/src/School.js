import { listeners } from "./core/listeners";
import render from "./core/renders";
export default class School {
  init() {
    console.log("school start");
    render();
    listeners();
  }
}
