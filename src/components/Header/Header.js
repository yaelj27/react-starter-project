import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./Header.less";

class Header extends Component {
    render() {
        return (
            <div className="site-header">
                <div className="site-header__menu-line">
                    <div className="site-header__menu-line__menu">
                    Le Menu
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, {})(Header);