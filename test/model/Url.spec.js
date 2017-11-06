import Url from '../../src/js/model/Url'
describe('Url', () => {
    const testCases = [
        {
            url: "http://www.tarkil.com",
            domainExpression: "tarkil.com",
            isFromDomain: false
        },
        {
            url: "http://www.tarkil.com",
            domainExpression: "*tarkil.com",
            isFromDomain: true
        },
        {
            url: "http://tarkil.com",
            domainExpression: "*tarkil.com",
            isFromDomain: true
        },
        {
            url: "http://www.tarkil.com",
            domainExpression: "*.tarkil.com",
            isFromDomain: true
        }, 
        {
            url: "http://tarkil.com",
            domainExpression: "*.tarkil.com",
            isFromDomain: false
        }, 
        {
            url: "http://test-hello.tarkil.com",
            domainExpression: "*.tarkil.com",
            isFromDomain: true
        }, 

    ];
    testCases.forEach(function (testCase) {
        it(`Should ${!!testCase.isFromDomain ? "": "not"} be from domain when url is ${testCase.url} and domain expresion is ${testCase.domainExpression} `, () => {
            const url = new Url(testCase.url);
            expect(url.isFromDomain(testCase.domainExpression)).toEqual(testCase.isFromDomain);
        });
      });
});