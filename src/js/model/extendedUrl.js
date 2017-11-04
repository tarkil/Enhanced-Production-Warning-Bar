class ExtendedUrl extends URL {

    constructor(val) {
        super(val);
    }

    isFromDomain (domain) {
        const domainAsRegex = domain.replace("*", "[A-z0-9\.\-]*");
        const regex = new RegExp("^" + domainAsRegex + "$");
        return this.hostname.search(regex) >= 0;
    }

}

export default ExtendedUrl;