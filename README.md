# Modal

![version](https://img.shields.io/github/manifest-json/v/Natjo/modal)

Alert and confirm modals.


## Methods
| Name | Arguments | Description |
| ------ | ------ | ------ |
| modal.alert(msg) | html | open alert with msg |
| modale.confirm(msg, status => {}) | html - function| open confirm with msg |

## Usage
```javascript
const modal = new Modal();

const alert = document.querySelector(".alert");
alert.onclick = () => modal.alert("<b>Hello</b> f* world");

const confirm = document.querySelector(".confirm");
confirm.onclick = () => {
    modal.confirm("Are you sure", status => {
        console.log(status);
    });
};
```

## Demo

[See codepen demo](https://codepen.io/natjo/pen/qBZLyLj?editors=0010)
