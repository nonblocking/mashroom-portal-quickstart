
type Context = {
    spaMode: boolean;
    showEnvAndVersions: boolean;
    mashroomVersion: string;
}

let context: Context = {
    spaMode: true,
    showEnvAndVersions: false,
    mashroomVersion: '',
};

export default {
    get spaMode() {
        return context.spaMode;
    },
    get showEnvAndVersions() {
        return context.showEnvAndVersions;
    },
    get mashroomVersion() {
        return context.mashroomVersion;
    },
    setContext(_context: Context) {
        context = _context;
    },
};
