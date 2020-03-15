# rgk-modal

![Version](https://img.shields.io/badge/version-v1.1-orange.svg)
![Test](https://img.shields.io/badge/test-passing-green)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)

rgkModal is lightweight script for creating easy modals.

### Getting Started

Base HTML layout:
```html
<div id="modalSimple" class="rgk-modal" data-modal="modal">
    <div class="rgk-modal__dialog">
        <div class="rgk-modal__header">
            <h1 class="rgk-modal__title">Modal title</h1>
            <button class="rgk-modal__close" type="button" data-modal="hide">Close modal</button>
        </div>
        <div class="rgk-modal__body">
            Here is your modal content
        </div>
        <div class="rgk-modal__footer">
            Some footer content
        </div>
    </div>
</div>
```
Initialization:
```javascript
rgkModal(); // initializing all modals with [data-modal="modal"] attribute
rgkModal('destroy'); // destroy all modals
```
Usage
```javascript
rgkModal('#modalSimple', 'show'); // show modal with specific id (initializing modals at the same time)
rgkModal('#modalSimple', 'hide'); // hide modal with specific id
```
```html
<button data-modal="show" data-target="#modalSimple">Show modal (attr)</button>
<button data-modal="hide" data-target="#modalSimple">Hide modal (attr)</button>
<a data-modal="show" href="#modalSimple">Show modal (href)</a>
<a data-modal="hide" href="#modalSimple">Hide modal (href)</a>
```

### Documentation

For more information and examples of use, see [Documentation page](https://irgik.github.io/rgk-modal/)