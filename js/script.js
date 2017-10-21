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
	if ($("#menu").hasClass("hidden") === false) {
		$("#menu").addClass("hidden");
	}
});

//Enter Press Open
$("#menu_btn").keyup(function (e) {
	if (e.keyCode === 13) {
		$("#menu_btn").click();
	}
});

//Esc Press Close
$(document).keyup(function (e) {
	if (e.keyCode === 27) {
		$(document).click();
	}
});



//////////////////////////////
//Filter Toggle
//////////////////////////////
//Mouse Click Toggle
$("#filter_btn").click(function (e) {
	if ($("#filter").hasClass("hidden") === false) {
		$("#filter").addClass("hidden");
		$("#filter_btn").removeClass("fill");
	} else {
		$("#filter").removeClass("hidden");
		$("#filter_btn").addClass("fill");
		e.stopPropagation();
	}
});

//Enter Press Open
$("#filter_btn").keyup(function (e) {
	if (e.keyCode === 13) {
		$("#filter_btn").click();
	}
});

//Esc Press Close
$(document).keyup(function (e) {
	if (e.keyCode === 27 && $("#filter").removeClass("hidden")) {
		mouseClickToggle();
	}
});

///////////////////////////////
//Filter Underline Length
//////////////////////////////
$("select").click(function () {
	let textLength = $(this).val();
	let removetext = document.getElementById('removetext');

	removetext.innerHTML += "<h3 style='font-weight: bold;'><div id='remove'>" + textLength + "</div></h3>";
	let width = $("#remove").width();
	$("#remove").remove();
	$(this).css("width", Math.ceil(width / 5) * 5 + 25 + "px");
});

$("#filter_btn").click(function () {
	for (var i = 0; i < 9; i++) {
		$("select").click()[i];
	}
});

window.onload = (function () {
	for (var i = 0; i < 9; i++) {
		$("select").click()[i];
	}
});

///////////////////////////////
//Filter
//////////////////////////////
$("select").change(function () {
			let showMe = $("#show_me").val();
			let size = $("#size").val();

			for (var i = 0; i < shoe.length; i++) {
				let keep = false;
				
//				Check Shoe Type
				if (shoe[i].type !== showMe && "ALL" !== showMe) {
					let shoeName = shoe[i].name.toUpperCase()
					$("a").find(":contains('" + shoeName + "')").hide();
				} else {
//					Check Shoe Size
					for (var x = 0; x < shoe[i].size.length; x++) {
						if (shoe[i].size[x] !== size && "ALL" !== size) {
							let shoeName = shoe[i].name.toUpperCase()
							$("a").find(":contains('" + shoeName + "')").hide();
						} else {
							keep = true;
						}
					}
					if (keep === true) {
						let shoeName = shoe[i].name.toUpperCase()
						$("a").find(":contains('" + shoeName + "')").show();
					}
				}
			});