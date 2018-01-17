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
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
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

function addFriend() {
  var decodedToken = JSON.parse(atob(localStorage.token.split('.')[1]))

  var data = {
    userId: decodedToken._id
    // friendId: 
  }

  fetch('/addFriend', {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    method: 'POST',
    //body: JSON.stringify(data)
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

function addInterests() {
  var values = [];
  var cbs = document.forms['interests'].elements['interest'];
  for(var i=0,cbLen=cbs.length;i<cbLen;i++){
    if(cbs[i].checked){
      values.push(cbs[i].value);
    } 
  }

  var decodedToken = JSON.parse(atob(localStorage.token.split('.')[1]))


  var data = {
    userId: decodedToken.id,
    interests: values
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
      alert(JSON.stringify(data))
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
    console.log(JSON.stringify(res))
    if (!res.ok) {
      res.text().then(function(message) {
        console.log("err1")
        alert(message)
      })
    }
    res.json()
    .then(function(data) {
      console.log('SUCCESS')
      console.log(JSON.stringify(data))
      alert(JSON.stringify(data))
      //localStorage.token = data.token
    })
  }).catch(function(err) {
    console.error(err)
  })
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
