import { Drawer } from "flowbite";

export const createCourseForm=document.querySelector("#createCourseForm");
export const editCourseForm=document.querySelector("#editCourseForm");
export const recordGroup=document.querySelector("#recordGroup");
export const recordUiTemplate=document.querySelector("#recordUiTemplate");
export const recordEditDrawer=document.querySelector("#recordEditDrawer");
export const searchInput=document.querySelector("#searchInput");



const options = {
    placement: 'right',
    backdrop: true,
    bodyScrolling: false,
    edge: false,
    edgeOffset: '',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
    onHide: () => {
        console.log('drawer is hidden');
    },
    onShow: () => {
        console.log('drawer is shown');
    },
    onToggle: () => {
        console.log('drawer has been toggled');
    },
};

// instance options object
const instanceOptions = {
  id: 'recordEditDrawer',
  override: true
};
export const drawers=new Drawer(recordEditDrawer,options,instanceOptions)