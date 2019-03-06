/* 
   Name : Muhammet Kasım Varol
   ID   : 21602808
   Section : 255-3

   NOTES: 
        - Escape solution collect previous movements and rewind them back.
        - Images are gif.
        - When puzzle is solved, missed piece is appended. Afterwards, margins 
        between divs disapper and they create whole picture.
        - When puzzle is solved, the user will be informed about time.
*/
$(function(){
    
    /*---------------------------------SOME VARIABLES-------------------------*/
    
    //it holds movements for ESC character
    var rewind = [];
    //it holds sliding info in the first page
    var inf = [
    "<span>CTIS 255 - Web Technologies I</span><br><br><span>Project</span><br><br><span>Fall 2018</span>",
    "<span>By</span><br><br><span>M. Kasım VAROL</span><br><br><span>21602808</span>",
    "<br><br><span style='font-size:30px'>HAVE FUN :)</span>"
    ];
    //empty div's top and left values
    blankx=5;
    blanky=5;
    // control mechanism for slide animation: it prevents another animation while one is already animating
    started1 = false ;
    // puzzle is not shuffled by default
    shuffled = false;
    // it checks whether puzzle is solved or not
    finished = false;
    // this variable is for shuffle: it keeps last slided div
    lastid = 0;
    
    /*--------------------------END OF VARIABLES -----------------------------*/
    
    /* ------------ TIMER FOR FIRST PAGE AND COUNTING ------------------------*/
    var current = 0 ; 
    var timer = setInterval( incCounter, 1000) ;
    function incCounter() {
	   var val = $("#counter").text() ;
	   val++;
	   $("#counter").text(val);   
   }
      setInterval(function(){
          current++;
	   if ( current === inf.length) current = 0 ;
           $("#intro span").animate( {opacity:0.1},400, function(){ 
                                   $("#intro span").html(inf[current]);
                              })
		      .animate({opacity:1.0},400) ;
      },3000) ;
    /* --------------------- END OF TIMER ------------------------------------*/
   
    /* --------------------- FIRST PAGE CONTENT------------------------------ */
    $("#btn1").click(secondPage);
    
    function secondPage(){
        clearInterval(timer);
      $("h1").fadeOut(500, function(){
          $("h2").fadeIn(500);
      });
      $("#intro").fadeOut(500, function(){
          $(".vimg").fadeIn(500);
      });
      $("#btn1").fadeOut(500, function(){
      });
    };
    /* ---------------------- END OF FIRST PAGE ----------------------------- */
    
    
    /*------------------------ SECOND PAGE CONTENT ---------------------------*/
    
    //Visibility animations
    $(".vimg").click(function(){
        //$(".vimg").css("border-bottom", "none").css("opacity", "0.5");
        $(".vimg").removeClass("shadow");
       //$(this).css("border-bottom", "10px solid lightgray").css("opacity", "1");
       $(this).addClass("shadow");
       img = "url(" + $(this).attr("src") + ")";
       $("#btn2").show();
    });
    
    $("#btn2").click(thirdPage);
    
    function thirdPage(){
        for (var i = 1; i < 9; i++){	
                var col = i%3;
                var row = Number.parseInt(i/3);
                var piece = $("<div id='" + i + "' style='background:" + img + " " + (row * -150) + "px " + (col * -150) + "px no-repeat; top:" + ((col * 150)+5) + "px; left:" + ((row * 150)+5) + "px'>");
                $("#puzzlecont").append(piece);
        }
        $("h2").animate({left: "-300px", opacity: 0}, 500, function(){
            $("h2").remove();
            $("#puzzlecont").animate({left: "500px"},500).show();
        });
        $("#imgcontainer").animate({left: "-300px", opacity: 0}, 500, function(){
            $("#imgcontainer").remove();
            $("#selectdiv").animate({left: "650px"},500).show();
            $("#selectdiv .btn").css("margin", "5px 50px");
        });
        $("#btn2").animate({left: "-300px", opacity: 0}, 500, function(){
            $("#btn2").remove();
        });
        
         // This function listen div clicks and move them if they are movable and adds this click event to divs.
    $("#puzzlecont > div").click(function(){
        console.log("clicked");
        if(shuffled && !finished){
            x1 = Number.parseInt($(this).css("left")); 
            y1 = Number.parseInt($(this).css("top"));
            coor1=x1+y1;
            xb1 = Number.parseInt(blankx);
            yb1 = Number.parseInt(blanky);
            blankcoor1 = xb1 + yb1;
            if((x1===xb1 || y1 === yb1) && Math.abs(coor1-blankcoor1)===150){
                if(!started1){
                    newblankx = $(this).css("left");
                    newblanky = $(this).css("top");
                    $(this).animate({left: blankx, top:blanky}, 500, function(){
                    rewind.push($(this).attr("id"));
                    blankx = newblankx;
                    blanky = newblanky;
                    started1 = false;
                    opacIt();
               //IF GAME FINISHES AFTER MOVEMENT
                    if($("#1").css("top")==="155px" &&  $("#1").css("left")==="5px" && 
                    $("#2").css("top")==="305px" &&  $("#2").css("left")==="5px" && 
                    $("#3").css("top")==="5px" &&  $("#3").css("left")==="155px" && 
                    $("#4").css("top")==="155px" &&  $("#4").css("left")==="155px" && 
                    $("#5").css("top")==="305px" &&  $("#5").css("left")==="155px" && 
                    $("#6").css("top")==="5px" &&  $("#6").css("left")==="305px" && 
                    $("#7").css("top")==="155px" &&  $("#7").css("left")==="305px" && 
                    $("#8").css("top")==="305px" &&  $("#8").css("left")==="305px")
                        finishGame();
                    }); 
           started1 = true;
                }
            }
        }
            else if(!shuffled)
                alert("Please shuffle first!");
    });
    };  
    /* ------------------------ END OF SECOND PAGE -------------------------- */
      
      
    /*------------------------- THIRD PAGE CONTENT ---------------------------*/
      
    // shuffle button visibility
    $("#selectdiv").on("click", function(){
        if($( "#selectdiv option:selected" ).text()!=="-- Shuffle Amount --")
            $("div #btn3").show();
        else
            $("div #btn3").hide();
    });
      
    //this function gets div id's which is able to slide into blank part
    function getPossible()
    {
        var arr = [];
        $("#puzzlecont > div").each(function(){
                 x = Number.parseInt($(this).css("left")); 
                 y =  Number.parseInt($(this).css("top"));
                coor=x+y;
                xb = Number.parseInt(blankx);
                yb = Number.parseInt(blanky);
                blankcoor = xb + yb;
                if((x===xb || y === yb) && Math.abs(coor-blankcoor)===150)
                   arr.push($(this).attr("id"));
             });
        return arr;
    }
      
    //RECURSION FOR CALLBACK SHUFFLES ANIMATION
    function recursit(count){
        var moves = getPossible();
        var randnum = Math.floor(Math.random() * moves.length);
        while(lastid===moves[randnum])
            randnum = Math.floor(Math.random() * moves.length);
        lastid=moves[randnum];
        if(count===0){
            $("#counter").text("0");
            $("#counter").show();
            timer = setInterval( incCounter, 1000) ;
            return;
           }
        else{
            if(!started1){
            newblankx = $("#" + moves[randnum]).css("left");
            newblanky = $("#" + moves[randnum]).css("top");
            var speed;
            if(count>3)
                speed = 150;
            else
                speed = 500;
            $("#" + moves[randnum]).animate({left: blankx, top:blanky}, speed, function(){
               blankx = newblankx;
               blanky = newblanky;
               started1 = false;
               rewind.push(moves[randnum]);
               recursit(count-1);
           }); 
            started1 = true;
            }
        }
    }
    
    //SHUFFLE BUTTON
    $("#btn3").click(function(){
    shuffled = true;
    $("#selectdiv").hide();
    var count = parseInt($( "#selectdiv option:selected" ).text());
    recursit(count);
    });
        
    //ESC Button Recursion rewind according to global variable rewind array
    function esc(){
        var id;
        if(rewind.length===0){
            finishGame();
            return;
        }
        else{
            id=rewind.pop();
            if(!started1){
                newblankx = $("#" + id).css("left");
                newblanky = $("#" + id).css("top");
                $("#" + id).animate({left: blankx, top:blanky}, 90, function(){
                blankx = newblankx;
                blanky = newblanky;
                started1 = false;
                esc();
                }); 
                started1 = true;
            }
        }
            
    }
        
    //ESC Button Listener
    $(document).keyup(function(e) {
        if (e.key === "Escape") {
           console.log(rewind);
           esc();
        }
    });
       
    //This function regulates opacity whether a div object movable or not
    function opacIt(){
        if(shuffled){
            $("#puzzlecont > div").each(function(){
            x = Number.parseInt($(this).css("left")); 
            y =  Number.parseInt($(this).css("top"));
            coor=x+y;
            xb = Number.parseInt(blankx);
            yb = Number.parseInt(blanky);
            blankcoor = xb + yb;
            if((x===xb || y === yb) && Math.abs(coor-blankcoor)===150)
                $(this).css("opacity", "1");
            else
                $(this).css("opacity", "0.5");
            });
        }
    };
    
    //This function listens mouse movements and change divs' opacity
    $("#puzzlecont").mouseover( function(){
    if(shuffled && !finished)
        opacIt();
    });
    
    //if mouse leaves set all opacity "1"
    $("#puzzlecont").mouseleave( function(){
        if(shuffled && !finished)
            $("#puzzlecont > div").each(function(){
                $(this).css("opacity", "1");
            });
    });
         
    //This function finishes the game
    function finishGame(){
        finished = true;
        clearInterval(timer);
        var lastpiece = $("<div id='last' style='background:" + img + " 0px 0px no-repeat; top:5px; left:5px; display:none'>");
        $("#puzzlecont").append(lastpiece);
        $("#last").fadeIn(1000, function(){
            $("#puzzlecont > div").each(function(){
                       $(this).animate({opacity: "0.5", width: "150px", height: "150px", borderRadius: "0" }, 2000);
            });
            $("#congrat2").text("You have finished in " + $("#counter").text() + " seconds.");
            $("#f5").show();
            $("#counter").hide();
            $("#congrat").fadeIn(1000).animate({top: "-=100px"}, 400).animate({top: "+=200px"}, 400).animate({top: "-=100px"}, 400);
            $("#congrat2").fadeIn(1000).animate({top: "-=100px"}, 400).animate({top: "+=200px"}, 400).animate({top: "-=100px"}, 400);
        });
    }
    /* -------------------- END OF THIRD PAGE ------------------------------- */
});
