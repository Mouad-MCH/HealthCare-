import { get_data, set_data } from "./getData.js";

/*---------------------*\
 * DATABASE
\ --------------------*/

/*---------------------*\
 * DOM variable
\ --------------------*/

const inputs = document.querySelectorAll('input');
const add_btn = document.getElementById("add_btn");

const error_msg = document.getElementById("error_msg");
const success_msg = document.getElementById("success_msg");


/*---------------------*\
 * variable
\ --------------------*/

let data = get_data("data") || [];


/*---------------------*\
 * FITCH API
\ --------------------*/

/*---------------------*\
 * Functions
\ --------------------*/


function add_info() {
  if(Error_fun()) return

  let name = document.getElementById("name").value;
  let prenome = document.getElementById("prenome").value;
  let telephone = document.getElementById("telephone").value;
  let email = document.getElementById("email").value;
  let date = document.getElementById("date").value;
  let motif = document.getElementById("motif").value;
  let id = data.length + 1;


  data.push({id,prenome, name, email, telephone, date, motif });

  set_data('data', data);

  show_success();

  inputs.forEach(el => el.value = "");

}


// function show Error ❌

function Error_fun() {
  let isEmpty = false;
  inputs.forEach(el => {
    if(el.value === "") {
      isEmpty = true;
      el.classList.add("r")
      return;
    }else { el.classList.remove("r") }
  })

  if(isEmpty) {
    error_msg.classList.remove("hidden");

    setTimeout(() => {
      error_msg.classList.add("hidden");
    }, 1000)
  }
  return isEmpty;
}

// function show message success 👌

function show_success() {
  success_msg.classList.remove("hidden");

  setTimeout(() => {
    success_msg.classList.add("hidden")
  }, 2000)
}


add_btn.addEventListener("click", add_info)

