import { get_data, set_data } from "./getData.js";
//  import { jump_to_update } from "./getData.js";

/*---------------------*\
 * DOM variable
\ --------------------*/

let tbody = document.querySelector("tbody");
let delete_btn = document.querySelector(".delete");
let update_btn = document.querySelector(".update");

let search_icon = document.querySelector(".search_icon");
let message_error = document.getElementById('error_msg');

let left_btn = document.getElementById("left_btn");
let right_btn = document.getElementById("right_btn")

let update_form = document.querySelector('.update_form');
let update_form_btn = document.querySelector(".update_form_btn");
let modal_overlay = document.querySelector(".modal-overlay");

let container = document.querySelector(".container");


let nom = document.getElementById('nome');
let prenome = document.getElementById('prenome');
let date = document.getElementById('date');
let telephone = document.getElementById('telephone');
let email = document.getElementById('email');
let motif = document.getElementById('motif');

/*---------------------*\
 * variable
\ --------------------*/

let pages = 5;

/*---------------------*\
 * FITCH API
\ --------------------*/

/*---------------------*\
 * Functions
\ --------------------*/

right_btn.onclick = () => {
  if(!get_data('counter'))
    set_data('counter', '1')
  let c = get_data('counter');
  c++;
  set_data('counter', c);
  location.reload();
}

left_btn.onclick = () => {
  let c = get_data('counter')
  
  c--;
  set_data('counter', c);
  location.reload();
}

function add_info_table() {
  let dt = get_data('data') || [];

  let counter = get_data("counter") || 1;
  const tot = Math.ceil(dt.length / pages);

  left_btn.disabled = counter === 1;
  right_btn.disabled = tot === 0 || counter === tot;

  let start = (counter - 1) * pages;
  let end = start + pages;

 
  dt.slice(start,end).forEach((el , i) => {
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
  // console.log(e.children[0].id)
    if(!e) {
    error()
    return
  }

  let element = find_element_ID(e.children[0].id);

  update_form.classList.remove("hidden")
  modal_overlay.classList.remove("hidden")
  jump_to_update(...element)

}

function jump_to_update(element) {

  nom.value = element.name;
  prenome.value = element.prenome;
  date.value = element.date;
  telephone.value = element.telephone;
  email.value = element.email;
  motif.value = element.motif;

  update_form_btn.addEventListener('click', () => {
    let dt = get_data("data") || [];

    dt.forEach(el => {
      if(el.id === element.id) {
        el.name = nom.value;
        el.prenome = prenome.value;
        el.date = date.value;
        el.telephone = telephone.value;
        el.email = email.value;
        el.motif = motif.value;
      }
    })

    set_data('data', dt);

    update_form.classList.add("hidden")
    modal_overlay.classList.add("hidden")
    location.reload();
  })

}


// function filter by date

function filter() {
  // if (error()) return
  let date = document.querySelector("#search_date").value;
  let recherche = document.querySelector("#recherche").value;
  let tr = document.querySelectorAll("tbody tr");

  let fil_el = find_element_date("date", date);

  // filter by name
  fil_el = recherche.length >0 ? fil_el.filter(el => find_element_ID(el)[0].name === recherche) : fil_el;

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
search_icon.addEventListener("click", filter);
