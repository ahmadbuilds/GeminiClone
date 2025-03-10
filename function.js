import { GoogleGenerativeAI } from "@google/generative-ai";
let moon=document.getElementById('moon');
let sun=document.getElementById('sun');
let question=document.querySelectorAll('.question-container-1')
let icons=document.querySelectorAll('.icons');
let input_bar=document.getElementsByClassName('input-bar')[0];
let count_Message=0;
let is_Generating=false;
const API_KEY="";
sun.addEventListener('click',()=>myfunction(1));
moon.addEventListener('click',()=>myfunction(2));
// basic styling of home screen
// toggling between light and dark mode
function myfunction(sw)
{
    if(sw===1)
    {
        document.body.style.backgroundColor='white';
        document.body.style.color='Black';
        sun.style.display='none';
        moon.style.display='block';
        moon.style.backgroundColor='lightgray';
        question.forEach((value,index)=>{
            value.style.backgroundColor='lightgray';
            value.style.color='black';
            value.addEventListener('mouseover', () => {
                value.style.backgroundColor = 'gray';
            });
            value.addEventListener('mouseout', () => {
                value.style.backgroundColor = 'lightgray';
            });
        });
        
        icons.forEach((value,index)=>{
            value.style.color='black';
            value.style.backgroundColor='white';
        });
        input_bar.style.backgroundColor='lightgray';
        document.getElementById('pro').style.backgroundColor='lightgray';
        document.getElementById('pro').style.color='black';
    }
    else{
        document.body.style.backgroundColor='black';
        document.body.style.color='white';
        sun.style.display='block';
        moon.style.display='none';
        question.forEach((value,index)=>{
            value.style.backgroundColor='rgb(53, 52, 52)';
            value.style.color='white';
            value.addEventListener('mouseover',()=>{
                value.style.backgroundColor='rgb(109, 106, 106)';
            });
            value.addEventListener('mouseout',()=>{
                value.style.backgroundColor='rgb(53, 52, 52)';
            });
        });
        icons.forEach((value,index)=>{
            value.style.color='white';
            value.style.backgroundColor='black';
        });
        
        input_bar.style.backgroundColor='rgb(53, 52, 52)';
        document.getElementById('pro').style.backgroundColor='rgb(53, 52, 52)';
        document.getElementById('pro').style.color='white';
    }
}
document.getElementById('pro').addEventListener('input',()=>{
    const value=document.getElementById('pro').value.trim();
    if(value==="")
    {
        document.getElementById('pro2').style.visibility='none';
        document.getElementById('pro2').style.opacity='0';
        document.getElementById('pro2').style.transitionProperty='opacity,visibility';
        document.getElementById('pro2').style.transitionDuration='0.4s';
        document.getElementById('pro2').style.transitionTimingFunction='ease-in-out';
        document.getElementById('pro2').style.display='none';
    }
    else{
        document.getElementById('pro2').style.display='block';
        document.getElementById('pro2').style.opacity='1';
        document.getElementById('pro2').style.visibility='visible';
        document.getElementById('pro2').style.transitionProperty='opacity,visibility';
        document.getElementById('pro2').style.transitionDuration='0.4s';
        document.getElementById('pro2').style.transitionTimingFunction='ease-in-out';
    }
});

document.getElementById('pro2').addEventListener('click',async()=>{
    if(is_Generating==false)
    {
        is_Generating=true;
        let container=document.getElementsByClassName('container1')[0];
    let container_hide=document.getElementsByClassName('container')[0];


    container_hide.style.display='none';
    



    const prompt=document.getElementById('pro').value;
    document.getElementById('pro').value='';
    //html code for responsive chat
     let messageContainer = document.createElement('div');
     messageContainer.classList.add('incoming-message');
     messageContainer.innerHTML = `
         <div class="incoming-message-user">
           <img src="/Google Gemini/Assets/profile.png" alt="picture of human" />
           <p id="user-prompt">${prompt}</p>
         </div>
         <div class="incoming-message-api">
           <img src="/Google Gemini/Assets/gemini.svg" alt="picture of Api" />
           <p class="api-prompt"></p>
         </div>`;
    
    container.insertBefore(messageContainer,input_bar);
    
    //getting the response from the API
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    try {
        const result = await model.generateContent(prompt);
        const apiPromptElement = document.getElementsByClassName('api-prompt')[count_Message];
        apiPromptElement.innerHTML = `<pre><code class='animation'></code>
        <code class='animation1'></code></pre>`;
    
        const codeContainer = document.getElementsByClassName('animation')[count_Message];
        const codeContainer1 = document.getElementsByClassName('animation1')[count_Message];
        const responseText = await result.response.text();
        const lines = responseText.split('\n');
    
        let isCodeBlock = false;
        let index = 0;
    
        const interval = setInterval(() => {
            if (index < lines.length) {
                const line = lines[index];
    
                if (line.startsWith("```")) {
                    isCodeBlock = !isCodeBlock;
                    index++; 
                    return;
                }
    
                if (isCodeBlock) {
                    const codeLine = document.createElement("span");
                    codeLine.textContent = line + '\n';
                    codeContainer.appendChild(codeLine);
                    codeContainer.classList.add("code-block");
                } else {
                    
                    const textLine = document.createElement("span");
                    textLine.textContent = line + '\n';
                    textLine.classList.add('text-animation');
                    codeContainer1.appendChild(textLine); 
                }
                
                index++;
            } else {
                clearInterval(interval); 
    
                
                if (codeContainer.classList.contains("code-block")) {
                    hljs.highlightElement(codeContainer);
                }
            }
        }, 100);
    } catch (error) {
        console.error("Error Fetching the API:", error);
    }
    count_Message++;
    is_Generating=false;
    }
    else{
        console.log("Please wait while the previous question is being answered");
    }
});
//suggestions
let containers=document.querySelectorAll('.question-container-1');
containers[0].addEventListener('click',()=>{
    document.getElementById('pro').value='Give tips on helping kids finish their homework on time.';
    //manually calling the event listener because the sent button don't show
    const input1=document.getElementById('pro');
    const event=new Event('input',{
        cancelable:true,
        bubbles:true
    });
    input1.dispatchEvent(event);
});
containers[1].addEventListener('click',()=>{
    document.getElementById('pro').value='Help me write an out-of-office email';
    //manually calling the event listener because the sent button don't show
    const input1=document.getElementById('pro');
    const event=new Event('input',{
        cancelable:true,
        bubbles:true
    });
    input1.dispatchEvent(event);
});
containers[2].addEventListener('click',()=>{
    document.getElementById('pro').value='Give me Phrases to Learn a new Language.';
    //manually calling the event listener because the sent button don't show
    const input1=document.getElementById('pro');
    const event=new Event('input',{
        cancelable:true,
        bubbles:true
    });
    input1.dispatchEvent(event);
});
containers[3].addEventListener('click',()=>{
    document.getElementById('pro').value='Show me how to build something by hand.';
    //manually calling the event listener because the sent button don't show
    const input1=document.getElementById('pro');
    const event=new Event('input',{
        cancelable:true,
        bubbles:true
    });
    input1.dispatchEvent(event);
});
