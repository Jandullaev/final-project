const forms = document.querySelector('#submit');

// eslint-disable-next-line no-unused-vars
const addClient = async() => {
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const message = document.getElementById("message").value

  let responseSave = await fetch('', {
    method : 'POST',
    headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: name,
        email: email,
        phone : phone,
        message : message
    })
})
}