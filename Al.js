const lordData= async(isSeeAll)=>{
    const res=await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const dataAll=await res.json();
 const data=dataAll.data;
 const tools=data.tools


    displayData(tools,isSeeAll);
}

const displayData=(tools,isSeeAll)=>{
   if(!isSeeAll){
     tools=tools.slice(0,6);
   }


   const seeMoreBtn=document.getElementById('see-more-btn');
    if(tools.length>6){
seeMoreBtn.classList.remove('hidden');
    }
    else{
       seeMoreBtn.classList.remove('hidden'); 
    }

    const aiCardContainer=document.getElementById('ai-card-container');
    aiCardContainer.innerHTML='';

   tools.forEach(tool => {
  
    const imageDefult='chatgpt_assistente 1.png';
    const aiCard=document.createElement('div');
    aiCard.classList='card border p-4 m-4';
    aiCard.innerHTML=` <figure class="rounded-md"><img src="${tool?.image || imageDefult }" alt="Shoes" /></figure>
                <div class="my-3 mx-1">
                    <h2 class="card-title text-xl font-bold my-2">Features</h2>
                    <p class="text-gray-500 text-sm">1. ${tool.features[0]}</p>
                    <p class="text-gray-500 text-sm">2. ${tool.features[1]}</p>
                    <p class="text-gray-500 text-sm">3. ${tool.features[2]}</p>
                    <hr class="border mt-3 text-black">
                    <div class="card-actions justify-between items-center">
                       <div>
                        <h4 class="text-xl my-4 font-bold">${tool.name}</h4>
                <i class="fa-solid fa-calendar-days"></i> <span class="text-sm font-medium">${tool.published_in}</span>
                       </div>
                        <button onclick="handelShowDetails('${tool.id}'),show_ai_details.showModal()"  class="bg-red-100 btn rounded-full"><i class="fa-solid fa-arrow-right text-red-400"></i></button>
                    </div>
                </div>`;

                aiCardContainer.appendChild(aiCard)
   });
}

const handelSeeMore=()=>{
    lordData(true)
    // displayData(true)
}


const handelShowDetails=async(id)=>{
const res=await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
const datas=await res.json()
const toolsDetails=datas.data
showDetailsAi(toolsDetails)
}

const showDetailsAi=(toolsDetails)=>{
    
    // console.log(toolsDetails)
    const aiDetailsContainer=document.getElementById('ai-details-container')
const a=1

    aiDetailsContainer.innerHTML=`
    <div class="border p-6 pb-12 rounded-xl border-red-400 bg-red-50">
    <h2 class="font-bold text-xl">${toolsDetails.description}</h2>
    <div class="flex gap-3 m-4 justify-end items-center">
    <div class="p-4 text-center rounded-xl bg-white"><span class="text-green-600 font-bold">${toolsDetails.pricing[0].price}</span> <br> <span class="text-green-600 font-bold">${toolsDetails.pricing[0].plan}</span></div>
<div class="p-4 text-center rounded-xl bg-white"><span class="text-yellow-600 font-bold">${toolsDetails.pricing[1].price}</span> <br> <span class="text-yellow-600 font-bold">${toolsDetails.pricing[1].plan}</span></div>
        <div class="p-4 text-center rounded-xl bg-white"><span class="text-red-500 font-bold">${toolsDetails.pricing[2].price}</span> <br> <span class="text-red-500 font-bold">${toolsDetails.pricing[2].plan}</span></div>
    </div>
   <div class="flex justify-around">
<div>
<h2 class="text-xl font-bold mb-2 ">Features</h2>
 <li class="text-sm my-1 text-gray-600">${toolsDetails.features['1'].feature_name}</li>
 <li class="text-sm my-1 text-gray-600">${toolsDetails.features['2'].feature_name}</li>
 <li class="text-sm my-1 text-gray-600">${toolsDetails.features['3'].feature_name}</li>
</div>
<div>
<h2 class="text-xl font-bold mb-2 ">Integrations</h2>
 <li class="text-sm my-1 text-gray-600">${toolsDetails.integrations[0]}</li>
 <li class="text-sm my-1 text-gray-600">${toolsDetails.integrations[1]}</li>
 <li class="text-sm my-1 text-gray-600">${toolsDetails.integrations[2]}</li>
</div>
   </div>
   </div>

   <div>
<figure class="w-[400px]"><img class="rounded" src="${toolsDetails.image_link[0]}"></figure>
<h2 class="font-bold text-xl text-center my-2">${toolsDetails.input_output_examples[0].input}</h2>
<p>${toolsDetails.input_output_examples[0].output}</p>

</div>
    `;

   show_ai_details.showModal()
}

lordData()


