import React from 'react';
import ReactDOM from 'react-dom/client';
import * as FlexLayout from 'flexlayout-react';
//import 'light.css';

const json: FlexLayout.IJsonModel = {
    global: {},
    layout: {
        type: 'row',
        weight: 100,
        children: [
            {
                type: 'tabset',
                weight: 50,
                selected: 0,
                children: [
                    {
                        type: 'tab',
                        name: 'One',
                        component: 'panel',
                    },
                ],
            },
        ],
    },
};

class App extends React.Component<any, {model:FlexLayout.Model}> {
    constructor(props: any) {
        super(props);
        this.state = { model: FlexLayout.Model.fromJson(json) };
    }

    factory = (node: FlexLayout.TabNode) => {
        const component = node.getComponent();
        if (component === 'panel') {
            return <div className="tab_content">{node.getName()}</div>;
        }
    };

    render() {
        return (
            <div className="spector2">
                <div className="spector2-debugger">
                    <FlexLayout.Layout model={this.state.model} factory={this.factory} />;
                </div>
            </div>
        );
    }
}

const elem = document.createElement('div');
document.body.appendChild(elem);
const root = ReactDOM.createRoot(elem);
root.render(<App />);

