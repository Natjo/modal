/**
 * @method alert Add content (text/html) to modal with ok button
 * @method confirm Add content (text/html) to modal with ok or cancel button
 */

function Modal(){
	const root = document.documentElement || window;
	const clicktouch = ('ontouchstart' in root) ? 'touchstart' : "click";
	let modal;
	let btn_close;
	let scrollTop;
	
	const disableScroll = () => window.scrollTo(0, scrollTop);

	const clickOut = e => {
		const box = modal.querySelector('.box');
		if(!box.contains(e.target) && !btn_close.contains(e.target)) close();
	}

	const close = e => {
		window.removeEventListener(clicktouch, clickOut);
		modal.classList.add('hide');
		modal.addEventListener('animationend', () => modal.remove(), {once:true});
		window.removeEventListener('scroll', disableScroll);
	}

	const open = (msg, type) => {
		scrollTop = window.pageYOffset || window.scrollY;
		window.addEventListener('scroll', disableScroll);
		modal = document.createElement('div');
		modal.className = 'modal';
		modal.innerHTML = `<div class="box">
			<button type="button" class="btn-close"></button>
			<div class="content">${msg}</div>
			<div class="action">
				<button class="btn-ok">ok</button>
				<button class="btn-cancel">cancel</button>
			</div>
		</div>`;
		modal.classList.add(type);
		document.body.appendChild(modal);
		btn_close = modal.querySelector('.btn-close');
		btn_close.onclick = () => close();
		window.addEventListener(clicktouch, clickOut, {capture:true});
	}

	this.alert = msg => {
		open(msg, 'alert');
		modal.querySelector('.btn-ok').onclick = () => close();
	}
	this.confirm = (msg, func) => {
		open(msg, 'confirm');
		modal.querySelector('.btn-ok').onclick = () => {
			func(true);
			close();
		};
		modal.querySelector('.btn-cancel').onclick = () => {
			func(false);
			close();
		};
	}
}
export default Modal;