import { auth,db } from "./firebase.js";
import { addDoc,collection,onSnapshot,query,where,serverTimestamp,getDocs ,deleteDoc,doc, updateDoc,orderBy    } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

let userId=localStorage.getItem("userId");
let publish=document.getElementById("publish");
publish.addEventListener("click",async()=>{
let title=document.getElementById("title");
let text=document.getElementById("textarea");
if (title.value.length < 5) {
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
        title: "Title should be greater than 3 characters"
    })
    return;
}
if (title.value.length > 50) {
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
        title: "Title should be less than 50 characters"
    })
    return;
}
if (text.value.length < 100) {
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
        title: "Title should be greater than 100 characters"
    })
    return;
}
if (text.value.length > 3000) {
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
        title: "Title should be less than 3000 characters"
    })
    return;
}


try {
    const docRef = await addDoc(collection(db, "blogs"), {
      title:title.value,
      text:text.value,
      user:userId,
      time:serverTimestamp(),
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
        title: "Blog Publish Successfuly"
    })
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
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
        icon:'error',
        title:e,
    })
  }
  
})


function show(users) {
    console.log(users);
    let  blog=document.getElementById("show");
    const q = query(collection(db, "blogs"),where("user","==",users.uid),orderBy("time","desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type==="removed") {
            let divDlt=document.getElementById("blog-"+change.doc.id)
            divDlt.remove()
          }
          else if(change.type==="added"){
           
                  const { title,time,text , user } = change.doc.data()
                blog.innerHTML += `
                <br>
                <div id="blog-${change.doc.id}" class='border border-1 bg-body rounded p-3'>
                <div class="profile d-flex">
                <div  class="imgbox ">
                    <img onclick="profile('${users.pic}','${users.uid}','${users.name}')" height='70px' src="${users.pic}" class="rounded" height="110px" width="110px" alt="">
                </div>
                <div class="userbox ms-4">
                    <h3 id="blog-title-${change.doc.id}">${title}</h3>
                    <p class="fw-bold text-muted">${users.name} - ${time ? moment(time.toDate()).fromNow():moment().fromNow()}</p>
                </div>
            </div>
            <br>
            <div class="description">
                <p class="text-muted des" id='des-${change.doc.id}'>${text}</p>
            </div>
            <div class='d-flex'>
                <button onclick="upd('${change.doc.id}','${users.uid}','${title}','${text}')" id='updat' >Update</button>
                <button id='delete' onclick="del('${change.doc.id}','${users.uid}')">Delete</button>
                <button  id='save-${change.doc.id}' class='cancel' onclick="save('${change.doc.id}')">Save</button>
                <button  id='cancel-${change.doc.id}' class='save' onclick="can()">Cancel</button>
                </div>

            </div>
        
            `
          
          
          }});


});
    }

window.upd=(id,uid,title,text)=>{
    if(uid==userId){
   document.getElementById("blog-title-"+id).innerHTML=` <input type="text" value='${title}'  class="form-control" id="updtitle" placeholder="Blog Title" aria-label="Last name">`;
   document.getElementById("des-"+id).innerHTML=` <textarea class="form-control"  placeholder="What is in Your Mind" id="updtext" rows="3">${text}</textarea>`;
document.getElementById("save-"+id).style.display="flex";    
document.getElementById("cancel-"+id).style.display="flex";    
}
    else{
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
            title: "ohMamoo Apni post Update karoo"
        })
    }
} 

window.save=async(id)=>{
    let title=document.getElementById("updtitle");
    let text=document.getElementById("updtext");

    if (title.value.length < 5) {
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
            title: "Title should be greater than 3 characters"
        })
        return;
    }
    if (title.value.length > 50) {
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
            title: "Title should be less than 50 characters"
        })
        return;
    }
    if (text.value.length < 100) {
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
            title: "Title should be greater than 100 characters"
        })
        return;
    }
    if (text.value.length > 3000) {
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
            title: "Title should be less than 3000 characters"
        })
        return;
    }


    const washingtonRef = doc(db, "blogs", id);
try{

    await updateDoc(washingtonRef, {
        title:title.value,
        text:text.value,
        user:userId,
        time:serverTimestamp(),
    })
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
        title: "Blog Publish Successfuly"
    }).then(()=>{
        location.reload()
    })
}
catch(e){
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
        title:e.message
    })
}
    
    
}

window.del=(id,uid)=>{
    console.log(id);
    if(uid==userId){
    Swal.fire({
        title: 'Are you sure you want to Delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1ca1f1',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete!'
    }).then(async(result) => {
        if (result.isConfirmed) {      
                Swal.fire(
                    'Deleted!',
                    'Blog successfully Deleted',
                    'success'
                ).then(async() => {
                    await deleteDoc(doc(db, "blogs",id));
                }) 
        }
  

}) 
} 
else{
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
        title: "ohMamoo Apni post delete karoo"
    })
}
}

async function userRec() {
    const q = query(collection(db, "users"),);
    const onSnapshot = await getDocs(q);
    onSnapshot.forEach((change) => {
        show(change.data())
    })
  };

  userRec()


  window.can=()=>{
location.reload()
  }

  window.profile=(pic,id,name)=>{
    let pro={
      name:name,
    pic:pic,
    id:id
    
    }
      localStorage.setItem("userProfile",JSON.stringify(pro))
    location.replace("./pages/userprofile.html")
    }