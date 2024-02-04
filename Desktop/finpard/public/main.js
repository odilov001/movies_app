/*  DOM VARIABLES  */

const slider = document.querySelector(".slide");
const headerImg = document.querySelector(".header_img");

/*  LOGICAL FUNCTION  */

function init() {
	if (window.matchMedia("(max-width: 640px)").matches) {
		slider.classList.add("slider-item-reveal");
		headerImg.style.borderRadius = "16px";
	}
}

init();
