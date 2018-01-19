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

  fetch('/register', {
    headers: {
      'Content-Type': 'application/json',
      //'x-access-token': localStorage.token
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
      login()
      window.location = '/map'
    })
  }).catch(function(err) {
    console.error(err)
  })
}

function login() {
  console.log("logging in")
  var data = {
    email: form.email.value,
    password: form.password.value
  }
  console.log(data)

  fetch('/login', {
    headers: {
      'Content-Type': 'application/json',
      // 'x-access-token': localStorage.token
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
    .then(function(data) {
      localStorage._id = data.userId
      localStorage.token = data.token
      console.log(localStorage._id)
      window.location = '/map'
    })
  }).catch(function(err) {
    console.error(err)
  })
} 

function logout() {
  // var data = { _id: localStorage._id }
  // fetch('/logout', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // 'x-access-token': localStorage.token
  //   },
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // }).then(function(res) {
  //   console.log(res)
  //   if (!res.ok) {
  //     res.text().then(function(message) {
  //       alert(message)
  //     })
  //   }
  //   res.json()
  //   .then(function(data) {
  //     localStorage.clear()
  //     window.location = '/login'
  //   })
  // }).catch(function(err) {
  //   console.error(err)
  // })
  // return
  localStorage.clear()
  window.location = '/'
}


function checkIn(pos) {
  pos.id = localStorage._id
  fetch('/map', {
    headers: {
      'Content-Type': 'application/json',
      //'x-access-token': localStorage.token
    },
    method: 'POST',
    body: JSON.stringify(pos)
  }).then(function(res) {
    if (!res.ok) {
      res.text()
      .then(function(message) {
        alert(message)
      })
    }
    res.json()
    .then(function(user) {
      login()
      window.location = '/map'
    })
  }).catch(function(err) {
    console.log(err)
  })
}

function checkOut() {
  var data = {
    id: localStorage._id
  }
  fetch('/map', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
      method: 'PUT',
      body: JSON.stringify(data)
    }).then(function(res) {
      if (!res.ok) {
        res.text()
        .then(function(message) {
          alert(message)
        })
      }
      res.json()
      .then(function(user) {
        login()
        window.location = '/map'
      })
    }).catch(function(err) {
      console.log(err)
  })
}

function addFriend() {  
  var decodedToken = JSON.parse(atob(localStorage.token.split('.')[1]))

  var data = {
    userId: decodedToken.id
  }

  var url = window.location.href
  var url_parts = url.replace(/\/\s*$/,'').split('/'); 
  url_parts.shift(); 

  fetch('/users/' + url_parts[3] + '/id', {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(function(res) {
    if (!res.ok) {
      res.text().then(function(message) {
        alert(message)
      })
    }
    res.json()
    .then(function(data) {
      window.location = '/map'
    })
  }).catch(function(err) {
    console.error(err)
  })
}

function addInterests() {
  
  const interests = Array.from(form.interest).filter(function(entry) {
    return entry.checked
  }).map(function(entry) {
    return entry.value
  })

  console.log(interests)
  var data = {
    interests: interests
  }

  var decodedToken = JSON.parse(atob(localStorage.token.split('.')[1]))


  var data = {
    userId: decodedToken.id,
    interests: interests
  }


  fetch('/addInterests', {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(function(res) {
    if (!res.ok) {
      res.text().then(function(message) {
        alert(message)
      })
    }
    res.json()
    .then(function(data) {
      window.location = '/map'
    })
  }).catch(function(err) {
    console.error(err)
  })
}

function searchName() {
  data = form.search.value
  if (!data)
    return false
  fetch('/search/' + data, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    method: 'GET',
    }).then(function(res) {
    if (!res.ok) {
      res.text().then(function(message) {
        console.log("err1")
        alert(message)
      })
    }
    res.json()
    .then(function(data) {
      document.getElementById('names').innerHTML = ''
      for (var i = 0; i < data.length; i++) {
        appendList(data[i].name, data[i]._id)
      }
    })
  }).catch(function(err) {
    console.error(err)
  })
}

function appendList(name, id) {
  var li = document.createElement("LI");
  var url = "/users/" + id + "/id"
  var textnode = document.createTextNode(name); 
  var a = document.createElement('a');
  a.appendChild(textnode)
  a.href = url
  document.getElementById("names").appendChild(li)
  document.getElementById("names").appendChild(a)
}

/*=============================================
=            Form Submit Functions            =
=============================================*/

function submitUser() {
  var data = {}
  if (form.email.value) data.email = form.email.value
  if (form.password.value) data.password = form.password.value

  if (!data.email) return displayError('Must provide email')
  if (!data.password) return displayError('Must provide password')
  if (data.password !== form.confirm.value) return displayError('Passwords do not match')

  fetch('/register', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(submitSuccess)
  .catch(submitError)

}

/*=============================================
=            Form Submit Callbacks            =
=============================================*/
function clearForm() {
    form.reset();
    clearError('message');
    var divs = document.getElementsByClassName('hidden');
    for (var i = 0; i < divs.length; i++)
        divs[i].style.display = '';
}

function clearError(target) {
    if (target === 'message')
        return document.getElementById('js-error-message').style.visibility = 'hidden';
    target.style.border = '1px solid #888';
}


function submitSuccess(res) {
    if (!res.ok) {
      return submitError(res);
    }
    var modal = document.getElementById('js-success');
    modal.style.display = 'block';
    clearForm();
}

function submitError(res, message) {
    if (res.status >= 400 && res.status < 500)
        return res.text().then(function(message) {displayError(message)});
    if (message)
        return displayError(message);
}

function displayError(message) {
    var errorDiv = document.getElementById('js-error-message');
    errorDiv.innerHTML = message;
    errorDiv.style.visibility = 'visible';
}
