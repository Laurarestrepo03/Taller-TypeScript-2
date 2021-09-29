import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCreditRange = document.getElementById("button-filterByCreditRange");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBoxMin = document.getElementById("search-box-min");
var inputSearchBoxMax = document.getElementById("search-box-max");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreditRange.onclick = function () { return applyFilterByCreditRange(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    var trElement1 = document.createElement("tr");
    trElement1.innerHTML = "<td>C\u00F3digo</td>\n                          <td>" + student.code + "</td>";
    studentTbody.appendChild(trElement1);
    var trElement2 = document.createElement("tr");
    trElement2.innerHTML = "<td>C\u00E9dula</td>\n                          <td>" + student.cedula + "</td>";
    studentTbody.appendChild(trElement2);
    var trElement3 = document.createElement("tr");
    trElement3.innerHTML = "<td>Edad</td>\n                          <td>" + student.age + "</td>";
    studentTbody.appendChild(trElement3);
    var trElement4 = document.createElement("tr");
    trElement4.innerHTML = "<td>Direcci\u00F3n</td>\n                          <td>" + student.address + "</td>";
    studentTbody.appendChild(trElement4);
    var trElement5 = document.createElement("tr");
    trElement5.innerHTML = "<td>Tel\u00E9fono</td>\n                          <td>" + student.telephoneNumber + "</td>";
    studentTbody.appendChild(trElement5);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function applyFilterByCreditRange() {
    var rangeMin = inputSearchBoxMin.value;
    var rangeMax = inputSearchBoxMax.value;
    rangeMin = (rangeMin == null) ? '' : rangeMin;
    rangeMax = (rangeMin == null) ? '' : rangeMax;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreditRange(rangeMin, rangeMax, dataCourses);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCreditRange(rangeKeyMin, rangeKeyMax, courses) {
    return rangeKeyMin === '' && rangeKeyMax === '' ? dataCourses : courses.filter(function (c) {
        return c.credits >= Number(rangeKeyMin) && c.credits <= Number(rangeKeyMax);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
