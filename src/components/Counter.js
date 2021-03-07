import React from 'react';

const ErrorComponent = () => {
    <div>{props.ignoreProps}</div>
}

class Counter extends React.Component {
    constructor(props) {
        console.log('Constructor');
        super(props);

        this.state = {
            counter: 0,
            seed: 0,
            initalizing: true
        };

        this.decrement = () => this.setState({ counter: this.state.counter - 1 })
        this.increment = () => this.setState({ counter: this.state.counter + 1 })
        //this.decrement = this.decrement.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.seed && state.seed !== props.seed)
            return {
                seed: props.seed,
                counter: props.seed
            };
    }

    decrement() {
        this.setState({
            counter: this.state.counter - 1
        });
    }
    componentWillMount() {
        console.log('Component Will Mount');
        console.log('---------------------')
    }

    componentDidMount() {
        console.log('Component Did Mount')
        this.setTimeout(() => {
            this.setState({
                initalizing: false
            });
        }, 500);
        console.log('---------------------')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Component Did Update')
        console.log('---------------------')
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.ignoreProps &&
            this.props.ignoreProps !== nextProps.ignoreProps) {
            console.log('Should Component Update - DO NOT RENDER');
            console.log('---------------------')
            return false;
        }
        console.log('Should Component Update - RENDER');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Get Snapshot Before Update -');
        return null;
    }

    componentDidCatch(error, info) {
        console.log('Component Did Catch');
        this.setState({
            error, info,
        });
    }

    render() {
        console.log('Render this.state.error:');

        if (this.state.initalizing) {
            return <div>Initalizing......</div>
        }

        if (this.props.showErrorComponent && this.state.error) {
            return <div>We have encountered an error!{this.state.error.message}</div>
        }

        return (
            <div>
                <div className="counter">
                    Counter:{this.state.counter}
                </div>
                {this.props.showErrorComponent ? <ErrorComponent /> : null}
                <ErrorComponent />
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        );
    }
}

export default Counter;
