# Modal

![version](https://img.shields.io/github/manifest-json/v/Natjo/modal)

Alert and confirm modals.


## Methods
| Name | Arguments | Description |
| ------ | ------ | ------ |
| modal.alert(`msg`) | html | open alert with msg |
| modale.confirm(`msg`, `status => {}`) | html - function | open confirm with msg, and return boolean of the confirmation |

## Usage
```javascript
import Modal from '../../modules/modal/modal.js';

const modal = new Modal();

const btn_alert = document.querySelector('.alert');
btn_alert.onclick = () => modal.alert('<b>Hello</b> f* world');

const btn_confirm = document.querySelector('.confirm');
btn_confirm.onclick = () => {
    modal.confirm("Are you sure", status => {
        console.log(status);
    });
};
```

## Demo

[See codepen demo](https://codepen.io/natjo/pen/qBZLyLj?editors=0010)
