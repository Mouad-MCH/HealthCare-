

/*---------------------*\
 * DOM variable
\ --------------------*/

let tbody = document.querySelector("tbody");
let tr = document.querySelectorAll("tbody tr");
let delete_btn = document.querySelector(".delete");

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
    tr_html(++i, el.prenome, el.name, el.email, el.date, el.telephone, el.motif);
  })
}

function tr_html(id, p, n, e, d, t, m) {
  tbody.innerHTML += `
            <tr>
              <td class="td">${id}</td>
              <td class="td">${p}</td>
              <td class="td">${n}</td>
              <td class="td ">${d.replaceAll("-" , "/")}</td>
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
  tr.forEach(el => {
    if(el.classList.contains("active")) delet_data(el)
  })
}

function delet_data(el) {
  let dt = get_data('data') || [];

  dt.forEach((e,i) => {
    if (el.name === e.name) delete dt[i]
  })

  set_data('data', dt)
}

delete_btn.addEventListener("click", delet);
document.addEventListener('DOMContentLoaded', add_info_table);
add_active();