/* Navigation shell for the local Three.js facilities explorer.
   All interiors are placeholders awaiting client images; no PDF drawings shown. */
(function(){
 const DATA=window.GA_FACILITIES,MODELS=window.GA_3D;
 if(!DATA||!MODELS)return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const buildingTargets=[['p1-production','Phase 1 · Production halls'],['p2-hatchery','Phase 2 · Hatchery'],['p2-broodstock','Phase 2 · Broodstock'],['visitor','Visitor centre'],['sea-cages','Offshore sea cages'],['utility','East utility hall'],['support','South support hall'],['services','Site services'],['pods','Research pods']];
 function mount(el,options){
  if(!el||el.dataset.gaFacilitiesMounted)return null;el.dataset.gaFacilitiesMounted='true';
  let viewer=null,current=null,selectedZone='',fallback=false;
  el.classList.add('ga-facilities','ga-facilities-v2');el.setAttribute('role','region');el.setAttribute('aria-label','Interactive 3D Gulf Aquaculture facilities');
  el.innerHTML=`<div class="ga-topline"><button class="ga-back" type="button" aria-label="Back to aerial masterplan" hidden><span aria-hidden="true">←</span><span>Aerial</span></button><div class="ga-breadcrumb" aria-live="polite">Coastal masterplan</div><span class="ga-concept-tag" hidden>concept</span><button class="ga-close" type="button" aria-label="Close facilities" ${options.standalone?'hidden':''}>×</button></div><div class="ga-viewport"><div class="ga-scene-stack"></div><div class="ga-float-label" aria-hidden="true"></div><div class="ga-loading" role="status"><span></span>Preparing 3D environment</div><div class="ga-placeholder-note" hidden>placeholder · awaiting client images</div><div class="ga-3d-help">drag to orbit · pinch / scroll to zoom</div><div class="ga-accessible-targets" aria-label="Buildings and zones"></div></div><div class="ga-footnote">Illustrative aerial composition · placeholder</div>`;
  const viewport=el.querySelector('.ga-viewport'),stack=el.querySelector('.ga-scene-stack'),targetsEl=el.querySelector('.ga-accessible-targets'),float=el.querySelector('.ga-float-label'),crumb=el.querySelector('.ga-breadcrumb'),back=el.querySelector('.ga-back'),concept=el.querySelector('.ga-concept-tag'),placeholder=el.querySelector('.ga-placeholder-note'),loading=el.querySelector('.ga-loading'),note=el.querySelector('.ga-footnote');
  function label(text,target){
   if(!text){float.classList.remove('is-visible');return;}float.textContent=text;float.classList.add('is-visible');
   if(target){const a=el.getBoundingClientRect(),r=target.getBoundingClientRect();float.style.left=Math.max(8,Math.min(el.clientWidth-160,r.left-a.left+r.width/2-65))+'px';float.style.top=Math.max(8,r.top-a.top-38)+'px';}
   else{float.style.left='50%';float.style.top='14px';float.style.transform='translateX(-50%)';}
  }
  function makeTarget(id,name,zone=false){const b=document.createElement('button');b.type='button';b.className=zone?'ga-zone-control':'ga-building-control';b.dataset[zone?'3dZone':'3dTarget']=id;b.textContent=name;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>zone?focusZone(id,name):openInterior(id));return b;}
  function staticSVG(interior){
   if(!interior)return `<svg viewBox="0 0 1000 650" role="img" aria-label="Static aerial masterplan"><defs><linearGradient id="sea" x2="0" y2="1"><stop stop-color="#174a5a"/><stop offset="1" stop-color="#388b8a"/></linearGradient></defs><rect width="1000" height="650" fill="url(#sea)"/><path d="M0 0H720L610 410 0 525Z" fill="#b5a17c"/><path d="M0 0H690L595 365 0 475Z" fill="#8c8b70"/><g fill="#f6f3e9" stroke="#b39257" stroke-width="4"><path d="M100 120h160v60H100zM290 105h150v72H290zM460 90h100v100H460zM480 225h110v85H480zM100 245h165v60H100z"/><ellipse cx="260" cy="340" rx="65" ry="35"/></g><path d="M65 330h520" stroke="#0b2e3f" stroke-width="15"/><g fill="none" stroke="#e5b35d" stroke-width="12"><ellipse cx="760" cy="440" rx="80" ry="54"/><ellipse cx="865" cy="540" rx="72" ry="49"/><ellipse cx="690" cy="565" rx="68" ry="46"/></g></svg>`;
   return `<svg viewBox="0 0 1000 650" role="img" aria-label="Static placeholder interior"><rect width="1000" height="650" fill="#0b2e3f"/><path d="M80 80H920V590H80Z" fill="#233e48" stroke="#b39257" stroke-width="4"/>${interior.zones.map((z,i)=>{const x=120+(i%3)*260,y=130+Math.floor(i/3)*220;return `<g><rect x="${x}" y="${y}" width="220" height="170" rx="8" fill="#173440" stroke="#b39257"/><g fill="none" stroke="#388b8a" stroke-width="13"><circle cx="${x+65}" cy="${y+75}" r="36"/><circle cx="${x+155}" cy="${y+75}" r="36"/></g><text x="${x+110}" y="${y+145}" text-anchor="middle" fill="#fff" font-size="15" font-family="sans-serif">${esc(z.name)}</text></g>`}).join('')}</svg>`;
  }
  function showStatic(interior){
   fallback=true;el.classList.add('ga-is-static');if(viewer){viewer.dispose();viewer=null;}stack.innerHTML=`<div class="ga-static-fallback${interior?' ga-interior':''}"${interior?` data-interior="${current}"`:''}>${staticSVG(interior)}</div>`;loading.hidden=true;
  }
  function buildTargets(interior){
   targetsEl.innerHTML='';const list=interior?interior.zones.map(z=>[z.id,z.name,true]):buildingTargets;
   list.forEach(([id,name,zone])=>targetsEl.appendChild(makeTarget(id,name,!!zone)));
  }
  function setup(interior){
   fallback=false;el.classList.remove('ga-is-static');if(viewer){viewer.dispose();viewer=null;}loading.hidden=false;stack.innerHTML='<div class="ga-3d-mount"></div>';if(interior){stack.dataset.interior=interior.title;stack.firstElementChild.classList.add('ga-interior');stack.firstElementChild.setAttribute('data-interior',current);}buildTargets(interior);
   if(!window.GA3DViewer||!window.THREE){showStatic(interior);return;}
   viewer=new GA3DViewer(stack.querySelector('.ga-3d-mount'),{
    onSelect:openInterior,
    onZone:(id,name)=>{selectedZone=id;targetsEl.querySelectorAll('[data-3d-zone]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset['3dZone']===id)));label(name);},
    onError:()=>showStatic(interior)
   });
   if(viewer.failed){showStatic(interior);return;}
   el.gaViewer=viewer;
   if(interior)viewer.interior(interior);else viewer.masterplan();loading.hidden=true;
  }
  function openInterior(id){
   const item=MODELS.interiors[id];if(!item)return;
   if(fallback){current=id;el.dataset.scene=id;crumb.textContent='Masterplan / '+item.title;back.hidden=false;concept.hidden=!item.concept;placeholder.hidden=false;note.textContent='Static placeholder · awaiting client images';buildTargets(item);showStatic(item);return;}current=id;selectedZone='';el.dataset.scene=id;crumb.textContent='Masterplan / '+item.title;back.hidden=false;concept.hidden=!item.concept;placeholder.hidden=false;note.textContent=item.concept?'Illustrative concept · layout to be confirmed':'Plan-inspired 3D placeholder · not an as-built model';label('');stack.dataset.interior=id;
   stack.firstElementChild.classList.add('ga-interior');stack.firstElementChild.setAttribute('data-interior',id);
   stack.firstElementChild.dataset.interior=id;
   setup(item);
   el.dispatchEvent(new CustomEvent('ga:interior',{detail:{id,concept:!!item.concept,placeholder:true}}));
  }
  function showMasterplan(){current=null;selectedZone='';el.dataset.scene='masterplan';stack.dataset['3dScene']='masterplan';crumb.textContent='Coastal masterplan';back.hidden=true;concept.hidden=true;placeholder.hidden=true;note.textContent='Illustrative aerial composition · placeholder';label('');setup(null);}
  function focusZone(id,name){if(fallback){selectedZone=id;targetsEl.querySelectorAll('[data-3d-zone]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset['3dZone']===id)));label(name);return;}viewer?.focusZone(id);selectedZone=id;targetsEl.querySelectorAll('[data-3d-zone]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset['3dZone']===id)));label(name);}
  back.addEventListener('click',showMasterplan);el.querySelector('.ga-close').addEventListener('click',()=>options.onClose?.());
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&el.isConnected&&current)showMasterplan();});
  showMasterplan();
  return {showScene:showMasterplan,open:openInterior,back:showMasterplan,get viewer(){return viewer;}};
 }
 window.GAFacilities={mount,data:DATA,models:MODELS};
 document.querySelectorAll('[data-ga-facilities]').forEach(el=>mount(el,{standalone:true,scene:el.dataset.scene}));
})();
