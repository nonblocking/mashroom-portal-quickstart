
import type {Request, Response} from 'express';
import type {IncomingMessage} from 'http';
import type {MashroomLogger} from '@mashroom/mashroom/type-definitions';
import type {
    HttpHeaders,
    MashroomHttpProxyInterceptor,
    QueryParams,
    MashroomHttpProxyRequestInterceptorResult,
    MashroomHttpProxyResponseInterceptorResult
} from '@mashroom/mashroom-http-proxy/type-definitions';
import type {MashroomSecurityService} from '@mashroom/mashroom-security/type-definitions';

export default class ExampleInterceptor implements MashroomHttpProxyInterceptor {

    constructor(private backendUser: string, private backendPassword: string) {
    }

    async interceptRequest(targetUri: string, existingHeaders: Readonly<HttpHeaders>, existingQueryParams: Readonly<QueryParams>,
                     clientRequest: Request, clientResponse: Response):
        Promise<MashroomHttpProxyRequestInterceptorResult | undefined | null> {

        const logger: MashroomLogger = clientRequest.pluginContext.loggerFactory('my.httpProxyInterceptor');
        const securityService: MashroomSecurityService = clientRequest.pluginContext.services.security.service;
        const user = securityService.getUser(clientRequest);

        logger.info(`Intercepted HTTP proxy call to ${targetUri} by user: ${user?.username || 'anonymous'}`);

        // TODO: add a Authorization header if necessary

        const interceptorResult: MashroomHttpProxyRequestInterceptorResult = {
            addHeaders: {

            },
            addQueryParams: {

            }
        };

        return interceptorResult;
    }


    async interceptResponse(targetUri: string, existingHeaders: Readonly<HttpHeaders>, targetResponse: IncomingMessage,
                      clientRequest: Request, clientResponse: Response):
        Promise<MashroomHttpProxyResponseInterceptorResult | undefined | null> {

        return null;
    }
}
