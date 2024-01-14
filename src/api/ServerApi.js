import packageJson from '../../package.json'

var ServerApi = {
    UrlByRoot: (root) => {
        var url = packageJson.server.domain + root
        return url
    }
}
export default ServerApi;
