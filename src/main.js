
/*---------------------*\
 * DATABASE
\ --------------------*/

/*---------------------*\
 * DOM variable
\ --------------------*/

const inputs = document.querySelectorAll('input');
const add_btn = document.getElementById("add_btn");

const error_msg = document.getElementById("error_msg")


/*---------------------*\
 * variable
\ --------------------*/

let data = [];


/*---------------------*\
 * FITCH API
\ --------------------*/

/*---------------------*\
 * Functions
\ --------------------*/

console.log(inputs)

function add_info() {
  if(Error_fun()) return

  let name = document.getElementById("name").value;
  let prenome = document.getElementById("prenome").value;
  let telephone = document.getElementById("telephone").value;
  let email = document.getElementById("email").value;
  let date = document.getElementById("date").value;
  let motif = document.getElementById("motif").value;


  data.push({prenome,name,email,telephone,date,motif})

  console.log(data)

}




// function show Error

function Error_fun() {
  let isEmpty = false;
  inputs.forEach(el => {
    if(el.value === "") {
      isEmpty = true
      return;
    }
  })

  if(isEmpty) {
    error_msg.classList.remove("hidden");

    setTimeout(() => {
      error_msg.classList.add("hidden");
    }, 1000)
  }
  return isEmpty;
}

add_btn.addEventListener("click", add_info)