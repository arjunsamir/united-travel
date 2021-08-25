export default class AppLoader {
    constructor(data, ctn, AppImport) {
        this.data = data;
        this.ctn = ctn;
        this.ImportedApp = AppImport;
    }

    async load() {
        // Wait for import to finish
        await this.ImportedApp.then(App => this.App = new App.default(this.data, this.ctn));

        // Wait For App Load
        await this.App.load();
    }

    init() {
        this.App.init();
    }
}