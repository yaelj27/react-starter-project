import React from 'react';
//import './Login.less';

class Login extends React.Component {
    userName = 'blox-user';
    password = 'blox-rocks';

    render() {
        return (
            <div className="input-page">
                <div>
                    <label>User Name: </label>
                    <input onChange={(input) => this.userName = input.target.value} />
                </div>
                <div>
                    <label>password: </label>
                    <input onChange={(input) => this.password = input.target.value} />
                </div>
                <button onClick={this.getLogin}>Login</button>
            </div>
        )
    }

    getLogin = () => {
        var http = new XMLHttpRequest();
        var url = ' http://localhost:8888/login';
        var params = '{"username": "' + this.userName + '","password": "' + this.password + '"}';
        //    
        http.open('POST', url);
        http.setRequestHeader('Content-type', 'application/json');
        http.setRequestHeader('Access-Control-Allow-Headers', '*');
        http.setRequestHeader('Access-Control-Allow-Origin', '*');

        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
                var response = JSON.parse(http.responseText);
                this.props.setAutorazion(response.data.token, response.data.name);
            }
            else if (http.readyState === 4 && http.status === 401) {
                alert(http.statusText);
            }
        }
        http.send(params);
    }
}

export default Login