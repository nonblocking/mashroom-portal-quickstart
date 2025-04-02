import ExampleInterceptor from './ExampleInterceptor';
import type { MashroomHttpProxyInterceptorPluginBootstrapFunction } from '@mashroom/mashroom-http-proxy/type-definitions';

const bootstrap: MashroomHttpProxyInterceptorPluginBootstrapFunction = async (pluginName, pluginConfig) => {
    const { backendUser, backendPassword } = pluginConfig;
    const ergoEsbInterceptor = new ExampleInterceptor(backendUser, backendPassword);

    return ergoEsbInterceptor;
};

export default bootstrap;
