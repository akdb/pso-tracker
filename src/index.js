import PaletteProfiles from './modules/PaletteProfiles';
import SaveData from './modules/SaveData';

var saveContainer = new SaveData(localStorage);

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
        if (saveContainer.Load()) {
            config = saveContainer.data.configuration;
            if (config && config.windowWidth > 0 && config.windowHeight > 0) {
                windowFeatures += `,width=${config.windowWidth},height=${config.windowHeight}`;
            }
        }
        window.open('tracker.html?' + new URLSearchParams(new FormData(form)).toString(), 'pso-tracker', windowFeatures);
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
    profileSelect.onchange = onProfileChange();

    if (config && config.layout)
        layoutSelect.value = config.layout;
};