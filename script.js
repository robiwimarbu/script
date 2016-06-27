var pathSite ="/";

//url = pagina a llamar, data  son los datos enviados podria ser un form, 
//type = a forma Post o GEt, layer= capa donde se ejecutara accion,
//asincrono = booleano que dice si sera asincrona o no la ejecucion, 
//callback funcion que se ejecutara 

function sendToRequest ( url, data, type, progress, asincrono, callBack ) {
	var xmlHttp=null;
	if (window.XMLHttpRequest) {// code for all new browsers
		xmlHttp=new XMLHttpRequest();
	}
	else if ( window.ActiveXObject ){// code for IE5 and IE6
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if ( xmlHttp!=null )  {
	    xmlHttp.onreadystatechange = function ( ) {
			if ( xmlHttp.readyState == 4 )  {
				if (xmlHttp.status==200) { 
					if ( typeof callBack == "function" ){
						callBack(xmlHttp);
					}
				}  else    {
					var textCharge = document.getElementById("textCharge");
					textCharge.style.backgroundColor="#00aef0";
					textCharge.style.height="20px";
					textCharge.style.textAlign="center";
					textCharge.style.color="#FFF";
					textCharge.innerHTML = "Sin conexion";
				}
			}
		}
		xmlHttp.onloadstart = function ( ){
			if ( progress ) {
				//asumo que si progress no es funcion es un objeto html
				if( typeof progress != "function" ){
					var containerProgress = document.createElement("div");
					containerProgress.style.position = "fixed";
					containerProgress.style.width = "100%";
					containerProgress.style.top = "150px";
					containerProgress.style.left = "0px";
					containerProgress.style.height = progress.style.height+"px";
					//containerProgress.style.backgroundColor="#F00";
					
					var div = document.createElement( "div" );
					div.style.position = "relative";
					div.style.margin = "auto";
					div.style.width = "200px";
					div.style.height = "100px";
					var img = document.createElement( "img" );
					img.id ="iconCharge";
					img.style.width="100%";
					img.src = pathSite + "media/images/web/preloader.gif";
					div.appendChild(img);
					var textCharge =document.createElement("div");
					textCharge.id="textCharge";
					div.appendChild (textCharge);
					containerProgress.appendChild(div);
					progress.appendChild(containerProgress);
				}
			}
		}
		
		xmlHttp.upload.onprogress = function (evt){
			if ( progress ) {
				if( typeof  progress != "function" ){
					if ( evt.lengthComputable ) {
						var percentComplete = (evt.loaded / evt.total)*100;
						var textCharge = document.getElementById("textCharge");
						//textCharge.style.border="1px solid #000";
						textCharge.style.backgroundColor="#00aef0";
						textCharge.style.height="20px";
						textCharge.style.textAlign="center";
						textCharge.style.color="#FFF";
						textCharge.innerHTML = Math.round(percentComplete) + "%";
					} 
				} else {
					progress(evt);
				}
			}
		}
		
		xmlHttp.open ( type, url, asincrono);
		if ( data ) {
			//INVESTIGAR PORQUE NO FUNCIONABA NINGUN TIPO DE CODIFICACION.
			if(typeof data != "object" ){
				xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			}
			xmlHttp.send ( data );
		} else {
			xmlHttp.send ( null );
		}
  	} else  {
  		console.log("Este explorador no soporta Ajax");
  	}
}

function getScript( url, callBack) {
	var script = document.createElement("script")
 	script.type = "text/javascript";
	 if (script.readyState){  //IE
		script.onreadystatechange = function(){
		 if (script.readyState == "loaded" ||
			 script.readyState == "complete"){
			   script.onreadystatechange = null;
			   callBack();
			}
		 };
	 } else {  //Others
	   script.onload = function(){
		 callBack();
	   };
	 }
	 script.src = url;
	 document.getElementsByTagName("head")[0].appendChild(script);
}

function cerrar() {
	var element = document.getElementById("cortina");
	var dialog = document.getElementById("dialog");
	var parent = document.getElementById("cortina").parentNode;
	parent.removeChild(element);
	parent.removeChild(dialog);
}
function onclickCortina(callBack){
	if( typeof callBack == "" ){
		calBack();
	}
	cerrar();
}

function dialogWindow(){
	this.containerDialog ="" ;
	this.iconClose = pathSite + "media/images/web/close.png";
	this.height="400";
	this.width = "700";
	this.backgroundColor = "#DDD";
	this.barraColor = "#04B431";
	this.barraStyleBorder ="1px solid #04B431";
	this.barraBotonCloseStyleBorder="1px solid #000";
	this.stylePosition ="fixed";
	this.eventClickBackground = null;
	this.cerrar = function() {
		cerrar();
	};
	this.title ="";
	this.open = function (){
		var cortina = document.createElement('div');
		//fondo de la ventana
		cortina.id = "cortina";
		cortina.style.position=this.stylePosition;
		cortina.style.top="0%";
		cortina.style.left="0%";
		cortina.style.width="100%";
		cortina.style.height="100%";
		cortina.style.margin="auto";
		cortina.style.opacity="0.5";
		cortina.style.backgroundColor="#999";
		cortina.style.transition="all 2s";
		cortina.style.overflow="hidden";
		cortina.style.zIndex="1";
		cortina.setAttribute("onclick","onclickCortina(this.eventClickBackground)");
		//cuadro de dialogo
		var dialog = document.createElement('div');
		dialog.id = "dialog";
		dialog.style.position = this.stylePosition;
		dialog.style.top = "50%";
		dialog.style.left = "50%";
		dialog.style.width = this.width+"px";
		dialog.style.border = "1px solid #000";
		dialog.style.boxShadow = "4px 2px 4px #000";
		dialog.style.borderRadius = "15px";
		dialog.style.height = this.height+"px";
		var cadena = "-" + (this.height/2) + "px 0 0 -" + (this.width/2)+"px";
		dialog.style.margin = cadena;
		dialog.style.backgroundColor = "#FFF";
		dialog.style.overflow = "hidden";
		dialog.style.zIndex="2";
		//barra de botones y titulo de cuadro de dialogo
		var barra = document.createElement('div');
		barra.id = "bar";
		barra.style.position = "absolute";
		barra.style.top = "0px";
		barra.style.left = "0.1%";
		barra.style.width = "99%";
		barra.style.cursor ="move";
		barra.style.height = "40px";
		barra.style.lineHeight="40px";
		barra.style.backgroundColor = this.barraColor;
		barra.style.border = this.barraStyleBorder;
		//boton close
		var icon = document.createElement('img');
		icon.id ="iconCLose";
		icon.style.position = "absolute";
		icon.style.right ="35px";
		icon.style.top ="10px";
		icon.style.cursor ="pointer";
		icon.src = this.iconClose;
		icon.style.border=this.barraBotonCloseStyleBorder;
		icon.setAttribute("onclick","cerrar();");
		//title 
		var title = document.createElement('div');
		title.style.fontSize ="16px";
		title.style.fontWeight="bold";
		title.style.textAlign="center";
		title.innerHTML = this.title;
		barra.appendChild(title);
		//contenido
		var contenido = document.createElement('div');
		contenido.id="contenido";
		contenido.style.position = "absolute";
		contenido.style.top = "30px";
		contenido.style.left = "0.1%";
		contenido.style.width = "99%";
		contenido.style.height = (this.height-30) +"px";
		contenido.innerHTML = this.containerDialog;
		
		barra.appendChild(icon);
		dialog.appendChild(barra);
		dialog.appendChild(contenido);
		document.body.appendChild(cortina);
		document.body.appendChild(dialog);
	};	
}
function myClick(event){
	if (event.button == 2 ){
		console.log(event.button);
	}	
}
var classOn = function(Ob){
	Ob.className = "ItemOn";
}
var classOut = function(Ob,Tam){
	Ob.className = "ItemOut";
	var arrayOn = document.getElementsByClassName("ItemOn").length;
	var arrayOut = document.getElementsByClassName("ItemOut").length;
	console.log("On "+arrayOn +" Out "+ arrayOut );
	if ( arrayOn == 0 && arrayOut == Tam ) {
		var parent = Ob.parentNode.parentNode;
		parent.removeChild(Ob.parentNode);
	}
}

function sbMenu( idObject ) {
	if ( document.getElementById(idObject) ){
		console.log("No su puede crear el obejto revise el ID");
		return;
	}else {
		this.width = "100";
		this.height = "100";
		this.top = "0";
		this.left = "10";
		this.backgroundColor="#DDD";
		this.sbMenuItem=[];
		this.bool=false;
		this.addItem = function(item){
			this.sbMenuItem.push(item);
		};
		this.showSbMenu = function (){
			var Obj = document.getElementById(idObject);
			console.log(typeof Obj);
			if( typeof Obj === "object" ){
				var capa = document.createElement('div');
				capa.id = idObject;
				capa.style.position = "absolute";
				capa.style.top =this.top + "px";
				capa.style.left =this.left + "px";
				capa.style.width = this.width + "px";
				capa.style.height = this.height + "px";
				capa.style.zIndex="2";
				capa.style.backgroundColor = this.backgroundColor;
				//add element to items of menu
				if ( this.sbMenuItem.length > 0 ) {
					for (var i = 0; i < this.sbMenuItem.length; i++ ) {
						var item = document.createElement('div');
						item.id = idObject + "Item"+i;
						item.style.width="100%";
						item.style.height="20px";
						item.style.border="1px solid #000";
						item.style.cursor="pointer";
						item.innerHTML = this.sbMenuItem[i].item;					
						capa.appendChild(item);	
					}
				}
				document.body.appendChild(capa);
				for (var i = 0; i < this.sbMenuItem.length; i++ ) {
					var Ob = document.getElementById(idObject + "Item"+i);
					Ob.setAttribute("onmouseout", "classOut(this,"+ this.sbMenuItem.length +");"); 
					Ob.setAttribute("onmouseover","classOn(this);");
					Ob.setAttribute("onclick",this.sbMenuItem[i].action);
				}
			} 
		};
	}
}
// list
function listOnclickParent(callBack){
	if( typeof callBack == "function" ){
		callBack();
	}
}
list = function  ( idObject ) {
	if ( !idObject ) {
		idObject = "listDefault";
	}
	this.idObject = idObject;
	this.multiSelect = false;
	this.itemList =[];
	this.addItem = function (item){
		item.status ="normal";
		this.itemList.push(item);
	};
	this.grandParent;
	this.bgNormal = "#DDD";
	this.bgSelected= "#AAA";
	this.selectable = true;
	this.classItems = "";
	this.onclickParent=null;
	this.r;
	this.deleteItems = function(){
		//delete Items selecteds
		var arrayDelete=[];
		var x=0;
		for (var i=0; i < this.itemList.length; i++ ) {		
			if ( this.itemList[i].status == "selected" ) {
				var parent = document.getElementById(idObject);
				console.log(parent.id);
				element = document.getElementById(this.itemList[i].id);
				parent.removeChild(element);
				arrayDelete[x] = this.itemList[i].id;
				x++;
			}
		}
		//elimino del array
		for ( var i = 0; i < arrayDelete.length; i++ ){
			var posDelete = this.gePositionFromId(arrayDelete[i]);
			if( posDelete >=0 ){
				this.itemList.splice(posDelete,1);
			}
		} 
	};
	
	this.gePositionFromId = function(id){
		
		for( var i=0; i< this.itemList.length; i++){
			if(this.itemList[i].id == id ){
				return i;
			}
		}
		return -1;
	};
	
	
	copy = this;
	this.unSelect = function( id ) {
		var changeElement = document.getElementById(id);
		if( changeElement && changeElement.parentNode == this.idObject ) {
			changeElement.className="itemList " + copy.classItems +" normal";
		}
	}
	r = function( itemId, callBack ){
		var itemElement = document.getElementById(itemId);
		if ( copy.multiSelect == false ){
			//modify any itemELement with className equal selected
			//toggle of item status selected or noselected	
			for (var i=0; i < copy.itemList.length; i++ ) {	
				var changeElement = document.getElementById(copy.itemList[i].id);
				if ( copy.itemList[i].id == itemId ){
					if ( copy.itemList[i].status == "normal"){
						copy.itemList[i].status = "selected";
						changeElement.className = "itemList " + copy.classItems +" selected";
						changeElement.style.backgroundColor = copy.bgSelected;
					} else {
						copy.itemList[i].status = "normal";
						changeElement.className = "itemList " + copy.classItems +" normal";
						changeElement.style.backgroundColor = copy.bgNormal;
					}
				} else {
					copy.itemList[i].status = "normal";
					changeElement.className = "itemList " + copy.classItems +" normal";
					changeElement.style.backgroundColor = copy.bgNormal;
				}
			}
		}else {
			for (var i=0; i < copy.itemList.length; i++ ) {	
				if ( copy.itemList[i].id == itemId ){
					var changeElement = document.getElementById(copy.itemList[i].id);
					if ( copy.itemList[i].status == "normal"){
						copy.itemList[i].status = "selected";
						changeElement.className = "itemList " + copy.classItems +" selected";
						changeElement.style.backgroundColor = copy.bgSelected;
					} else {
						copy.itemList[i].status = "normal";
						changeElement.className = "itemList " + copy.classItems +" normal";
						changeElement.style.backgroundColor = copy.bgNormal;
					}
					break;
				}
			}
		}
		if ( callBack ) {
			eval(callBack);
		
		}
	};
	
	this.show = function (){
		var parent = document.createElement('div');
		parent.className = "class"+idObject;
		parent.id = idObject;
		if ( this.itemList.length > 0 ) {
			var item;
			for (var i = 0; i < this.itemList.length; i++ ){
				item = document.createElement('div');
				item.id = this.itemList[i].id == null ? "item"+idObject: this.itemList[i].id;
				item.className = "itemList " + this.classItems + " normal";
				item.callBack = this.itemList[i].callBack;
				item.callBackDblClick = this.itemList[i].callBackDblClick;
				if ( this.selectable == true ) {
					item.setAttribute("onclick",'r(this.id);');
					if ( item.callBack ) {
						item.setAttribute("onclick","r(this.id,'" + item.callBack  + ";event.cancelBubble=true');");
					}
				}
				
				if(item.callBackDblClick){
					item.setAttribute("ondblclick",item.callBackDblClick);
				}
				
				item.innerHTML = this.itemList[i].container;
				parent.appendChild(item);
			}
		}
		document.getElementById(this.grandParent).appendChild(parent);
		document.getElementById(this.grandParent).setAttribute("onclick",this.onclickParent);
	};
	
	this.getQttySelected = function () {
		var cant = 0;
		for ( var i = 0; i < this.itemList.length; i++ ){
			if ( this.itemList[i].status == "selected" ){
				cant++;
			}
		}
		return cant;
	}
	
	this.select = function ( itemId, callBack ) {
		for ( var i = 0; i < this.itemList.length; i++ ){
			if ( this.itemList[i].id == itemId ){
				var changeElement = document.getElementById(copy.itemList[i].id);
				copy.itemList[i].status = "selected";
				changeElement.className = "itemList " + copy.classItems +" selected";
				changeElement.style.backgroundColor = copy.bgSelected;
				if ( callBack ) {
					if ( typeof callBack == "function" ) {
						calBack();
					}
				}
				break;
			}
		}
	}
	
	this.getArraySelect = function(){
		var arraySelected=[];
		var x = 0;
		for ( var i = 0; i < this.itemList.length; i++ ){
			if ( this.itemList[i].status == "selected" ){
				var Ob = this.itemList[i];
				arraySelected[x]= Ob;
				x++;
			}
		}
		return arraySelected;
	};
	
	this.unselect = function ( itemId, callBack ) {
		for ( var i = 0; i < this.itemList.length; i++ ){
			console.log(this.itemList[i].id);
			if ( this.itemList[i].id == itemId ){
				var changeElement = document.getElementById(copy.itemList[i].id);
				copy.itemList[i].status = "normal";
				changeElement.className = "itemList " + copy.classItems +" normal";
				changeElement.style.backgroundColor = copy.bgNormal;
				if ( callBack ) {
					if ( typeof callBack == "function" ) {
						calBack();
					}
				}
				break;
			}
		}
		this.itemList = copy.itemList;
	};
	
}

//photoslider

photoSlider = function(idObject){
	
	this.items =[];
	this.current=0;
	var item={};
	
	this.targetHeight = "225";
	this.targetWidth = "100%";
	
	this.idDisplay = "spDisplay";
	
	this.headerWidth = "100%";
	this.headerHeight = "40";
	this.headerBackground = "none";
	
	this.footerWidth = "100%";
	this.footerHeight = "40";
	this.footerBackground = pathSite + "media/images/web/bg_transparent.png";
	this.footerColor = "#FFF";
	this.footerFontSize = "14px";
	
	this.footerText = "";
	
	this.arrowLeftWidth = "40";
	this.arrowLeftBackground = "none";
	this.arrowLeftIcon = pathSite + "media/images/web/icon_arrow_left.png";
	
	this.functionBack = "";
	
	this.arrowRightWidth = "40";
	this.arrowRightBackground = "none";
	this.arrowRightIcon = pathSite + "media/images/web/icon_arrow_right.png";
	
	this.iconItem =pathSite + "media/images/web/icon_item.png";
	this.iconItemCurrent =pathSite + "media/images/web/icon_current_item.png";
	
	
	this.functionNext = "";
	this.functionFooter = "";
	
	this.addItem = function (item){
		item = item;
		this.items.push(item);
	};
	
	this.functionGoItem="";
	
	this.back=function(){
		if( this.current > 0){
			this.current--;
			this.show(this.current);
		}
	};
	this.next=function(){
		if( this.current < this.items.length-1 ) {
			this.current++;
			this.show(this.current);
		}
	};
	
	this.show=function(position){
			
		if( position ){
			this.current = position;
		} else {
			position = 0;
		}
		
		var initial = false;
		
		//objeto en el que se va a cargar el photoSlider
		var target = document.getElementById(idObject);
		
		var obDisplay = document.getElementById(this.idDisplay);
		if(!obDisplay){
			obDisplay = document.createElement("div");
			obDisplay.id = this.idDisplay;
			obDisplay.style.position="absolute";
			obDisplay.style.top="0px";
			obDisplay.style.width="100%";
			obDisplay.style.right="0px";
			obDisplay.style.height= this.targetHeight+"px";
			obDisplay.style.textAlign = "center";
			initial = true;
		}
		//los id  del display + tipo elemento ejemplo "spDisplay" + "_arrowLeft"
		
		var spArrowLeft = document.getElementById(this.idDisplay+"_arrowLeft");
		if( !spArrowLeft ){
			spArrowLeft = document.createElement("div");
			spArrowLeft.id = this.idDisplay+"_arrowLeft";
			spArrowLeft.style.position="absolute";
			spArrowLeft.style.top="0px";
			spArrowLeft.style.width=this.arrowLeftWidth +"px";
			spArrowLeft.style.left="0px";
			spArrowLeft.style.height= this.targetHeight+"px";
			spArrowLeft.style.visibility ="hidden";
		
			var elementLeft = document.createElement("div");
			elementLeft.style.height =  this.targetHeight+"px";
			elementLeft.style.width = "100%";
		
			var iconArrowLeft = document.createElement("img");
			iconArrowLeft.src= this.arrowLeftIcon;
			iconArrowLeft.style.cursor="pointer";;
			
			iconArrowLeft.setAttribute("onclick",this.functionBack +";event.cancelBubble=true;");
			iconArrowLeft.style.marginTop = Math.floor((this.targetHeight/2) - 13 )+ "px";
			elementLeft.appendChild(iconArrowLeft);
			spArrowLeft.appendChild(elementLeft);
		}
		
		var spArrowRight = document.getElementById(this.idDisplay+"_arrowRight");
		if( !spArrowRight ){
			spArrowRight = document.createElement("div");
			spArrowRight.id = this.idDisplay + "_arrowRight";
			spArrowRight.style.position="absolute";
			spArrowRight.style.top="0px";
			spArrowRight.style.width=this.arrowRightWidth +"px";
			spArrowRight.style.right="0px";
			spArrowRight.style.height= this.targetHeight+"px";
			spArrowRight.style.visibility ="hidden";;
			
			var elementRight = document.createElement("div");
			elementRight.style.height =  this.targetHeight+"px";
			elementRight.style.width = "100%";
			var iconArrowRight = document.createElement("img");
			iconArrowRight.src= this.arrowRightIcon;
			iconArrowRight.style.cursor="pointer";
			iconArrowRight.setAttribute("onclick",this.functionNext+";event.cancelBubble=true;");
			iconArrowRight.style.marginTop = Math.floor((this.targetHeight/2) - 13 )+ "px";
			elementRight.appendChild(iconArrowRight);
			spArrowRight.appendChild(elementRight);
		}
		
		var spFooter = document.getElementById(this.idDisplay+"_footer");
		if( !spFooter ){
			spFooter = document.createElement("div");
			spFooter.id = this.idDisplay + "_footer";
			spFooter.style.position="absolute";
			spFooter.style.bottom="0px";
			spFooter.style.width="100%";
			spFooter.style.right="0px";
			spFooter.style.height= this.footerHeight+"px";
			spFooter.style.backgroundImage = "url("+this.footerBackground+")";
			spFooter.style.color = this.footerColor;
			spFooter.style.fontSize = this.footerFontSize;
			spFooter.style.lineHeight = this.footerHeight+"px";
			spFooter.style.overflow = "hidden";
			spFooter.style.visibility ="hidden";
			if( typeof this.functionFooter != "" ){
				spFooter.setAttribute("onclick", this.functionFooter + ";event.cancelBubble=true;");
			}
			spFooter.innerHTML = this.footerText;
		}
		
		var spHeader = document.getElementById(this.idDisplay+"_header");
		var copyArray = this.items;
		if( !spHeader ){
			var spHeader = document.createElement("div");
			spHeader.id = this.idDisplay + "_header";
			spHeader.style.position="absolute";
			spHeader.style.top="0px";
			spHeader.style.width="100%";
			spHeader.style.right="0px";
			spHeader.style.height= this.headerHeight+"px";
			spHeader.style.visibility ="hidden";
			
			var copyArray = this.items;
			var iconItemCurrent = this.iconItemCurrent;
			var iconItem = this.iconItem;
			var idDisplay = this.idDisplay;
			var current = this.current;
			var contentItems = document.createElement("div");
			contentItems.style.display="table";
			contentItems.style.height=this.headerHeight+"px";
			contentItems.style.float="right";
			contentItems.style.marginRight="5px";
			spHeader.appendChild(contentItems);
			var functionGoItem = this.functionGoItem;
			copyArray.forEach(function(entry,key){
				var index = key;
				//crear un item por cada foto.
				var itemElement = document.createElement("div");
				itemElement.id= idDisplay+"_item" + key;
				itemElement.style.float="left";
				itemElement.style.cursor="pointer";
				var imageItem = iconItem;
				if( key == current){
					imageItem = iconItemCurrent;
				}
				itemElement.setAttribute("onclick",functionGoItem+"("+key+");event.cancelBubble=true;");
				itemElement.innerHTML ="<img src='" + imageItem +"'>";
				contentItems.appendChild(itemElement);
			});
		}
		var item = this.items[position];
		if(initial){
			target.appendChild(obDisplay);
			target.appendChild(spArrowLeft);
			target.appendChild(spArrowRight);
			target.appendChild(spHeader);
			target.appendChild(spFooter);
			target.style.cursor="pointer";
			target.setAttribute("onmouseover", "showExtras('"+this.idDisplay+"');");
			target.setAttribute("onmouseout", "hiddenExtras('"+this.idDisplay+"');");
			target.setAttribute("onclick", "fullPhoto('"+this.idDisplay+"',event);");
		}
		
		var newImage = new Image();
		newImage.id= this.idDisplay + "_foto";
		newImage.src = item.image;
		this.footerText=item.contenfooter;
		var footerText = this.footerText;
		var widthParent = this.targetWidth;
		var heightParent = this.targetHeight;
	
		newImage.onload= function(){
			obDisplay.className = "hidden";
			setTimeout(function(){
				while (obDisplay.firstChild) { 
					obDisplay.removeChild(obDisplay.firstChild)
				}
				
				var maxWidth = widthParent;
				var maxHeight = heightParent;
				var ratio = Math.min(maxWidth / newImage.naturalWidth, maxHeight / newImage.naturalHeight);
				
				var height = newImage.naturalHeight * ratio;
				var width = newImage.naturalWidth * ratio;
				newImage.width = width;
				newImage.height = height;
				obDisplay.appendChild(newImage);
				obDisplay.className = "visible";
				spFooter.innerHTML = footerText;
			},2000);
		}
		
	}
	
	this.getCurrentPosition = function(){
		return this.current;
	}
}

function showExtras(idParent){
	var header = document.getElementById(idParent + "_header");
	var footer = document.getElementById(idParent + "_footer");
	var arrowLeft = document.getElementById(idParent+"_arrowLeft");
	var arrowRight = document.getElementById(idParent+"_arrowRight");
	
	header.style.visibility="visible";
	footer.style.visibility="visible";
	arrowLeft.style.visibility="visible";
	arrowRight.style.visibility="visible";
}

function hiddenExtras(idParent){
	var header = document.getElementById(idParent + "_header");
	var footer = document.getElementById(idParent + "_footer");
	var arrowLeft = document.getElementById(idParent+"_arrowLeft");
	var arrowRight = document.getElementById(idParent+"_arrowRight");
	header.style.visibility="hidden";
	footer.style.visibility="hidden";
	arrowLeft.style.visibility="hidden";
	arrowRight.style.visibility="hidden";
}

function fullPhoto(idParent,event){
	event.cancelBubble=true;
	var dialogUpFIles = new dialogWindow();
	var image = document.getElementById(idParent + "_foto").src;
	var newImage = new Image();
	newImage.src=image;
	newImage.onload=function(){
		utilsFotoVar.image= image;		
		dialogUpFIles.title="View Image";
		var maxWidth = 600-100;
		var maxHeight =500-100;
		var ratio = Math.min(maxWidth / newImage.naturalWidth, maxHeight / newImage.naturalHeight);
		
		var height = newImage.naturalHeight * ratio;
		var width = newImage.naturalWidth * ratio;
		utilsFotoVar.css= "height:"+height+"px;" + "width:" + width +"px;";
		dialogUpFIles.width= "600";
		dialogUpFIles.height = "500";
		dialogUpFIles.backgroundColor = "#FFF";
		dialogUpFIles.barraColor = "#FFF";
		dialogUpFIles.barraStyleBorder ="none";
		dialogUpFIles.barraBotonCloseStyleBorder="none";
		dialogUpFIles.containerDialog = utilsFoto();
		dialogUpFIles.open();		
	};
}

function goUrl(url){
	var win = window.open(url, '_blank');
	win.focus();
}