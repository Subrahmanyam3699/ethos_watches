class user{
    constructor(firstName, lastName, emailId, userName, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.userName = userName;
        this.password = password;
    }
    getFirstName(){
        return this.firstName;
    }
    getLastName(){
        return this.lastName;
    }
    getEmailId(){
        return this.emailId;
    }
    getUserName(){
        return this.userName;
    }

    setFirstName(firstName){
        this.firstName = firstName;
    }
    setLastName(lastName){
        this.lastName = lastName;
    }
    setEmailId(emailId){
        this.emailId = emailId;
    }
    setUserName(userName){
        this.userName = userName;
    }
    setUserName(password){
        this.password = password;
    }

}

var userArray = [];
// let userNew = new user('subbu','sreepathi', 'subbu@gmail.com','subbu_sree','password');
// console.log(userNew);
// userNew.setEmailId('sree@gmail.com');
// console.log(userNew);

function  Register(){
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var emailId = document.getElementById('email').value;
    var userName = document.getElementById('userName').value;
    var password = document.getElementById('password').value;

    let userNew = new user(firstName, lastName, emailId, userName, password);
    console.log(userNew);
    this.userArray.push(userNew);
    console.log(this.userArray);
    alert(userName+' got created')
    
    // const myObject = {
    //     name : "john doe",
    //     age : 32,
    //     gender : "male",
    //     profession : "optician" 
    //   }
      
    window.localStorage.setItem("myObject", JSON.stringify(this.userArray));
    window.location.href = "login.html";
 }