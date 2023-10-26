document.addEventListener("DOMContentLoaded",function(){
    const handleLogin = async(event)=>{
    event.preventDefault();

    const password = document.getElementById("user-password").value;
    const confirmPassword=document.getElementById("user-password-confirm").value;
  
  
    if(password!==confirmPassword){
        const error=document.getElementById("confirmError");
        error.textContent="Passwords do not match";
    }else{
    try{
      const formData = new FormData(event.target);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type":"application/json",
            },
            body:JSON.stringify(formDataObject)
          })
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            console.log("Login Successful"); 
            window.alert("Success");
            window.location.href = '#';
          } else {
            const errorData = await response.json();
            console.error("Login API request failed with status: " + response.status);
            if (errorData && errorData.message) {
              window.alert("Error: " + errorData.message);
            } else {
              window.alert("An error occurred during the API request.");
            }
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred during the API request.");
        }
    }
}

const formElement=document.getElementById("form");
formElement.addEventListener("submit",handleLogin);
    
  });
  
