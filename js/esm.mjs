import { S as Script, C as CameraFrame$1, a as Color, V as Vec4, P as Picker$1, b as Vec3, c as ShaderChunks, d as Vec2, M as Mat4, Q as Quat, R as Ray, e as Plane, m as math, T as Texture, f as PIXELFORMAT_RGBA8, F as FILTER_LINEAR, g as StandardMaterial, B as BlendState, h as BLENDEQUATION_ADD, i as BLENDMODE_SRC_ALPHA, j as BLENDMODE_ONE_MINUS_SRC_ALPHA, k as BLENDMODE_ONE, l as CULLFACE_NONE, E as Entity, n as MeshInstance, o as Mesh, p as PlaneGeometry, L as Layer, q as platform, A as Asset } from './index.mjs';

function _define_property$8(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}const ToneMapping={LINEAR:0,FILMIC:1,HEJL:2,ACES:3,ACES2:4,NEUTRAL:5};const SsaoType={NONE:"none",LIGHTING:"lighting",COMBINE:"combine"};const RenderFormat={RGBA8:7,RG11B10:18,RGBA16:12,RGBA32:14};const DebugType={NONE:"none",SCENE:"scene",SSAO:"ssao",BLOOM:"bloom",VIGNETTE:"vignette",DOFCOC:"dofcoc",DOFBLUR:"dofblur"};class Rendering{constructor(){_define_property$8(this,"renderFormat",RenderFormat.RG11B10);_define_property$8(this,"renderFormatFallback0",RenderFormat.RGBA16);_define_property$8(this,"renderFormatFallback1",RenderFormat.RGBA32);_define_property$8(this,"stencil",false);_define_property$8(this,"renderTargetScale",1);_define_property$8(this,"samples",1);_define_property$8(this,"sceneColorMap",false);_define_property$8(this,"sceneDepthMap",false);_define_property$8(this,"toneMapping",ToneMapping.LINEAR);_define_property$8(this,"sharpness",0);_define_property$8(this,"debug",DebugType.NONE);}}class Ssao{constructor(){_define_property$8(this,"type",SsaoType.NONE);_define_property$8(this,"blurEnabled",true);_define_property$8(this,"intensity",.5);_define_property$8(this,"radius",30);_define_property$8(this,"samples",12);_define_property$8(this,"power",6);_define_property$8(this,"minAngle",10);_define_property$8(this,"scale",1);}}class Bloom{constructor(){_define_property$8(this,"enabled",false);_define_property$8(this,"intensity",.01);_define_property$8(this,"blurLevel",16);}}class Grading{constructor(){_define_property$8(this,"enabled",false);_define_property$8(this,"brightness",1);_define_property$8(this,"contrast",1);_define_property$8(this,"saturation",1);_define_property$8(this,"tint",new Color(1,1,1,1));}}class Vignette{constructor(){_define_property$8(this,"enabled",false);_define_property$8(this,"intensity",.5);_define_property$8(this,"inner",.5);_define_property$8(this,"outer",1);_define_property$8(this,"curvature",.5);}}class Fringing{constructor(){_define_property$8(this,"enabled",false);_define_property$8(this,"intensity",50);}}class Taa{constructor(){_define_property$8(this,"enabled",false);_define_property$8(this,"jitter",1);}}class Dof{constructor(){_define_property$8(this,"enabled",false);_define_property$8(this,"highQuality",true);_define_property$8(this,"nearBlur",false);_define_property$8(this,"focusDistance",100);_define_property$8(this,"focusRange",10);_define_property$8(this,"blurRadius",3);_define_property$8(this,"blurRings",4);_define_property$8(this,"blurRingPoints",5);}}class CameraFrame extends Script{initialize(){this.engineCameraFrame=new CameraFrame$1(this.app,this.entity.camera);this.on("enable",()=>{this.engineCameraFrame.enabled=true;});this.on("disable",()=>{this.engineCameraFrame.enabled=false;});this.on("destroy",()=>{this.engineCameraFrame.destroy();});this.on("state",enabled=>{this.engineCameraFrame.enabled=enabled;});}postUpdate(dt){const cf=this.engineCameraFrame;const{rendering,bloom,grading,vignette,fringing,taa,ssao,dof}=this;const dstRendering=cf.rendering;dstRendering.renderFormats.length=0;dstRendering.renderFormats.push(rendering.renderFormat);dstRendering.renderFormats.push(rendering.renderFormatFallback0);dstRendering.renderFormats.push(rendering.renderFormatFallback1);dstRendering.stencil=rendering.stencil;dstRendering.renderTargetScale=rendering.renderTargetScale;dstRendering.samples=rendering.samples;dstRendering.sceneColorMap=rendering.sceneColorMap;dstRendering.sceneDepthMap=rendering.sceneDepthMap;dstRendering.toneMapping=rendering.toneMapping;dstRendering.sharpness=rendering.sharpness;const dstSsao=cf.ssao;dstSsao.type=ssao.type;if(ssao.type!==SsaoType.NONE){dstSsao.intensity=ssao.intensity;dstSsao.radius=ssao.radius;dstSsao.samples=ssao.samples;dstSsao.power=ssao.power;dstSsao.minAngle=ssao.minAngle;dstSsao.scale=ssao.scale;}const dstBloom=cf.bloom;dstBloom.intensity=bloom.enabled?bloom.intensity:0;if(bloom.enabled){dstBloom.blurLevel=bloom.blurLevel;}const dstGrading=cf.grading;dstGrading.enabled=grading.enabled;if(grading.enabled){dstGrading.brightness=grading.brightness;dstGrading.contrast=grading.contrast;dstGrading.saturation=grading.saturation;dstGrading.tint.copy(grading.tint);}const dstVignette=cf.vignette;dstVignette.intensity=vignette.enabled?vignette.intensity:0;if(vignette.enabled){dstVignette.inner=vignette.inner;dstVignette.outer=vignette.outer;dstVignette.curvature=vignette.curvature;}const dstTaa=cf.taa;dstTaa.enabled=taa.enabled;if(taa.enabled){dstTaa.jitter=taa.jitter;}const dstFringing=cf.fringing;dstFringing.intensity=fringing.enabled?fringing.intensity:0;const dstDof=cf.dof;dstDof.enabled=dof.enabled;if(dof.enabled){dstDof.highQuality=dof.highQuality;dstDof.nearBlur=dof.nearBlur;dstDof.focusDistance=dof.focusDistance;dstDof.focusRange=dof.focusRange;dstDof.blurRadius=dof.blurRadius;dstDof.blurRings=dof.blurRings;dstDof.blurRingPoints=dof.blurRingPoints;}cf.debug=rendering.debug;cf.update();}constructor(...args){super(...args);_define_property$8(this,"rendering",new Rendering);_define_property$8(this,"ssao",new Ssao);_define_property$8(this,"bloom",new Bloom);_define_property$8(this,"grading",new Grading);_define_property$8(this,"vignette",new Vignette);_define_property$8(this,"taa",new Taa);_define_property$8(this,"fringing",new Fringing);_define_property$8(this,"dof",new Dof);_define_property$8(this,"engineCameraFrame",void 0);}}_define_property$8(CameraFrame,"scriptName","cameraFrame");

var cameraFrame = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CameraFrame: CameraFrame
});

const pickDepthGlsl=`
    vec4 packFloat(float depth) {
        uvec4 u = (uvec4(floatBitsToUint(depth)) >> uvec4(0u, 8u, 16u, 24u)) & 0xffu;
        return vec4(u) / 255.0;
    }
    vec4 getPickOutput() {
        return packFloat(gl_FragCoord.z);
    }
`;const pickDepthWgsl=`
    fn packFloat(depth: f32) -> vec4f {
        let u: vec4<u32> = (vec4<u32>(bitcast<u32>(depth)) >> vec4<u32>(0u, 8u, 16u, 24u)) & vec4<u32>(0xffu);
        return vec4f(u) / 255.0;
    }

    fn getPickOutput() -> vec4f {
        return packFloat(pcPosition.z);
    }
`;const float32=new Float32Array(1);const uint8=new Uint8Array(float32.buffer);const two=new Vec4(2,2,2,1);const one=new Vec4(1,1,1,0);class Picker{async pick(x,y){const{app,camera}=this;const{graphicsDevice}=app;const{canvas}=graphicsDevice;const width=canvas.clientWidth;const height=canvas.clientHeight;y=graphicsDevice.isWebGL2?height-y-1:y;if(!this.picker){this.picker=new Picker$1(this.app,width,height);}const{picker}=this;picker.resize(width,height);picker.prepare(camera.camera,app.scene,[app.scene.layers.getLayerByName("World")]);const pixels=await picker.renderTarget.colorBuffer.read(x,y,1,1,{renderTarget:picker.renderTarget});for(let i=0;i<4;++i){uint8[i]=pixels[i];}const depth=float32[0];if(!isFinite(depth)){return null}const pos=new Vec4(x/width,y/height,depth,1).mul(two).sub(one);if(!graphicsDevice.isWebGL2){pos.y*=-1;}camera.camera.projectionMatrix.clone().invert().transformVec4(pos,pos);pos.mulScalar(1/pos.w);const pos3=new Vec3(pos.x,pos.y,pos.z);camera.getWorldTransform().transformPoint(pos3,pos3);return pos3}static patchShaderChunks(device){const glsl=ShaderChunks.get(device,"glsl");const wgsl=ShaderChunks.get(device,"wgsl");glsl.set("pickPS",pickDepthGlsl);wgsl.set("pickPS",pickDepthWgsl);}constructor(app,camera){this.app=app;this.camera=camera;this.picker=null;}}

var picker = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Picker: Picker
});

function _define_property$7(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}class CameraFocus extends Script{initialize(){this._isFpsMode=false;this.app.on("mode:fps",()=>{this._isFpsMode=true;});this.app.on("mode:orbit",()=>{this._isFpsMode=false;});const lastTap={time:0,x:0,y:0};this.app.graphicsDevice.canvas.addEventListener("pointerdown",event=>{const now=Date.now();const delay=Math.max(0,now-lastTap.time);if(delay<300&&Math.abs(event.clientX-lastTap.x)<8&&Math.abs(event.clientY-lastTap.y)<8){this.onDoubleClick(event.offsetX,event.offsetY);lastTap.time=0;}else {lastTap.time=now;lastTap.x=event.clientX;lastTap.y=event.clientY;}});Picker.patchShaderChunks(this.app.graphicsDevice);this.picker=new Picker(this.app,this.entity);}onDoubleClick(x,y){if(this._isFpsMode)return;this.picker.pick(x,y).then(pos=>{const cam=this.entity;const controls=cam.script.cameraControls;const startPos=cam.getPosition().clone();const targetPos=startPos.clone();const startFocus=controls.focusPoint.clone();const endFocus=pos?pos.clone():new Vec3(0,0,0);let t=0;const duration=.6;const speedMultiplier=2;const app=this.app;function smoothFocus(dt){t+=dt*speedMultiplier;const ratio=Math.min(t/duration,1);const smooth=ratio<.5?2*ratio*ratio:-1+(4-2*ratio)*ratio;const focusLerp=new Vec3().lerp(startFocus,endFocus,smooth);controls.focus(focusLerp,targetPos,false);if(ratio>=1){app.off("update",smoothFocus);}}app.on("update",smoothFocus);});}update(dt){}}_define_property$7(CameraFocus,"scriptName","cameraFocus");

var cameraFocus = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CameraFocus: CameraFocus
});

function _define_property$6(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}const tmpVa=new Vec2;const tmpV1=new Vec3;const tmpV2=new Vec3;const tmpM1=new Mat4;const tmpQ1=new Quat;const tmpR1=new Ray;const tmpP1=new Plane;const PASSIVE={passive:false};const ZOOM_SCALE_SCENE_MULT=10;const lerpRate=(damping,dt)=>1-Math.pow(damping,dt*1e3);class CameraControls extends Script{initialize(){this._onWheel=this._onWheel.bind(this);this._onKeyDown=this._onKeyDown.bind(this);this._onKeyUp=this._onKeyUp.bind(this);this._onPointerDown=this._onPointerDown.bind(this);this._onPointerMove=this._onPointerMove.bind(this);this._onPointerUp=this._onPointerUp.bind(this);this._onContextMenu=this._onContextMenu.bind(this);if(!this.entity.camera){throw new Error("CameraControls script requires a camera component")}this.attach(this.entity.camera);this.focusPoint=this._origin??this.focusPoint;this.pitchRange=this._pitchRange??this.pitchRange;this.zoomMin=this._zoomMin??this.zoomMin;this.zoomMax=this._zoomMax??this.zoomMax;this.isAnimating=false;}startAnimation(){this.isAnimating=true;}stopAnimation(){this.isAnimating=false;}set element(value){this._element=value;const camera=this._camera;this.detach();this.attach(camera);}get element(){return this._element}set focusPoint(point){if(!this._camera){if(point instanceof Vec3){this._origin.copy(point);}return}this.focus(point,this.entity.getPosition(),false);}get focusPoint(){return this._origin}set pitchRange(value){if(!(value instanceof Vec2)){return}this._pitchRange.copy(value);this._clampAngles(this._dir);this._smoothTransform(-1);}get pitchRange(){return this._pitchRange}set zoomMin(value){this._zoomMin=value??this._zoomMin;this._zoomDist=this._clampZoom(this._zoomDist);this._smoothZoom(-1);}get zoomMin(){return this._zoomMin}set zoomMax(value){this._zoomMax=value??this._zoomMax;this._zoomDist=this._clampZoom(this._zoomDist);this._smoothZoom(-1);}get zoomMax(){return this._zoomMax}_focusDir(out){return out.copy(this.entity.forward).mulScalar(this._zoomDist)}_clampAngles(angles){const min=this._pitchRange.x===-360?-Infinity:this._pitchRange.x;const max=this._pitchRange.y===360?Infinity:this._pitchRange.y;angles.x=math.clamp(angles.x,min,max);this.fire(CameraControls.EVENT_CLAMP_ANGLES,angles);}_clampPosition(position){if(this._flying){tmpV1.set(0,0,0);}else {this._focusDir(tmpV1);}position.sub(tmpV1);this.fire(CameraControls.EVENT_CLAMP_POSITION,position);position.add(tmpV1);}_clampZoom(value){const min=(this._camera?.nearClip??0)+this.zoomMin*this.sceneSize;const max=this.zoomMax<=this.zoomMin?Infinity:this.zoomMax*this.sceneSize;return math.clamp(value,min,max)}_onContextMenu(event){event.preventDefault();}_isStartMousePan(event){if(!this.enablePan){return false}if(event.shiftKey){return true}if(!this.enableOrbit&&!this.enableFly){return event.button===0||event.button===1||event.button===2}if(!this.enableOrbit||!this.enableFly){return event.button===1||event.button===2}return event.button===1}_isStartFly(event){if(!this.enableFly){return false}if(!this.enableOrbit&&!this.enablePan){return event.button===0||event.button===1||event.button===2}if(!this.enableOrbit){return event.button===0}return event.button===2}_isStartOrbit(event){if(!this.enableOrbit){return false}if(!this.enableFly&&!this.enablePan){return event.button===0||event.button===1||event.button===2}return event.button===0}_onPointerDown(event){if(!this._camera){return}this._element.setPointerCapture(event.pointerId);this._pointerEvents.set(event.pointerId,event);const startTouchPan=this.enablePan&&this._pointerEvents.size===2;const startMousePan=this._isStartMousePan(event);const startFly=this._isStartFly(event);const startOrbit=this._isStartOrbit(event);if(startTouchPan){this._lastPinchDist=this._getPinchDist();this._getMidPoint(this._lastPosition);this._panning=true;}if(startMousePan){this._lastPosition.set(event.clientX,event.clientY);this._panning=true;}if(startFly){this._zoomDist=this._cameraDist;this._origin.copy(this.entity.getPosition());this._position.copy(this._origin);this._cameraTransform.setTranslate(0,0,0);this._flying=true;}if(startOrbit){this._orbiting=true;}if(startTouchPan||startMousePan||startFly||startOrbit){this.fire("userstart");}}_onPointerMove(event){if(this._pointerEvents.size===0){return}this._pointerEvents.set(event.pointerId,event);if(this._pointerEvents.size===1){if(this._panning){this._pan(tmpVa.set(event.clientX,event.clientY));}else if(this._orbiting||this._flying){this._look(event);}return}if(this._pointerEvents.size===2){if(this._panning){this._pan(this._getMidPoint(tmpVa));}const pinchDist=this._getPinchDist();if(this._lastPinchDist>0){this._zoom((this._lastPinchDist-pinchDist)*this.zoomPinchSens);}this._lastPinchDist=pinchDist;}}_onPointerUp(event){this._element.releasePointerCapture(event.pointerId);this._pointerEvents.delete(event.pointerId);if(this._pointerEvents.size<2){this._lastPinchDist=-1;this._panning=false;}if(this._orbiting){this._orbiting=false;}if(this._panning){this._panning=false;}if(this._flying){this._focusDir(tmpV1);this._origin.add(tmpV1);this._position.add(tmpV1);this._flying=false;}}_onWheel(event){event.preventDefault();this._zoom(event.deltaY);}_onKeyDown(event){event.stopPropagation();switch(event.key.toLowerCase()){case"w":case"arrowup":this._key.forward=true;break;case"s":case"arrowdown":this._key.backward=true;break;case"a":case"arrowleft":this._key.left=true;break;case"d":case"arrowright":this._key.right=true;break;case"q":this._key.up=true;break;case"e":this._key.down=true;break;case"shift":this._key.sprint=true;break;case"control":this._key.crouch=true;break}}_onKeyUp(event){event.stopPropagation();switch(event.key.toLowerCase()){case"w":case"arrowup":this._key.forward=false;break;case"s":case"arrowdown":this._key.backward=false;break;case"a":case"arrowleft":this._key.left=false;break;case"d":case"arrowright":this._key.right=false;break;case"q":this._key.up=false;break;case"e":this._key.down=false;break;case"shift":this._key.sprint=false;break;case"control":this._key.crouch=false;break}}_look(event){if(event.target!==this.app.graphicsDevice.canvas){return}const movementX=event.movementX||0;const movementY=event.movementY||0;const isMobile=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);const orbitSpeed=isMobile?this.rotateSpeed*3:this.rotateSpeed;this._dir.x-=movementY*orbitSpeed;this._dir.y-=movementX*orbitSpeed;this._clampAngles(this._dir);}_move(dt){if(!this.enableFly){return}tmpV1.set(0,0,0);if(this._key.forward){tmpV1.add(this.entity.forward);}if(this._key.backward){tmpV1.sub(this.entity.forward);}if(this._key.left){tmpV1.sub(this.entity.right);}if(this._key.right){tmpV1.add(this.entity.right);}if(this._key.up){tmpV1.add(this.entity.up);}if(this._key.down){tmpV1.sub(this.entity.up);}tmpV1.normalize();this._moving=tmpV1.length()>0;const speed=this._key.crouch?this.moveSlowSpeed:this._key.sprint?this.moveFastSpeed:this.moveSpeed;tmpV1.mulScalar(this.sceneSize*speed*dt);this._origin.add(tmpV1);if(this._moving){this._clampPosition(this._origin);}}_getMidPoint(out){const[a,b]=this._pointerEvents.values();const dx=a.clientX-b.clientX;const dy=a.clientY-b.clientY;return out.set(b.clientX+dx*.5,b.clientY+dy*.5)}_getPinchDist(){const[a,b]=this._pointerEvents.values();const dx=a.clientX-b.clientX;const dy=a.clientY-b.clientY;return Math.sqrt(dx*dx+dy*dy)}_screenToWorldPan(pos,point){if(!this._camera){return}const mouseW=this._camera.screenToWorld(pos.x,pos.y,1);const cameraPos=this.entity.getPosition();const focusDir=this._focusDir(tmpV1);const focalPos=tmpV2.add2(cameraPos,focusDir);const planeNormal=focusDir.mulScalar(-1).normalize();const plane=tmpP1.setFromPointNormal(focalPos,planeNormal);const ray=tmpR1.set(cameraPos,mouseW.sub(cameraPos).normalize());plane.intersectsRay(ray,point);}_pan(pos){if(!this.enablePan){return}const start=new Vec3;const end=new Vec3;this._screenToWorldPan(this._lastPosition,start);this._screenToWorldPan(pos,end);tmpV1.sub2(start,end);this._origin.add(tmpV1);this._lastPosition.copy(pos);}_zoom(delta){if(!this.enableOrbit&&!this.enablePan){return}if(this._flying){return}if(!this._camera){return}const distNormalized=this._zoomDist/(ZOOM_SCALE_SCENE_MULT*this.sceneSize);const scale=math.clamp(distNormalized,this.zoomScaleMin,1);this._zoomDist+=delta*this.zoomSpeed*this.sceneSize*scale;this._zoomDist=this._clampZoom(this._zoomDist);this.fire("userstart");}_smoothZoom(dt){const a=dt===-1?1:lerpRate(this.zoomDamping,dt);this._cameraDist=math.lerp(this._cameraDist,this._zoomDist,a);this._cameraTransform.setTranslate(0,0,this._cameraDist);}_smoothTransform(dt){const ar=dt===-1?1:lerpRate(this.rotateDamping,dt);const am=dt===-1?1:lerpRate(this.moveDamping,dt);this._angles.x=math.lerp(this._angles.x,this._dir.x,ar);this._angles.y=math.lerp(this._angles.y,this._dir.y,ar);this._position.lerp(this._position,this._origin,am);this._baseTransform.setTRS(this._position,tmpQ1.setFromEulerAngles(this._angles),Vec3.ONE);}_updateTransform(){tmpM1.copy(this._baseTransform).mul(this._cameraTransform);this.entity.setPosition(tmpM1.getTranslation());this.entity.setEulerAngles(tmpM1.getEulerAngles());}focus(point,start,smooth=true){if(!this._camera){return}if(this._flying){return}if(!start){this._origin.copy(point);if(!smooth){this._position.copy(point);}return}tmpV1.sub2(start,point);const elev=Math.atan2(tmpV1.y,Math.sqrt(tmpV1.x*tmpV1.x+tmpV1.z*tmpV1.z))*math.RAD_TO_DEG;const azim=Math.atan2(tmpV1.x,tmpV1.z)*math.RAD_TO_DEG;this._clampAngles(this._dir.set(-elev,azim));this._origin.copy(point);this._cameraTransform.setTranslate(0,0,0);const pos=this.entity.getPosition();const rot=this.entity.getRotation();this._baseTransform.setTRS(pos,rot,Vec3.ONE);this._zoomDist=this._clampZoom(tmpV1.length());if(!smooth){this._smoothZoom(-1);this._smoothTransform(-1);}this._updateTransform();}resetZoom(zoomDist=0,smooth=true){this._zoomDist=zoomDist;if(!smooth){this._cameraDist=zoomDist;}}refocus(point,start=null,zoomDist,smooth=true){if(typeof zoomDist==="number"){this.resetZoom(zoomDist,smooth);}this.focus(point,start,smooth);}attach(camera){if(this._camera===camera){return}this._camera=camera;this._element.addEventListener("wheel",this._onWheel,PASSIVE);this._element.addEventListener("pointerdown",this._onPointerDown);this._element.addEventListener("pointermove",this._onPointerMove);this._element.addEventListener("pointerup",this._onPointerUp);this._element.addEventListener("contextmenu",this._onContextMenu);window.addEventListener("keydown",this._onKeyDown,false);window.addEventListener("keyup",this._onKeyUp,false);}detach(){if(!this._camera){return}this._element.removeEventListener("wheel",this._onWheel,PASSIVE);this._element.removeEventListener("pointermove",this._onPointerMove);this._element.removeEventListener("pointerdown",this._onPointerDown);this._element.removeEventListener("pointerup",this._onPointerUp);this._element.removeEventListener("contextmenu",this._onContextMenu);window.removeEventListener("keydown",this._onKeyDown,false);window.removeEventListener("keyup",this._onKeyUp,false);this._camera=null;this._dir.x=this._angles.x;this._dir.y=this._angles.y;this._origin.copy(this._position);this._pointerEvents.clear();this._lastPinchDist=-1;this._panning=false;this._key={forward:false,backward:false,left:false,right:false,up:false,down:false,sprint:false,crouch:false};}update(dt){if(this.app.xr?.active){return}if(!this._camera){return}this._move(dt);if(!this._flying){this._smoothZoom(dt);}this._smoothTransform(dt);this._updateTransform();}destroy(){this.detach();}constructor(...args){super(...args);_define_property$6(this,"_camera",null);_define_property$6(this,"_origin",new Vec3);_define_property$6(this,"_position",new Vec3);_define_property$6(this,"_dir",new Vec2);_define_property$6(this,"_angles",new Vec3);_define_property$6(this,"_pitchRange",new Vec2(-360,360));_define_property$6(this,"_zoomMin",0);_define_property$6(this,"_zoomMax",0);_define_property$6(this,"_zoomDist",0);_define_property$6(this,"_cameraDist",0);_define_property$6(this,"_pointerEvents",new Map);_define_property$6(this,"_lastPinchDist",-1);_define_property$6(this,"_lastPosition",new Vec2);_define_property$6(this,"_orbiting",false);_define_property$6(this,"_panning",false);_define_property$6(this,"_flying",false);_define_property$6(this,"_moving",false);_define_property$6(this,"_key",{forward:false,backward:false,left:false,right:false,up:false,down:false,sprint:false,crouch:false});_define_property$6(this,"_element",this.app.graphicsDevice.canvas);_define_property$6(this,"_cameraTransform",new Mat4);_define_property$6(this,"_baseTransform",new Mat4);_define_property$6(this,"sceneSize",100);_define_property$6(this,"enableOrbit",true);_define_property$6(this,"enablePan",true);_define_property$6(this,"enableFly",true);_define_property$6(this,"rotateSpeed",.2);_define_property$6(this,"rotateDamping",.97);_define_property$6(this,"moveSpeed",2);_define_property$6(this,"moveFastSpeed",4);_define_property$6(this,"moveSlowSpeed",1);_define_property$6(this,"moveDamping",.98);_define_property$6(this,"zoomSpeed",.005);_define_property$6(this,"zoomPinchSens",5);_define_property$6(this,"zoomDamping",.98);_define_property$6(this,"zoomScaleMin",0);}}_define_property$6(CameraControls,"scriptName","cameraControls");_define_property$6(CameraControls,"EVENT_CLAMP_POSITION","clamp:position");_define_property$6(CameraControls,"EVENT_CLAMP_ANGLES","clamp:angles");

var cameraControls = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CameraControls: CameraControls
});

function _define_property$5(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}class UiTriggerButton extends Script{initialize(){if(this.entity.element){this.entity.element.useInput=true;this.entity.element.on("click",this.onClick,this);}}onClick(){this.app.fire(this.eventName);console.log(`Bouton cliqu\xe9 ! Lancement de l'\xe9v\xe9nement : ${this.eventName}`);}constructor(...args){super(...args);_define_property$5(this,"eventName","reveal:explode");}}_define_property$5(UiTriggerButton,"scriptName","uiTriggerButton");

var uiTriggerButton = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UiTriggerButton: UiTriggerButton
});

function _define_property$4(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}class GsplatShaderEffect extends Script{initialize(){this.initialized=false;this.effectTime=0;this.materialsApplied.clear();this.shadersNeedApplication=false;this.on("enable",()=>{this.effectTime=0;if(!this.initialized&&this.entity.gsplat){this.initialized=true;}if(this.initialized){this.applyShaders();}else {this.shadersNeedApplication=true;}});this.on("disable",()=>{this.removeShaders();});this.setupUnifiedEventListener();if(!this.entity.gsplat){return}this.initialized=true;if(this.enabled){this.applyShaders();}}applyShaders(){if(this.entity.gsplat?.unified){this.applyToUnifiedMaterials();}else {this.applyToComponentMaterial();}}removeShaders(){if(this.materialsApplied.size===0)return;const device=this.app.graphicsDevice;const shaderLanguage=device?.isWebGPU?"wgsl":"glsl";this.materialsApplied.forEach(material=>{material.getShaderChunks(shaderLanguage).delete("gsplatModifyVS");material.update();});this.materialsApplied.clear();}setupUnifiedEventListener(){if(this._materialCreatedHandler)return;const gsplatSystem=this.app.systems.gsplat;this._materialCreatedHandler=(material,camera,layer)=>{if(!this.enabled)return;if(!this.materialsApplied.has(material)){if(this.camera&&this.camera.camera&&this.camera.camera.camera!==camera){return}this.applyShaderToMaterial(material);this.materialsApplied.add(material);this.updateEffect(this.effectTime,0);if(!this._materialLayers){this._materialLayers=new Map;}this._materialLayers.set(material,layer.id);}};gsplatSystem.on("material:created",this._materialCreatedHandler);}applyToComponentMaterial(){const applyShader=()=>{const material=this.entity.gsplat?.material;if(!material){console.error(`${this.constructor.name}: gsplat material not available.`);return}this.applyShaderToMaterial(material);this.materialsApplied.add(material);this.updateEffect(this.effectTime,0);};if(this.entity.gsplat?.material){applyShader();}else {this.entity.gsplat?.once("load",applyShader);}}applyToUnifiedMaterials(){this.updateUnifiedMaterials();if(this.materialsApplied.size===0){this.needsRetry=true;}}updateUnifiedMaterials(){const gsplatSystem=this.app.systems.gsplat;const scene=this.app.scene;const composition=scene.layers;const componentLayers=this.entity.gsplat?.layers;if(!componentLayers)return;let targetCameras;const cam=this.camera?.camera?.camera;if(cam){targetCameras=[cam];}else {targetCameras=composition.cameras.map(cameraComponent=>cameraComponent.camera);}targetCameras.forEach(camera=>{componentLayers.forEach(layerId=>{if(camera.layers.indexOf(layerId)>=0){const layer=composition.getLayerById(layerId);if(layer){const material=gsplatSystem.getGSplatMaterial(camera,layer);if(material&&!this.materialsApplied.has(material)){this.applyShaderToMaterial(material);this.materialsApplied.add(material);this.updateEffect(this.effectTime,0);}}}});});if(this.materialsApplied.size>0){this.needsRetry=false;}}applyShaderToMaterial(material){const device=this.app.graphicsDevice;const shaderLanguage=device?.isWebGPU?"wgsl":"glsl";const customShader=shaderLanguage==="wgsl"?this.getShaderWGSL():this.getShaderGLSL();material.getShaderChunks(shaderLanguage).set("gsplatModifyVS",customShader);material.update();}update(dt){if(!this.initialized){if(this.entity.gsplat){this.initialized=true;if(this.enabled&&this.shadersNeedApplication){this.applyShaders();this.shadersNeedApplication=false;}}return}if(this.shadersNeedApplication){this.applyShaders();this.shadersNeedApplication=false;}if(this.entity.gsplat?.unified&&this.needsRetry){this.updateUnifiedMaterials();}if(this.materialsApplied.size===0)return;this.effectTime+=dt;this.updateEffect(this.effectTime,dt);}destroy(){this.removeShaders();if(this._materialCreatedHandler){this.app.systems.gsplat.off("material:created",this._materialCreatedHandler);this._materialCreatedHandler=null;}}getShaderGLSL(){throw new Error(`${this.constructor.name} must implement getShaderGLSL()`)}getShaderWGSL(){throw new Error(`${this.constructor.name} must implement getShaderWGSL()`)}setUniform(name,value){this.materialsApplied.forEach(material=>{material.setParameter(name,value);});}updateEffect(effectTime,dt){}constructor(...args){super(...args);_define_property$4(this,"camera",null);_define_property$4(this,"effectTime",0);_define_property$4(this,"materialsApplied",new Set);}}_define_property$4(GsplatShaderEffect,"scriptName","gsplatShaderEffect");

var gsplatShaderEffect = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GsplatShaderEffect: GsplatShaderEffect
});

function _define_property$3(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}const shaderGLSL=`
uniform float uTime;
uniform vec3 uCenter;
uniform float uSpeed;
uniform float uAcceleration;
uniform float uDelay;
uniform vec3 uDotTint;
uniform vec3 uWaveTint;
uniform float uOscillationIntensity;
uniform float uEndRadius;

// ✅ NEW: size controls (editor-driven)
uniform float uDotSplatSize;
uniform float uLiftDotSplatSize;

// Shared globals (initialized once per vertex)
float g_dist;
float g_dotWavePos;
float g_liftTime;
float g_liftWavePos;

void initShared(vec3 center) {
    g_dist = length(center - uCenter);
    
    // 1. La premi\xe8re vague (les petits points) avance
    g_dotWavePos = uSpeed * uTime + 0.5 * uAcceleration * uTime * uTime;
    
    // 2. La vague de reformation est "coll\xe9e" derri\xe8re la premi\xe8re.
    g_liftWavePos = max(0.0, g_dotWavePos - uDelay);
    
    // On active la phase de reformation d\xe8s que l'\xe9cart est franchi
    g_liftTime = (g_dotWavePos > uDelay) ? 1.0 : 0.0;
}

// Hash function for per-splat randomization
float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

// modifyCenter -> modifySplatCenter
void modifySplatCenter(inout vec3 center) {
    initShared(center);

    // Early exit optimization
    if (g_dist > uEndRadius) return;

    // Only apply oscillation if lift wave hasn't fully passed
    bool wavesActive = g_liftTime <= 0.0 || g_dist > g_liftWavePos - 1.5;
    if (wavesActive) {
        float phase = hash(center) * 6.28318;
        center.y += sin(uTime * 3.0 + phase) * uOscillationIntensity * 0.25;
    }

    // Apply lift effect near the wave edge
    float distToLiftWave = abs(g_dist - g_liftWavePos);
    if (distToLiftWave < 1.0 && g_liftTime > 0.0) {
        float liftAmount = (1.0 - distToLiftWave) * sin(distToLiftWave * 3.14159);
        center.y += liftAmount * uOscillationIntensity * 0.9;
    }
}

// modifyCovariance -> modifySplatRotationScale (AVEC FLUIDIT\xc9 CONSERV\xc9E)
void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 splatScale) {
    if (g_dist > uEndRadius) {
        splatScale = vec3(0.0);
        return;
    }

    float scale;
    bool isLiftWave = g_liftTime > 0.0 && g_liftWavePos > g_dist;

    if (isLiftWave) {
        float waveDepth = 3.0;
        float progress = clamp((g_liftWavePos - g_dist) / waveDepth, 0.0, 1.0);
        scale = mix(0.1, 1.0, smoothstep(0.0, 1.0, progress)); 
    } else if (g_dist > g_dotWavePos + 0.1) {
        splatScale = vec3(0.0);
        return;
    } else if (g_dist > g_dotWavePos - 1.0) {
        float distToWave = abs(g_dist - g_dotWavePos);
        scale = (distToWave < 0.5)
            ? mix(0.1, 0.2, 1.0 - distToWave * 2.0)
            : mix(0.0, 0.1, smoothstep(g_dotWavePos + 1.0, g_dotWavePos - 1.0, g_dist));
    } else {
        scale = 0.1;
    }

    if (scale >= 1.0) {
        return;
    } else if (isLiftWave) {
        float t = smoothstep(0.1, 1.0, scale);
        
        float dotSize = scale * uLiftDotSplatSize;
        float originalSize = gsplatGetSizeFromScale(splatScale);
        
        float finalSize = mix(dotSize, originalSize, t);
        vec3 origScaleAnim = splatScale * scale;
        splatScale = mix(vec3(finalSize), origScaleAnim, t);
    } else {
        float originalSize = gsplatGetSizeFromScale(splatScale);
        splatScale = vec3(min(scale * uDotSplatSize, originalSize));
    }
}

// ✅ CHANGEMENT L\xc9GER ICI : Retrait des coupures nettes pour la lueur
void modifySplatColor(vec3 center, inout vec4 color) {
    if (g_dist > uEndRadius) return;

    if (g_liftTime > 0.0) {
        // La lueur dor\xe9e se diffuse doucement sur 2.5 unit\xe9s, sans mur invisible
        float distToLift = abs(g_dist - g_liftWavePos);
        float liftIntensity = smoothstep(2.5, 0.0, distToLift);
        color.rgb += uWaveTint * liftIntensity;
    } 
    else if (g_dist <= g_dotWavePos) {
        // La lueur de la vague de petits points
        float distToDot = abs(g_dist - g_dotWavePos);
        float dotIntensity = smoothstep(1.5, 0.0, distToDot);
        color.rgb += uDotTint * dotIntensity;
    }
}
`;const shaderWGSL=`
uniform uTime: f32;
uniform uCenter: vec3f;
uniform uSpeed: f32;
uniform uAcceleration: f32;
uniform uDelay: f32;
uniform uDotTint: vec3f;
uniform uWaveTint: vec3f;
uniform uOscillationIntensity: f32;
uniform uEndRadius: f32;

uniform uDotSplatSize: f32;
uniform uLiftDotSplatSize: f32;

var<private> g_dist: f32;
var<private> g_dotWavePos: f32;
var<private> g_liftTime: f32;
var<private> g_liftWavePos: f32;

fn initShared(center: vec3f) {
    g_dist = length(center - uniform.uCenter);
    g_dotWavePos = uniform.uSpeed * uniform.uTime + 0.5 * uniform.uAcceleration * uniform.uTime * uniform.uTime;
    g_liftWavePos = max(0.0, g_dotWavePos - uniform.uDelay);
    g_liftTime = select(0.0, 1.0, g_dotWavePos > uniform.uDelay);
}

fn hash(p: vec3f) -> f32 {
    return fract(sin(dot(p, vec3f(127.1, 311.7, 74.7))) * 43758.5453);
}

fn modifySplatCenter(center: ptr<function, vec3f>) {
    initShared(*center);

    if (g_dist > uniform.uEndRadius) { return; }

    let wavesActive = g_liftTime <= 0.0 || g_dist > g_liftWavePos - 1.5;
    if (wavesActive) {
        let phase = hash(*center) * 6.28318;
        (*center).y += sin(uniform.uTime * 3.0 + phase) * uniform.uOscillationIntensity * 0.25;
    }

    let distToLiftWave = abs(g_dist - g_liftWavePos);
    if (distToLiftWave < 1.0 && g_liftTime > 0.0) {
        let liftAmount = (1.0 - distToLiftWave) * sin(distToLiftWave * 3.14159);
        (*center).y += liftAmount * uniform.uOscillationIntensity * 0.9;
    }
}

fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {
    if (g_dist > uniform.uEndRadius) {
        *scale = vec3f(0.0);
        return;
    }

    var animScale: f32;
    let isLiftWave = g_liftTime > 0.0 && g_liftWavePos > g_dist;

    if (isLiftWave) {
        let waveDepth = 3.0;
        let progress = clamp((g_liftWavePos - g_dist) / waveDepth, 0.0, 1.0);
        animScale = mix(0.1, 1.0, smoothstep(0.0, 1.0, progress));
    } else if (g_dist > g_dotWavePos + 0.1) {
        *scale = vec3f(0.0);
        return;
    } else if (g_dist > g_dotWavePos - 1.0) {
        let distToWave = abs(g_dist - g_dotWavePos);
        animScale = select(
            mix(0.0, 0.1, smoothstep(g_dotWavePos + 1.0, g_dotWavePos - 1.0, g_dist)),
            mix(0.1, 0.2, 1.0 - distToWave * 2.0),
            distToWave < 0.5
        );
    } else {
        animScale = 0.1;
    }

    if (animScale >= 1.0) {
        return;
    } else if (isLiftWave) {
        let t = smoothstep(0.1, 1.0, animScale);
        let dotSize = animScale * uniform.uLiftDotSplatSize;
        let originalSize = gsplatGetSizeFromScale(*scale);
        
        let finalSize = mix(dotSize, originalSize, t);
        let origScaleAnim = *scale * animScale;
        *scale = mix(vec3f(finalSize), origScaleAnim, t);
    } else {
        let originalSize = gsplatGetSizeFromScale(*scale);
        *scale = vec3f(min(animScale * uniform.uDotSplatSize, originalSize));
    }
}

// ✅ CHANGEMENT L\xc9GER ICI AUSSI
fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>) {
    if (g_dist > uniform.uEndRadius) { return; }

    if (g_liftTime > 0.0) {
        let distToLift = abs(g_dist - g_liftWavePos);
        let liftIntensity = smoothstep(2.5, 0.0, distToLift);
        (*color) = vec4f((*color).rgb + uniform.uWaveTint * liftIntensity, (*color).a);
    } else if (g_dist <= g_dotWavePos) {
        let distToDot = abs(g_dist - g_dotWavePos);
        let dotIntensity = smoothstep(1.5, 0.0, distToDot);
        (*color) = vec4f((*color).rgb + uniform.uDotTint * dotIntensity, (*color).a);
    }
}
`;class GsplatRevealRadial extends GsplatShaderEffect{initialize(){super.initialize();this._initialDelay=this.delay;if(!this._skyboxCaptured){this._skyboxTarget=this.app.scene.skyboxIntensity!==undefined?this.app.scene.skyboxIntensity:1;this._skyboxCaptured=true;}this._skyboxForceFrames=this._skyboxForceFramesMax;this._skyboxT=0;if(this.app.scene.skyboxIntensity!==undefined){this.app.scene.skyboxIntensity=0;}this.app.on("reveal:explode",()=>{this.setExplodeCenter();this._skyboxForceFrames=this._skyboxForceFramesMax;this._skyboxT=0;if(this.app.scene.skyboxIntensity!==undefined){this.app.scene.skyboxIntensity=0;}this.restart();},this);this.app.on("reveal:intro",()=>{this.setIntroCenter();this.restart();},this);}getShaderGLSL(){return shaderGLSL}getShaderWGSL(){return shaderWGSL}updateEffect(effectTime,dt){this.setUniform("uTime",effectTime);let cx=this.center.x,cy=this.center.y,cz=this.center.z;if(this.centerInWorldSpace){this._invWorld.copy(this.entity.getWorldTransform()).invert();this._centerTmp.set(cx,cy,cz);this._invWorld.transformPoint(this._centerTmp,this._centerTmp);cx=this._centerTmp.x;cy=this._centerTmp.y;cz=this._centerTmp.z;}this._centerArray[0]=cx;this._centerArray[1]=cy;this._centerArray[2]=cz;this.setUniform("uCenter",this._centerArray);this.setUniform("uSpeed",this.speed);this.setUniform("uAcceleration",this.acceleration);this.setUniform("uDelay",this.delay);this._dotTintArray[0]=this.dotTint.r;this._dotTintArray[1]=this.dotTint.g;this._dotTintArray[2]=this.dotTint.b;this.setUniform("uDotTint",this._dotTintArray);this._waveTintArray[0]=this.waveTint.r;this._waveTintArray[1]=this.waveTint.g;this._waveTintArray[2]=this.waveTint.b;this.setUniform("uWaveTint",this._waveTintArray);this.setUniform("uOscillationIntensity",this.oscillationIntensity);this.setUniform("uEndRadius",this.endRadius);this.setUniform("uDotSplatSize",this.dotSplatSize*this._sizeFactor);this.setUniform("uLiftDotSplatSize",this.liftDotSplatSize*this._sizeFactor);if(this.app.scene.skyboxIntensity!==undefined){if(this._skyboxForceFrames>0){this._skyboxForceFrames--;this._skyboxT=0;this.app.scene.skyboxIntensity=0;return}if(this._skyboxT<1){const step=this._skyboxFadeIn>0?dt/this._skyboxFadeIn:1;this._skyboxT=Math.min(1,this._skyboxT+step);this.app.scene.skyboxIntensity=this._skyboxTarget*this._skyboxT;}}}setIntroCenter(){this.center.copy(this.centerIntro);}setExplodeCenter(){this.center.copy(this.centerExplode);}restart(){this.effectTime=0;this.enabled=true;this.delay=this._initialDelay;if(!this._skyboxCaptured){this._skyboxTarget=this.app.scene.skyboxIntensity!==undefined?this.app.scene.skyboxIntensity:1;this._skyboxCaptured=true;}this._skyboxForceFrames=this._skyboxForceFramesMax;this._skyboxT=0;if(this.app.scene.skyboxIntensity!==undefined){this.app.scene.skyboxIntensity=0;}}onEnable(){this._skyboxForceFrames=this._skyboxForceFramesMax;this._skyboxT=0;if(this.app.scene.skyboxIntensity!==undefined){this.app.scene.skyboxIntensity=0;}}constructor(...args){super(...args);_define_property$3(this,"_centerArray",[0,0,0]);_define_property$3(this,"_dotTintArray",[0,0,0]);_define_property$3(this,"_waveTintArray",[0,0,0]);_define_property$3(this,"_oscillateCurrent",0);_define_property$3(this,"_oscillateLerpSpeed",3);_define_property$3(this,"_invWorld",new Mat4);_define_property$3(this,"_centerTmp",new Vec3);_define_property$3(this,"_initialDelay",0);_define_property$3(this,"_sizeFactor",.1);_define_property$3(this,"_skyboxCaptured",false);_define_property$3(this,"_skyboxTarget",1);_define_property$3(this,"_skyboxT",1);_define_property$3(this,"_skyboxFadeIn",3.6);_define_property$3(this,"_skyboxForceFrames",0);_define_property$3(this,"_skyboxForceFramesMax",3);_define_property$3(this,"center",new Vec3(0,0,0));_define_property$3(this,"centerIntro",new Vec3(0,0,0));_define_property$3(this,"centerExplode",new Vec3(0,0,0));_define_property$3(this,"centerInWorldSpace",true);_define_property$3(this,"speed",.1);_define_property$3(this,"acceleration",.1);_define_property$3(this,"delay",1);_define_property$3(this,"dotTint",new Color(0,1,1));_define_property$3(this,"waveTint",new Color(5,0,0));_define_property$3(this,"oscillationIntensity",.1);_define_property$3(this,"endRadius",5);_define_property$3(this,"dotSplatSize",.008);_define_property$3(this,"liftDotSplatSize",.01);}}_define_property$3(GsplatRevealRadial,"scriptName","gsplatRevealRadial");

var revealRadial = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GsplatRevealRadial: GsplatRevealRadial
});

function _define_property$2(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}class UiHoverGlow extends Script{initialize(){this.isHovered=false;this.time=0;this.glowOpacity=0;this.baseScale=this.entity.getLocalScale().clone();this.targetScale=new Vec3().copy(this.baseScale);this.currentScale=new Vec3().copy(this.baseScale);if(this.glowEntity&&this.glowEntity.element){this.glowEntity.element.opacity=0;}if(this.entity.element){this.entity.element.useInput=true;this.entity.element.on("mouseenter",()=>this.isHovered=true,this);this.entity.element.on("mouseleave",()=>this.isHovered=false,this);}}update(dt){const targetMultiplier=this.isHovered?1.15:1;let pulse=0;if(this.isHovered){this.time+=dt*6;pulse=Math.sin(this.time)*.03;}else {this.time=0;}this.targetScale.copy(this.baseScale).mulScalar(targetMultiplier+pulse);this.currentScale.lerp(this.currentScale,this.targetScale,dt*12);this.entity.setLocalScale(this.currentScale);if(this.glowEntity&&this.glowEntity.element){const targetOpacity=this.isHovered?.8:0;this.glowOpacity=math.lerp(this.glowOpacity,targetOpacity,dt*10);this.glowEntity.element.opacity=this.glowOpacity;}}constructor(...args){super(...args);_define_property$2(this,"glowEntity",null);}}_define_property$2(UiHoverGlow,"scriptName","uiHoverGlow");

var uiHoverGlow = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UiHoverGlow: UiHoverGlow
});

function _define_property$1(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}const depthClamp=`
    float f = gl_Position.z / gl_Position.w;
    if (f > 1.0) {
        gl_Position.z = gl_Position.w;
    } else if (f < -1.0) {
        gl_Position.z = -gl_Position.w;
    }
`;const depthClampWGSL=`
    let f: f32 = output.position.z / output.position.w;
    if (f > 1.0) {
        output.position.z = output.position.w;
    } else if (f < -1.0) {
        output.position.z = -output.position.w;
    }
`;const vec=new Vec3;class AnnotationManager extends Script{set hotspotSize(value){if(this._hotspotSize===value)return;this._hotspotSize=value;this._updateStyleSheet();}get hotspotSize(){return this._hotspotSize}set hotspotColor(value){if(this._hotspotColor.equals(value))return;this._hotspotColor.copy(value);this._updateAllAnnotationColors();}get hotspotColor(){return this._hotspotColor}set hoverColor(value){if(this._hoverColor.equals(value))return;this._hoverColor.copy(value);if(this._hoverAnnotation){this._setAnnotationHover(this._hoverAnnotation,true);}}get hoverColor(){return this._hoverColor}set opacity(value){this._opacity=value;}get opacity(){return this._opacity}set behindOpacity(value){this._behindOpacity=value;}get behindOpacity(){return this._behindOpacity}_injectStyles(){const size=this._hotspotSize;const css=`
            .pc-annotation {
                display: block;
                position: absolute;
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px;
                border-radius: 4px;
                font-size: 14px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                pointer-events: none;
                max-width: 200px;
                word-wrap: break-word;
                overflow-x: visible;
                white-space: normal;
                width: fit-content;
                opacity: 0;
                transition: opacity 0.2s ease-in-out;
                visibility: hidden;
                transform: translate(25px, -50%);
            }
            .pc-annotation-title {
                font-weight: bold;
                margin-bottom: 4px;
            }
            .pc-annotation::before {
                content: "";
                position: absolute;
                left: -8px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-right: 8px solid rgba(0, 0, 0, 0.8);
            }
            .pc-annotation-hotspot {
                display: none;
                position: absolute;
                width: ${size+5}px;
                height: ${size+5}px;
                opacity: 0;
                cursor: pointer;
                transform: translate(-50%, -50%);
            }
        `;const style=document.createElement("style");style.textContent=css;document.head.appendChild(style);this._styleSheet=style;}_updateStyleSheet(){if(this._styleSheet){this._styleSheet.remove();this._styleSheet=null;}this._injectStyles();}_updateAllAnnotationColors(){for(const[annotation,resources]of this._annotationResources){if(annotation!==this._hoverAnnotation){resources.materials.forEach(material=>{material.emissive.copy(this._hotspotColor);material.update();});}}}_createHotspotTexture(label,size=64,borderWidth=6){const canvas=document.createElement("canvas");canvas.width=size;canvas.height=size;const ctx=canvas.getContext("2d");ctx.fillStyle="white";ctx.globalAlpha=0;ctx.fillRect(0,0,size,size);ctx.globalAlpha=1;const centerX=size/2;const centerY=size/2;const radius=size/2-4;ctx.beginPath();ctx.arc(centerX,centerY,radius,0,Math.PI*2);ctx.fillStyle="black";ctx.fill();ctx.beginPath();ctx.arc(centerX,centerY,radius,0,Math.PI*2);ctx.lineWidth=borderWidth;ctx.strokeStyle="white";ctx.stroke();ctx.font="bold 32px Arial";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillStyle="white";ctx.fillText(label,Math.floor(canvas.width/2),Math.floor(canvas.height/2)+1);const imageData=ctx.getImageData(0,0,size,size);const data=imageData.data;for(let i=0;i<data.length;i+=4){const a=data[i+3];if(a<255){data[i]=255;data[i+1]=255;data[i+2]=255;}}return new Texture(this.app.graphicsDevice,{width:size,height:size,format:PIXELFORMAT_RGBA8,magFilter:FILTER_LINEAR,minFilter:FILTER_LINEAR,mipmaps:false,levels:[new Uint8Array(data.buffer)]})}_createHotspotMaterial(texture,{opacity=1,depthTest=true,depthWrite=true}={}){const material=new StandardMaterial;material.diffuse=Color.BLACK;material.emissive.copy(this._hotspotColor);material.emissiveMap=texture;material.opacityMap=texture;material.opacity=opacity;material.alphaTest=.01;material.blendState=new BlendState(true,BLENDEQUATION_ADD,BLENDMODE_SRC_ALPHA,BLENDMODE_ONE_MINUS_SRC_ALPHA,BLENDEQUATION_ADD,BLENDMODE_ONE,BLENDMODE_ONE);material.depthTest=depthTest;material.depthWrite=depthWrite;material.cull=CULLFACE_NONE;material.useLighting=false;material.shaderChunks.glsl.add({"litUserMainEndVS":depthClamp});material.shaderChunks.wgsl.add({"litUserMainEndVS":depthClampWGSL});material.update();return material}_setAnnotationHover(annotation,hover){const resources=this._annotationResources.get(annotation);if(!resources)return;resources.materials.forEach(material=>{material.emissive.copy(hover?this._hoverColor:this._hotspotColor);material.update();});annotation.fire("hover",hover);}_showTooltip(annotation){this._activeAnnotation=annotation;this._tooltipDom.style.visibility="visible";this._tooltipDom.style.opacity="1";this._titleDom.textContent=annotation.title;this._textDom.textContent=annotation.text;annotation.fire("show",annotation);}_hideTooltip(annotation){this._activeAnnotation=null;this._tooltipDom.style.opacity="0";this.app.fire("focus:reset",1.5);setTimeout(()=>{if(this._tooltipDom&&this._tooltipDom.style.opacity==="0"){this._tooltipDom.style.visibility="hidden";}annotation.fire("hide");},200);}_hideAnnotationElements(annotation,resources){resources.hotspotDom.style.display="none";if(this._activeAnnotation===annotation){if(this._tooltipDom.style.visibility!=="hidden"){this._hideTooltip(annotation);}}}_updateAnnotationPositions(annotation,resources,screenPos){resources.hotspotDom.style.display="block";resources.hotspotDom.style.left=`${screenPos.x}px`;resources.hotspotDom.style.top=`${screenPos.y}px`;if(this._activeAnnotation===annotation){this._tooltipDom.style.left=`${screenPos.x}px`;this._tooltipDom.style.top=`${screenPos.y}px`;}}_updateAnnotationRotationAndScale(annotation){const cameraRotation=this._camera.getRotation();annotation.entity.setRotation(cameraRotation);annotation.entity.rotateLocal(90,0,0);const cameraPos=this._camera.getPosition();const distance=annotation.entity.getPosition().distance(cameraPos);const canvas=this.app.graphicsDevice.canvas;const screenHeight=canvas.clientHeight;const projMatrix=this._camera.camera.projectionMatrix;const worldSize=this._hotspotSize/screenHeight*(2*distance/projMatrix.data[5]);annotation.entity.setLocalScale(worldSize,worldSize,worldSize);}_onLabelChange(annotation,label){const resources=this._annotationResources.get(annotation);if(!resources)return;resources.texture.destroy();resources.texture=this._createHotspotTexture(label);resources.materials.forEach(material=>{material.emissiveMap=resources.texture;material.opacityMap=resources.texture;material.update();});}_onTitleChange(annotation,title){if(this._activeAnnotation===annotation){this._titleDom.textContent=title;}}_onTextChange(annotation,text){if(this._activeAnnotation===annotation){this._textDom.textContent=text;}}_onAnnotationEnable(annotation){const resources=this._annotationResources.get(annotation);if(!resources)return;resources.baseEntity.enabled=true;resources.overlayEntity.enabled=true;resources.hotspotDom.style.display="";}_onAnnotationDisable(annotation){const resources=this._annotationResources.get(annotation);if(!resources)return;resources.baseEntity.enabled=false;resources.overlayEntity.enabled=false;resources.hotspotDom.style.display="none";if(this._activeAnnotation===annotation){this._hideTooltip(annotation);}if(this._hoverAnnotation===annotation){this._hoverAnnotation=null;this._setAnnotationHover(annotation,false);}}_registerAnnotation(annotation){if(this._annotationResources.has(annotation))return;const eventHandles=[];const texture=this._createHotspotTexture(annotation.label);const materials=[this._createHotspotMaterial(texture,{opacity:1,depthTest:true,depthWrite:true}),this._createHotspotMaterial(texture,{opacity:this._behindOpacity,depthTest:false,depthWrite:false})];const baseEntity=new Entity("base");const baseMi=new MeshInstance(this._mesh,materials[0]);baseMi.cull=false;baseEntity.addComponent("render",{layers:[this._layers[0].id],meshInstances:[baseMi]});const overlayEntity=new Entity("overlay");const overlayMi=new MeshInstance(this._mesh,materials[1]);overlayMi.cull=false;overlayEntity.addComponent("render",{layers:[this._layers[1].id],meshInstances:[overlayMi]});annotation.entity.addChild(baseEntity);annotation.entity.addChild(overlayEntity);const hotspotDom=document.createElement("div");hotspotDom.className="pc-annotation-hotspot";const onPointerDown=e=>{if(!this._interactionsEnabled)return;e.stopPropagation();if(this._activeAnnotation===annotation){this._hideTooltip(annotation);}else {this._showTooltip(annotation);this.app.fire("focus:point",annotation.entity.getPosition(),annotation.zoomDistance||1,1.5);}};hotspotDom.addEventListener("pointerdown",onPointerDown);const onPointerEnter=()=>{if(!this._interactionsEnabled)return;if(this._hoverAnnotation!==null)this._setAnnotationHover(this._hoverAnnotation,false);this._hoverAnnotation=annotation;this._setAnnotationHover(annotation,true);};const onPointerLeave=()=>{if(!this._interactionsEnabled)return;if(this._hoverAnnotation===annotation){this._hoverAnnotation=null;this._setAnnotationHover(annotation,false);}};hotspotDom.addEventListener("pointerenter",onPointerEnter);hotspotDom.addEventListener("pointerleave",onPointerLeave);const onWheel=e=>{if(!this._interactionsEnabled)return;const canvas=this.app.graphicsDevice.canvas;canvas.dispatchEvent(new WheelEvent(e.type,e));};hotspotDom.addEventListener("wheel",onWheel);const onDocumentPointerDown=()=>{if(!this._interactionsEnabled)return;if(this._activeAnnotation===annotation){this._hideTooltip(annotation);}};document.addEventListener("pointerdown",onDocumentPointerDown);this._parentDom.appendChild(hotspotDom);eventHandles.push(annotation.on("label:set",label=>this._onLabelChange(annotation,label)));eventHandles.push(annotation.on("title:set",title=>this._onTitleChange(annotation,title)));eventHandles.push(annotation.on("text:set",text=>this._onTextChange(annotation,text)));eventHandles.push(annotation.on("enable",()=>this._onAnnotationEnable(annotation)));eventHandles.push(annotation.on("disable",()=>this._onAnnotationDisable(annotation)));const domCleanup=()=>{hotspotDom.removeEventListener("pointerdown",onPointerDown);hotspotDom.removeEventListener("pointerenter",onPointerEnter);hotspotDom.removeEventListener("pointerleave",onPointerLeave);hotspotDom.removeEventListener("wheel",onWheel);document.removeEventListener("pointerdown",onDocumentPointerDown);};const resources={baseEntity,overlayEntity,hotspotDom,texture,materials,eventHandles,domCleanup};this._annotationResources.set(annotation,resources);}_unregisterAnnotation(annotation){const resources=this._annotationResources.get(annotation);if(!resources)return;if(this._activeAnnotation===annotation){this._activeAnnotation=null;this._tooltipDom.style.visibility="hidden";}if(this._hoverAnnotation===annotation){this._hoverAnnotation=null;}resources.eventHandles.forEach(handle=>handle.unbind());resources.eventHandles.length=0;resources.domCleanup();resources.hotspotDom.remove();resources.baseEntity.destroy();resources.overlayEntity.destroy();resources.materials.forEach(mat=>mat.destroy());resources.materials.length=0;resources.texture.destroy();this._annotationResources.delete(annotation);}update(dt){if(this._currentOpacity!==this._targetOpacity){const step=dt*this.fadeSpeed;if(this._currentOpacity<this._targetOpacity){this._currentOpacity=Math.min(this._currentOpacity+step,this._targetOpacity);}else {this._currentOpacity=Math.max(this._currentOpacity-step,this._targetOpacity);}this.opacity=this._currentOpacity;}}initialize(){if(this._parentDom===null)this._parentDom=document.body;this._injectStyles();if(this.hideAtStart){this._currentOpacity=0;this._targetOpacity=0;this.opacity=0;this._interactionsEnabled=false;}const triggerReveal=()=>{this._currentOpacity=0;this._targetOpacity=0;this.opacity=0;this._interactionsEnabled=false;if(this._activeAnnotation){this._hideTooltip(this._activeAnnotation);}setTimeout(()=>{this._targetOpacity=1;this._interactionsEnabled=true;},this.revealDelay*1e3);};if(this.hideAtStart){triggerReveal();}this.app.on("reveal:explode",triggerReveal,this);this.app.on("reveal:intro",triggerReveal,this);const{layers}=this.app.scene;const worldLayer=layers.getLayerByName("World");const createLayer=(name,semitrans)=>{const layer=new Layer({name});const idx=semitrans?layers.getTransparentIndex(worldLayer):layers.getOpaqueIndex(worldLayer);layers.insert(layer,idx+1);return layer};this._layers=[createLayer("HotspotBase",false),createLayer("HotspotOverlay",true)];if(this._camera===null){const cameraComponent=this.app.root.findComponent("camera");if(cameraComponent)this._camera=cameraComponent.entity;}if(this._camera){this._camera.camera.layers=[...this._camera.camera.layers,...this._layers.map(layer=>layer.id)];}this._mesh=Mesh.fromGeometry(this.app.graphicsDevice,new PlaneGeometry({widthSegments:1,lengthSegments:1}));this._tooltipDom=document.createElement("div");this._tooltipDom.className="pc-annotation";this._titleDom=document.createElement("div");this._titleDom.className="pc-annotation-title";this._tooltipDom.appendChild(this._titleDom);this._textDom=document.createElement("div");this._textDom.className="pc-annotation-text";this._tooltipDom.appendChild(this._textDom);this._parentDom.appendChild(this._tooltipDom);const onAnnotationAdd=annotation=>this._registerAnnotation(annotation);const onAnnotationRemove=annotation=>this._unregisterAnnotation(annotation);this.app.on("annotation:add",onAnnotationAdd);this.app.on("annotation:remove",onAnnotationRemove);const prerenderHandler=()=>{if(!this._camera)return;for(const[annotation,resources]of this._annotationResources){if(!annotation.enabled)continue;const position=annotation.entity.getPosition();const screenPos=this._camera.camera.worldToScreen(position);const{viewMatrix}=this._camera.camera;viewMatrix.transformPoint(position,vec);if(vec.z>=0){this._hideAnnotationElements(annotation,resources);continue}this._updateAnnotationPositions(annotation,resources,screenPos);this._updateAnnotationRotationAndScale(annotation);resources.materials[0].opacity=this._opacity;resources.materials[1].opacity=this._behindOpacity*this._opacity;resources.materials[0].setParameter("material_opacity",this._opacity);resources.materials[1].setParameter("material_opacity",this._behindOpacity*this._opacity);}};this.app.on("prerender",prerenderHandler);this.once("destroy",()=>{for(const annotation of this._annotationResources.keys()){this._unregisterAnnotation(annotation);}this.app.off("annotation:add",onAnnotationAdd);this.app.off("annotation:remove",onAnnotationRemove);this.app.off("prerender",prerenderHandler);this.app.off("reveal:explode",triggerReveal,this);this.app.off("reveal:intro",triggerReveal,this);if(this._tooltipDom){this._tooltipDom.remove();this._tooltipDom=null;}if(this._styleSheet){this._styleSheet.remove();this._styleSheet=null;}if(this._camera&&this._camera.camera){const layerIds=this._layers.map(layer=>layer.id);this._camera.camera.layers=this._camera.camera.layers.filter(id=>!layerIds.includes(id));}const{layers}=this.app.scene;this._layers.forEach(layer=>layers.remove(layer));this._layers=[];if(this._mesh){this._mesh.destroy();this._mesh=null;}});}constructor(...args){super(...args);_define_property$1(this,"_hotspotSize",25);_define_property$1(this,"_hotspotColor",new Color(.8,.8,.8));_define_property$1(this,"_hoverColor",new Color(1,.4,0));_define_property$1(this,"_opacity",1);_define_property$1(this,"_behindOpacity",.25);_define_property$1(this,"_currentOpacity",1);_define_property$1(this,"_targetOpacity",1);_define_property$1(this,"_interactionsEnabled",true);_define_property$1(this,"hideAtStart",true);_define_property$1(this,"revealDelay",3);_define_property$1(this,"fadeSpeed",2);_define_property$1(this,"_styleSheet",null);_define_property$1(this,"_parentDom",null);_define_property$1(this,"_camera",null);_define_property$1(this,"_tooltipDom",null);_define_property$1(this,"_titleDom",null);_define_property$1(this,"_textDom",null);_define_property$1(this,"_layers",[]);_define_property$1(this,"_mesh",null);_define_property$1(this,"_annotationResources",new Map);_define_property$1(this,"_activeAnnotation",null);_define_property$1(this,"_hoverAnnotation",null);}}_define_property$1(AnnotationManager,"scriptName","annotationManager");class Annotation extends Script{set label(value){this._label=value;this.fire("label:set",value);}get label(){return this._label}set title(value){this._title=value;this.fire("title:set",value);}get title(){return this._title}set text(value){this._text=value;this.fire("text:set",value);}get text(){return this._text}set zoomDistance(value){this._zoomDistance=value;}get zoomDistance(){return this._zoomDistance}postInitialize(){this.app.fire("annotation:add",this);this.once("destroy",()=>{this.app.fire("annotation:remove",this);this.off();});}constructor(...args){super(...args);_define_property$1(this,"_label","");_define_property$1(this,"_title","");_define_property$1(this,"_text","");_define_property$1(this,"_zoomDistance",1);}}_define_property$1(Annotation,"scriptName","annotation");

var Annotations = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Annotation: Annotation,
    AnnotationManager: AnnotationManager
});

function _define_property(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}class StreamedGsplat extends Script{initialize(){const app=this.app;this._currentPreset=platform.mobile?"low":"medium";app.scene.gsplat.radialSorting=true;app.scene.gsplat.lodUpdateAngle=90;app.scene.gsplat.lodBehindPenalty=5;app.scene.gsplat.lodUpdateDistance=1;app.scene.gsplat.lodUnderfillLimit=10;app.on("preset:ultra",()=>this._setPreset("ultra"),this);app.on("preset:high",()=>this._setPreset("high"),this);app.on("preset:medium",()=>this._setPreset("medium"),this);app.on("preset:low",()=>this._setPreset("low"),this);app.on("colorize:toggle",this._toggleColorize,this);this._applyResolution();if(!this.splatUrl){console.warn("[StreamedGsplat] No splatUrl provided.");}else {const mainAsset=new Asset("MainGsplat_asset","gsplat",{url:this.splatUrl});app.assets.add(mainAsset);app.assets.load(mainAsset);this._assets.push(mainAsset);mainAsset.ready(a=>{const wasEnabled=this.entity.enabled;this.entity.enabled=false;this.entity.addComponent("gsplat",{unified:true,lodDistances:this._getCurrentLodDistances(),asset:a});this.entity.enabled=wasEnabled;this._applyPreset();});}if(!this.environmentUrl){console.warn("[StreamedGsplat] No environmentUrl provided (skipping env child).");}else {const envAsset=new Asset("EnvironmentGsplat_asset","gsplat",{url:this.environmentUrl});app.assets.add(envAsset);app.assets.load(envAsset);this._assets.push(envAsset);envAsset.ready(a=>{const child=new Entity("EnvironmentGsplat");child.enabled=false;this.entity.addChild(child);this._children.push(child);child.addComponent("gsplat",{unified:true,lodDistances:this._getCurrentLodDistances(),asset:a});child.enabled=true;});}this.once("destroy",()=>{this.onDestroy();});}_getCurrentLodDistances(){let distances;switch(this._currentPreset){case"ultra":distances=this.ultraLodDistances;break;case"high":distances=this.highLodDistances;break;case"medium":distances=this.mediumLodDistances;break;case"low":distances=this.lowLodDistances;break;default:distances=[5,20,35,50,65,90,150];}return distances&&distances.length>0?distances:[5,20,35,50,65,90,150]}_getCurrentLodRange(){let range;switch(this._currentPreset){case"ultra":range=this.ultraLodRange;break;case"high":range=this.highLodRange;break;case"medium":range=this.mediumLodRange;break;case"low":range=this.lowLodRange;break;default:range=[0,5];}return range&&range.length>=2?range:[0,5]}_applyPreset(){const range=this._getCurrentLodRange();if(!range)return;const app=this.app;app.scene.gsplat.lodRangeMin=range[0];app.scene.gsplat.lodRangeMax=range[1];const lodDistances=this._getCurrentLodDistances();if(this.entity.gsplat){this.entity.gsplat.lodDistances=lodDistances;}for(let i=0;i<this._children.length;i++){const child=this._children[i];if(child&&child.gsplat){child.gsplat.lodDistances=lodDistances;}}}_setPreset(presetName){this._currentPreset=presetName;this._applyPreset();this.app.fire("ui:setPreset",presetName);}_applyResolution(){const device=this.app.graphicsDevice;const dpr=window.devicePixelRatio||1;device.maxPixelRatio=this._highRes?Math.min(dpr,2):dpr>=2?dpr*.5:dpr;this.app.resizeCanvas();}_toggleColorize(){this._colorize=!this._colorize;this.app.scene.gsplat.colorizeLod=this._colorize;const statusEl=document.getElementById("colorize-status");if(statusEl){statusEl.textContent=this._colorize?"On":"Off";}}update(){const rendered=this.app.stats.frame.gsplats||0;this.app.fire("ui:updateStats",rendered);}onDestroy(){this.app.off("preset:ultra");this.app.off("preset:high");this.app.off("preset:medium");this.app.off("preset:low");this.app.off("colorize:toggle");for(let i=0;i<this._assets.length;i++){const a=this._assets[i];if(a){a.unload();this.app.assets.remove(a);}}this._assets.length=0;if(this.entity.gsplat){this.entity.removeComponent("gsplat");}for(let j=0;j<this._children.length;j++){const c=this._children[j];if(c&&c.destroy)c.destroy();}this._children.length=0;}constructor(...args){super(...args);_define_property(this,"splatUrl","");_define_property(this,"environmentUrl","");_define_property(this,"ultraLodDistances",[5,20,35,50,65,90,150]);_define_property(this,"highLodDistances",[5,20,35,50,65,90,150]);_define_property(this,"mediumLodDistances",[5,7,12,25,75,120,200]);_define_property(this,"lowLodDistances",[5,7,12,25,75,120,200]);_define_property(this,"ultraLodRange",[0,5]);_define_property(this,"highLodRange",[1,5]);_define_property(this,"mediumLodRange",[2,5]);_define_property(this,"lowLodRange",[3,5]);_define_property(this,"_assets",[]);_define_property(this,"_children",[]);_define_property(this,"_highRes",false);_define_property(this,"_colorize",false);}}_define_property(StreamedGsplat,"scriptName","streamedGsplat");

var streamedGsplat = /*#__PURE__*/Object.freeze({
    __proto__: null,
    StreamedGsplat: StreamedGsplat
});

export { Annotations as A, cameraFocus as a, cameraControls as b, cameraFrame as c, uiHoverGlow as d, gsplatShaderEffect as g, picker as p, revealRadial as r, streamedGsplat as s, uiTriggerButton as u };
