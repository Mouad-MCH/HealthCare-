// function set data to localStorage

function set_data(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

// function get data from localStorage

function get_data(key) {
  return JSON.parse(localStorage.getItem(key))
}
