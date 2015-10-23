var i,idele;
var mydata=new Object();
$("document").ready(function(){
    $(".bookContents").hide();
        $.getJSON("condexin.json",function(mydata){
            $(this).error(function(){
                        alert("Error in JSON file");
                        });
      
    for(i in mydata.Books){ 
         $(".bookpanelbody").append("<li class='imgulli'><img src="+mydata.Books[i]['Image URL']+" alt=Book Images height=90px width=70px id="+i+" class='imglist'></li>");
     }                     
        $(".imglist").click(function(){
               idele = $(this).attr("id");
               $(".bookContents").show();
               $(".booksAndEvents").hide();
               
               $(".selectedBookImage").attr("src",mydata.Books[idele]["Image URL"]);
               $(".bookDetailsTab").css("background","white");
               $(".bookDescTab").css("background","#f8f8f8");
               $(".bookDetailsList").append("<br><br><h4 style='textDecoration:underline'>"+mydata.Books[idele]["Title"]+"</h4>");
               $(".bookDetailsList").append("<h6 style='font-style:italic'>"+mydata.Books[idele]["Subtitle"]+"</h6><br>");
               for(i in mydata.Books[idele]){
                   if(i==="Author"||i==="Publisher"||i==="Price"){
                 $(".bookDetailsList").append("<li><b>"+i+":</b>"+mydata.Books[idele][i]+"</li><br><br>").css("listStyleType","none"); } 
               }
               $(".bookDescDetail").append(mydata.Books[idele]["Description"]);
               $(".bookDescDetail").hide();
                for(i in mydata.Books)
                {
                    if(i!==idele){
                 $(".remBookList").append("<li class='imgulli' style='padding:10px;'><img src="+mydata.Books[i]['Image URL']+"alt=OtherBooks height=150px width=120px></li>");}
                }
               $(".bookDescTab").click(function(){
                    $(".bookDetailsTab").css("background","#f8f8f8");
                    $(".bookDescTab").css("background","white");
                    $(".bookDetailsList").hide();
                    $(".bookDescDetail").show();
                    //$(".bookDetailsList>p").show();
                });   
               $(".bookDetailsTab").click(function(){
                   $(".bookDetailsTab").css("background","white");
                   $(".bookDescTab").css("background","#f8f8f8");
                   $(".bookDetailsList").show();
                   $(".bookDescDetail").hide();
               });
            });
      });  
});



