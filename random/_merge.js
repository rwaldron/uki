uki={};uki.component={};(function(){var D=uki.geometry={};var C=D.Point=function(E,F){this.x=E||0;this.y=F||0};C.prototype={toString:function(){return"{"+this.x+", "+this.y+"}"},clone:function(){return new C(this.x,this.y)},eq:function(E){return this.x==E.x&&this.y==E.y},constructor:C};C.fromString=function(F){var E=F.indexOf(",");return new C(parseFloat(F.substr(1,E-1),10),parseFloat(F.substr(E+1),10))};var A=D.Size=function(F,E){this.width=F||0;this.height=E||0};A.prototype={toString:function(){return"{"+this.width+", "+this.height+"}"},clone:function(){return new A(this.width,this.height)},eq:function(E){return this.width==E.width&&this.height==E.height},isEmpty:function(){return this.width<=0||this.height<=0},constructor:A};A.fromString=function(F){var E=F.indexOf(",");return new A(parseFloat(F.substr(1,E-1),10),parseFloat(F.substr(E+1),10))};var B=D.Rect=function(E,F){this.origin=E||new C();this.size=F||new A()};B.prototype={toString:function(){return"{"+this.origin+", "+this.size+"}"},clone:function(){return new B(this.origin.clone(),this.size.clone())},minX:function(E){if(typeof E!="undefined"){this.origin.x=E}return this.origin.x},maxX:function(){return this.origin.x+this.size.width},midX:function(){return this.origin.x+this.size.width/2},minY:function(E){if(typeof E!="undefined"){this.origin.y=E}return this.origin.y},midY:function(){return this.origin.y+this.size.height/2},maxY:function(){return this.origin.y+this.size.height},width:function(E){if(typeof E!="undefined"){this.size.width=E}return this.size.width},height:function(E){if(typeof E!="undefined"){this.size.height=E}return this.size.height},isEmpty:function(){return this.size.width<=0||this.size.height<=0},eq:function(E){return this.size.eq(E.size)&&this.origin.eq(E.origin)},inset:function(F,E){this.origin.x+=F;this.origin.y+=E;this.size.width-=F*2;this.size.height-=E*2},intersection:function(G){var E=new C(Math.max(this.origin.x,G.origin.x),Math.max(this.origin.y,G.origin.y)),F=new A(Math.min(this.maxX(),G.maxX())-E.x,Math.min(this.maxY(),G.maxY())-E.y);return F.isEmpty()?new B():new B(E,F)},union:function(E){return B.fromCoords(Math.min(this.origin.x,E.origin.x),Math.min(this.origin.y,E.origin.y),Math.max(this.origin.maxX(),E.origin.maxX()),Math.max(this.origin.maxY(),E.origin.maxY()))},containsPoint:function(E){return ;E.x>=this.minX()&&E.x<=this.maxX()&&E.y>=this.minY()&&E.y<=this.maxY()},containsRect:function(E){return this.eq(this.union(E))},constructor:B};B.prototype.left=B.prototype.minX;B.prototype.top=B.prototype.minY;B.fromParts=function(F,H,G,E){return new B(new C(F,H),new A(G,E))};B.fromCoords=function(E,H,G,F){return new B(new C(E,H),new A(G-E,F-H))};B.fromString=function(F){var E=F.indexOf(",",F.indexOf(",")+1);return new B(C.fromString(F.substr(1,E-1)),A.fromString(F.substr(E+2,F.length-E-2)))}})();uki.layout=new function(){this.queue=[];this.schedule=function(B,A){this.queue[this.queue.length]=[B,A]};this.perform=function(){var A=this.queue,D,C;for(var B=0;B<A.length;B++){D=A[B][0];C=A[B][1];if(C.left){D.left=C.left+"px"}if(C.top){D.top=C.top+"px"}if(C.width){D.width=C.width+"px"}if(C.height){D.height=C.height+"px"}}this.queue=[]}};uki.core={};(function(){var B=Object.prototype.toString;var A=uki.core.utils={isFunction:function(C){return B.call(C)==="[object Function]"},isArray:function(C){return B.call(C)==="[object Array]"},trim:function(C){return(C||"").replace(/^\s+|\s+$/g,"")},escapeHTML:function(D){var C={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"};return D.replace(/[&<>\"\']/g,function(E){return C[E]})},each:function(D,I,F){var C,E=0,G=D.length;if(G===undefined){for(C in D){if(I.call(F||D[C],C,D[C])===false){break}}}else{for(var H=D[0];E<G&&I.call(F||H,E,H)!==false;H=D[++E]){}return D}},inArray:function(E,F){for(var C=0,D=F.length;C<D;C++){if(F[C]===E){return C}}return -1},unique:function(I){var D=[],C={};try{for(var E=0,F=I.length;E<F;E++){var H=I[E];if(!C[H]){C[H]=true;D.push(I[E])}}}catch(G){D=I}return D},grep:function(C,G){var D=[];for(var E=0,F=C.length;E<F;E++){if(G(C[E],E)){D.push(C[E])}}return D},map:function(C,I,F){var D=[];for(var E=0,G=C.length;E<G;E++){var H=I.call(F||C[E],C[E],E);if(H!=null){D[D.length]=H}}return D.concat.apply([],D)},extend:function(){var G=arguments[0]||{},E=1,F=arguments.length,D;for(;E<F;E++){if((D=arguments[E])!=null){for(var C in D){var H=D[C];if(G===H){continue}else{if(H!==undefined){G[C]=H}}}}}return G}};A.extend(uki,A)})();(function(){ANCHOR_TOP=1;ANCHOR_RIGHT=2;ANCHOR_BOTTOM=4;ANCHOR_LEFT=8;AUTOSIZE_WIDTH=1;AUTOSIZE_HEIGHT=2;var C=uki.layout,A=uki.core.utils,B=uki.component.Base=function(){this.init.apply(this,arguments)};B.prototype=new function(){this.defaultCss="position:absolute;overflow:hidden;top:0;left:0;z-index:100;";this.init=function(D){this._anchors=0;this._autosize=0;this._parent=null;this._rect=D||null;this._children=[];if(D){this.initWithRect(D)}};this.addChild=function(D){D.parent(this);this._children.push(D)};this.parent=function(D){if(arguments.length==0){return this._parent}if(this._parent){this._parent.removeChild(this._dom)}this._parent=D;D._dom.appendChild(this._dom)};this.initWithRect=function(D){this._rect=D;this._domCreate()};this.rect=function(F){if(arguments.length==0){return this._rect}if(F.eq(this._rect)){return }this._domResize(F);var E=this._rect.size.clone();this._rect=F;for(var D=0;D<this._children.length;D++){this._children[D].resizeWithOldSize(E)}};this.dom=function(){return this._dom};this.domStyle=function(){return this._domStyle};this._domResize=function(E){var D={};C.schedule(this._domStyle,{left:E.origin.x,top:E.origin.y,width:E.size.width,height:E.size.height})};this._domCreate=function(){this._dom=document.createElement("div");this._domStyle=this._dom.style;this._domStyle.cssText=this.defaultCss;this._domResize(this._rect)};this.resizeWithOldSize=function(H){if(!this._anchors&&!this._autosize){return }var G=this._parent.rect(),F=this._rect.clone(),E=(G.size.width-H.width)/((this._anchors&ANCHOR_LEFT^ANCHOR_LEFT?1:0)+(this._autosize&AUTOSIZE_WIDTH?1:0)+(this._anchors&ANCHOR_RIGHT^ANCHOR_RIGHT?1:0)),D=(G.size.height-H.height)/((this._anchors&ANCHOR_TOP^ANCHOR_TOP?1:0)+(this._autosize&AUTOSIZE_HEIGHT?1:0)+(this._anchors&ANCHOR_BOTTOM^ANCHOR_BOTTOM?1:0));if(this._anchors&ANCHOR_LEFT^ANCHOR_LEFT){F.origin.x+=E}if(this._autosize&AUTOSIZE_WIDTH){F.size.width+=E}if(this._anchors&ANCHOR_TOP^ANCHOR_TOP){F.origin.y+=D}if(this._autosize&AUTOSIZE_HEIGHT){F.size.height+=D}this.rect(F)};this.anchors=function(E){if(arguments.length==0){var D=[];if(this._anchors|ANCHOR_LEFT){D.push("left")}if(this._anchors|ANCHOR_TOP){D.push("top")}if(this._anchors|ANCHOR_RIGHT){D.push("right")}if(this._anchors|ANCHOR_BOTTOM){D.push("bottom")}return D.join(" ")}else{E=E.split(" ");this._anchors=0;if(A.inArray("top",E)>-1){this._anchors=this._anchors|ANCHOR_TOP}if(A.inArray("right",E)>-1){this._anchors=this._anchors|ANCHOR_RIGHT}if(A.inArray("bottom",E)>-1){this._anchors=this._anchors|ANCHOR_BOTTOM}if(A.inArray("left",E)>-1){this._anchors=this._anchors|ANCHOR_LEFT}}};this.autosize=function(D){if(arguments.length==0){if(this._autosize|AUTOSIZE_WIDTH&&this._autosize|AUTOSIZE_HEIGHT){return"width height"}if(this._autosize|AUTOSIZE_WIDTH){return"width"}if(this._autosize|AUTOSIZE_HEIGHT){return"height"}return""}else{this._autosize=0;D=D.split(" ");if(A.inArray("width",D)>-1){this._autosize=this._autosize|AUTOSIZE_WIDTH}if(A.inArray("height",D)>-1){this._autosize=this._autosize|AUTOSIZE_HEIGHT}}}}})();(function(){var B=uki.component.Base.prototype,A=uki.component.Textarea=function(){this.init.apply(this,arguments)};A.prototype=uki.extend({},B,{_domCreate:function(){this._dom=this._dom=document.createElement("textarea");this._domStyle=this._dom.style;this._domStyle.cssText=B.defaultCss;this._domResize(this.rect)}})})();(function(){var B=uki.component.Base.prototype,A=uki.component.Input=function(){this.init.apply(this,arguments)};A.prototype=uki.extend({},B,{_domCreate:function(){this._dom=this._dom=document.createElement("input");this._domStyle=this._dom.style;this._domStyle.cssText=B.defaultCss+"-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box";this._domResize(this._rect)}})})();(function(){var B=uki.component.Base.prototype,A=uki.component.Label=function(){this.init.apply(this,arguments)};A.prototype=uki.extend({},B,{_domCreate:function(){this._selectable=true;this._dom=this._dom=document.createElement("div");this._domStyle=this._dom.style;this._domStyle.cssText=B.defaultCss+"font-family:Helvetica-Neue,Helvetica,Arial,sans-serif;text-shadow:0 1px 0px rgba(255,255,255,0.8);font-size:12px;line-height:15px;";this._domResize(this._rect)},text:function(C){return arguments.length==0?this.html():this.html(uki.escapeHTML(C))},html:function(C){if(arguments.length==0){return this._dom.innerHTML}else{this._dom.innerHTML=C}},align:function(C){if(arguments.length==0){return this.domStyle().textAlign}else{this.domStyle().textAlign=C}},selectable:function(C){if(arguments.length==0){return this._selectable}else{this._domStyle.MozUserSelect=C?"":"none";this._domStyle.WebkitUserSelect=C?"":"none";this._domStyle.userSelect=C?"":"none";this._domStyle.cursor=C?"text":"default"}}})})();