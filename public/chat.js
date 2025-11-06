const socket = io()

socket.on("message",(msg)=>{
    console.log(msg)
})

socket.on("newConnection",(msg)=>{
    console.log(msg)
})

const $messageForm = document.querySelector("#msg-form");

const $messageInput = $messageForm.querySelector("input");


const $messageButton = $messageForm.querySelector("button")


$messageForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    $messageButton.setAttribute("disabled","disabled")

    let message = e.target.element.message.value;

    socket.emit("sendMessage",message,(act,error)=>{
        if(error){
            return console.log(error.message)
        }
    })
})




// document.querySelector("#msg-form").addEventListener("submit",(e)=>{
//     e.preventDefault();

//     let message = e.target.elements.message.value;

//     console.log(message)

//     socket.emit("sendMessage",message)

//     e.target.elements.message.value = "";
// })


document.querySelector("#location").addEventListener("click",()=>{
    if(!navigator.geolocation){
        return alert("your device is not supported to geo location");
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        socket.emit("location",lat,lon)
    })
})