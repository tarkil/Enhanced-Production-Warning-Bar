/**
 * Class to handle URL
 */
class Url {

    /**
     * Create an object to handle urls
     * @constructor
     * @param {*} val url
     */
    constructor(val) {
        this.url = new URL(val);
    }

    /**
     * Check if the url meets the constraints defined by a domain expression
     * @param {string} domainExpression a domain expression
     * @returns {boolean} true id the url contains the domain expression
     **/
    isFromDomain (domainExpression) {
        const domainAsRegex = domainExpression.replace("*", "[A-z0-9.-]*");
        const regex = new RegExp("^" + domainAsRegex + "$");
        return this.url.hostname.search(regex) >= 0;
    }

}

export default Url;