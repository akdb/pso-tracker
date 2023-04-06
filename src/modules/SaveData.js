/** @module SaveData */

/**
 * Data persisted for the tracker between pageloads.
 * @typedef {object} SaveData
 * @property {module:tracker.TrackerConfiguration} configuration - Parameters for the tracker (profile, user interface, etc.)
 * @property {Object<module:Trackables.TrackableReference, number>} values - Trackable values for the {@link Model}
 */

/**
 * Key to use in local storage for save data.
 * @constant
 * @type {string}
 */
const SAVE_KEY = 'pso-tracker-save';

/**
 * Wrapper to local storage and serialization of data to persist between pageloads.
 */
export default class SaveData {
    /**
     * Map a {@link Storage} object to a new instance of this class
     * @param {Storage} localStorage - Object to link
     */
    constructor(localStorage) {

        /**
         * Data serialized to storage
         * @type {*}
         */
        this.data = {};

        /**
         * Storage object.
         * @type {Storage}
         */
        this.localStorage = localStorage;
    }

    /**
     * Load saved data from local storage.
     * @return {boolean} Whether data was loaded successfully
     */
    Load() {
        this.data = JSON.parse(this.localStorage.getItem(SAVE_KEY));
        if (this.data !== null) {
            return true;
        }
        this.data = {};
        return false;
    }

    /**
     * Save data to local storage.
     */
    Save() {
        this.localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
    }

    /**
     * Clear data from local storage.
     */
    Clear() {
        this.localStorage.clear();
    }
}
