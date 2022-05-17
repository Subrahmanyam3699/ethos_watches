const json = JSON.parse(`
[
	{
		"name": "CARL F. BUCHERER Manero Flyback Green",
		"des": "Watches from the Carl F. Bucherer Manero collection uniformly sport sapphire crystal case backs to allow an insight into the intricate mechanics behind each piece. The muted white or simplistic black dials are protected with glare-proof sapphire glass. The cases with fixed bezels are crafted from 18K rose gold or stainless steel. Most dials sport supplementary subdials whilst all are equipped with the date function. Movements vary from automatic to hand-wound, all providing precise timekeeping functions.",
		"img": "0.jpg"
	},
	{
		"name": "FREDERIQUE CONSTANT Highlife Automatic Cosc",
		"des": "The machinery inside a watch that keeps things ticking is called the movement or a calibre. A synonym of size, the word ‘calibre’, first used as a watchmaking term in 1715, originally referred to the build of a watch movement—the layout, dimensions, shape and size of the wheels, barrels, bridges and so on. Today the word is a substitute for movement, the complete mechanism with the mainspring, escape wheel, bridges, gear train, and other components, including the rotor in automatic watches. Calibres are either mechanical or quartz-based. While the latter are powered mostly by a battery, the former can either be manual winding, or self-would by an oscillating mass or rotor.",
		"img": "0.jpg"
	},
	{
		"name": "H. MOSER & CIE. Pioneer Cylindrical Tourbillon Skeleton 3811-1200",
		"des": "Launched in 2015, the H. Moser & Cie. Pioneer collection started out with the Pioneer Centre Seconds series. Since then, the Pioneer collection has paved a minimalistic yet technical lineage for the brand.",
		"img": "0.jpg"
	},
	{
		"name": "ZENITH Defy 21",
		"des": "Zenith, a brand that is closely associated with luxury and innovation was founded in 1865 by George Favre-Jacot. Creating a sense of opulence amidst the development of much better versions of their timepieces, Zenith is a brand that crafted the world’s first automatic movement, the El Primero. This movement later became a milestone for Zenith. With Zenith raising the stakes in the watchmaking world every day, it is hard to miss the exuberance of this brand.",
		"img": "0.jpg"
	}
]`);

const refreshCart = () => {
	const el = document.getElementById('navCart');
	const count = +(localStorage.getItem('cart') || 0);
	localStorage.setItem('cart', count);
	el.innerHTML = `Cart (${count})`;
}

const addToCart = (item) => {
	if(localStorage.getItem('login') !== 'true') {
		window.location.href = './login.html';
		return;
	}
	
	const title = item.dataset.title;
	const img = item.dataset.img;

	const cartContent = JSON.parse(localStorage.getItem('cartContent'));
	const content = JSON.stringify({title, img}, null, "");

	cartContent.push(content);

	const el = document.getElementById('navCart');
	const count = +(localStorage.getItem('cart') || 0) + 1;

	localStorage.setItem('cart', count);
	localStorage.setItem('cartContent', JSON.stringify(cartContent, null, ""));

	el.innerHTML = `Cart (${count})`;
}

const removeFromCart = (item) => {
	const title = item.dataset.title;
	
	const cartContent = JSON.parse(localStorage.getItem('cartContent'));

	let newCart = [];

	cartContent.forEach(e => {
		const el = JSON.parse(e);

		if(el.title !== title)
			newCart.push(e);
	});

	localStorage.setItem("cartContent", JSON.stringify(newCart, null, ''));

	let cartCount = +localStorage.getItem('cart');

	if(!cartCount || cartContent === 0) cartCount++;
	
	cartCount--;
	
	localStorage.setItem('cart', cartCount);

	location.reload();
}

const logout = () => {
	localStorage.removeItem('login');
	localStorage.removeItem('cart');
	localStorage.removeItem('cartContent');
	document.getElementById('navLogin').style.display = 'unset';
	document.getElementById('navLogout').style.display = 'none';
	refreshCart();
}

const getLoginInfo = () => {
	const login = localStorage.getItem("login");
	
	if(login !== "true") return;
	
	document.getElementById("navLogin").style.display = "none";
	document.getElementById("navLogout").style.display = "unset";
}

const loginSubmit = () => {
	login();
	return false;
}

const signupSubmit = () => {
	signup();
	return false;
}

const login = async () => {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	try {

		const res = await axios.post(`http://localhost:3000/login`, {
			username,
			password,
		});
	
		const data = res.data;
	
		if(data.success === true) {
			localStorage.setItem("login", "true");
			window.location.replace("./index.html");
		} else
			alert(JSON.parse(err.request.responseText).err);
			
	} catch (err) {
		alert(JSON.parse(err.request.responseText).err);
	}

	localStorage.setItem('cartContent', '[]');

	return false;
}

const signup = async () => {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const conPass = document.getElementById("conPassword").value;

	if(password !== conPass) {
		alert("Passwords don't match!")
		return false;
	}

	try {

		const res = await axios.post(`http://localhost:3000/signup`, {
			username,
			password,
		});

		const data = res.data;

		if(data.success === true) {
			localStorage.setItem("login", "true");
			window.location.replace("./index.html");
		} else
			alert(JSON.parse(err.request.responseText).err);

	} catch (err) {
		alert(JSON.parse(err.request.responseText).err);
	}

	return false;
}

const makeCards = async (container) => {

	const res = await axios.get(`http://localhost:3000/watches`);
	const data = res.data;

	const element = `
		<div class="col">
			<div class="card" style="width: 18rem; margin-top: 100px;">
				<img src="./assets/{img}" class="card-img-top">
				<div class="card-body">
					<h5 class="card-title">{title}</h5>
					<p class="card-text">{desc}</p>
					<a href="#" class="btn btn-primary addToCart" data-img="{img}" data-title="{title}">Add to Cart</a>
				</div>
			</div>
		</div>`;

	let html = '';

	data.forEach(e => {
		html += element
			.replaceAll('{title}', e.name)
			.replaceAll('{desc}', e.des)
			.replaceAll('{img}', e.img);
	});

	if (container) container.innerHTML = html;

	const btnAddToCart = document.getElementsByClassName('addToCart');
	if(btnAddToCart.length > 0) {
		for (let i = 0; i < btnAddToCart.length; i++) {
			const element = btnAddToCart.item(i);
			element.addEventListener('click', () => addToCart(element));
		}
	}
};

const fillCart = (cart) => {
	const cartContent = JSON.parse(localStorage.getItem('cartContent'));

	const element = `
		<div class="col" style="width: 500px; margin-top: 100px;">
			<div class="card">
				<img src="./assets/{img}" class="cart-img-top">
				<div class="card-body">
					<h5 class="card-title">{title}</h5>
					<a href="#" class="btn btn-primary removeFromCart" data-title="{title}">Remove</a>
				</div>
			</div>
		</div>`;

	let html = '';

	cartContent.forEach(e => {
		const x = JSON.parse(e);
		html += element
			.replaceAll('{title}', x.title)
			.replaceAll('{img}', x.img);
	});

	if(cart) cart.innerHTML = html;

	const btnRemoveFromCart = document.getElementsByClassName('removeFromCart');
	if(btnRemoveFromCart.length > 0) {
		for (let i = 0; i < btnRemoveFromCart.length; i++) {
			const element = btnRemoveFromCart.item(i);
			element.addEventListener('click', () => removeFromCart(element));
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {

	getLoginInfo();
	refreshCart();
	
	const container = document.getElementById('cards');
	const cart = document.getElementById('cartContent');

	if(container) makeCards(container);
	if(cart) fillCart(cart);

	const navLogout = document.getElementById('navLogout');
	if(navLogout) navLogout.addEventListener('click', logout);

}, false);
