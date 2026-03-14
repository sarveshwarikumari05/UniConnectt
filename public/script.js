/* REGISTER */

async function registerUser(){

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const res = await fetch("/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({name,email,password})

});

alert("Account Created");

showLogin();

}


/* LOGIN */

async function loginUser(){

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

const res = await fetch("/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({email,password})

});

const data = await res.json();

if(data.status === "success"){

window.location.href="dashboard.html";

}else{

alert("Invalid Credentials");

}

}