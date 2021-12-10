const imgs=document.getElementById('imgs')
const leftbtn=document.getElementById('left')
const rightbtn=document.getElementById('right')
const img=document.querySelectorAll('#imgs .img')

let idx=0

let interval=setInterval(run,5000)

function run(){
    idx++

    changeImage()
}

function changeImage(){
    if(idx>img.length){
        idx=0
    }
    else if(idx<0){
        idx=img.length-1
    }

    imgs.style.transform=`translateX(${-idx* 841.7}px)`
}

function resetInterval(){
    clearInterval(interval)
    interval=setInterval(run,5000)
}

rightbtn.addEventListener('click',()=>{
    idx++

    changeImage()
    resetInterval()
})

leftbtn.addEventListener('click',()=>{
    idx--

    changeImage()
    resetInterval()
})