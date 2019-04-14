import React from 'react';
import './Homepage.less';
import Login from './Login';
import UserScreen from './UserScreen';
import Catalog from './Catalog';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { autorizationToken: '', userName: '', items: [], showUserTokens: true };
    }
    getCatalog() {
        if (this.state.autorizationToken !== '')
            this.getCatalog();
    }

    render() {
        return (
            <div className="home-page">
                {
                    (this.state.autorizationToken === '') ?
                        <Login setAutorazion={this.setToken} /> :
                        <div>
                            <button onClick={() => this.setState({ autorizationToken: '' })}>Logout</button>
                            <button onClick={() => this.setState({ showUserTokens: !this.state.showUserTokens })}>
                                {this.state.showUserTokens ? "Go To Catalog" : "Back To My Tokens"}</button>
                            {(this.state.showUserTokens && this.state.items.length > 0) ?
                                <UserScreen name={this.state.userName} getTokeIdsData={this.getTokeIdsData} autorizationToken={this.state.autorizationToken}  />
                                : null}
                            {(!this.state.showUserTokens && this.state.items.length > 0) ?
                                <Catalog items={this.state.items} autorizationToken={this.state.autorizationToken}  />
                                : null}
                        </div>
                }
            </div>
        )
    }

    setToken = (token, userName) => {
        this.setState({ autorizationToken: token, userName: userName });
        this.getCatalog();
    }
    getCatalog = (items) => {
        if (this.state.items.length === 0)
            this.getItems();
    }

    getItems = () => {
        var http = new XMLHttpRequest();
        var url = ' http://localhost:8888/tokens-info';

        http.open('GET', url);
        http.setRequestHeader('Content-type', 'application/json');
        http.setRequestHeader('Authorization', this.state.autorizationToken);
        http.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With');
        http.setRequestHeader('Access-Control-Allow-Origin', '*');

        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
                this.setState({ items: JSON.parse(http.response).data })
            }
        }
        http.send();
        setTimeout(this.getItems, 300000);
    }

    getTokeIdsData = (ids) => {
        var result = [];
        if (this.state.items.length > 0)
            this.state.items.forEach(element => {
                if (ids.indexOf(element.tokenId) >= 0) {
                    result.push(element);
                }
            });
        return result;
    }
}


export default HomePage