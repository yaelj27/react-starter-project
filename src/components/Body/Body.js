import React, {Component} from 'react';
import "./Body.less";

export default class Body extends Component {
    render() {
        const {children} = this.props;
        return (
            <div className="site-body">
                {children}
            </div>
        )
    }
}