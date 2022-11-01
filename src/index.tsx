import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom/client';
import * as FlexLayout from 'flexlayout-react';
import {TabNode} from "flexlayout-react/src/model/TabNode";
//import 'light.css';

const json = {
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

interface IProps {
    json?:  FlexLayout.IJsonModel
}

interface IState {
    model:  FlexLayout.Model
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { model: FlexLayout.Model.fromJson(props.json || {
            layout: {
                children: [],
                type: "row"
            }
        }) };
    }

    factory = (node: FlexLayout.TabNode) => {
        const component = node.getComponent();
        if (component === 'panel') {
            return <div className="tab_content">{node.getName()}</div>;
        }
        return null;
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

