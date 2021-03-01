

const  weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
console.log("client side js file")
console.log("git version cont checking")

msg1.textContent = 'Your city is..'
weatherform.addEventListener('submit',(e)=>{
        e.preventDefault()

        const loaction = search.value
        fetch('http://localhost:3000/weather?address='+loaction).then((response)=>{
       response.json().then((data)=>{
               if(data.error)
               console.log(data.error)
               else{
                console.log(data)
                msg1.textContent = 'Your city is '+data.address
                msg2.textContent =  data.mssg
               }
              
       })
   
})
})
        