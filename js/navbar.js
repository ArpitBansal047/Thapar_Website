const menubtn=document.getElementById('menu-btn');
const menubar=document.getElementById('menu');
const closebtn=document.getElementById('close-btn');
const searchbtn=document.getElementById('search');
// const searchbar=document.getElementById('searchbar-input');
const searchCross=document.getElementById('searchbar-cross');


//Search btn function
function searchbar() {
    var x = document.getElementById('searchbar-input')

    if (x.style.display === 'none') {
      x.style.display = 'flex'
    } else {
      x.style.display = 'none'
    }
  }



// Event listeners

//Menu Opener
menubtn.addEventListener('click',()=>{
    menubar.classList.add('show-menu')
});

//Menu Closer
closebtn.addEventListener('click',()=>{
    menubar.classList.remove('show-menu')
})

//Searchbar
searchbtn.addEventListener('click',()=>{
    searchbar();
})



//     searchbar.classList.add('show-bar')
//     searchCross.classList.add('show-cross')
//     searchbtn.classList.add('rem-search')
// })

// searchCross.addEventListener('click',()=>{
//     searchbar.classList.remove('show-bar')
//     searchCross.classList.remove('show-cross')
//     searchbtn.classList.remove('rem-search')
// })



