// function set data to localStorage

export function set_data(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

// function get data from localStorage

export function get_data(key) {
  return JSON.parse(localStorage.getItem(key))
}


// update

export function jump_to_update(element) {
  let name = document.getElementById('name').value;
  let prenome = document.getElementById('prenome').value;
  let date = document.getElementById('date').value;
  let telephone = document.getElementById('telephone').value;
  let email = document.getElementById('email').value;
  let motif = document.getElementById('motif').value;

  window.localStorage.pathname = '/index.html';

  name = element.name;
  prenome = element.prenome;
  date = element.date;
  telephone = element.telephone;
  email = element.email;
  motif = element.motif;

  add_btn.innerHTML = 'update';
}