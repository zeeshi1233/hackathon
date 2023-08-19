import { auth,db } from "./firebase.js";
import { collection,onSnapshot,query,where} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { onAuthStateChanged,signOut  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

function show(){

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;

            const q = query(collection(db, "users"),where("uid","==",uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
            document.getElementById("uname").style.display="flex";
            document.getElementById("uname").innerHTML=change.doc.data().name;
            document.getElementById("login").style.display="none";
            document.getElementById("logout").style.display="block"
            localStorage.setItem("userId",uid)
            console.log(uid);
                });
            });
            
        } else {
        document.getElementById("adddata").style.display="none"
        }
    });
}
show()    

document.getElementById("logout").addEventListener("click",()=>{
    signOut(auth).then(() => {
let div=document.getElementById("greet");
        var d = new Date();
        var time = d.getHours();
        
        if (time < 12) {
          document.write("<b>Good morning!</b>");
        }
        if (time > 12) {
          document.write("<b>Good afternoon!</b>");
        }
        if (time == 12) {
          document.write("<b>Go eat lunch!</b>");
        }

        document.getElementById("uname").style.display="none";
        document.getElementById("login").style.display="show";
        document.getElementById("logout").style.display="none"
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

Toast.fire({
    icon: 'success',
    title: "User Successfully LogOut"
})
      }).catch((error) => {
console.log(error);
    });
      

})