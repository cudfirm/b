
// The TAB Script Created by CUD

window.onload = ()=>{

    let x, delX;
    let tabs = document.querySelectorAll('.tab');
    
    Array.from(tabs).forEach((t)=>{
        t.addEventListener('click', (e)=>{
            if(!e.target.classList.contains('selected')){
                document.querySelector('.selected').classList.remove('selected');
                e.target.classList.add('selected');
                document.querySelector('.display').classList.remove('display');
                document.querySelector(e.target.dataset.tab).classList.add('display');
            } 
        });
    });
    
     let display = document.querySelector(".display-body");
     let rect = display.getBoundingClientRect();
     
     display.addEventListener("touchstart", (e)=>{
         x = e.touches[0].clientX-rect.left;
     });
     
     display.addEventListener("touchmove", (e)=>{
         delX = e.touches[0].clientX-rect.left-x;
     });
     
     display.addEventListener("touchend", (e)=>{
     
         let curTab = document.querySelector('.selected');
         
         if(Math.abs(delX)>50){
             if(delX < 0){
                 if(curTab.nextElementSibling != null){
                     curTab.classList.remove('selected');
                     curTab.nextElementSibling.classList.add('selected');
                     
                     document.querySelector('.display').classList.remove('display');
                document.querySelector(curTab.nextElementSibling.dataset.tab).classList.add('display');
                 }
                 
             }else{
                 if(curTab.previousElementSibling != null){
                     curTab.classList.remove('selected');
                     curTab.previousElementSibling.classList.add('selected');
                     
                     document.querySelector('.display').classList.remove('display');
                document.querySelector(curTab.previousElementSibling.dataset.tab).classList.add('display');
                 }
             }
         }
     });
    
}


