// ADDED CHAT SECTION 
// Start of Tawk.to Script
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/62f7ba8a37898912e962cf45/1gabr1bin';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

// End of Tawk.to Script
// END CHAT SECTION



// Random Script Content
// The AOS JS Section
   
      AOS.init();

// AOS ends

    
        var menu = document.querySelector('.menu');
        var bg = document.querySelector('.bg');

        menu.addEventListener('click',function(){
            bg.classList.toggle('active');
            menu.classList.toggle('active');
        })
    

    
        var nav = document.querySelector('.nav');
        window.addEventListener('scroll',function(){
            nav.classList.toggle('sticky',window.scrollY>0);
        })
    