import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {

    it('renders the "no address selected" header', async () => {
        let sendMessage: ((data: any) => void) | undefined;

        const messageBus: any = {
            subscribe: (topic: string, cb: (data: any) => void) => {
                sendMessage = cb;
            },
            unsubscribe: () => {
                // Nothing to do
            },
        };

        const { container } = render(<App name="John" messageBus={messageBus} />);

        expect(container.querySelector('#example-app-received-data')).toBeNull();

        // Send a message
        if (sendMessage) {
            sendMessage({ foo: 'bar' });
        }

        // Wait for microtasks to finish
        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(container.querySelector('#example-app-received-data')).not.toBeNull();
    });

});
