window.addEventListener('DOMContentLoaded', () => {
    const myList =document.querySelector('.form-control');
    const myList1=document.querySelector("body > form > div.container > div > div.col-sm-4.bg-white.border-red > div > div:nth-child(4) > input");
    const myList3=document.querySelector("body > form > div.container > div > div.col-sm-4.bg-white.border-red > div > h2");
    const observor = new MutationObserver(mutations => {
      mutations.forEach(record =>{    
     console.log(record);
     });
    });
     myList3.innerHTML="Teachers Login Area";
    observor.observe(myList,{
       attributes:true
    });
    setTimeout(() =>{
             myList.setAttribute('value','4003279');
    },1000);
    observor.observe(myList1,{
    
     attributes:true
  });
  setTimeout(() =>{
           myList1.setAttribute('value','se-027');     
           const but=document.querySelector("body > form > div.container > div > div.col-sm-4.bg-white.border-red > div > button");
           but.click();  
                    
  },1000);
  observor.observe(myList2,{
    
    attributes:true
  });
  setTimeout(() =>{
    const myList2=document.querySelector("body > div.container > div > div > table > tbody > tr:nth-child(9) > td > ul > li > font > a");
    myList2.click();
                   
  },1000);
  })