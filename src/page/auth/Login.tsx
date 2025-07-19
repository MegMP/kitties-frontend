export const Login = () => {
    return (
        <>
        <h1>This is the login page</h1>
        <form action="/login" method="post">
            <input type="email" name="email" placeholder="Email" required /><br/>
            <input type="password" name="password" placeholder="Password" required /><br/>
            <button type="submit">Log in</button>
        </form>
        <a href="/register">register</a></>
    )
}