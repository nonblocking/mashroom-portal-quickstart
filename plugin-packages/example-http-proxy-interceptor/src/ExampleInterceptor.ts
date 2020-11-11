
import type {
 HttpHeaders, MashroomHttpProxyInterceptor, MashroomHttpProxyInterceptorResult, QueryParams,
} from '@mashroom/mashroom-http-proxy/type-definitions';
import type { ExpressRequest, MashroomLogger } from '@mashroom/mashroom/type-definitions';

export default class ExampleInterceptor implements MashroomHttpProxyInterceptor {

    constructor(private backendUser: string, private backendPassword: string) {
    }

    async intercept(targetUri: string, existingHeaders: Readonly<HttpHeaders>, existingQueryParams: Readonly<QueryParams>, req: Readonly<ExpressRequest>): Promise<MashroomHttpProxyInterceptorResult | undefined | null> {
        const logger: MashroomLogger = req.pluginContext.loggerFactory('my.httpProxyInterceptor');
        const user = req.pluginContext.services.security.service.getUser(req);

        logger.info(`Intercepted HTTP proxy call to ${targetUri} by user: ${user?.username || 'anonymous'}`);

        // TODO: add a Authorization header if necessary

        const interceptorResult: MashroomHttpProxyInterceptorResult = {
            addHeaders: {

            },
            addQueryParams: {

            }
        };

        return interceptorResult;
    }

}
