/*** Marshmallow Alpha ***/
// Mushroom v4.05 
let Mushroom = (primarySettings)=> {function Color(color){var colors={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};switch(true){case/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color):return hexToHSL(color);break;case/^hsla?\(((\d+(?:\.\d+)?)|\d+)%?\s*,\s*((\d+(?:\.\d+)?)|\d+)%?\s*,\s*((\d+(?:\.\d+)?)|\d+)%?(?:\s*,\s*((\d+(?:\.\d+)?)|\d+)%?)?\)$/i.test(color):return hslToHsl(color);break;case/^rgba?\(((\d+(?:\.\d+)?)|\d+)\s*,\s*((\d+(?:\.\d+)?)|\d+)\s*,\s*((\d+(?:\.\d+)?)|\d+)(?:\s*,\s*((\d+(?:\.\d+)?)|\d+)%?)?\)$/i.test(color):return rgbToHsl(color);break;case Object.keys(colors).includes(color.replaceAll(" ","").toLowerCase()):return colorNameToHsl(color);break;default:console.warn(`Mushroom:The "${color}" color wasn't found!`);return undefined}function hexToHSL(hex){if(hex.length==4){hex=hex.replace(/^#(.)(.)(.)$/,"#$1$1$2$2$3$3")}if(hex.length==5){hex=hex.replace(/^#(.)(.)(.)(.)$/,"#$1$1$2$2$3$3$4$4")}if(hex.length==7){var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)}if(hex.length==9){var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)}var r=parseInt(result[1],16);var g=parseInt(result[2],16);var b=parseInt(result[3],16);r/=255,g/=255,b/=255;var max=Math.max(r,g,b),min=Math.min(r,g,b);var h,s,l=(max+min)/2;if(max==min){h=s=0}else{var d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break}h/=6}h=Math.round(h*360);s=Math.round(s*100);l=Math.round(l*100);if(hex.length==5||hex.length==9){var a=Number(parseInt(hex.substring(7,9),16)/255).toFixed(4);return{h:h,s:s,l:l,a:a}}else{return{h:h,s:s,l:l}}}function rgbToHsl(rgb){if(rgb.includes("rgba")){var nums=rgb.substring(5,rgb.length-1).split(",")}else{var nums=rgb.substring(4,rgb.length-1).split(",")}var r=parseInt(nums[0]);var g=parseInt(nums[1]);var b=parseInt(nums[2]);r/=255;g/=255;b/=255;var max=Math.max(r,g,b);var min=Math.min(r,g,b);var h,s,l=(max+min)/2;if(max==min){h=s=0}else{var d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break}h/=6}h=Math.round(h*360);s=Math.round(s*100);l=Math.round(l*100);if(rgb.includes("rgba")){var a=nums[3];if(a==undefined){a=1}if(a>1){a=1}return{h:h,s:s,l:l,a:a}}else{return{h:h,s:s,l:l,a:1}}}function hslToHsl(hsl){if(hsl.includes("hsla")){var nums=hsl.substring(5,hsl.length-1).split(",")}else{var nums=hsl.substring(4,hsl.length-1).split(",")}var h=parseInt(nums[0]);var s=parseInt(nums[1]);var l=parseInt(nums[2]);if(hsl.includes("hsla")){var a=Number(nums[3]).toFixed(4);if(a==undefined){a=1}return{h:h,s:s,l:l,a:a}}else{return{h:h,s:s,l:l,a:1}}}function colorNameToHsl(colorName){return hexToHSL(colors[colorName.replaceAll(" ","").toLowerCase()])}}function toHex(h,s,l,a=1){h/=360;s/=100;l/=100;var r,g,b;if(s===0){r=g=b=l}else{var hue2rgb=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p};var q=l<.5?l*(1+s):l+s-l*s;var p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3)}var toHex=x=>{var hex=Math.round(x*255).toString(16);return hex.length===1?"0"+hex:hex};if(a!==1){return`#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`}else{return`#${toHex(r)}${toHex(g)}${toHex(b)}`}}function ThemeColor(color,customColor,darkmode,colorScheme){var{h:h,s:s,l:l}=Color(color);var accentName=["primary","secondary","tertiary","quaternary"];var accentCount=3;var accentHue=[0,30,-30];var mode=false;var result={};switch(colorScheme.toLowerCase()){case"analogous":accentCount=3;accentHue=[0,30,-30];break;case"complementary":accentCount=2;accentHue=[0,180];break;case"tetradic":accentCount=4;accentHue=[0,60,180,240];break;case"compound":accentCount=3;accentHue=[0,150,-150];break;case"split-complementary":accentCount=4;accentHue=[0,30,180,210];break;case"monochromatic":accentCount=1;accentHue=[0];break;case"triadic":accentCount=3;accentHue=[0,120,-120];break;case"square":accentCount=4;accentHue=[0,90,-90,180];break}switch(darkmode){case true:mode="dark";break;case false:mode="light";break;case"auto":if(window.matchMedia){mode=window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"}else{mode="light"}break}var data={name:{accent:accentName.slice(0,accentCount),error:"error",glass:"glass",surface:"surface",background:"background",outline:"outline",custom:[]},hue:{accent:accentHue.map((i=>i+h>360?i+h-360:i+h)),error:0,glass:h,surface:h,background:h,outline:h,custom:[]},saturation:{accent:s,error:100,glass:[[s/3,s/3],[s/3,s/3],[s,s]],surface:[s/3,s/3,s/3,s/3,s/2],background:s/3,outline:[s/3,s/2],fixed:[s,s/1.5],custom:[],customFixed:[[],[]]},lightness:{light:{accent:[[35,100],[80+l/10,20-l/10]],glass:[[90+l/10,10-l/10],[80+l/10,20-l/10],[70,10]],surface:[[85+l/10,30-l/10],[83+l/10,30-l/10],[80+l/10,30-l/10],[78+l/10,30-l/10],[70+l/10,30-l/10]],background:[90+l/10,10-l/10],outline:[60,80],inverse:[70,10],inverseSurface:[15+l/10,80-l/10]},dark:{accent:[[70,10],[20-l/10,70+l/10]],glass:[[10-l/10,85+l/10],[30-l/10,70+l/10],[35,90]],surface:[[15-l/10,65+l/10],[17-l/10,65+l/10],[19-l/10,65+l/10],[21-l/10,65+l/10],[30-l/10,65+l/10]],background:[10-l/10,70+l/10],outline:[40,20],inverse:[35,100],inverseSurface:[85-l/10,25+l/10]},fixed:[[70,10],[50,100]]},alpha:{accent:1,error:1,glass:[[.6,.8],[.6,.8],[.6,.8]],surface:1,background:1,outline:1,inverse:1,fixed:1,custom:[]},flag:{a:["","on-"],b:["","-container"],c:["","-container-low","-container","-container-high","-variant"],d:["","-container","-variant"],e:["","-variant"],f:"inverse-",g:["-fixed","-fixed-dim"]}};for(var i in data.name.accent){for(var j in data.flag.b){for(var k in data.flag.a){result[data.flag.a[k]+data.name.accent[i]+data.flag.b[j]]=toHex(data.hue.accent[i],data.saturation.accent,data.lightness[mode].accent[j][k],data.alpha.accent)}}}for(var i in data.flag.b){for(var j in data.flag.a){result[data.flag.a[j]+data.name.error+data.flag.b[i]]=toHex(data.hue.error,data.saturation.error,data.lightness[mode].accent[i][j],data.alpha.error)}}for(var i in data.name.accent){for(var j in data.flag.a){result[data.flag.a[j]+data.flag.f+data.name.accent[i]]=toHex(data.hue.accent[i],data.saturation.accent,data.lightness[mode].inverse[j],data.alpha.accent)}}for(var i in data.name.error){for(var j in data.flag.a){result[data.flag.a[j]+data.flag.f+data.name.error]=toHex(data.hue.error,data.saturation.error,data.lightness[mode].inverse[j],data.alpha.error)}}for(var j in data.flag.a){result[data.flag.a[j]+data.flag.f+data.name.surface]=toHex(data.hue.surface,data.saturation.surface[1],data.lightness[mode].inverseSurface[j],data.alpha.surface)}for(var i in data.name.accent){for(var j in data.flag.g){for(var k in data.flag.a){result[data.flag.a[k]+data.name.accent[i]+data.flag.g[j]]=toHex(data.hue.accent[i],data.saturation.fixed[j],data.lightness.fixed[j][k],data.alpha.accent)}}}for(var i in data.name.error){for(var j in data.flag.g){for(var k in data.flag.a){result[data.flag.a[k]+data.name.error+data.flag.g[j]]=toHex(data.hue.error,data.saturation.fixed[j],data.lightness.fixed[j][k],data.alpha.error)}}}for(var i in data.flag.c){for(var j in data.flag.a){result[data.flag.a[j]+data.name.surface+data.flag.c[i]]=toHex(data.hue.surface,data.saturation.surface[i],data.lightness[mode].surface[i][j],data.alpha.surface)}}for(var i in data.flag.a){result[data.flag.a[i]+data.name.background]=toHex(data.hue.background,data.saturation.background,data.lightness[mode].background[i],data.alpha.background)}for(var i in data.flag.d){for(var j in data.flag.a){result[data.flag.a[j]+data.name.glass+data.flag.d[i]]=toHex(data.hue.glass,data.saturation.glass[i][j],data.lightness[mode].glass[i][j],data.alpha.glass[i][j])}}for(var i in data.flag.e){result[data.name.outline+data.flag.e[i]]=toHex(data.hue.outline,data.saturation.outline[i],data.lightness[mode].outline[i],data.alpha.outline)}for(var i in customColor){var limit=Object.keys(result);var allowed=["primary","secondary","tertiary","quaternary","error"];if(limit.includes(i)==false||allowed.includes(i)){data.name.custom.push(i);data.hue.custom.push(Color(customColor[i]).h);data.saturation.custom.push(Color(customColor[i]).s);data.alpha.custom.push(Color(customColor[i]).a);data.saturation.customFixed[0].push(Color(customColor[i]).s);data.saturation.customFixed[1].push(Color(customColor[i]).s/1.5)}else{console.warn(`Mushroom:You cannot use the "${i}" color.`)}}for(var i in data.name.custom){for(var j in data.flag.b){for(var k in data.flag.a){result[data.flag.a[k]+data.name.custom[i]+data.flag.b[j]]=toHex(data.hue.custom[i],data.saturation.custom[i],data.lightness[mode].accent[j][k],data.alpha.custom[i])}}}for(var i in data.name.custom){for(var j in data.flag.a){result[data.flag.a[j]+data.flag.f+data.name.custom[i]]=toHex(data.hue.custom[i],data.saturation.custom[i],data.lightness[mode].inverse[j],data.alpha.custom[i])}}for(var i in data.name.custom){for(var j in data.flag.g){for(var k in data.flag.a){result[data.flag.a[k]+data.name.custom[i]+data.flag.g[j]]=toHex(data.hue.custom[i],data.saturation.customFixed[j][i],data.lightness.fixed[j][k],data.alpha.custom[i])}}}return result}function Palette(color,customColor,darkmode,colorScheme,parts,reversePalette){var{h:h,s:s,l:l}=Color(color);var accentName=["primary","secondary","tertiary","quaternary"];var accentCount=3;var accentHue=[0,30,-30];var mode=false;var result={};switch(colorScheme.toLowerCase()){case"analogous":accentCount=3;accentHue=[0,30,-30];break;case"complementary":accentCount=2;accentHue=[0,180];break;case"tetradic":accentCount=4;accentHue=[0,60,180,240];break;case"compound":accentCount=3;accentHue=[0,150,-150];break;case"split-complementary":accentCount=4;accentHue=[0,30,180,210];break;case"monochromatic":accentCount=1;accentHue=[0];break;case"triadic":accentCount=3;accentHue=[0,120,-120];break;case"square":accentCount=4;accentHue=[0,90,-90,180];break}switch(darkmode){case true:mode=true;break;case false:mode=false;break;case"auto":if(window.matchMedia){mode=window.matchMedia("(prefers-color-scheme:dark)").matches}else{mode=false}break}var data={name:{accent:accentName.slice(0,accentCount),error:"error",custom:[],neutral:["neutral","neutral-variant"]},hue:{accent:accentHue.map((i=>i+h>360?i+h-360:i+h)),error:0,custom:[],neutral:h},saturation:{accent:s,error:100,custom:[],neutral:[s/4,s/2]},alpha:{accent:1,error:1,custom:[],neutral:1}};for(var i in customColor){data.name.custom.push(i);data.hue.custom.push(Color(customColor[i]).h);data.saturation.custom.push(Color(customColor[i]).s);data.alpha.custom.push(Color(customColor[i]).a)}if(!reversePalette||!mode){for(var i in data.name.accent){for(var j in parts){result[data.name.accent[i]+"-"+parts[j]]=toHex(data.hue.accent[i],data.saturation.accent,parts[j],data.alpha.accent)}}for(var i in parts){result[data.name.error+"-"+parts[i]]=toHex(data.hue.error,data.saturation.error,parts[i],data.alpha.error)}for(var i in data.name.custom){for(var j in parts){result[data.name.custom[i]+"-"+parts[j]]=toHex(data.hue.custom[i],data.saturation.custom[i],parts[j],data.alpha.custom[i])}}for(var i in data.name.neutral){for(var j in parts){result[data.name.neutral[i]+"-"+parts[j]]=toHex(data.hue.neutral,data.saturation.neutral[i],parts[j],data.alpha.neutral)}}}else if(mode){for(var i in data.name.accent){for(var j in parts){result[data.name.accent[i]+"-"+parts[j]]=toHex(data.hue.accent[i],data.saturation.accent,parts[parts.length-1]-parts[j],data.alpha.accent[i])}}for(var i in parts){result[data.name.error+"-"+parts[i]]=toHex(data.hue.error,data.saturation.error,parts[parts.length-1]-parts[i],data.alpha.error)}for(var i in data.name.custom){for(var j in parts){result[data.name.custom[i]+"-"+parts[j]]=toHex(data.hue.custom[i],data.saturation.custom[i],parts[parts.length-1]-parts[j],data.alpha.custom[i])}}for(var i in data.name.neutral){for(var j in parts){result[data.name.neutral[i]+"-"+parts[j]]=toHex(data.hue.neutral,data.saturation.neutral[i],parts[parts.length-1]-parts[j],data.alpha.neutral)}}}return result}function GetColorOfImage(img){var minDimension=50;var scaleWidth=minDimension/img.width;var scaleHeight=minDimension/img.height;var scale=Math.max(scaleWidth,scaleHeight);var newWidth=Math.floor(img.width*scale);var newHeight=Math.floor(img.height*scale);var canvas=document.createElement("canvas");var ctx=canvas.getContext("2d");canvas.width=newWidth;canvas.height=newHeight;ctx.drawImage(img,0,0,canvas.width,canvas.height);ctx.imageSmoothingEnabled=false;var imageData=ctx.getImageData(0,0,canvas.width,canvas.height);var hsl=[];for(var i=0;i<imageData.data.length;i+=4){var r=imageData.data[i];var g=imageData.data[i+1];var b=imageData.data[i+2];var rgb=`rgb(${r},${g},${b})`;hsl.push(Color(rgb))}function FilterAccentColor(hsl){var f1=hsl.filter((color=>color.l<=80&&color.l>=20));var f2=f1.filter((color=>color.s>=20));var uniqueColors=new Map;var f3=f2.filter((color=>{var key=`${color.h}-${color.s}`;if(!uniqueColors.has(key)){uniqueColors.set(key,color);return false}return true}));var f3=f3.sort(((a,b)=>a.s-b.s));var f4=f3.filter(((color,index)=>{for(var i=index+1;i<f3.length;i++){const hDiff=Math.abs(color.h-f3[i].h);const normalizedDiff=Math.min(hDiff,360-hDiff);if(normalizedDiff<20){return false}}return true}));var f5=f4.sort(((a,b)=>b.s-a.s)).slice(0,6);var colors=[];for(var i of f4){colors.push(toHex(i.h,i.s,i.l))}return colors}function FilterNeutraColor(hsl){var f1=hsl.filter((color=>color.l<=99&&color.l>=80||color.l<=20&&color.l>=1));var f2=f1.filter((color=>color.s<30));var uniqueColors=new Map;var f3=f2.filter((color=>{var key=`${color.h}-${color.s}`;if(!uniqueColors.has(key)){uniqueColors.set(key,color);return false}return true}));var f3=f3.sort(((a,b)=>a.s-b.s));var f4=f3.filter(((color,index)=>{for(var i=index+1;i<f3.length;i++){const hDiff=Math.abs(color.h-f3[i].h);const normalizedDiff=Math.min(hDiff,360-hDiff);if(normalizedDiff<20){return false}}return true}));var f5=f4.sort(((a,b)=>b.s-a.s)).slice(0,3);var colors=[];for(var i of f4){colors.push(toHex(i.h,i.s,i.l))}return colors}var obj={accent:FilterAccentColor(hsl),neutra:FilterNeutraColor(hsl)};return obj}function Code(OBJ){var keys=Object.keys(OBJ);var values=Object.values(OBJ);var CODE=`${M.addTo!==null?M.addTo:":root"}{\n`;var prefix=M.prefix==""?"":M.prefix+"-";for(var i in keys){CODE+=`   --${prefix}${keys[i]}: ${values[i]};\n`}CODE+="}";return CODE}function Sprout(){var arr=["#",".",":","<",">","[","]","(",")",'"',"'","=","$","*","-","~",","];var str=M.addTo;str=str.replace(/\s/g,"");var ID=str;for(var i in arr){ID=ID.replaceAll(arr[i],i)}var CSS=document.querySelector(`#MUSHROOM-STYLE-${ID}`);if(CSS==null){CSS=document.createElement("style");CSS.id=`MUSHROOM-STYLE-${ID}`;var head=document.querySelector("head");head.appendChild(CSS)}var code=`/**** Mushroom v${M.version} ****/`;for(var x in arguments){code+="\n"+arguments[x]}if(M.addTo!==null){CSS.innerHTML=code}return code}var M={version:4.05,growTimes:0,code:"",themeColor:{},palette:{},hue:()=>Color(M.color).h,saturation:()=>Color(M.color).s,lightness:()=>Color(M.color).l,setColor:x=>{if(Color(x)!==undefined){M.color=x;Grow()}},setDarkmode:x=>{M.darkmode=x;Grow()},toggleMode:()=>{var mode=M.darkmode;var newMode;if(mode=="auto"){if(window.matchMedia){newMode=!window.matchMedia("(prefers-color-scheme:dark)").matches}else{newMode=true}}else{newMode=!mode?true:false}M.darkmode=newMode;Grow()},setParts:x=>{M.parts=x;Grow()},setPalette:x=>{M.hasPalette=x;Grow()},setReversePalette:x=>{M.reversePalette=x;Grow()},setHue:x=>{M.color=`hsl(${x},${Color(M.color).s}%,${Color(M.color).l}%)`;M.hue=x;Grow()},setSaturation:x=>{M.color=`hsl(${Color(M.color).h},${x}%,${Color(M.color).l}%)`;M.saturation=x;Grow()},setLightness:x=>{M.color=`hsl(${Color(M.color).h},${Color(M.color).s}%,${x}%)`;M.lightness=x;Grow()},random:x=>{var h=Math.round(Math.random()*360);var s=Math.round(Math.random()*100);var l=Math.round(Math.random()*100);M.setColor(toHex(h,s,l))},addCustomColor:obj=>{var keys=Object.keys(obj);var values=Object.values(obj);for(var i in keys){M.customColor[keys[i].replaceAll(" ","")]=values[i]}Grow()},setColorScheme:x=>{M.colorScheme=x;Grow()},clearCustomColor:()=>{M.customColor={};Grow()},setDynamicColor:img=>{M.setColorScheme("monochromatic");var dynamicColor=GetColorOfImage(img);var accentColor=dynamicColor.accent;var neutraColor=dynamicColor.neutra;var accentName=["secondary","tertiary","quaternary"];M.clearCustomColor();if(accentColor.length==0&&neutraColor.length==0){console.warn("Mushroom:No color found in the image")}else{if(accentColor.length==0){M.setColor(neutraColor[0])}else if(accentColor.length==1){M.setColor(accentColor[0])}else if(accentColor.length>1){M.setColor(accentColor[0]);accentColor.shift();var obj={};for(var i=0;i<Math.min(accentColor.length,3);i++){obj[accentName[i]]=accentColor[i]}M.addCustomColor(obj)}}}};var settings={color:"blue violet",addTo:":root",prefix:"",darkmode:"auto",hasPalette:false,reversePalette:false,parts:[0,10,20,30,40,50,60,70,80,90,100],colorScheme:"Analogous",customColor:{}};var availableSettings=Object.keys(settings);for(var i in settings){M[i]=settings[i]}for(var i in primarySettings){if(availableSettings.includes(i)){M[i]=primarySettings[i]}else{console.warn(`Mushroom:You Can't use "${i}" in primarySettings`)}}var PCS=window.matchMedia("(prefers-color-scheme:dark)");PCS.onchange=e=>{if(M.darkmode==="auto")Grow()};function Grow(){var startTime=performance.now();var mode;switch(M.darkmode){case true:mode=true;break;case false:mode=false;break;case"auto":if(window.matchMedia){mode=window.matchMedia("(prefers-color-scheme:dark)").matches}else{console.warn('Mushroom:Your browser do not support "Auto Darkmode"');mode=false}break}var themeColor=ThemeColor(M.color,M.customColor,mode,M.colorScheme);if(M.hasPalette){var palette=Palette(M.color,M.customColor,mode,M.colorScheme,M.parts,M.reversePalette);if(M.addTo!==null){var code=Sprout(Code(themeColor),Code(palette))}}else{if(M.addTo!==null){var code=Sprout(Code(themeColor))}}M.hue=Color(M.color).h;M.saturation=Color(M.color).s;M.lightness=Color(M.color).l;M.themeColor=themeColor;M.palette=palette;M.code=code;M.growTimes=Number((performance.now()-startTime).toFixed(1));return M}Grow();return M}

// Marshmallow 
let MARSHMALLOW = () => {
   // storage
   let saveStorage = (obj) => {
      localStorage.setItem('Marshmallow', JSON.stringify(obj));
   }
   let getStorage = () => {
      return JSON.parse(localStorage.getItem('Marshmallow'));
   }
   let setStorage = (x, y) => {
      storage[x] = y;
      localStorage.setItem('Marshmallow', JSON.stringify(storage));
   }
   let defaultData = {
      darkmode: 'auto',
      blackUI: false,
      fontSize: 14,
      radius: 8,
      freeze: true
   }
   let storage = getStorage();
   if (!storage) saveStorage(defaultData);
   let ApplySettings = () => {
      let root = document.querySelector(':root');
      root.style.setProperty('--m-font-size', storage.fontSize);
      root.style.setProperty('--m-radius', storage.radius);
   }
   ApplySettings();
   // Mushroom 
   let lowLightness = 0;
   let highLightness = 100;
   let freezeTime = 50;
   let M = Mushroom({
      prefix: 'm',
      color: 'pink',
      darkmode: storage.darkmode,
      colorScheme: 'Analogous',
      hasPalette: true,
      reversePalette: true,
      parts: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
   });
   let FM = Mushroom({
      addTo: '.m-fixed',
      prefix: 'm',
      color: 'pink',
      darkmode: storage.darkmode,
      colorScheme: 'Analogous',
      hasPalette: true,
      reversePalette: false,
      parts: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
   });
   M.setLightness(lowLightness);
   FM.setLightness(lowLightness);
   let Freeze = () => {
      document.querySelectorAll('*').forEach(elm => {
         elm.style.setProperty('transition', '0s');
         setTimeout(() => {
            elm.style.removeProperty('transition');
            if (elm.getAttribute('style') == '') elm.removeAttribute('style');
         }, freezeTime)
      })
   }
   return {
      setColor: (x) => {
         if (storage.freeze) Freeze();
         M.setColor(x);
         FM.setColor(x);
         M.setLightness(lowLightness);
         FM.setLightness(lowLightness);
      },
      setDarkmode: (x) => {
         if (storage.freeze) Freeze();
         M.setDarkmode(x);
         setStorage('darkmode', x)
      },
      toggleDarkmode: () => {
         if (storage.freeze) Freeze();
         M.toggleMode();
         setStorage('darkmode', M.darkmode);
      },
      setBlackUI: (x) => {
         if (storage.freeze) Freeze();
         if (x) {
            M.lightness(highLightness);
         } else {
            M.lightness(lowLightness);
         }
         setStorage('blackUI', x)
      },
      setColorScheme: (x) => {
         if (storage.freeze) Freeze();
         M.setColorScheme(x);
         FM.setColorScheme(x);
         setStorage('colorScheme', x);
      },
      setDynamicColor: (img) => {
         if (storage.freeze) Freeze();
         M.setDynamicColor(img);
         FM.setDynamicColor(img);
      },
      setFontSize: (x) => {
         setStorage('fontSize', x);
         ApplySettings();
      },
      setRadius: (x) => {
         setStorage('radius', x);
         ApplySettings();
      },
      setFreeze: (x) => {
         setStorage('freeze', x);
      },
      Mushroom: M,
      fixedMushroom: FM,
   }
};
let Marshmallow = MARSHMALLOW();
Marshmallow.setColorScheme('square');

// Components 
class MBtn extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open' });
   }
   static get observedAttributes() {
      return ['color','size','shadow','badge','icon','disabled'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      this.render();
   }
   connectedCallback() {
      this.render();
   }
   render() {
      this.shadowRoot.innerHTML = `
         <button part="button" ${this.hasAttribute('disabled')?'disabled':''}>
            ${this.getAttribute('badge') ? `<span part="badge">${this.getAttribute('badge')}</span>`:''}
            ${this.getAttribute('icon') ? `<span part="icon">${this.getAttribute('icon')}</span>`:''}
            <slot part="text"></slot>
         </button>
      `;
    
      let button = this.shadowRoot.querySelector('button');
      let arr = ['color','size','shadow','badge','icon'];
      Array.from(this.attributes).forEach(attr => {
         if (!arr.includes(attr.name)) {
            button.setAttribute(attr.nane, attr.value);
         }
      });
   }
}
customElements.define('m-btn', MBtn);

// Add-On (...)
