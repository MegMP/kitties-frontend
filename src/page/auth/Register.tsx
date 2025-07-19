export const Register = () => {
    
    return (
        <>
            <h1>This is the register page</h1>
            <form action="/register" method="post">
                <input type="text" name="firstname" placeholder="Name" required /><br/>
                <input type="text" name="lastname" placeholder="Lastname" required /><br/>
                <input type="text" name="username" placeholder="Username" required /><br/>
                <input type="email" name="email" placeholder="Email" required /><br/>
                <input type="password" name="password" placeholder="Password" required /><br/>
                <input type="text" name="city" placeholder="City"/><br/>
                <button type="submit">Register</button>
            </form>
        </>
    )
}