// main.test.js
// eslint-disable-next-line no-undef
const { fetchBookDetails } = require('../scripts/main');
// eslint-disable-next-line no-undef
const {describe} = require("yargs");
// eslint-disable-next-line no-undef
const {test} = require("node-gyp/lib/install");
// eslint-disable-next-line no-undef
const expect = require("expect");

describe('fetchBookDetails function', () => {
    test('should fetch book details and call displayBookDetails', async () => {
        // Mock the fetch function
        // eslint-disable-next-line no-undef
        global.fetch = jest.fn(() => Promise.resolve({ json: jest.fn(() => ({ books: [] })) }));

        // Mock the displayBookDetails function
        // eslint-disable-next-line no-undef
        const displayBookDetailsMock = jest.fn();

        // Call the fetchBookDetails function
        await fetchBookDetails(1, displayBookDetailsMock);

        // Assert that fetch was called
        // eslint-disable-next-line no-undef
        expect(global.fetch).toHaveBeenCalled();

        // Assert that displayBookDetails was called
        expect(displayBookDetailsMock).toHaveBeenCalled();
    });
});

// main.test.js
// eslint-disable-next-line no-undef
const { handleBookButtonClick } = require('../scripts/main');

describe('handleBookButtonClick function', () => {
    test('should handle book button click and update book details', async () => {
        // Mock the fetch function
        // eslint-disable-next-line no-undef
        global.fetch = jest.fn(() => Promise.resolve({ json: jest.fn(() => [{ id: 1, bookBtn: 'Booked' }]) }));

        // Mock the DOM elements
        document.getElementById = jest.fn(() => ({
            style: {},
            innerHTML: '',
            value: '',
        }));

        // Call the handleBookButtonClick function
        await handleBookButtonClick();

        // Assert that fetch was called
        // eslint-disable-next-line no-undef
        expect(global.fetch).toHaveBeenCalled();

        // Assert any other expected behavior
    });
});

