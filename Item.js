import React from 'react';
//import './Login.less';

class Item extends React.Component {
    render() {
        return (
            <div className="input-page">
                <img src={this.props.data.icon} alt={""} />
                {this.getRow("Name", this.props.data.name)}
                {this.getRow("Symbol", this.props.data.symbol)}
                {this.getRow("Rank", this.props.data.rank)}
                {this.getRow("Price", this.props.data.price)}
                {this.getRow("Percent Change in 1 hour", this.props.data.percentChange1h)}
                {this.getRow("Percent Change in 24 hours", this.props.data.percentChange24h)}
                {this.getRow("Percent Change in 7 days", this.props.data.percentChange7d)}
                <button onClick={this.changeUserItem}>{this.props.addAction ? "Add Token":"Remove Token"}</button>
            </div>
        )
    }
    changeUserItem = () => {
        this.props.changeUserItem(this.props.data.tokenId, this.props.addAction)
    }
    getRow(label, value) {
        return (
            <div className="row">
                <label className="row-lable">{label + ": "}</label>
                <label className="row-value">{value}</label>
            </div>
        )
    }


}

export default Item