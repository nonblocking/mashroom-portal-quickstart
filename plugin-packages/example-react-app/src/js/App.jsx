// @flow

import React, {PureComponent} from 'react';

type Props = {
    name: string,
}

export default class App extends PureComponent<Props> {

    render() {
        return (
            <div className='example-react-app'>
                <strong>Hello {this.props.name}</strong>
            </div>
        );
    }

}
