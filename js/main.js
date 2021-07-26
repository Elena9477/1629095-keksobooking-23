import { createMap } from './map.js';
import { setFormModeActiveOff, setUserFormSubmit, setFormModeActiveOn } from './form.js';
import { createModalError, createModalSuccess, showModalSuccess, showModalError } from './modal.js';
import { setFilterListener } from './filter-form.js';
import { setFileChooser } from './photo.js';

setFormModeActiveOff();
createMap(setFormModeActiveOn);
createModalError();
createModalSuccess();
setUserFormSubmit(showModalSuccess, showModalError);
setFilterListener();
setFileChooser();
