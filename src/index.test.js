import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
    it('should pass', () => {
        expect(true).to.equal(true);
    })
});

describe('index.html', () => {
    it('should say hello', (done) => { 
        const index = fs.readFileSync('./src/index.html', "utf-8");
        jsdom.env(index, function (err, window) { // window represents the window in the browser
            const h1 = window.document.getElementsByTagName('h1')[0]; // reference to the h1 on the page
            expect(h1.innerHTML).to.equal('Hello World´');
            done();
            window.close();
        });
    })
});