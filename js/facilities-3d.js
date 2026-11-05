/* Low-poly placeholder 3D environments. No client photography or as-built claims.
   Three.js r160 is bundled locally. All measurements are relative visual units. */
(function(){
 const mobile=()=>matchMedia('(max-width:600px)').matches;
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 class Viewer{
  constructor(host,options){
   this.host=host;this.options=options;this.disposed=false;this.targets=new Map();this.zones=[];this.water=[];this.raf=0;
   this.onSelect=options.onSelect;this.onZone=options.onZone;this.onError=options.onError;this.clock=new THREE.Clock();this.lastRender=0;
   try{
    this.renderer=new THREE.WebGLRenderer({antialias:!mobile(),alpha:false,powerPreference:'low-power',preserveDrawingBuffer:false});
   }catch(e){this.failed=true;options.onError?.(e);return;}
   const r=this.renderer;r.setPixelRatio(Math.min(devicePixelRatio||1,mobile()?1.25:1.5));r.setSize(host.clientWidth,host.clientHeight,false);
   r.outputColorSpace=THREE.SRGBColorSpace;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.05;
   const c=r.domElement;c.className='ga-3d-canvas';c.dataset.touchAction='none';c.setAttribute('aria-label','Interactive 3D facilities: drag to orbit, pinch or scroll to zoom');c.setAttribute('role','img');
   c.style.touchAction='none';host.prepend(c);
   this.scene=new THREE.Scene();this.scene.background=new THREE.Color(0x071820);this.scene.fog=new THREE.FogExp2(0x071820,.012);
   this.camera=new THREE.PerspectiveCamera(43,Math.max(1,host.clientWidth)/Math.max(1,host.clientHeight),.1,500);
   this.ray=new THREE.Raycaster();this.pointer=new THREE.Vector2();this.theta=.55;this.phi=.76;this.radius=105;this.goal={theta:.55,phi:.76,radius:105};this.target=new THREE.Vector3();this.goalTarget=new THREE.Vector3();
   this.scene.add(new THREE.HemisphereLight(0xc4e8ec,0x13252c,2.2));const sun=new THREE.DirectionalLight(0xffe1ad,3.1);sun.position.set(-35,65,35);this.scene.add(sun);
   const fill=new THREE.DirectionalLight(0x388b8a,1.6);fill.position.set(45,25,-35);this.scene.add(fill);
   this.materials();this.input();this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(host);
   c.addEventListener('webglcontextlost',e=>{e.preventDefault();this.failed=true;cancelAnimationFrame(this.raf);options.onError?.(new Error('WebGL context lost'));});
   this.animate();
  }
  materials(){
   const std=(color,rough=.65,metal=.05)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});
   this.m={sand:std(0xbda77f),land:std(0x9e9471),white:std(0xf5f3e9,.42),roof:std(0xf0eee4,.38),petrol:std(0x0b2e3f,.52,.18),gold:std(0xb39257,.36,.55),ochre:std(0xe59b38,.4,.25),teal:std(0x388b8a,.4,.18),glass:std(0x173d4c,.15,.25),dark:std(0x112b34),walk:std(0x667477,.75,.15),plant:std(0x416b55),line:std(0xb39257,.45,.35)};
  }
  mesh(geo,mat,x=0,y=0,z=0){const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);this.world.add(o);return o;}
  box(w,h,d,mat,x=0,y=h/2,z=0){return this.mesh(new THREE.BoxGeometry(w,h,d),mat,x,y,z)}
  cylinder(rt,rb,h,seg,mat,x=0,y=h/2,z=0){return this.mesh(new THREE.CylinderGeometry(rt,rb,h,seg),mat,x,y,z)}
  waterMaterial(){const m=new THREE.ShaderMaterial({transparent:true,uniforms:{uTime:{value:0},uColor:{value:new THREE.Color(0x287d89)}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform float uTime;uniform vec3 uColor;varying vec2 vUv;void main(){float w=sin(vUv.x*38.+uTime*1.3)*sin(vUv.y*34.-uTime)*.055;vec3 c=uColor+vec3(w*.5,w,w*1.3);gl_FragColor=vec4(c,.92);}'});this.water.push(m);return m;}
  waterPlane(w,d,x,y,z){return this.mesh(new THREE.PlaneGeometry(w,d),this.waterMaterial(),x,y,z).rotateX(-Math.PI/2)}
  labelTarget(o,id,name,zone=false){o.userData.target=id;o.userData.name=name;o.userData.zone=zone;this.targets.set(id,{object:o,name,zone});return o;}
  clear(){
   cancelAnimationFrame(this.raf);if(this.world){if(this.world)this.scene.remove(this.world);this.world?.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material&&o.material.isShaderMaterial)o.material.dispose();});}
   this.world=new THREE.Group();this.scene?.add(this.world);this.targets.clear();this.zones=[];this.water=[];
  }
  masterplan(){
   this.clear();this.scene.fog.density=.005;this.camera.fov=43;this.camera.updateProjectionMatrix();
   this.waterPlane(260,210,0,-.8,0);
   // Continuous coastline and an offshore establishing composition.
   this.box(145,1.5,94,this.m.sand,-28,0,-14);this.box(135,.45,82,this.m.land,-28,1,-14);
   this.box(145,.2,7,this.m.white,-28,1.35,29);
   const road=this.m.dark;this.box(119,.12,4,road,-24,1.6,13);this.box(4,.12,68,road,3,1.6,-10);
   for(let x=-74;x<35;x+=10)this.box(5,.04,.18,this.m.white,x,1.68,13);
   // Phase 1 halls on the western campus.
   [[-51,-19,20,9],[-51,-5,20,8],[-29,-19,16,9],[-28,-5,15,8],[-9,-18,12,8],[-8,-3,12,8]].forEach((b,i)=>this.hall(b[0],b[1],b[2],b[3],i<3?'p1-production':['utility','support','services'][i-3],i<3?'Phase 1 · Production halls':['East utility hall','South support hall','Site services'][i-3]));
   // Phase 2 hatchery and broodstock east of the main road.
   this.hall(18,-18,15,19,'p2-hatchery','Phase 2 · Hatchery');this.hall(34,-18,12,19,'p2-broodstock','Phase 2 · Broodstock');
   for(let i=0;i<3;i++)this.hall(16+i*7,1,5,6,'pods','Research pods');
   // White visitor dome, with a gold-ringed drum and a low ribbed shell.
   const domeGroup=new THREE.Group();domeGroup.position.set(-43,1.6,23);this.world.add(domeGroup);
   const drum=new THREE.Mesh(new THREE.CylinderGeometry(9,10,2.7,32),this.m.white);drum.position.y=1.35;domeGroup.add(drum);
   const dome=new THREE.Mesh(new THREE.SphereGeometry(9,32,12,0,Math.PI*2,0,Math.PI/2),this.m.roof);dome.scale.y=.38;dome.position.y=2.6;domeGroup.add(dome);this.labelTarget(dome,'visitor','Visitor centre');
   for(let i=0;i<12;i++){const a=i*Math.PI/6;const rib=new THREE.Mesh(new THREE.TorusGeometry(9,.055,4,24,Math.PI),this.m.gold);rib.rotation.set(0,a,Math.PI/2);rib.scale.y=.38;rib.position.y=2.65;domeGroup.add(rib);}
   // Sparse landscaping, roads and small service quay.
   for(let i=0;i<28;i++){const x=-75+(i*23)%112,z=-42+(i*17)%63;if(Math.abs(z-13)<5)continue;const trunk=this.cylinder(.14,.2,2.3,6,this.m.gold,x,2.7,z);const crown=this.mesh(new THREE.ConeGeometry(1.8,1.2,7),this.m.plant,x,4.2,z);crown.rotation.y=i;}
   this.box(19,.7,7,this.m.walk,46,.1,21);this.box(2,.45,20,this.m.walk,51,.1,30);
   // Offshore sea-cage circles, all clearly visible with the dome in the establishing shot.
   [[42,43,9],[61,47,8],[51,63,8]].forEach((p,i)=>{
    const cage=new THREE.Group();cage.position.set(p[0],0,p[1]);this.world.add(cage);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(p[2],.55,7,40),this.m.gold);ring.rotation.x=Math.PI/2;ring.position.y=.2;cage.add(ring);
    const inner=new THREE.Mesh(new THREE.TorusGeometry(p[2]-.9,.12,5,32),this.m.white);inner.rotation.x=Math.PI/2;inner.position.y=-.05;cage.add(inner);
    const net=new THREE.Mesh(new THREE.CylinderGeometry(p[2]-.5,p[2]-.5,2,32,1,true),new THREE.MeshStandardMaterial({color:0x153e4b,transparent:true,opacity:.26,side:THREE.DoubleSide,wireframe:true}));net.position.y=-.8;cage.add(net);this.labelTarget(ring,'sea-cages','Offshore sea cages');
   });
   [['visitor',-43,12,23],['p1-production',-39,10,-11],['p2-hatchery',18,10,-18],['p2-broodstock',34,10,-18],['sea-cages',51,3,47]].forEach(([id,x,y,z])=>{
    const stem=this.cylinder(.1,.1,4,6,this.m.gold,x,y-2,z);this.labelTarget(stem,id,this.targets.get(id)?.name||id);
    const marker=this.mesh(new THREE.SphereGeometry(.9,10,8),this.m.gold,x,y,z);this.labelTarget(marker,id,this.targets.get(id)?.name||id);
   });
   this.theta=mobile()?.05:.05;this.phi=mobile()?.12:.58;this.radius=mobile()?310:139;this.goal={theta:this.theta,phi:this.phi,radius:this.radius};this.target.set(mobile()?5:-4,0,mobile()?12:7);this.goalTarget.copy(this.target);this.snapCamera();this.updateCamera(1);this.renderer.render(this.scene,this.camera);
  }
  hall(x,z,w,d,id,name){
   this.box(w,4,d,this.m.white,x,3.5,z);const roof=this.box(w+.45,.45,d+.45,this.m.roof,x,5.7,z);this.labelTarget(roof,id,name);
   this.box(w+.7,.16,.24,this.m.gold,x,5.95,z-d/2);for(let a=-w/2+1;a<w/2;a+=3)this.box(.12,.14,d+.5,this.m.walk,x+a,5.98,z);
  }
  interior(item){
   this.clear();this.item=item;this.scene.fog.density=mobile()?.011:.008;this.camera.fov=mobile()?52:45;this.camera.updateProjectionMatrix();
   const w=item.w,d=item.d;
   this.box(w,.5,d,this.m.petrol,0,-.25,0);this.box(w-1,.08,d-1,this.m.walk,0,.06,0);
   // Open-roof architectural shell for readable, camera-friendly interiors.
   this.box(w,1.5,.3,this.m.white,0,.75,-d/2);this.box(.3,1.5,d,this.m.white,-w/2,.75,0);this.box(.3,1.5,d,this.m.white,w/2,.75,0);
   this.box(w,.16,1.2,this.m.gold,0,.18,d/2-1);
   item.zones.forEach(zone=>this.buildZone(zone));this.pipework(item);
   this.zones=item.zones;
   this.theta=.62;this.phi=.67;this.radius=Math.max(w,d)*(mobile()?1.72:1.48);this.goal={theta:this.theta,phi:this.phi,radius:this.radius};this.target.set(0,1,0);this.goalTarget.copy(this.target);this.snapCamera();
   // Smooth establishing fly-in, without blocking immediate selection.
   if(!matchMedia('(prefers-reduced-motion: reduce)').matches){this.radius*=1.15;this.phi=.84;}
   this.renderer.render(this.scene,this.camera);
  }
  zoneBase(zone){
   this.box(zone.w,.16,zone.d,this.m.petrol,zone.x,.16,zone.z);
   const rim=this.box(zone.w+.15,.15,.18,this.m.gold,zone.x,.35,zone.z-zone.d/2);this.labelTarget(rim,zone.id,zone.name,true);
   this.box(zone.w+.15,.15,.18,this.m.gold,zone.x,.35,zone.z+zone.d/2);
   const proxy=this.box(zone.w,.06,zone.d,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),zone.x,.35,zone.z);this.labelTarget(proxy,zone.id,zone.name,true);
   const plate=this.box(Math.min(zone.w*.8,9),.8,.22,this.m.petrol,zone.x,.75,zone.z-zone.d/2+.35);this.labelTarget(plate,zone.id,zone.name,true);
  }
  buildZone(zone){
   this.zoneBase(zone);
   if(['tanks','rectTanks'].includes(zone.kind)){
    const cols=Math.ceil(Math.sqrt(zone.count*zone.w/zone.d)),rows=Math.ceil(zone.count/cols);let n=0;
    for(let r=0;r<rows;r++)for(let c=0;c<cols&&n<zone.count;c++,n++){
     const x=zone.x-zone.w*.34+c*(zone.w*.68/Math.max(1,cols-1)),z=zone.z-zone.d*.34+r*(zone.d*.68/Math.max(1,rows-1));
     const radius=Math.min(zone.w/cols,zone.d/rows)*.31;
     if(zone.kind==='rectTanks'){
      const t=this.box(radius*1.5,1.5,radius*3.4,this.m.white,x,1.05,z);this.labelTarget(t,zone.id,zone.name,true);
      this.box(radius*1.32,.06,radius*3.12,this.m.teal,x,1.83,z);
     }else{const t=this.cylinder(radius,radius,1.7,20,this.m.white,x,1.15,z);this.labelTarget(t,zone.id,zone.name,true);this.cylinder(radius*.88,radius*.88,.055,20,this.waterMaterial(),x,2.03,z);}
     const pipe=this.cylinder(.1,.1,2.1,8,this.m.gold,x+radius+.22,1.05,z);this.labelTarget(pipe,zone.id,zone.name,true);
    }
   }else if(zone.kind==='sea'){
    for(let i=0;i<3;i++){const x=zone.x-9+i*9;const ring=this.mesh(new THREE.TorusGeometry(4,.28,6,32),this.m.gold,x,.4,zone.z);ring.rotation.x=Math.PI/2;this.labelTarget(ring,zone.id,zone.name,true);this.cylinder(3.7,3.7,.04,28,this.waterMaterial(),x,.15,zone.z);}
   }else if(zone.kind==='plant'){
    for(let i=0;i<4;i++){const x=zone.x-zone.w*.3+(i%2)*zone.w*.55,z=zone.z-zone.d*.25+Math.floor(i/2)*zone.d*.48;const t=this.cylinder(1.5,1.5,3.5,16,this.m.teal,x,2,z);this.labelTarget(t,zone.id,zone.name,true);this.mesh(new THREE.TorusGeometry(1.52,.08,5,20),this.m.gold,x,2.5,z).rotation.x=Math.PI/2;}
   }else{
    const rows=zone.kind==='gallery'?3:2;
    for(let i=0;i<rows;i++){const desk=this.box(zone.w*.6,.8,1.4,this.m.white,zone.x,.75,zone.z-zone.d*.25+i*4);this.labelTarget(desk,zone.id,zone.name,true);this.box(zone.w*.52,.08,.6,this.m.gold,zone.x,1.2,zone.z-zone.d*.25+i*4);}
    if(zone.kind==='control')for(let i=0;i<3;i++)this.box(1.4,1.05,.16,this.m.glass,zone.x-2+i*2,2,zone.z-zone.d*.28);
   }
  }
  pipework(item){
   for(let x=-item.w/2+3;x<item.w/2;x+=10){this.cylinder(.11,.11,item.d-3,8,this.m.gold,x,.45,0).rotation.x=Math.PI/2;}
   this.box(item.w-3,.18,1.4,this.m.walk,0,.55,0);this.box(item.w-3,.08,.12,this.m.gold,0,1.05,-.7);this.box(item.w-3,.08,.12,this.m.gold,0,1.05,.7);
  }
  focusZone(id){
   const zone=this.item?.zones.find(z=>z.id===id);if(!zone)return;
   this.goalTarget.set(zone.x,1.4,zone.z);this.goal.radius=Math.max(zone.w,zone.d)*(mobile()?2.05:1.7)+10;this.goal.theta=.56;this.goal.phi=.76;
  }
  snapCamera(){this.goal={theta:this.theta,phi:this.phi,radius:this.radius};this.updateCamera(1)}
  renderNow(){if(this.disposed||this.failed)return;this.updateCamera(.18);this.renderer.render(this.scene,this.camera)}
  updateCamera(k){this.theta+=(this.goal.theta-this.theta)*k;this.phi+=(this.goal.phi-this.phi)*k;this.radius+=(this.goal.radius-this.radius)*k;this.target.lerp(this.goalTarget,k);const s=Math.sin(this.phi);this.camera.position.set(this.target.x+this.radius*s*Math.sin(this.theta),this.target.y+this.radius*Math.cos(this.phi),this.target.z+this.radius*s*Math.cos(this.theta));this.camera.lookAt(this.target)}
  resize(){if(this.disposed||this.failed)return;const w=this.host.clientWidth,h=this.host.clientHeight;if(!w||!h)return;this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.renderer.setSize(w,h,false)}
  pick(e){const r=this.renderer.domElement.getBoundingClientRect();this.pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);this.ray.setFromCamera(this.pointer,this.camera);const hits=this.ray.intersectObjects(this.world.children,true);const hit=hits.find(h=>h.object.userData.target);if(hit){const t=hit.object.userData;if(t.zone){this.focusZone(t.target);this.onZone?.(t.target,t.name);}else this.onSelect?.(t.target,t.name);}}
  input(){
   const c=this.renderer.domElement,pointers=new Map();let moved=0,lastX=0,lastY=0,pinch=0;
   c.addEventListener('pointerdown',e=>{c.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});lastX=e.clientX;lastY=e.clientY;moved=0;if(pointers.size===2){const a=[...pointers.values()];pinch=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);}});
   c.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const a=[...pointers.values()],dist=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(pinch)this.goal.radius=clamp(this.goal.radius*pinch/Math.max(20,dist),20,230);pinch=dist;moved=10;this.renderNow();}else{const dx=e.clientX-lastX,dy=e.clientY-lastY;moved+=Math.abs(dx)+Math.abs(dy);this.goal.theta-=dx*.006;this.goal.phi=clamp(this.goal.phi-dy*.005,.28,1.32);lastX=e.clientX;lastY=e.clientY;this.renderNow();}});
   const end=e=>{if(pointers.has(e.pointerId)&&moved<7&&pointers.size===1)this.pick(e);pointers.delete(e.pointerId);pinch=0;};c.addEventListener('pointerup',end);c.addEventListener('pointercancel',e=>pointers.delete(e.pointerId));
   c.addEventListener('wheel',e=>{e.preventDefault();this.goal.radius=clamp(this.goal.radius*Math.exp(e.deltaY*.001),20,230);this.renderNow()},{passive:false});
   c.addEventListener('dblclick',()=>{this.goal.theta=.55;this.goal.phi=.67;});
  }
  animate(){if(this.disposed||this.failed)return;const t=this.clock.getElapsedTime();this.water.forEach(m=>m.uniforms.uTime.value=t);this.updateCamera(.065);if(!document.hidden&&t-this.lastRender>(mobile()?1/40:1/60)){this.renderer.render(this.scene,this.camera);this.lastRender=t;}this.raf=requestAnimationFrame(()=>this.animate())}
  dispose(){this.disposed=true;cancelAnimationFrame(this.raf);this.resizeObserver?.disconnect();this.clear();this.scene?.remove(this.world);this.renderer?.dispose();this.renderer?.domElement.remove();Object.values(this.m||{}).forEach(m=>m.dispose())}
 }
 window.GA3DViewer=Viewer;
})();
