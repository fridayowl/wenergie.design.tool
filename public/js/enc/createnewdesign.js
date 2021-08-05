window.onload = function() {


console.log("called desinertool function");
intial_flow="initial"
next_flow="initial"
var  answers = [];
var count=0;

var firebaseConfig = {
  apiKey: "AIzaSyAxeA37rxkowTGwls_f5OffEMXVJyAJ-Pk",
  authDomain: "wenergiedesigntool.firebaseapp.com",
  projectId: "wenergiedesigntool",
   databaseURL: "https://wenergiedesigntool-default-rtdb.firebaseio.com",
  storageBucket: "wenergiedesigntool.appspot.com",
  messagingSenderId: "459469653216",
  appId: "1:459469653216:web:fdaf5025ed00bdcd817c85",
  measurementId: "G-JMN1HJ0S6C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();




var stage = 1
const ques= document.getElementById("question")
//const card1head = document.getElementById("card1head")
//const card2head = document.getElementById("card2head")
const card1exp = document.getElementById("card1exp")
const card2exp = document.getElementById("card2exp")
const card1button = document.getElementById("card1button")
const card2button = document.getElementById("card2button")
const savesection = document.getElementById("savesection")
const mainsection =document.getElementById("mainsection")


//Heading

const choose_solar_operatingmode="Choose your Solar Operating Mode ?"
const select_application_priority="Select your priority ?"
const choose_charging_mechanism="Choose Charging Mechanism ?"
const enter_batteryvoltage="Enter battery voltage"
const enter_batteryahcapacity="Enter battery AH capacity"
const enter_batterytype="Enter battery type"
const enter_batterytype2="Enter Type of your existing battery"
const choose_protectionfromblackout="Do you want protection from blackout ?"
const choose_neworoldbattery="Do you have batteries?"
const critical_loadoninverter="Critical running on load inverter?"
const enter_numberofbatteries="Enter number of batteries?"
const can_load_drop_fallbellow="Can load drop to below par ?"
const offgrid_application="Choose Application"

var endnodes=[offgrid_application,can_load_drop_fallbellow,enter_numberofbatteries]

//Left Side  and Right side heading 2

const solaroperatingmode_left="GridTie with NetMetering or Export "
const solaroperatingmode_right="OffGrid or Other "
const select_applicationpriority_left="For Battery Charging&Loads"
const select_applicationpriority_right="Priority From Blackouts"
const choosechargingmechanism_left="Want additional new Charger"
const choosechargingmechanism_right="Existing Inverter has inbuilt charger"
const choosebatterytype_left="Lithium"
const choosebatterytype_right="LeadAcid"
const doyouwantprotectionfromblackout_left="No"
const doyouwantprotectionfromblackout_right="Yes"
const numberofbatteries_left="Less than or equal to 2"
const numberofbatteries_right="More than or equal to  3 and less than 6"
const canloaddropfarbelowpeak_left="Yes Load drop far below Peak"
const canloaddropfarbelowpeak_right="No Load wont drop below Peak"
const criticalrunning_left="Less than 500w"
const criticalrunning_right="Similar to solar"
const doyouhavebatteries_left="ExistingBattery"
const doyouhavebatteries_right="Need New Battery"

console.log("called designerTool.js");
if(stage==1)
{
  fun_solarmode();
}




card1button.addEventListener('click', (e) => {

   answers[count] = card1exp.innerText;
   count++;
   console.log(ques.innerText);
   console.log(answers);
 switch (ques.innerText) {
     case choose_solar_operatingmode:
       fun_selectapplicationpriority();
       break;
       case offgrid_application:
       answers[count] = "Solar to UPS Retrofit";
         onSave();
         break;
       case select_application_priority:
          fun_selectchargingmechanisum();
         break;
         case choose_charging_mechanism:
           fun_batteryvoltage();
           break;
           case  enter_batteryvoltage :
           fun_batterycapacity();
           break;
           case enter_batteryahcapacity:
           fun_batterytype();
           break;
           case enter_batterytype:
           fun_blackoutprotectionresponse();
           break;

           case choose_neworoldbattery:
             console.log("selected");
            fun_batterytype2();
           break;
           case enter_batterytype2:
            answers[count] = "Selected Battery is Lithium";
            onSave();
            //part 2 lithium break
           break;
           case can_load_drop_fallbellow:
           fun_numberofbatteries()
           break;
           case critical_loadoninverter:
           fun_numberofbatteries()
           break;
           case enter_numberofbatteries :
           answers[count] = "Number of Batteries <=2 SMPS(First STAGE) + QUARK/CCU";

           onSave();
            break;
            case choose_protectionfromblackout:
               answers[count-1] = "No Black Out protection Needed";
               answers[count] = "ChangeOver-Cum-Priotiy Module Required ";
            onSave();
            break;



     default:

   }





})
card2button.addEventListener('click', (e) => {
  answers[count] = card2exp.innerText;
  count++;

  console.log(answers);
   console.log(ques.innerText);
 switch (ques.innerText) {
   case choose_solar_operatingmode:
     fun_offgridapplication()
     break;
     case select_application_priority:
      fun_doyouhavebatteries() //selected no
      break;
      case choose_neworoldbattery:
      answers[count] = "New Batteries are Required ";

       onSave();

      break;
      case enter_batterytype2:
      fun_criticalrunningonloads()
      break;
      case critical_loadoninverter:
      fun_canloaddropbelow()
      break;
      case can_load_drop_fallbellow:
      answers[count] = "Drop far Below Peak Value";

       onSave();
      break;
      case choose_charging_mechanism:
      fun_blackoutprotectionresponse();
      break;
      case choose_protectionfromblackout:
      fun_numberofbatteries();
      break;
      case enter_batterytype:
      fun_blackoutprotectionresponse();
      break;
      case enter_numberofbatteries :
      answers[count] = "Number of Batteries >2 SMPS(First STAGE) + 90v Boost Converter";

      onSave();
       break;
       case offgrid_application:
        answers[count] = "Detailed Design Consultancy Required";

         onSave();
         break;
   default:

 }

})



  function fun_solarmode() {

    set_cards(choose_solar_operatingmode,solaroperatingmode_left,"expabout gid","",solaroperatingmode_right,"expabout ","")

   }


   function fun_selectapplicationpriority(){
     set_cards(select_application_priority,select_applicationpriority_left,"expabout gid","",select_applicationpriority_right,"expabout ","")

   }

   function fun_selectchargingmechanisum(){
     set_cards(choose_charging_mechanism,choosechargingmechanism_left,"expabout gid","",choosechargingmechanism_right,"expabout ","")

   }
   function fun_canloaddropbelow(){
       set_cards(can_load_drop_fallbellow,canloaddropfarbelowpeak_left,"expabout gid","",canloaddropfarbelowpeak_right,"expabout ","")
   }

   function fun_batteryvoltage(){
     showinputfield(enter_batteryvoltage);
     // set_cards(enter_batteryvoltage,"GridTie With NetMetering and Export","expabout gid","","OffGrid/Other","expabout ","")

   }


   function fun_batterycapacity(){
     showinputfield(enter_batteryahcapacity);
     // set_cards(enter_batteryahcapacity,"GridTie With NetMetering and Export","expabout gid","","OffGrid/Other","expabout ","")

   }

   function fun_batterytype(){
     set_cards(enter_batterytype,choosebatterytype_left,"expabout gid","",choosebatterytype_right,"expabout ","")

   }
   function fun_batterytype2(){
     set_cards(enter_batterytype2,choosebatterytype_left,"expabout gid","",choosebatterytype_right,"expabout ","")

   }

   function fun_blackoutprotectionresponse(){
     set_cards(choose_protectionfromblackout,doyouwantprotectionfromblackout_left,"expabout gid","",doyouwantprotectionfromblackout_right,"expabout ","")

   }

   function fun_doyouhavebatteries(){
     set_cards(choose_neworoldbattery,doyouhavebatteries_left,"expabout gid","",doyouhavebatteries_right,"expabout ","")

   }
   function fun_criticalrunningonloads(){
     set_cards(critical_loadoninverter,criticalrunning_left,"expabout gid","",criticalrunning_right,"expabout ","")

   }

   function fun_numberofbatteries(){
     set_cards(enter_numberofbatteries,numberofbatteries_left,"expabout gid","",numberofbatteries_right,"expabout ","")

   }



   function  fun_offgridapplication(){
     set_cards(offgrid_application,"Solar To UPS Retrofit","expabout gid","","OFF-GRID Products (ie streetlights/SHLS/Charging)","expabout ","")

   }

   function set_cards(mainheading, card1heading,card1def,card1pic,card2heading, card2def, card2pic){
       ques.innerText =mainheading
      // card1head.innerText=card1heading
       card1exp.innerText=card1heading
    //   card2head.innerText=card2heading
       card2exp.innerText=card2heading
    //   card1button.innerText=card1heading
    //   card2button.innerText=card2heading




   }

   function set_masterTable(){

   }

   function onSave(){
     ques.innerText="Enter a Name for your System";
     mainsection.style.display = 'none'
      savesection.style.visibility = "visible";


   }
   function showinputfield(que){
          ques.innerText=que;

       mainsection.style.visibility = 'hidden'
       document.getElementById("inputsection").style.visibility = "visible";


   }

document.getElementById("okbutton").addEventListener('click', (e) => {


      console.log("clciked");
    if(isEmptyOrSpaces(document.getElementById("batteryinput").value)){

    }else{
     switch(ques.innerText){
       case enter_batteryvoltage :
       answers[count] = "BatteryVoltage:"+document.getElementById("batteryinput").value+"volt";
       count++;
       if(document.getElementById("batteryinput").value <=24)
       {
         answers[count] = "SMPS + BUCK Converter with specified charging current";
         count++;
       } else {
         answers[count] = "SMPS + BOOST Converter with specified charging current";
         count++;
       }

       document.getElementById("batteryinput").value="";
       fun_batterycapacity();
       break;
       case enter_batteryahcapacity:
       answers[count] = "Battery AH Capacity :"+document.getElementById("batteryinput").value;
       count++;
       mainsection.style.visibility = 'visible'
       document.getElementById("inputsection").style.visibility = "hidden";
       fun_batterytype();
       break;
     }
   }






   })




document.getElementById("save_profile").addEventListener('click', (e) => {
  if(isEmptyOrSpaces(document.getElementById("projectname").value)){
    console.log("Enter valid name");
  }else {
    const myJSON = JSON.stringify(answers);
    console.log("json");
    console.log(myJSON);
    save_project(myJSON);

  }

} )
function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}


function save_project(myJSON){
      document.getElementById("savesection").style.visibility = "hidden";
      document.getElementById("question").style.visibility = "hidden";
      document.getElementById("progressbar").style.visibility = "visible";
   this.database = firebase.database();
    let userRef = this.database.ref('USERPROJECTS/'+localStorage.getItem("USERID"));
 userRef.child(
    new Date().getTime()).set({
    name: document.getElementById("projectname").value,
    createdon:new Date().getTime(),
    project:answers

  }, (error) => {
    if (error) {
      console.log(error);
      alert(error)

    } else {
      window.document.location = './dashboard.html';
    }
  })
}
 }
