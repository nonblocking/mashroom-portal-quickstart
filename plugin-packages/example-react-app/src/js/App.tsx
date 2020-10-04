
import type {MashroomPortalMessageBus} from '@mashroom/mashroom-portal/type-definitions';
import React, {PureComponent} from 'react';

type Props = {
    name: string,
    messageBus: MashroomPortalMessageBus,
}

type State = {
    receivedData: any | undefined | null,
}

export default class App extends PureComponent<Props, State> {

    boundReceiveMessage: (data: any) => void;

    constructor(props: Props) {
        super(props);
        this.state = {
            receivedData: null
        };
        this.boundReceiveMessage =this.receiveMessage.bind(this);
    }

    componentDidMount() {
        const { messageBus } = this.props;
        messageBus.subscribe('dummy-topic', this.boundReceiveMessage);
    }

    componentWillUnmount() {
        const { messageBus } = this.props;
        messageBus.unsubscribe('dummy-topic', this.boundReceiveMessage);
    }

    receiveMessage(receivedData: any) {
        this.setState({
            receivedData,
        })
    }

    sendMessage() {
        const { messageBus } = this.props;
        messageBus.publish('to-all', {
            "foo": "bar"
        });
    }

    render() {
        const { receivedData } = this.state;

        return (
            <div className='example-react-app'>
                <div>
                    <strong>Hello {this.props.name}!</strong>
                </div>
                <div>
                    <a id='example-app-publish-some-message-link' href='javascript:void(0)' onClick={() => this.sendMessage()}>Publish a Message</a>
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
    }

}
