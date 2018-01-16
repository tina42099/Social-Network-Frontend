const form = document.forms[0]

function register() {
  var data = {}

  if (form.name.value) data.name = form.name.value
  if (form.email.value) data.email = form.email.value
  if (form.age.value) data.age = form.age.value
  if (form.gender.value) data.gender = form.gender.value
  if (form.address.value) data.address = form.address.value
  if (form.password.value) data.password = form.password.value
  if (form.confirm.value) data.confirm = form.confirm.value

  console.log(data)

  fetch('/register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(function(res) {
    console.log(res)
    if (!res.ok) {
      res.text().then(function(message) {
        alert(message)
      })
    }
    res.json()
    .then(function(user) {
      //alert(JSON.stringify(user))
      window.location = '/map'
    })
  }).catch(function(err) {
    console.error(err)
  })
}

function login() {
  var data = {
    email: form.email.value,
    password: form.password.value
  }

  fetch('/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(function(res) {
    console.log(res)
    // if (!res.ok) { alert('Error') }
    if (!res.ok) {
      res.text().then(function(message) {
        alert(message)
      })
    }
    res.json()
    .then(function(data) {
      //alert(JSON.stringify(data))
      localStorage.token = data.token
      window.location = '/map'
    })
  }).catch(function(err) {
    console.error(err)
  })
}
