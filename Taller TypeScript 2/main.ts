
import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudent';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCreditRange: HTMLElement = document.getElementById("button-filterByCreditRange")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBoxMin: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-min")!;
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-max")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCreditRange.onclick = () => applyFilterByCreditRange();

renderCoursesInTable(dataCourses);

renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(student: Student): void {
  let trElement1 = document.createElement("tr");
  trElement1.innerHTML = `<td>Código</td>
                          <td>${student.code}</td>`;
  studentTbody.appendChild(trElement1);
  
  let trElement2 = document.createElement("tr");
  trElement2.innerHTML = `<td>Cédula</td>
                          <td>${student.cedula}</td>`;
  studentTbody.appendChild(trElement2);
  
  let trElement3 = document.createElement("tr");
  trElement3.innerHTML = `<td>Edad</td>
                          <td>${student.age}</td>`;
  studentTbody.appendChild(trElement3);

  let trElement4 = document.createElement("tr");
  trElement4.innerHTML = `<td>Dirección</td>
                          <td>${student.address}</td>`;
  studentTbody.appendChild(trElement4);
  
  let trElement5 = document.createElement("tr");
  trElement5.innerHTML = `<td>Teléfono</td>
                          <td>${student.telephoneNumber}</td>`;
  studentTbody.appendChild(trElement5);
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function applyFilterByCreditRange() { 
  let rangeMin = inputSearchBoxMin.value;
  let rangeMax = inputSearchBoxMax.value;
  rangeMin = (rangeMin == null) ? '' : rangeMin;
  rangeMax = (rangeMin == null) ? '' : rangeMax;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCreditRange(rangeMin, rangeMax, dataCourses);
  totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCreditRange(rangeKeyMin: string, rangeKeyMax: string, courses: Course[]) {
  return rangeKeyMin === '' && rangeKeyMax === '' ? dataCourses : courses.filter( c => 
    c.credits >= Number(rangeKeyMin) && c.credits <= Number(rangeKeyMax));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}