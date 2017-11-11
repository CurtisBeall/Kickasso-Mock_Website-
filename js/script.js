//////////////////////////////
//Windows.onLoad Functions
//////////////////////////////
window.onload = (function () {
	//Set Cart Count
	cartCount()

	//Set Cart Count
	$("#cart_count").text(cartCount)

	//Sort products and create new results list on Shop page
	if (window.location.href.indexOf("shop") > -1) {
		sortBy();
		newResultList();
	}

	//Filter select box setup on Shop and Shoe Info pages
	if (window.location.href.indexOf("shop") > -1 || window.location.href.indexOf("shoe_info") > -1) {
		$("select").click();
		filterUnderlineOnload();
	}

	//Prevent carousel from rotating automatically on Shoe Info pages
	if (window.location.href.indexOf("shoe_info") > -1) {
		preventCarousel();
	}

	//Fill cart on Cart page
	if (window.location.href.indexOf("cart") > -1) {
		fillCart();
	}
});



//////////////////////////////
//Carousel JavaScript
//////////////////////////////
//Prevent carousel from rotating automatically
function preventCarousel() {
	$('.carousel').carousel("pause")
}

//Make main image and thumbnails match
function updateActive() {
	let imageMain = $(".carousel").find(".active").find("img").attr("src");
	let imageThumb = $(".img_select_container").find(".active").attr("src");

	if (imageMain !== imageThumb) {
		$(".img_select_container").find(".active").removeClass("active");
		let test = $(".img_select_container").find("img");

		for (var i = 0; i < test.length; i++) {
			if (imageMain === $(test[i]).attr("src")) {
				$(test[i]).addClass("active");
			}
		}
	}
}

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
		$(document).click();
	}
});



///////////////////////////////
//Filter Underline Length
//////////////////////////////
//Change Select Width
$("select").click(function () {
	let textLength = $(this).val();
	let removetext = document.getElementById('filterResults');

	removetext.innerHTML += "<h3 style='font-weight: bold;' id='remove'><div id='getWidth'>" + textLength + "</div></h3>";
	let width = $("#getWidth").width();
	$("#remove").remove();
	//Filter select box setup on Shop and Shoe Info pages
	if (window.location.href.indexOf("shoe_info") > -1) {
		$(this).css("width", Math.ceil(width / 5) * 5 + 85 + "px");
	} else if (window.location.href.indexOf("shop" > -1)) {
		$(this).css("width", Math.ceil(width / 5) * 5 + 25 + "px");
	}
});

//Fire Fuction on Selct Click
$("#filter_btn").click(function () {
	$("select").click();
});

function filterUnderlineOnload() {
	let shop = "/C:/Users/Curtis/Documents/Git%20Repos/Kickasso-Mock_Website-/shop.html"

	$("select").click();
}



///////////////////////////////
//Filter By
//////////////////////////////
//Fire Filter Function
$("select").change(function () {
	if (window.location.href.indexOf("shop") > -1) {

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
		//	Sort results and create a list of shoes for Next / Prev views in Shoe Info
		sortBy();
		newResultList();
	}
});



///////////////////////////////
//Sort By
//////////////////////////////
function sortBy() {

	let list = document.getElementById("filterResults");
	let switching = true;
	let shouldSwitch = false;

	//	Start Switching
	while (switching) {
		switching = false;
		let product = list.getElementsByTagName("a");
		for (i = 0; i < (product.length - 1); i++) {
			shouldSwitch = false;
			let price = product[i].getElementsByTagName("h4")[0].innerHTML;
			let priceNext = product[i + 1].getElementsByTagName("h4")[0].innerHTML;
			//Sort By
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
		//Switch happens here
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

	//Products After Sorted
	for (i = 0; i < product.length; i++) {
		let name = product[i].getElementsByTagName("h3")[0].innerHTML.toUpperCase();
		//Check if being kept in result
		for (x = 0; x < shoe.length; x++) {
			let shoeName = shoe[x].name.toUpperCase();
			//If being kept in results its aded to the new list is true
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
	//	Add new list to to local storage
	localStorage.setItem("newShoeList", JSON.stringify(newShoeList));
}



///////////////////////////////
//Next/Prev Product
//////////////////////////////
function changeShoe(a) {
	let currentShoe = document.getElementById("shoeInfo").getElementsByTagName("h1")[0].innerHTML;
	let newURL;
	let action = a.innerHTML;
	//Get stored shoe result list
	let newList = JSON.parse(localStorage.getItem("newShoeList"));

	for (i = 0; i < newList.length; i++) {
		if (currentShoe === newList[i].name) {
			//Next/Prev Shoe
			if (action === "Next Item") {
				//Next Shoe
				if (i === newList.length - 1) {
					newURL = newList[0].url;
					break;
				} else {
					i += 1;
					newURL = newList[i].url;
					break;
				}
			} else if (action === "Previous Item") {
				//Previous Shoe
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
	//Go to next or Prev Shoe
	location.replace(newURL);
}



///////////////////////////////
//Cart
//////////////////////////////
//Add to Cart
let cart = [];

$("#addToCart").click(function cartAdd() {
	cart = JSON.parse(localStorage.getItem("cart"));
	let shoeName = $("#shoeName").text();
	let shoeSize = $(".drop_down_arrow").val();
	let dropDown = $(".drop_down_arrow").parent();
	let product = {};
	let modalText = document.getElementById('cartModalText');
	modalText.innerHTML = "";


	//Check is shoe size is selected
	if (shoeSize === "ALL") {
		dropDown.focus();
		return;
	}
	//Create product
	for (i = 0; i < shoe.length; i++) {

		if (shoeName === shoe[i].name) {
			product.url = shoe[i].url;
			product.mainImg = shoe[i].mainImg;
			product.totalPrice = shoe[i].price;
			product.totalCount = 1;
			product.price = shoe[i].price;
			product.size = shoeSize;
			product.name = shoe[i].name;
		}
	}

	//Add modal text to ensure prooduct is added to the cart	
	modalText.innerHTML += '<div class="">' +
		'<h4 class="m-0 mb-1">' + product.name + ' size ' + product.size + '" added to your cart.</h4>' +
		'</div>'

	//Add product to cart and local storage
	cart.push(product);
	localStorage.setItem("cart", JSON.stringify(cart));



	//Set Cart Count
	cartCount()
});

//Fill Cart / Find Total
function fillCart() {
	let cartList = JSON.parse(localStorage.getItem("cart"));
	let cart = document.getElementById('cart')
	let currency;
	let price;
	let total = 0;
	let currencyTotal = '$' + total.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

	//Add products to cart
	for (i = 0; i < cartList.length; i++) {
		cart.innerHTML += '<div class="cart_product row pr-br-bottom" id="' + [i] + '">' +
			'<a href="' + cartList[i].url + '" class="col cart_middle text-center p-0">' +
			'<img src=' + cartList[i].mainImg + ' class="cart_img">' +
			'</a>' +
			'<div class="col cart_middle p-0 pr-3 gr-tx ml-4">' +
			'<h4 class="font-weight-bold m-0 mb-1">' + cartList[i].name + '</h4>' +
			'<h4 class="font-weight-bold m-0 mb-1">' + cartList[i].size + '</h4>' +
			'</div>' +
			'<div class="col- cart_middle p-0 no_outline gr-tx ml-2">' +
			'<h3 class="font-weight-bold d-inline-block align-middle"><input type="text" value="' + cartList[i].totalCount + '" class="item_count_text font-weight-bold"></h3>' +
			'<h4 class="font-weight-bold d-inline-block align-middle m-0 ml-2">' + cartList[i].totalPrice + '</h4>' +
			'<button class="pr-tx btn cl-bg p-0 d-inline-block align-middle item_count_text">x</button>' +
			'</div>' +
			'</div>'

		currency = cartList[i].totalPrice;
		price = Number(currency.replace(/[^0-9\.]+/g, ""));
		total += price;
		currencyTotal = '$' + total.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}
	$("#total").text(currencyTotal);
}

//Remove from Cart
$("#cart").on('click', 'button', function () {
	let cart = JSON.parse(localStorage.getItem("cart"));
	let product = $(this).parent().parent().attr('id');

	cart.splice(product, 1);
	localStorage.setItem("cart", JSON.stringify(cart));
	location.reload();
});

//Product Total
$("#cart").on('change', 'input', function () {
	let cart = JSON.parse(localStorage.getItem("cart"));
	let id = $(this).parent().parent().parent().attr('id');
	let count = $(this).val();
	let currency = cart[id].price;
	let price = Number(currency.replace(/[^0-9\.]+/g, ""));
	let productTotal = count * price;
	let currencyTotal = '$' + productTotal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

	cart[id].totalPrice = currencyTotal;
	cart[id].totalCount = count;
	$(this).attr("value", count);

	$("input").text(cart[id].totalPrice);
	localStorage.setItem("cart", JSON.stringify(cart));
	location.reload();
});

//Set Cart Count
function cartCount() {
	let cart = JSON.parse(localStorage.getItem("cart"));
	let cartCount = cart.length;

	//Set Cart Count
	$("#cart_count").text(cartCount)
}