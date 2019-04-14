import React from 'react';
import Item from './Item';
//import './Login.less';

class UserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { itemsIds: [] };
        this.getUserItems();
    }
    render() {
        var dataItems = this.props.getTokeIdsData(this.state.itemsIds);
        return (
            <div className="UserScreen-page">
                <div>{"Hello " + this.props.name}</div>
                {
                    dataItems.map((item, i) => { return <Item key={item.tokenId} data={item} addAction={false} changeUserItem={this.RemoveUserItem} /> })
                }
            </div>)

    }

    getUserItems = () => {
        var http = new XMLHttpRequest();
        var url = ' http://localhost:8888/user/tokens';

        http.open('GET', url);
        http.setRequestHeader('Content-type', 'application/json');
        http.setRequestHeader('Authorization', this.props.autorizationToken);
        http.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With');
        http.setRequestHeader('Access-Control-Allow-Origin', '*');

        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
                this.setState({ itemsIds: JSON.parse(http.response).data.map(item => item.tokenId) })
            }
        }
        http.send();
    }

    RemoveUserItem = (id) => {
        var newUserItems = this.state.itemsIds.filter(itemsId => itemsId !== id);
        var http = new XMLHttpRequest();
        var url = ' http://localhost:8888/user/tokens';

        http.open('POST', url);
        http.setRequestHeader('Content-type', 'application/json');
        http.setRequestHeader('Authorization', this.props.autorizationToken);
        http.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With');
        http.setRequestHeader('Access-Control-Allow-Origin', '*');

        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
                this.setState({ itemsIds: newUserItems })
            }
        }
        http.send('{"tokenIds":[' + newUserItems.toString() + ']}');
    }
}
export default UserScreen