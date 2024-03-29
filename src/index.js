import PaletteProfiles from './modules/PaletteProfiles';
import SaveData from './modules/SaveData';

var saveContainer = new SaveData(localStorage);

/**
 * Put text onto the user clipboard.
 * @param {string} text - String to put onto the clipboard
 */
function copyText(text) {
    let element = document.createElement('input');
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(element);
    element.select();
    element.value = text;
    element.setSelectionRange(0, element.value.length);
    document.execCommand("copy");
    body.removeChild(element);
    alert("Copied to clipboard"); // eslint-disable-line no-alert
}

/**
 * Create an absolute URL to a page on this site
 * @param {string} page - URI relative to the website root (e.g. a .html file)
 * @param {object} paramsObject - Key/value pairs to build a query string from
 * @return {string} URL string
 */
function buildUrl(page, paramsObject) {
    let result = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1) + page;
    if (paramsObject === void 0)
        paramsObject = {};

    result += '?' + new URLSearchParams(paramsObject).toString();
    return result;
}

window.onload = () => {
    let config;
    saveContainer.Load();
    if (config = saveContainer.data.configuration) {
        if (config.background)
            document.getElementById('background').value = config.background;
        if (config.view)
            document.getElementById('view').value = config.view;
    }
    var clear = document.getElementById('clear');
    clear.onclick = event => {
        saveContainer.Clear();
        alert("Save data was cleared."); // eslint-disable-line no-alert
        event.preventDefault();
        return false;
    };

    var form = document.getElementsByTagName('form')[0];
    form.onsubmit = event => {
        let windowFeatures = 'titlebar=0,menubar=0,toolbar=0';
        let persistent = {};
        if (saveContainer.Load()) {
            persistent = saveContainer.data.persistent;
            if (persistent && persistent.windowWidth > 0 && persistent.windowHeight > 0) {
                let adjustedWidth = persistent.windowWidth - persistent.windowWidthMargin || 0;
                let adjustedHeight = persistent.windowHeight - persistent.windowHeightMargin || 0;
                windowFeatures += `,width=${adjustedWidth},height=${adjustedHeight}`;
            }
        }
        let newWindow = window.open('tracker.html?' + new URLSearchParams(new FormData(form)).toString(), 'pso-tracker', windowFeatures);

        /**
         * this force resize is to address inconsistencies in Firefox not quite calculating the difference between
         * inner and outer height correctly
         */
        if (persistent.windowWidth && persistent.windowHeight)
            newWindow.resizeTo(persistent.windowWidth, persistent.windowHeight);

        event.preventDefault();
        return false;
    };

    // Populate dropdowns
    let profileSelect = document.getElementById('profile');
    let layoutSelect = document.getElementById('layout');

    for (let [profileKey, profileData] of Object.entries(PaletteProfiles)) {
        let option = document.createElement('option');
        option.text = profileData.name;
        option.value = profileKey;
        profileSelect.add(option);
    }

    /**
     * Populate the layout dropdown based on the currently selected profile.
     */
    function onProfileChange() {
        let profile = PaletteProfiles[profileSelect.options[profileSelect.selectedIndex].value];
        for (let i = layoutSelect.options.length - 1; i >= 0; --i) {
            layoutSelect.remove(i);
        }
        for (let layoutID = 0; layoutID < profile.layouts.length; ++layoutID) {
            let option = document.createElement('option');
            option.text = '#' + (layoutID + 1);
            option.value = layoutID;
            layoutSelect.add(option);
        }
    }

    if (config && config.profile)
        profileSelect.value = config.profile;
    onProfileChange();
    profileSelect.onchange = onProfileChange;

    if (config && config.layout)
        layoutSelect.value = config.layout;

    // Browser Source URL
    document.getElementById('browserSource').onclick = event => {
        let formData = new FormData(form);
        formData.append('browserSource', 1);
        formData.delete('background');
        copyText(buildUrl('tracker.html', formData));
        event.preventDefault();
        return false;
    };
};