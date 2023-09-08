import React, {useCallback, useEffect, useState} from 'react';
import type {MashroomPortalMessageBus} from '@mashroom/mashroom-portal/type-definitions';

import styles from './App.scss';

type Props = {
    name: string,
    messageBus: MashroomPortalMessageBus,
}

export default ({name, messageBus}: Props) => {
    const [receivedData, setReceivedData] = useState<any>(null);
    const sendMessage = useCallback(() => {
        messageBus.publish('to-all', {
            "foo": "bar"
        });
    }, []);
    useEffect(() => {
        const messageHandler = (any: any) => {
            setReceivedData(any);
        }
        messageBus.subscribe('dummy-topic', messageHandler);
        return () => {
            messageBus.unsubscribe('dummy-topic', messageHandler);
        };
    }, []);

    return (
        <div className={styles.App}>
            <div className={styles.Header}>
                <strong>Hello {name}!</strong>
            </div>
            <div>
                <a id='example-app-publish-some-message-link' href='javascript:void(0)' onClick={() => sendMessage()}>Publish a Message</a>
            </div>
            {receivedData && (
                <div>
                    Received data:
                    <pre id='example-app-received-data'>
                        {JSON.stringify(receivedData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};
