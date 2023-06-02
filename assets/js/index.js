const perspective = document.querySelector('.perspective__inner');

showNav(document.querySelectorAll('.burger'))
showNav(document.querySelectorAll('.nav__item'))

function showNav(collection) {
	for (const i in collection) {
		if (Object.hasOwnProperty.call(collection, i)) {
			const element = collection[i];
			element.addEventListener("click", function () {
				perspective.classList.toggle("perspective__inner--active");
			})
		}
	}
}

document.addEventListener('click', (e) => {
	const insideNav = e.composedPath().includes(document.querySelector('.outer__nav'));
	const insideBurgerOpen = e.composedPath().includes(document.querySelector('.burger'));
	if (!insideNav && !insideBurgerOpen) {
		perspective.classList.remove("perspective__inner--active");
	}
})

window.addEventListener("wheel", move);
document.addEventListener("touchstart", touchStart);
// document.addEventListener("touchmove", touchEnd);

// setTimeout(() => { document.addEventListener("touchmove", touchEnd); }, 1000)

let touchDirection = 0;

function touchStart(event) {
	console.log(event.touches[0].clientY);
	touchDirection = event.touches[0].clientY;

	document.addEventListener("touchmove", touchEnd);
}

function touchEnd(event) {
	console.log(event.touches[0].clientY);
	if (touchDirection > event.touches[0].clientY) {
		moveDirection(1)
	}
	else {
		moveDirection(-1)
	}
	document.removeEventListener("touchmove", touchEnd);
	setTimeout(() => { document.addEventListener("touchmove", touchEnd); }, 10000)
}

function move(event) {
	moveDirection(event.deltaY)
	window.removeEventListener("wheel", move);
	setTimeout(() => { window.addEventListener("wheel", move); }, 500)
}

function moveDirection(direction) {
	let sectionActive = document.querySelector('.section--active');
	if (direction > 0) {
		if (sectionActive.nextElementSibling === null) {
			moveSection(sectionActive.closest(".content").firstElementChild)
			moveLinks(sectionActive.closest(".content").firstElementChild.getAttribute("sectionName"))
			return;
		}
		moveSection(sectionActive.nextElementSibling)
		moveLinks(sectionActive.nextElementSibling.getAttribute("sectionName"))
	}
	else {
		if (sectionActive.previousElementSibling === null) {
			moveSection(sectionActive.closest(".content").lastElementChild)
			moveLinks(sectionActive.closest(".content").lastElementChild.getAttribute("sectionName"))
			return;
		}
		moveSection(sectionActive.previousElementSibling)
		moveLinks(sectionActive.previousElementSibling.getAttribute("sectionName"))
	}
}

function moveSection(to) {
	document.querySelector('.section--active').classList.remove('section--active');
	to.classList.add('section--active');
}

function moveLinks(sectionName) {

	const asideLink = document.querySelector(`.aside__point[sectionTarget=${sectionName}]`);
	const navLink = document.querySelector(`.nav__item[sectionTarget=${sectionName}]`);

	document.querySelector('.aside__point--active').classList.remove('aside__point--active');
	document.querySelector('.nav__item--active').classList.remove('nav__item--active');

	asideLink.classList.add('aside__point--active')
	navLink.classList.add('nav__item--active')
}

listenLinks('.aside__point');
listenLinks('.nav__item');

function listenLinks(links) {
	const navLinks = document.querySelectorAll(links);
	for (const key in navLinks) {
		if (Object.hasOwnProperty.call(navLinks, key)) {
			const navLink = navLinks[key];
			navLink.addEventListener("click", moveAside.bind(null, links))
		}
	}
}

function moveAside(target, event) {
	const sectionTarget = event.target.closest(target);
	const sectionAttr = sectionTarget.getAttribute("sectionTarget");
	moveLinks(sectionAttr)
	moveSection(document.querySelector(`.section[sectionName=${sectionAttr}]`))
}

const arrows = document.querySelectorAll('.slider__arrow');
for (const key in arrows) {
	if (Object.hasOwnProperty.call(arrows, key)) {
		const arrow = arrows[key];
		let direction = arrow.getAttribute("sliderDirection")
		arrow.addEventListener("click", moveSlider.bind(null, direction))
	}
}

function moveSlider(direction, event) {
	if (direction == "next") {
		const firstItem = document.querySelector('.slider__items-works').firstElementChild;
		firstItem.remove();
		document.querySelector('.slider__items-works').append(firstItem)
	}
	if (direction == "prev") {
		const firstItem = document.querySelector('.slider__items-works').lastElementChild;
		firstItem.remove();
		document.querySelector('.slider__items-works').prepend(firstItem)
	}
}

const inputs = document.querySelectorAll('.form__input-hire');
for (const key in inputs) {
	if (Object.hasOwnProperty.call(inputs, key)) {
		const input = inputs[key];
		labelShow(input)
		input.addEventListener("input", labelShow.bind(null, input));
	}
}

function labelShow(target, event) {
	if (target.value) {
		target.classList.remove("form__input-hire--empty");
	}
	else {
		target.classList.add("form__input-hire--empty");
	}
}