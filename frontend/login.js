function showLogin(){
    document.getElementById("loginPopup").style.display="flex";
}

function closeLogin(){
    document.getElementById("loginPopup").style.display="none";
}

function openSignup(){
    closeLogin();
    document.getElementById("signupPopup").style.display="flex";
}

function closeSignup(){
    document.getElementById("signupPopup").style.display="none";
}

function openLogin(){
    closeSignup();
    showLogin();
}


/* =========================
   LOGIN SYSTEM
========================= */

async function loginUser(){

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if(email === "" || password === ""){
        alert("Please fill all fields");
        return;
    }

    try{

        let response = await fetch("http://127.0.0.1:8000/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        });


        let data = await response.json();

        console.log(data);


        if(data.message === "Login successful"){

            localStorage.setItem("auth","true");

            alert("Login Successful ✔");

            window.location.href="dashboard.html";

        }
        else{

            alert(data.message);

        }


    }catch(error){

        alert("Backend server not connected");
        console.log(error);

    }

}



/* =========================
   SIGNUP SYSTEM
========================= */

async function signupUser(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;


    if(name === "" || email === "" || password === ""){
        alert("Please fill all fields");
        return;
    }


    try{

        let response = await fetch("http://127.0.0.1:8000/api/signup",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name:name,
                email:email,
                password:password

            })

        });


        let data = await response.json();
        alert(JSON.stringify(data));

        alert(data.message);


        if(data.message === "Signup successful"){

            closeSignup();
            showLogin();

        }


    }catch(error){

        alert("Backend server not connected");
        console.log(error);

    }

}



function googleLogin(){

    alert("Google Login Demo");

}


function googleSignup(){

    alert("Google Signup Demo");

}