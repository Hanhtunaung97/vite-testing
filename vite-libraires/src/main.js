import { Carousel } from "bootstrap";
import "../scss/app.scss";
import "../node_modules/venobox/dist/venobox";
import AOS from "aos";
import "../node_modules/waypoints/lib/noframework.waypoints";
AOS.init();
const myNav=document.querySelector("#myNav");
const sectionOne=document.querySelector("#sectionOne");
const wp1=new Waypoint({
    element:sectionOne,
   handler:() => {
    myNav.classList.replace("bg-primary-subtle","bg-secondary-subtle")
   }
})
const sectionTwo=document.querySelector("#sectionTwo");
const wp2=new Waypoint({
    element:sectionTwo,
    handler:() => {
        myNav.classList.replace("bg-secondary-subtle","bg-danger-subtle")
    }
})
const sectionThree=document.querySelector("#sectionThree");
const sidePhoto=document.querySelector(".side-photo");
const wp3=new Waypoint({
    element:sectionThree,
    handler:() => {
        sidePhoto.classList.add("active");
    }
})
const sectionFour=document.querySelector("#sectionFour");
const wp4=new Waypoint({
    element:sectionFour,
    handler:() => {
        sidePhoto.classList.remove("active")
    }
})
new VenoBox({
  selector: ".venobox",
  overlayColor: "#2ddf3050",
  share:"true",
  spinner:"swing",
});

const sliderElement = document.querySelector("#carouselExampleIndicators");
const slider = new Carousel(sliderElement, {
  interval: 2000,
  pause: "hover",
  ride: "carousel",
});
const textSliderElement = document.querySelector("#textSlider");
const textSlider = new Carousel(textSliderElement, {
  interval: 2000,
  pause: "hover",
  ride: "carousel",
});
const next = document.querySelector("#next");
next.addEventListener("click", () => {
  slider.next();
  textSlider.next();
});
console.log(sliderElement);
console.log(slider);
