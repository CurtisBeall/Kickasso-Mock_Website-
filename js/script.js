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
	let removetext = document.getElementById('filterResults');


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
	let shop = "/C:/Users/Curtis/Documents/Git%20Repos/Kickasso-Mock_Website-/shop.html"

	if (window.location.pathname === shop) {
		for (var i = 0; i < 9; i++) {
			$("select").click()[i];
		}
		sortBy();
		newResultList();
	}
});



///////////////////////////////
//Filter By
//////////////////////////////
$("select").change(function () {
	let showMe = $("#show_me").val();
	let size = $("#size").val();

	for (var i = 0; i < shoe.length; i++) {
		let keep = false;
		let shoeName = shoe[i].name.toUpperCase()

		//Check Shoe Type
		if (shoe[i].type !== showMe && "ALL" !== showMe) {
			//Hide Shoe That Don't Match Size'
			shoe[i].keep = "false";
			$("a").find(":contains('" + shoeName + "')").hide();
		} else {
			//Check Shoe Size
			for (var x = 0; x < shoe[i].size.length; x++) {
				if (shoe[i].size[x] !== size && "ALL" !== size) {
					//Hide Shoe That Don't Match Size'
					shoe[i].keep = "false";
					$("a").find(":contains('" + shoeName + "')").hide();
				} else {
					keep = true;
				}
			}
			//Show Shoe
			if (keep === true) {
				$("a").find(":contains('" + shoeName + "')").show();
				shoe[i].keep = "true";
			}
		}
	}
	sortBy();
	newResultList();
});



///////////////////////////////
//Sort By
//////////////////////////////
function sortBy() {
	let list = document.getElementById("filterResults");
	let switching = true;
	let shouldSwitch = false;

	while (switching) {
		switching = false;
		let product = list.getElementsByTagName("a");
		for (i = 0; i < (product.length - 1); i++) {
			shouldSwitch = false;
			let price = product[i].getElementsByTagName("h4")[0].innerHTML;
			let priceNext = product[i + 1].getElementsByTagName("h4")[0].innerHTML;

			if ($("#sort").val() === "NAME") {
				//Sort By Name
				if (product[i].innerHTML.toLowerCase() > product[i + 1].innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			} else {
				//Sort By Price
				if (price > priceNext) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			product[i].parentNode.insertBefore(product[i + 1], product[i]);
			switching = true;
		}
	}
};



///////////////////////////////
//New Shoe List
//////////////////////////////
let newShoeList = [];

function newResultList() {
	newShoeList = [];
	let list = document.getElementById("filterResults");
	let product = list.getElementsByTagName("a");
	let y = 0;

	for (i = 0; i < product.length; i++) {
		let name = product[i].getElementsByTagName("h3")[0].innerHTML.toUpperCase();

		for (x = 0; x < shoe.length; x++) {
			let shoeName = shoe[x].name.toUpperCase();

			if (name === shoeName && shoe[x].keep === "true") {
				if (newShoeList.length === 0) {
					y = 0;
					newShoeList[y] = shoe[x];
					y += 1;
				} else {
					newShoeList[y] = shoe[x];
					y += 1;
				}
			}
		}
	}
	localStorage.setItem("newShoeList", JSON.stringify(newShoeList));
}





///////////////////////////////
//Next/Prev Product
//////////////////////////////
function changeShoe(a) {
	let currentShoe = document.getElementById("shoeInfo").getElementsByTagName("h1")[0].innerHTML;
	let newURL;
	let action = a.innerHTML;
	let newList = JSON.parse(localStorage.getItem("newShoeList"));
	console.log(newList)

	for (i = 0; i < newList.length; i++) {
		if (currentShoe === newList[i].name) {

			if (action === "Next Item") {
				if (i === newList.length - 1) {
					newURL = newList[0].url;
					break;
				} else {
					i += 1;
					newURL = newList[i].url;
					break;
				}
			} else if (action === "Previous Item") {
				if (i === 0) {
					i = (newList.length - 1);
					newURL = newList[i].url;
					break;
				} else {
					i -= 1;
					newURL = newList[i].url;
					break;
				}
			}
		}
	}
	location.replace(newURL);
}