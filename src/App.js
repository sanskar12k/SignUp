import './App.css';
import React , {useState} from "react";

function App() { 
  const [user, setUser] = useState({
    fname:"",lname:"",  email:"",phone:"",password:"",cpassword:""
  });

  let name, value
  
  const handleData = (e) => {
    console.log(e);
    name = e.target.name;  //Stores the data which is given as input
    value = e.target.value;

    setUser({...user, [name]:value}) //spread data used to require all data of user and name contains the value entered by users
  }

   const addUser = async (e) => {
    e.preventDefault(); //Prevents refreshing of page

    const {fname, lname, email, phone, password, cpassword} = user;

  const res = await fetch("/users/register" , {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify({
      fname, lname,  email, phone, password, cpassword
    })
  });

    const data = await res.json();
    if(res.status === 422 || !data ){
      window.alert("Registration Failed");
      console.log("Registration Failed");
    }
    else {
      window.alert(`Congratulations ${fname}, You are registered!` );
      console.log(`Congratulations ${fname}, You are registered!` );
      window.location.reload();    //Reload the current document
    }
  }

  return (
      <div className="page">
       <div className="signup">
        <h1> Sign Up </h1> <br /> <br /> <br /> <br /> <br />
         <form method="POST" className = "signupform" id = "signupform">
              <div className="input-box">
                  <label htmlFor="fname"><i class="zmdi zmdi-account"></i></label>
                  <input type="text" name="fname" id="fname" required value= {user.fname} onChange={handleData} placeholder = "First Name"  /> <br />
               </div>
               <div className="input-box">
                  <label htmlFor="fname"><i class="zmdi zmdi-account"></i></label>
                  <input type="text" name="lname" id="lname" required value= {user.lname} onChange={handleData} placeholder = "Last Name"  /> <br />
               </div>
               <div className="input-box">
                 <label htmlFor="email"> <i className="zmdi zmdi-email"></i> </label>
                 <input type="email" name="email" id= "email" autoCapitalize = "off" required value= {user.email} onChange={handleData} placeholder = "Email"  /> <br />
                </div>
               <div className="input-box">
                 <label htmlFor="phone"><i className="zmdi zmdi-phone"></i></label>
                 <input type="tel" name="phone" id = "phone" required value= {user.phone} onChange={handleData} placeholder = "Contact No."   /> <br />
               </div>
               <div className="input-box">
                <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                <input type="password" id ="password" name = "password" value= {user.password} onChange={handleData} placeholder = "Password"   /> <br /> 
               </div>
               <div className="input-box">
                <label htmlFor="cpassword"><i className="zmdi zmdi-lock"></i></label>
               <input type="password" name="cpassword" id="cpassword" value= {user.cpassword} onChange={handleData} placeholder = "Confirm Your Password"  /> <br />
               </div> 
                <div className="input-submit">
                <input type = "submit" className = "signupButton" onClick={addUser} value="Sign Up"/> 
              </div>
              <hr />
                 <p>By signing you agree to our <a href="google.com">Terms and Conditons</a></p>
         </form>
        </div>
      </div>
    );
}


export default App;
