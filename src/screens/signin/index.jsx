import { Input, Button } from "antd"
import { useCallback, useState } from 'react'

import "./style.css"
import { useSigninUser } from "../../hooks/mutation/user"

const SignInScreen = () => {
    const { mutateAsync: signInUserAsync } = useSigninUser();
    //Important: Above fn name by default is mutateAsync. You can rename it like above

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmit = useCallback(async (e) => {
        e.preventDefault(); //to prevent a browser reload/refresh
        await signInUserAsync({ email, password })
    }, [email, password, signInUserAsync])

    return (
        <div className="signin-container">
            <form onSubmit={handleFormSubmit} className="form-container">
                <label htmlFor="email">Email Address</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" required />
                <label htmlFor="password">Password</label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
                <Button htmlType="submit" disabled={!email || !password} type="primary">Sign In</Button>
            </form>
        </div>
    )
}

export default SignInScreen