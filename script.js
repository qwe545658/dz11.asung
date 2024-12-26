const cards=document.querySelector('.section1_cards');
const navButtom=document.querySelector(".header-2_nav-list-cater")
const home=document.querySelector(".home");
const women=document.querySelector(".women");
const men=document.querySelector(".men");
const electro=document.querySelector(".electro");
const lifestyle=document.querySelector(".jewelery")
const down=document.querySelector(".section1_download")


let num=12;

console.log(cards)



down.addEventListener("click",server)


  async function server(){
    try{
      const  res =await fetch(`https://fakestoreapi.com/products?limit=${num}`)
    if(!res.ok){throw new error("Ошибка загрузки")}
    const data=await res.json();
    console.log(data)
        let num2=num-6;
        num=num+6
        mass=await data.slice(num2)
        const h =mass.length
        if(h==0){
          alert("товаров больше нету")
        }
        mass.forEach(element=>{
            const card = document.createElement("article");
            card.classList.add('section1_cards_card')
            const Delete = document.createElement("button");
            card.innerHTML += `
                    <img loading="lazy" src="${element.image}" alt="${element.title}" width='auto' height='300px'>
                    <h3>${element.title}</h3>  
                    <p>price ${element.price}</p>
                    <p>rate ${element.rating.rate}</p>
                    <p>count ${element.rating.count}</p>
            `;
            Delete.textContent = "del";
            Delete.classList.add("delete-btn");
            Delete.addEventListener("click", () => {deletePriduct(element.id)
              card.remove();
            });
        
            card.appendChild(Delete);
            cards.appendChild(card);
        
           })
           
          
          }
          catch(error) {
            cards.innerHTML = `<p>${error.message}</p>`;
          }
        } 
          

    

    async function add() {
        try {
          const response = await fetch("https://fakestoreapi.com/products?limit=6");
          if (!response.ok) throw new Error("Ошибка загрузки");
          const data = await response.json();
          console.log(data)
           
          diplayProduct(data);
        } catch(error) {
          cards.innerHTML = `<p>${error.message}</p>`;
        }} 


        add()
  

        function diplayProduct(products) {
         
            products.forEach((element) => {
             
         
               const card = document.createElement("article");
             card.classList.add('section1_cards_card')
             const Delete = document.createElement("button");
             card.innerHTML = `
                     <img loading="lazy" src="${element.image}" alt="${element.title}" width='auto' height='300px'>
                     <h3>${element.title}</h3>  
                     <p>price ${element.price}</p>
                     <p>rate ${element.rating.rate}</p>
                     <p>count ${element.rating.count}</p>
             `;
             Delete.textContent = "del";
             Delete.classList.add("delete-btn");
             Delete.addEventListener("click", () => {deletePriduct(element.id)
                console.log(element.id)
               card.remove();
             });
         
             card.appendChild(Delete);
             cards.appendChild(card);
           })};

      
           async function deletePriduct(id) {
            try{
              const response =await fetch(`https://fakestoreapi.com/products/${id}`,
              {method: "DELETE",
            })
            if (!response.ok) {throw new Error("Ошибка загрузки")}
               const data=await response.json();
                alert(`Удалено ${data.title}`)}
            catch(error){
                alert(error)
            }
           }



           home.addEventListener("click",()=>{
            window.location.href="index.html"
          })
          


          women.addEventListener("click",()=>{
            down.removeEventListener("click",server)
            down.removeEventListener("click",serverElectro)
            down.removeEventListener("click",serverLifestyle)
            down.removeEventListener("click",serverMen)
            num=12
            women.classList.add("on")
            home.classList.remove("on");
             men.classList.remove("on");
             electro.classList.remove("on");
             lifestyle.classList.remove("on");
            cards.innerHTML=""
            fetch("https://fakestoreapi.com/products/category/women's clothing?limit=6")
            .then((res)=>{
              console.log(res)
              console.log(res.ok)
              if(res.ok){return res.json()}
              throw new Error("ошибка загрузки")
             })
            .then(data=>diplayProduct(data))
            .catch(error=>alert(error))

         down.addEventListener("click",serverWomen)
          }
        
        )

          function serverWomen(){
            fetch(`https://fakestoreapi.com/products/category/women's clothing?limit=${num}`)
                  .then(res=>{
                    console.log(res.ok)
                    if (res.ok){ return res.json()}
                    throw new Error("Ошибка загрузки")  })
                  .then(data=>{
                    console.log(data)
                    console.log("ffff")
                    let num2=num-6;
                    num=num+6
                    mass=data.slice(num2)
                    const h=mass.length
                    if(h==0){
                      alert("товаров больше нету")
                    }
                    console.log(mass)
                   mass.forEach(element=>{
                    const card = document.createElement("article");
                    card.classList.add('section1_cards_card')
                    const Delete = document.createElement("button");
                    card.innerHTML += `
                            <img loading="lazy" src="${element.image}" alt="${element.title}" width='auto' height='300px'>
                            <h3>${element.title}</h3>  
                            <p>price ${element.price}</p>
                            <p>rate ${element.rating.rate}</p>
                            <p>count ${element.rating.count}</p>
                    `;
                    Delete.textContent = "del";
                    Delete.classList.add("delete-btn");
                    Delete.addEventListener("click", () => {deletePriduct(element.id)
                      card.remove();
                    });
                
                    card.appendChild(Delete);
                    cards.appendChild(card);
                
                   })
                   
                  
                  })
                  .catch(error=>alert(error))
                
                }
               
                


                
men.addEventListener("click",()=>{ 
  
  down.removeEventListener("click",serverWomen);
  down.removeEventListener("click",server);
  down.removeEventListener("click",serverElectro)
  down.removeEventListener("click",serverLifestyle)
  

 down.addEventListener("click",serverMen)
  num=12;
  men.classList.add("on");
   home.classList.remove("on");
   women.classList.remove("on");
   electro.classList.remove("on");
   lifestyle.classList.remove("on");

  cards.innerHTML=""
  fetch("https://fakestoreapi.com/products/category/men's clothing?limit=6")
  .then(response=>{
    if (!response.ok) {throw new Error("Ошибка загрузки")}
   return response.json()})
  .then(data=>{
    console.log(data);
    
    diplayProduct(data)
  })
  .catch(error=>
    alert(error)
  )
})


function serverMen(){
  fetch(`https://fakestoreapi.com/products/category/men's clothing?limit=${num}`)
        .then(res=>{
          if (!res.ok){
            throw error}
           return  res.json()}
      )
        .then(data=>{
          console.log(data)
          console.log("ffff")
          let num2=num-6;
          num=num+6
          mass=data.slice(num2)
          const h=mass.length
          if(h==0){
            alert("товаров больше нету")
          }
          console.log(mass)
         mass.forEach(element=>{
          const card = document.createElement("article");
          card.classList.add('section1_cards_card')
          const Delete = document.createElement("button");
          card.innerHTML += `
                  <img loading="lazy" src="${element.image}" alt="${element.title}" width='auto' height='300px'>
                  <h3>${element.title}</h3>  
                  <p>price ${element.price}</p>
                  <p>rate ${element.rating.rate}</p>
                  <p>count ${element.rating.count}</p>
          `;
          Delete.textContent = "del";
          Delete.classList.add("delete-btn");
          Delete.addEventListener("click", () => {deletePriduct(element.id)
            card.remove();
          });
      
          card.appendChild(Delete);
          cards.appendChild(card);
      
         })
         
        
        })
        .catch(error=>alert(error))
      
      }



      
electro.addEventListener("click",()=>{

  down.removeEventListener("click",serverWomen);
  down.removeEventListener("click",server);
  down.removeEventListener("click",serverMen)
  down.removeEventListener("click",serverLifestyle)




  num=12
  electro.classList.add("on")
  home.classList.remove("on");
   women.classList.remove("on");
   men.classList.remove("on")
   lifestyle.classList.remove("on");
   cards.innerHTML=""
   fetch("https://fakestoreapi.com/products/category/electronics?limit=6")
   
   .then(response=>{
    if (!response.ok) {throw new Error("Ошибка загрузки")}
     return  response.json()})
   .then(data=>{
    console.log(data)
    diplayProduct(data)
   }).catch(error=>alert(error))

   down.addEventListener("click",serverElectro)
})



function serverElectro(){
  fetch(`https://fakestoreapi.com/products/category/electronics?limit=${num}`)
        .then(res=>{
          if (!res.ok){
            throw error}
           return  res.json()}
      )
        .then(data=>{
          console.log(data)
          console.log("ffff")
          let num2=num-6;
          num=num+6
          mass=data.slice(num2)
          const h=mass.length
          if(h==0){
            alert("товаров больше нету")
          }
          console.log(mass)
         mass.forEach(element=>{
          const card = document.createElement("article");
          card.classList.add('section1_cards_card')
          const Delete = document.createElement("button");
          card.innerHTML += `
                  <img loading="lazy" src="${element.image}" alt="${element.title}" width='auto' height='300px'>
                  <h3>${element.title}</h3>  
                  <p>price ${element.price}</p>
                  <p>rate ${element.rating.rate}</p>
                  <p>count ${element.rating.count}</p>
          `;
          Delete.textContent = "del";
          Delete.classList.add("delete-btn");
          Delete.addEventListener("click", () => {deletePriduct(element.id)
            card.remove();
          });
      
          card.appendChild(Delete);
          cards.appendChild(card);
      
         })
         
        
        })
        .catch(error=>alert(error))
      
      }





      lifestyle.addEventListener("click",()=>{

        down.removeEventListener("click",serverWomen);
        down.removeEventListener("click",server);
        down.removeEventListener("click",serverMen)
        down.removeEventListener("click",serverElectro)




        num=12
        electro.classList.remove("on")
        home.classList.remove("on");
         women.classList.remove("on");
         men.classList.remove("on")
         lifestyle.classList.add("on");
        fetch("https://fakestoreapi.com/products/category/jewelery?limit=6")
         .then(res=>{
         if (!res.ok) {throw new Error("Ошибка загрузки")}
          return res.json()})
         .then(data=>{
          console.log(data)
          cards.innerHTML=""
          diplayProduct(data)
         }).catch(error=>alert(error))

         down.addEventListener("click",serverLifestyle)
      })
      
 



      function serverLifestyle(){
        fetch(`https://fakestoreapi.com/products/category/jewelery?limit=${num}`)
              .then(res=>{
                if (!res.ok){
                  throw error}
                 return  res.json()}
            )
              .then(data=>{
                console.log(data)
                console.log("ffff")
                let num2=num-6;
                num=num+6
                mass=data.slice(num2)
                const h=mass.length
                if(h==0){
                  alert("товаров больше нету")
                }
                console.log(mass)
               mass.forEach(element=>{
                const card = document.createElement("article");
                card.classList.add('section1_cards_card')
                const Delete = document.createElement("button");
                card.innerHTML += `
                        <img loading="lazy" src="${element.image}" alt="${element.title}" width='auto' height='300px'>
                        <h3>${element.title}</h3>  
                        <p>price ${element.price}</p>
                        <p>rate ${element.rating.rate}</p>
                        <p>count ${element.rating.count}</p>
                `;
                Delete.textContent = "del";
                Delete.classList.add("delete-btn");
                Delete.addEventListener("click", () => {deletePriduct(element.id)
                  card.remove();
                });
            
                card.appendChild(Delete);
                cards.appendChild(card);
            
               })
               
              
              })
              .catch(error=>alert(error))
            
            }