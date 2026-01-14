import { get_data, set_data } from "./getData.js";
import { jump_to_update } from "./getData.js";

/*---------------------*\
 * DOM variable
\ --------------------*/

let tbody = document.querySelector("tbody");
let delete_btn = document.querySelector(".delete");
let update_btn = document.querySelector(".update");

let search_icon = document.querySelector(".search_icon");
let message_error = document.getElementById('error_msg');

/*---------------------*\
 * variable
\ --------------------*/




/*---------------------*\
 * FITCH API
\ --------------------*/

/*---------------------*\
 * Functions
\ --------------------*/

function add_info_table() {
  let dt = get_data('data') || [];
  dt.forEach((el , i) => {
    tr_html(el.id, el.prenome, el.name, el.email, el.date, el.telephone, el.motif);
  })
  add_active();
}

function tr_html(id, p, n, e, d, t, m) {
  tbody.innerHTML += `
            <tr>
              <td id="${id}" class="td">${id}</td>
              <td class="td">${p}</td>
              <td class="td">${n}</td>
              <td class="td">${d.replaceAll("-" , "/")}</td>
              <td class="td">${t}</td>
              <td class="td">${e}</td>
              <td class="td">${m}</td>
            </tr>

  `
}


// Function add active to tr
/**
 * I chould to fix problem function dosn't add class active 
 * check file "getData.js" i thourgh problem is ther 
 * and check to file "main.js"
 */
function add_active() {
  let tr = document.querySelectorAll("tbody tr");
  tr.forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle("active");
    })
  })
}

// function delete
/**
 * If you fix function active fix delet is dosn't work
 */
function delet() {
  let tr = document.querySelectorAll("tbody tr");
  let delet_el = []
  tr.forEach(el => {
    if (el.classList.contains("active")) delet_el.push(el);
  })

  delet_data(delet_el)
}

function delet_data(el) {
  let dt = get_data('data') || [];
  console.log(el)

  el.forEach(elem => {
    dt.forEach((e,i) => {
      if (elem.children[0].textContent == e.id) delete dt[i];
    })
  })

  dt = dt.filter(e => e !== null)

  set_data('data', dt)
  location.reload();
}

// function Update

function update() {
  let tr = document.querySelectorAll("tbody tr");
  let e;
  tr.forEach(el => { if (el.classList.contains("active")) e = el });
  let element = find_element_ID(e.children[0].textContent);

  jump_to_update(element)

}


// function filter by date

function filter() {
  if (error()) return
  let date = document.querySelector("#search_date").value;
  let tr = document.querySelectorAll("tbody tr");

  let fil_el = find_element_date("date", date)
  console.log(fil_el)

  tr.forEach((el) => {
    el.classList.add("hidden");
    fil_el.forEach(e => {
      if (el.children[0].textContent == e) {
        el.classList.remove("hidden");
      }
    })
  })

}

// show error message

function error() {
  let search_date = document.querySelector("#search_date").value;

  if (search_date !== "") {
    return false;
  }

  message_error.classList.remove("hidden");

  setTimeout(() => {
    message_error.classList.add("hidden");
    location.reload()
  },2000)

  return true
}


// function find element in data

function find_element_date(key, value) {
  let dt = get_data('data') || [];
  let id = [];
  let el = dt.filter(e => e[key] === value);
  el.forEach(e => id.push(e.id))

  return id
}

function find_element_ID(id) {
  let element = get_data("data").filter(el => el.id == id)

  return element
}

delete_btn.addEventListener("click", delet);
update_btn.addEventListener("click", update);
document.addEventListener('DOMContentLoaded', add_info_table);
search_icon.addEventListener("click", filter)
