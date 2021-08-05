window.onload = function() {
//console.log(USERID);
var createnewdesign = document.getElementById("createnewdesign");
console.log(localStorage.getItem("USERID"));
var system_name=[];
var system_created=[];
var system_key=[];
var count=0;

createnewdesign.addEventListener('click', (e) => {
    window.document.location = './flow.html';





});


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
   firebase.initializeApp(firebaseConfig);
   var query = firebase.database().ref('USERPROJECTS/'+localStorage.getItem("USERID")).orderByKey();
   query.once("value")
     .then(function(snapshot) {
       console.log(snapshot.numChildren());
       snapshot.forEach(function(childSnapshot) {

         system_name[count]=childSnapshot.val().name;
         system_key[count]=childSnapshot.key;
         system_created[count]=childSnapshot.val().createdon;
         count++;
         console.log(system_created.length);
         if(system_created.length == snapshot.numChildren() ){
           console.log(system_name);
          console.log(system_key);
           console.log(system_created);
           create_list(system_name,system_created,system_key,system_created.length);

         }

         // numberofdevices = numberofdevices + 1;
         // var key = childSnapshot.key;
         // _DeviceKeys[numberofdevices] = key;



       });
     });


     function create_list(name,date,key,length){
       for(var i =0; i<length ;i++){
       var row = document.createElement("div");
       row.setAttribute("id", key[i]);
       var d = new Date(parseInt(date[i]));
       var newdate=d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
       row.className = 'app-card';
          row.innerHTML = `

            <span>
              <svg viewBox="0 0 512 512" style="solid #1F192F">
                <defs>
                  <style>
                    .cls-1 {
                      fill: #2e000a;
                    }

                    .cls-2,
                    .cls-3,
                    .cls-4 {
                      isolation: isolate;
                    }

                    .cls-3,
                    .cls-4 {
                      font-size: 280px;
                      font-family: FranklinGothic-Book, Franklin Gothic Book;
                    }

                    .cls-3 {
                      fill: #068fff;
                    }

                    .cls-4 {
                      fill: #ff6700;
                    }
                  </style>
                </defs>
                <title>logo3</title>
                <path class="cls-1" d="M467,30H45A14.85,14.85,0,0,0,30,44.7V467a14.85,14.85,0,0,0,14.7,15H467a14.85,14.85,0,0,0,15-14.7V45a14.85,14.85,0,0,0-14.7-15Z" transform="translate(-30 -30)" />
                <path class="cls-1" d="M482,45V467a14.85,14.85,0,0,1-14.7,15H256V30H467a14.85,14.85,0,0,1,15,14.7Z" transform="translate(-30 -30)" />
                <g class="cls-2">
                  <text class="cls-3" transform="translate(16 303.76)">W</text>
                  <text class="cls-4" transform="translate(267.97 303.76)">S</text>
                </g>
              </svg>
              Name:${name[i]}
            </span>
            <div class="app-card__subtext">Last Saved On :  ${newdate}</div>
            <div class="app-card-buttons">
              <button class="content-button status-button" style="margin:10px">Open</button>

              <button class="content-button status-button">Share</button>
              <!-- <div class="menu">
              <button class="dropdown">
          <ul>
           <li><a href="#">Go to Discover</a></li>
           <li><a href="#">Learn more</a></li>
           <li><a href="#">Uninstall</a></li>
          </ul>
         </button> -->
              </div>
              `



       document.getElementById("listsection").appendChild(row);
     }
   }
}
