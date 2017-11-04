import ExtendedUrl from '../../src/js/model/extendedUrl'
describe('ExtendedUrl', () => {
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
            const url = new ExtendedUrl(testCase.url);
            expect(url.isFromDomain(testCase.domainExpression)).toEqual(testCase.isFromDomain);
        });
      });
});