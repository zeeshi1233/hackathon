import { app, auth, db, storage } from './firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,updatePassword  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { setDoc, doc, query, where, onSnapshot, collection, addDoc, updateDoc,orderBy } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

let userId=localStorage.getItem("userId");
console.log(userId);
function show(){

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
          
     
            const q = query(collection(db, "users"),where("uid","==",uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
document.getElementById("user_pic").src=change.doc.data().pic
document.getElementById("name").innerHTML=change.doc.data().name
                });
            });
            
        } else {
        
        }
    });
}
show() 

window.updpic=()=>{
let file=document.getElementById("pic").files[0];

const storageRef = ref(storage, `images/${userId}`);

uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
})
.then(()=>{

    getDownloadURL(ref(storage, `images/${userId}`))
    .then(async(url) => {
        const washingtonRef = doc(db, "users", userId);

await updateDoc(washingtonRef, {
pic:url
});
        
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
    title: "Pic updated Successfully"
})
        
    })
    .catch((error) => {
        console.log(error);
    });
    
})


}

window.updname=()=>{
    let inp=document.getElementById("name").innerText;
    document.getElementById("name").innerHTML=`<input type="text" value="${inp}"  class="form-control" id="name1">`
document.getElementById("save1").style.display="flex"
document.getElementById("save2").style.display="none"
  
}

window.updrec=async()=>{
    let inp2=document.getElementById("name1").value;
    console.log(inp2);
    const washingtonRef = doc(db, "users", userId);
    await updateDoc(washingtonRef, {
        name:inp2
        });
                
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
            title: "Pic updated Successfully"
        })  
        document.getElementById("save1").style.display="none"
        document.getElementById("save2").style.display="flex"
    }

    window.updpass=()=>{
            const user = auth.currentUser;
            const newPassword = document.getElementById("newpass").value;
            const password = document.getElementById("reppass").value;
            if (password == newPassword) {
                updatePassword(user, newPassword).then(() => {
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
                        title: "Password updated Successfully"
                    })  



                }).catch((error) => {
                    console.log(error);
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
                        icon: 'error',
                        title: error
                    })  
                });
            }
    
    }