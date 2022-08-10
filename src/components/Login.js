import { useState } from "react"

export default function Login()
{
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [token, setToken] = useState(false);

    function submit(e) {
        e.preventDefault();

        var json = JSON.stringify({ login, password });

        fetch('https://localhost:7286/api/auth/login', 
        { 
            method: 'Post', 
            body: json,
            headers: {
                'content-type': 'application/json'
            }
         })
            .then(respose => respose.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                setToken(data.token);
            });
    }

    if (token) {
        const userInfo = JSON.parse(atob(token.split('.')[1]));

        const username = userInfo["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        return <span>{username}</span>
    }

    return (
        <form onSubmit={submit}>
            <div className="form-group">
                <label htmlFor="login"> Login:</label>
                <input 
                    className="form-control" 
                    id="login" 
                    value={login} 
                    onChange={(e) => {setLogin(e.target.value)}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="pass">Password:</label>
                <input 
                    className="form-control" 
                    id="pass" 
                    type="password"
                    value={password} 
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" type="submit">Login</button>
            </div>
        </form>
    )
}