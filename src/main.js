import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#4b9692');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
document.querySelector('#scene').appendChild(renderer.domElement);
const camera = new THREE.OrthographicCamera();
const target = new THREE.Vector3(0, 0, 0);
const angle = THREE.MathUtils.degToRad(38);
camera.position.set(-30 * Math.cos(angle) / Math.SQRT2, 30 * Math.sin(angle), 30 * Math.cos(angle) / Math.SQRT2);
camera.lookAt(target);
scene.add(new THREE.HemisphereLight(0xffeed6, 0x8c9bb1, 2.1));
const sun = new THREE.DirectionalLight(0xffd29d, 3);
sun.position.set(-24, 20, -6); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, {left:-35,right:35,top:35,bottom:-35,near:1,far:90});
sun.shadow.bias = -0.0002; sun.shadow.normalBias = 0.025; sun.shadow.radius = 3;
scene.add(sun);
const mat = color => new THREE.MeshStandardMaterial({color, roughness: 1});
const materials = {base:mat('#a8a49b'), ground:mat('#d5d0bf'), court:mat('#1B52A1'), white:mat('#fffaf0'), green:mat('#4d7560'), metal:mat('#404641'), wood:mat('#795036'), tree:mat('#718c52'), trunk:mat('#806047'), drain:mat('#818681')};
function box(w,h,d,x,y,z,m,shadow=true) { const o = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m); o.position.set(x,y,z); o.castShadow=shadow; o.receiveShadow=true; scene.add(o); return o; }
function segment(a,b,r,m, sides=8) { const v=new THREE.Vector3().subVectors(b,a); const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,v.length(),sides),m); o.position.copy(a).add(b).multiplyScalar(.5); o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize()); o.castShadow=true; scene.add(o); return o; }
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
box(42,1.7,32,0,-.90,0,materials.base); box(41.8,.12,31.8,0,0,0,materials.ground);
// All court dimensions use metres scaled uniformly from NBA dimensions.
const scale=Math.sqrt(.75), L=28.6512*scale, W=15.24*scale, cy=.14, cz=3.5;
box(L,.12,W,0,.08,cz,materials.court);
function line(x1,z1,x2,z2) {segment(V(x1,cy,z1+cz),V(x2,cy,z2+cz),.035,materials.white,6);}
function arc(cx,z,r,start,end) {const n=48; for(let i=0;i<n;i++){let a=start+(end-start)*i/n,b=start+(end-start)*(i+1)/n;line(cx+Math.cos(a)*r,z+Math.sin(a)*r,cx+Math.cos(b)*r,z+Math.sin(b)*r);}}
line(-L/2,-W/2,L/2,-W/2); line(-L/2,W/2,L/2,W/2); line(-L/2,-W/2,-L/2,W/2); line(L/2,-W/2,L/2,W/2); line(0,-W/2,0,W/2); arc(0,0,1.829*scale,0,Math.PI*2);
for(const s of [-1,1]) { const end=s*L/2, ft=s*(L/2-5.791*scale), lane=2.4384*scale; line(end,-lane,ft,-lane);line(end,lane,ft,lane);line(ft,-lane,ft,lane);arc(ft,0,1.829*scale,0,Math.PI*2); const hoop=s*(L/2-1.575*scale), rad=7.24*scale, side=6.706*scale, dx=Math.sqrt(rad*rad-side*side); line(end,-side,hoop-s*dx,-side);line(end,side,hoop-s*dx,side); const a=Math.asin(side/rad); if(s===-1) arc(hoop,0,rad,-a,a); else arc(hoop,0,rad,Math.PI-a,Math.PI+a); }
// One goal on the negative X end.
const hx=-L/2+1.575*scale, rimY=3.05*scale, boardX=hx-.15*scale-.35*scale;
box(.12,1.067*scale,1.829*scale,boardX,rimY+.45*scale,cz,materials.white);
const black=mat('#252a29'), orange=mat('#e76c2c');
for(const [y,z,w,h] of [[rimY+.15*scale,0,.59*scale,.035],[rimY+.60*scale,0,.59*scale,.035],[rimY+.375*scale,-.295*scale,.035,.45*scale],[rimY+.375*scale,.295*scale,.035,.45*scale]]) box(.025,h,w,boardX+.07,y,cz+z,black);
segment(V(-L/2-1.1,.15,cz),V(-L/2-1.1,3.7*scale,cz),.12,black);segment(V(-L/2-1.1,3.7*scale,cz),V(boardX,3.7*scale,cz),.09,black);box(1,.18,1,-L/2-1.1,.2,cz,black);
const ring=new THREE.Mesh(new THREE.TorusGeometry(.229*scale,.025,8,32),orange);ring.rotation.x=Math.PI/2;ring.position.set(hx,rimY,cz);scene.add(ring);
for(let i=0;i<12;i++){const a=i*Math.PI/6,b=a+.18;segment(V(hx+Math.cos(a)*.229*scale,rimY,cz+Math.sin(a)*.229*scale),V(hx+Math.cos(b)*.13*scale,rimY-.43*scale,cz+Math.sin(b)*.13*scale),.009,materials.white,4);}
// Fence with a central opening on the walkway side.
const fx=L/2+1.5, fz=W/2+1.5, bottom=.15, top=2.2;
function fence(x1,z1,x2,z2){const length=Math.hypot(x2-x1,z2-z1), n=Math.ceil(length/2.3);for(let i=0;i<=n;i++){const t=i/n;segment(V(x1+(x2-x1)*t,bottom,z1+(z2-z1)*t),V(x1+(x2-x1)*t,top,z1+(z2-z1)*t),.035,materials.green);}segment(V(x1,top,z1),V(x2,top,z2),.035,materials.green);segment(V(x1,.4,z1),V(x2,.4,z2),.025,materials.green);}
// A light mesh suggests wire fencing while keeping the court visible.
function fenceMesh(x1,z1,x2,z2) {
 const length=Math.hypot(x2-x1,z2-z1);
 const mesh=new THREE.Mesh(new THREE.PlaneGeometry(length,top-.4),new THREE.MeshBasicMaterial({color:0x4d7560,transparent:true,opacity:.09,side:THREE.DoubleSide,depthWrite:false}));
 mesh.position.set((x1+x2)/2,(top+.4)/2,(z1+z2)/2); mesh.rotation.y=-Math.atan2(z2-z1,x2-x1); scene.add(mesh);
}
for(const [x1,z1,x2,z2] of [[-fx,cz+fz,fx,cz+fz],[-fx,cz-fz,-2,cz-fz],[2,cz-fz,fx,cz-fz],[-fx,cz-fz,-fx,cz+fz],[fx,cz-fz,fx,cz+fz]]) fenceMesh(x1,z1,x2,z2);
fence(-fx,cz+fz,fx,cz+fz);fence(-fx,cz-fz,-2,cz-fz);fence(2,cz-fz,fx,cz-fz);fence(-fx,cz-fz,-fx,cz+fz);fence(fx,cz-fz,fx,cz+fz);
// Walkway and reserved school ground occupy the far side of the court.
box(39,.035,3.8,0,.085,-8.9,mat('#bcbab0')); box(39,.04,.28,0,.11,-6.85,materials.drain);
for(let x=-19;x<19;x+=.45)box(.05,.02,.25,x,.14,-6.85,black,false);
box(39,.035,3.8,0,.08,-13.4,mat('#c7beac'));
segment(V(-12,.1,-9.5),V(-12,3.6,-9.5),.23,materials.trunk);
for(const [x,y,z,r] of [[-12,4,-9.5,2],[-13,3.5,-9.5,1.4],[-11,3.7,-9.5,1.5]]){const o=new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),materials.tree);o.position.set(x,y,z);o.castShadow=true;scene.add(o);}
for(const x of [-14,-10]){box(2.6,.16,.65,x,.65,-8.2,materials.wood);box(2.6,.7,.12,x,1,-8.55,materials.wood);for(const dx of [-1,1])box(.12,.6,.12,x+dx,.35,-8.2,black);}
for(const x of [-19,19])for(const z of [-14,14]){segment(V(x,.1,z),V(x,4.7,z),.09,materials.metal);segment(V(x,4.7,z),V(x+(x<0?.7:-.7),4.7,z),.07,materials.metal);box(.55,.16,.4,x+(x<0?.7:-.7),4.6,z,materials.metal);}
function resize(){const aspect=innerWidth/innerHeight; const height=Math.max(42, 56/aspect);camera.left=-height*aspect/2;camera.right=height*aspect/2;camera.top=height/2;camera.bottom=-height/2;camera.near=.1;camera.far=100;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.render(scene,camera);}
addEventListener('resize',resize);resize();
