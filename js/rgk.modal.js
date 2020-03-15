/*
 * rgk.modal
 * version: 1.1 (13.07.18)
 * Ivan Kolesnikov (myivanko@gmail.com)
 *
 *
 *
 rgk = 
 
 ******************************************** */



function rgkModal(selector, method) {

    var ModalInit = function() {

        // global definition of plugin using
        if (!document.rgk) {
            document.rgk = { 'modal': false };
        }
        if (!document.rgk.modal) {
            document.rgk.modal = {
                active: [],
                events: {
                    'click':   _ListenerClick
                }
            };
            document.addEventListener('click', document.rgk.modal.events.click);
        }

    };

    var ModalAdd = function(el) {

        var modal = el;

        // if element already used by plugin
        if (modal.rgk) {
            return;
        }

        ModalInit();

        // mark element as rgk
        modal.rgk = true;

        modal.insertAdjacentHTML('beforeend', '<span class="c-modal__shadow" data-modal="hide"></span>');

        // trigger ready event
        var evt = new CustomEvent('ready.rgk.modal');
        modal.dispatchEvent(evt);

    };

    var ModalToggle = function(el, trigger) {

        var modal = el;

        // if element not used by plugin
        if (!modal.rgk) {
            ModalAdd(modal);
        }

        var active = document.rgk.modal.active,
            index = active.indexOf(modal);

        // set z-index for currently open modal in multiple case
        if (trigger) {
            if (index < 0) {
                var style = active.length ? window.getComputedStyle(active[active.length - 1]) : false,
                    zindex = style ? style.getPropertyValue('z-index') : 'auto';
                if (zindex && zindex != 'auto') {
                    modal.style['z-index'] = zindex*1 + 1;
                }
                active.push(modal);
            }
        } else {
            if (index > -1) {
                modal.style['z-index'] = null;
                active.splice(index, 1);
            }
        }

        modal.classList.toggle('is-open', trigger);

        var evtName = trigger ? 'show.rgk.modal' : 'hide.rgk.modal';

        // trigger show event
        var evt = new CustomEvent(evtName);
        modal.dispatchEvent(evt);

    };

    var ModalDestroy = function() {

        // global definition of plugin using
        if (document.rgk.modal) {
            document.removeEventListener('click', document.rgk.modal.events.click);
                delete document.rgk.modal;
                if (!document.rgk.length) {
                    delete document.rgk;
                }
        }

    };

    var _ListenerClick = function(e) {

        var clicked = e.target,
            trigger = clicked.getAttribute('data-modal');

        if (trigger && (trigger == 'show' || trigger == 'hide')) {
            e.preventDefault();

            var target = false,
                id = clicked.dataset.target || clicked.hash || '';

            if (id.trim()) target = document.querySelector(id);
            if (!target) target = clicked.closest('[data-modal="modal"]');

            if (target) {
                ModalToggle(target, (trigger == 'show' ? true : false));
            } else {
                console.log('no modal selector found');
            }

            return false;
        }

    };



    var els = null;

    switch (typeof selector) {
        case 'string':
            if (selector == 'init' || selector == 'destroy') {
                els = [''];
                method = selector;
            } else {
                els = document.querySelectorAll(selector);
            }
            break;
        case 'object':
            selector.length ? els = selector : els = [selector];
            break;
        default:
            els = [''];
            break;
    }

    if (els === null) {
        throw new TypeError('Element must not be null!');
    }

    for (var i = 0; i < els.length; i++) {

        el = els[i];

        switch (method) {
            case 'init':
                ModalInit();
                break;
            case 'show':
                ModalToggle(el, true);
                break;
            case 'hide':
                ModalToggle(el, false);
                break;
            case 'destroy':
                ModalDestroy();
                break;
            default:
                ModalInit();
                break;
        }

    }

};