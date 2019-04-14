import React from 'react';
import Item from './Item';
//import './Login.less';

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { itemsIds: [] };
        this.getUserItems();
    }
    render() {
        return (
            <div className="catalog-page">
                {
                    this.state.itemsIds.length > 0 ?
                        this.props.items.map((item, i) => { return <Item key={item.tokenId} data={item} addAction={true} changeUserItem={this.addUserItem} /> })
                        : null
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

    addUserItem = (id) => {
        var newUserItems = this.state.itemsIds;
        newUserItems.push(id);

        var http = new XMLHttpRequest();
        var url = ' http://localhost:8888/user/tokens';

        http.open('POST', url);
        http.setRequestHeader('Content-type', 'application/json');
        http.setRequestHeader('Authorization', this.props.autorizationToken);
        http.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With');
        http.setRequestHeader('Access-Control-Allow-Origin', '*');

        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
                alert("Added Successfully");
            }
        }
        http.send('{"tokenIds":[' + newUserItems.toString() + ']}');
    }
}

export default Catalog