
import {readFileSync} from 'fs';
import {resolve} from 'path';
import context from './context';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

function equals(this: any, lvalue: any, rvalue: any, options: any) {
    if (arguments.length < 3) {
        throw new Error('Handlebars Helper equal needs 2 parameters');
    }
    if (lvalue !== rvalue) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
}

function year() {
    return `<span>${new Date().getFullYear()}</span>`;
}

function i18n(messages: (key: string) => string, key: string) {
    return messages(key) || key;
}

function defaultPluginErrorMessage(pluginName: string, messages: (key: string) => string): string {
    const message = messages('portalAppLoadingFailed') || 'Portal app ${name} is temporarily not available';
    return message.replace('${name}', pluginName);
}

function env() {
    return process.env.NODE_ENV || 'development';
}

function mashroomVersion() {
    return context.mashroomVersion;
}

function fontawesomeVersion(): string {
    return packageJson.devDependencies['@fortawesome/fontawesome-free']?.replace(/[^]/, '');
}

function ifShowEnvAndVersions(this: any, options: any) {
    if (context.showEnvAndVersions) {
        return options.fn(this);
    }
    return null;
}

function inlineStyle(cssFile: string): string {
    try {
        const file = readFileSync(resolve(__dirname, 'public', cssFile));
        return `<style>${file.toString('utf-8')}</style>`;
    } catch (e) {
        return `<!-- Error: CSS file not found: ${cssFile} -->`;
    }
}

function inlineSVG(assetFile: string): string {
    try {
        const file = readFileSync(resolve(__dirname, 'public/assets', assetFile));
        return file.toString('utf-8');
    } catch (e) {
        return `<!-- Error: SVG file not found: ${assetFile} -->`;
    }
}

export default {
    equals,
    year,
    env,
    inlineStyle,
    inlineSVG,
    mashroomVersion,
    fontawesomeVersion,
    ifShowEnvAndVersions,
    defaultPluginErrorMessage,
    '__': i18n,
};
