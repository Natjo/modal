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
	
	const trap = {
		index: 0,
		els: [],
		isShifted: false,
		init(){
			trap.els = [];
			modal.querySelectorAll('button,a,input').forEach(el => trap.els.push(el));
		},
		keyup(e){
			e.key === 'Escape' && close();
			if(e.key === 'Shift') {
				trap.isShifted = false;
			}
		},
		keydown(e){
			if(e.key === 'Shift') {
				trap.isShifted = true;
			}
        	if(e.key === 'Tab') {
           		if(e.preventDefault) e.preventDefault();
				else e.returnValue = false;
				trap.isShifted ? trap.index -- : trap.index ++;
				if(trap.index < 0) trap.index = trap.els.length-1;
				if(trap.index >= trap.els.length) trap.index = 0;
				trap.els[trap.index].focus();
			}
		},
		add(){
			btn_close.focus();
			document.addEventListener('keydown', trap.keydown, false);
			document.addEventListener('keyup', trap.keyup, false);
		},
		remove(){
			document.removeEventListener('keydown', trap.keydown);
			document.removeEventListener('keyup', trap.keyup);
		}
	}
	
	let activeEl;
	
	const close = e => {
		window.removeEventListener(clicktouch, clickOut);
		modal.classList.add('hide');
		modal.addEventListener('animationend', () => modal.remove(), {once:true});
		window.removeEventListener('scroll', disableScroll);
		trap.remove();
		if(activeEl.type === 'button') activeEl.focus();
	}

	const open = (msg, type) => {
		activeEl = document.activeElement;
		scrollTop = window.pageYOffset || window.scrollY;
		window.addEventListener('scroll', disableScroll);
		modal = document.createElement('div');
		modal.className = 'modal';
		modal.innerHTML = `<div class="box">
			<button type="button" class="btn-close"></button>
			<div class="content">${msg}</div>
			<div class="action">
				<button class="btn-ok">ok</button>
				${type === 'confirm' ? `<button class="btn-cancel">cancel</button>` : ``}
			</div>
		</div>`;
		modal.classList.add(type);
		document.body.appendChild(modal);
		btn_close = modal.querySelector('.btn-close');
		btn_close.onclick = () => close();
		window.addEventListener(clicktouch, clickOut, {capture:true});
		trap.init();
		trap.add();
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