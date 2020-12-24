console.log('javascript file is loaded')
    // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAE0yJXWqkrYc7-4dTBalw0W7QnoDATdqk",
    authDomain: "fir-form-ae3ad.firebaseapp.com",
    databaseURL: "https://fir-form-ae3ad.firebaseio.com",
    projectId: "fir-form-ae3ad",
    storageBucket: "fir-form-ae3ad.appspot.com",
    messagingSenderId: "455755025639",
    appId: "1:455755025639:web:55fdf9bfd3792d6576a642",
    measurementId: "G-HLXYBMNV95"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




//add a real time authentication Listener

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);

    } else {
        console.log("not logged in")
        location.replace("http://localhost:3000")
    }
})

document.getElementById('log').onclick = function() {
    firebase.auth().signOut();
}







// var database = firebase.database();

var area = firebase.database().ref('AppleStores');
document.getElementById('contact').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();


    var Location = document.getElementById('Location').value;
    var iphone = document.getElementById('iphone').value;
    var ipad = document.getElementById('ipad').value;
    var mac = document.getElementById('mac').value;

    saveMessage(Location, iphone, ipad, mac)
    document.getElementById('contact').reset();


    var modal2 = document.getElementById("myModal2");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close2")[0];

    // When the user clicks the button, open the modal 
    modal2.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal2.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
    }
}


function saveMessage(Location, iphone, ipad, mac) {
    var newarea = area.push();
    newarea.set({
        Location,
        key: newarea.key,
        Inventories: {
            iphone: iphone,
            ipad: ipad,
            macbooks: mac,
        }


    })
}

//Retrieve Data

function getdata() {
    var location = document.getElementById("loc").value
    console.log(location)


    var leadsRef = firebase.database().ref('AppleStores');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            if (childData.Location === location) {

                iphone = childData.Inventories.iphone,
                    ipad = childData.Inventories.ipad,
                    macbooks = childData.Inventories.macbooks


                document.getElementById("iphone").innerHTML = iphone;
                document.getElementById("ipad").innerHTML = ipad;
                document.getElementById("macbooks").innerHTML = macbooks;

            }
        });
    });
}


function removeData() {
    var location = document.getElementById("loc2").value
    console.log(location)


    var leadsRef = firebase.database().ref('AppleStores');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            if (childData.Location === location) {
                firebase.database().ref('AppleStores/' + childData.key).remove()
            }
        });
    });

}

//Update Data

document.getElementById('update').onclick = function() {
    var leadsRef = firebase.database().ref('AppleStores');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            console.log(leadsRef.key)
            var Location = document.getElementById('Location').value;
            var iphone = document.getElementById('iphone').value;
            var ipad = document.getElementById('ipad').value;
            var mac = document.getElementById('mac').value;

            if (childData.Location === Location) {
                firebase.database().ref('AppleStores/' + childData.key + "/Inventories").update({
                    iphone: iphone,
                    ipad: ipad,
                    macbooks: mac
                })
                document.getElementById('contact').reset();
                var modal = document.getElementById("myModal");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                // When the user clicks the button, open the modal 
                modal.style.display = "block";

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            }
        });
    });
}


//Delete Data

document.getElementById('delete').onclick = function() {
    var location = document.getElementById('Location').value;
    var leadsRef = firebase.database().ref('AppleStores');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            if (childData.Location === location) {
                firebase.database().ref('AppleStores/' + childData.key).remove()

                document.getElementById('contact').reset();

                var modal1 = document.getElementById("myModal1");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close1")[0];

                // When the user clicks the button, open the modal 
                modal1.style.display = "block";

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal1.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal1) {
                        modal1.style.display = "none";
                    }
                }

            }


        });
    });
}



//creating and presenting data through tables 

//create references
database = firebase.database()
var ref = database.ref("AppleStores")

let i = 0;
//sync object changes
ref.on('value', gotData, errData)

function gotData(data) {

    const preobject = document.getElementById('object')


    //preobject.innerText = JSON.stringify(data, null, 3)

    var temp = ''

    data.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();

        console.log(childData.Location)


        temp += '<tr>'
        temp += '<td>' + childData.Location + '</td>'
        temp += '<td>' + childData.Inventories.iphone + '</td>'
        temp += '<td>' + childData.Inventories.ipad + '</td>'
        temp += '<td>' + childData.Inventories.macbooks + '</td></tr>'


        document.getElementById('data').innerHTML = temp
    });



}

function errData(err) {
    console.log('error!')
    console.log(err)
}



function myfunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("Location");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    console.log(filter)
    console.log(table)
    tr = table.getElementsByTagName("tr");

    console.log(tr)
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}