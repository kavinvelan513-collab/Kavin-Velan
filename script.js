// Change only this line when you want a different birthday name.
const birthdayName = "HANCY KEVITA";

const demo = document.getElementById("demo");
const flower = document.getElementById("pullFlower");
const again = document.getElementById("again");
const blossoms = document.getElementById("blossoms");

let dragging = false;
let startY = 0;
let distance = 0;

function makeBlossoms(){
  blossoms.innerHTML = "";
  const points = [
    // top / upper branches
    [135,32],[74,57],[190,54],[39,91],[222,89],
    [102,91],[156,78],[244,125],
    // middle branches
    [55,130],[108,128],[173,119],[214,151],[26,166],
    [91,163],[146,155],[238,181],
    // lower branches
    [55,205],[105,198],[166,193],[218,213],
    [84,239],[144,235]
  ];
  points.forEach(([x,y],i)=>{
    const el=document.createElement("i");
    el.className="flower-dot";
    el.style.left=x+"px";
    el.style.top=y+"px";
    el.style.setProperty("--r", ((i%5)-2)*3 + "deg");
    el.style.animationDelay=(i*35)+"ms";
    blossoms.appendChild(el);
  });
}

makeBlossoms();

function down(e){
  if(demo.classList.contains("done")) return;
  dragging=true;
  startY=e.clientY;
  flower.setPointerCapture?.(e.pointerId);
}
function move(e){
  if(!dragging) return;
  distance=Math.max(0,Math.min(125,e.clientY-startY));
  flower.style.transform=`translateY(${distance}px) rotate(${distance*.015}deg)`;
}
function up(){
  if(!dragging) return;
  dragging=false;
  if(distance>45){
    // Name is stored separately so only the name needs changing later.
    document.querySelector(".wish").textContent="Happy Birthday, "+birthdayName;
    demo.classList.add("done");
  }else{
    flower.style.transform="";
  }
  distance=0;
}
flower.addEventListener("pointerdown",down);
flower.addEventListener("pointermove",move);
flower.addEventListener("pointerup",up);
flower.addEventListener("pointercancel",up);

again.addEventListener("click",()=>{
  demo.classList.remove("done");
  flower.style.transform="";
});
