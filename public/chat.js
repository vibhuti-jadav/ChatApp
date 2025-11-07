const socket = io()

socket.on("message",(msg)=>{
    console.log(msg)
})


// const messageTemplate = document.querySelector("#msg-template").innerHTML;

// const message = document.querySelector("#message")

socket.on("newConnection",(msg)=>{
    console.log(msg)
})



const $messageForm = document.querySelector("#msg-form");

const $messageInput = $messageForm.querySelector("input");

const $messageButton = $messageForm.querySelector("button")

$messageForm.addEventListener("submit",(e)=>{
    e.preventDefault();
   
    $messageButton.setAttribute("disabled","disabled")

    let message = e.target.elements.message.value;

    socket.emit("sendMessage",message)

    $messageButton.removeAttribute("disabled");

    e.target.elements.message.value = ""

    $messageInput.focus()
})

// document.querySelector("#msg-form").addEventListener("submit",(e)=>{
//     e.preventDefault();

//     let message = e.target.elements.message.value;

//     console.log(message)

//     socket.emit("sendMessage",message)

//     e.target.elements.message.value = "";
// })

const $locationButton = document.querySelector("#location");

$locationButton.addEventListener("click",()=>{
    $locationButton.setAttribute("disabled","disabled");

    if(!navigator.geolocation){
        return alert("your browser does not supported geo location")
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        const lat = position.coords.latitude

        const lon = position.coords.longitude

        socket.emit("location",lat,lon)

      $locationButton.removeAttribute("disabled")
    })

})

// document.querySelector("#location").addEventListener("click",()=>{
//     if(!navigator.geolocation){
//         return alert("your device is not supported to geo location");
//     }

//     navigator.geolocation.getCurrentPosition((position)=>{
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         socket.emit("location",lat,lon)
//     })
// })