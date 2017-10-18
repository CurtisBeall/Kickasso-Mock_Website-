//////////////////////////////
//Menu Toggle
//////////////////////////////
//Mouse Click Open
$("#menu_btn").click(function (e) {
	$("#menu").removeClass("hidden");
    e.stopPropagation();
});

//Mouse Click Close
$(document).click(function () {
	if($("#menu").hasClass("hidden") === false) {
		$("#menu").addClass("hidden");
	}
});

//Enter Press Open
$("#menu_btn").keyup(function(e){
    if(e.keyCode === 13){
        $("#menu_btn").click();
    }
});


//Esc Press Close
$(document).keyup(function(e){
    if(e.keyCode === 27){
        $(document).click();
    }
});



//////////////////////////////
//Filter Toggle
//////////////////////////////
//Mouse Click Open
$("#filter_btn").click(function (e) {
	$("#filter").removeClass("hidden");
    e.stopPropagation();
});

//Mouse Click Close
$(document).click(function () {
	if($("#filter").hasClass("hidden") === false) {
		$("#filter").addClass("hidden");
	}
});

//Enter Press Open
$("#menu_btn").keyup(function(e){
    if(e.keyCode === 13){
        $("#menu_btn").click();
    }
});


//Esc Press Close
$(document).keyup(function(e){
    if(e.keyCode === 27){
        $(document).click();
    }
});