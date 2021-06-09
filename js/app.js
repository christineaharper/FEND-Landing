// global variables
const navBar = document.querySelector('.navbar');
const ul = document.querySelector('.navbar-list');
const sections = document.querySelectorAll('.section');
const containers = document.querySelectorAll('.inner-content');
const main = document.querySelector('.main');
const upBtn = document.querySelector('.upBtn');

let timeout = null;

// function to dynamically create li's for the header navbar
// name and id pulled from each section
function makeNav() {
	sections.forEach((section) => {
		sectionName = section.getAttribute('data-nav');
		sectionId = section.getAttribute('id');
		const li = document.createElement('li');
		li.innerHTML = `<a href="#${sectionId}" data-nav="${sectionName}">${sectionName}</a>`;
		ul.appendChild(li);
	});
}

// smooth scroll from all anchor tags
function smoothScroll() {
	const anchors = document.querySelectorAll('a[href^="#"]');
	anchors.forEach((anchor) => {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			target.scrollIntoView({
				block: 'center',
				behavior: 'smooth'
			});
		});
	});
}

// toggle active class on navbar
//sets a 4 second timeout before removing active class/hiding navbar
function navBarToggle() {
	clearTimeout(timeout);
	navBar.classList.add('navbar-visible');
	timeout = setTimeout(function() {
		navBar.classList.remove('navbar-visible');
	}, 4000);
}

// event listeners for navbar
document.addEventListener('scroll', navBarToggle);
navBar.addEventListener('mouseover', navBarToggle);

// intersection observers
// these activate the show class for the inner-content and also activated the active class on the navbar
const showOptions = {
	threshold: 0.75,
	rootMargin: '0px'
};

const slideInObserver = new IntersectionObserver(function(entries, showOptions) {
	entries.forEach((entry) => {
		const activeLink = document.querySelector(`a[data-nav="${entry.target.getAttribute('data-content')}"]`);

		if (!entry.isIntersecting) {
			entry.target.classList.remove('show');
			activeLink.classList.remove('active-nav');
			return;
		}
		else {
			entry.target.classList.add('show');
			activeLink.classList.add('active-nav');
		}
	});
}, showOptions);

containers.forEach((container) => {
	slideInObserver.observe(container);
});

const upOptions = {
	threshold: 0
};

// activates the show class on the 'to top' button once the user scrolls into the main element
// this is removed when the user scrolls back up into the header.
const showUpBtn = new IntersectionObserver(function(entries, upOptions) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			upBtn.classList.remove('upBtn-show');
			return;
		}
		else {
			upBtn.classList.add('upBtn-show');
		}
	});
}, upOptions);

showUpBtn.observe(main);

makeNav();
smoothScroll();
