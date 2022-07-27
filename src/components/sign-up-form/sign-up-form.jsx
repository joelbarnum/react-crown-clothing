import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss';
import Button from './../button/button.component'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFieldes] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFieldes(defaultFormFields);
    }

const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword){
        alert("passwords d not mathc");
        return;
    }

    try {
        const { user } = await createAuthUserWithEmailAndPassword(
            email, 
            password
            );

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();

    } catch (error) {
        if(error.code === 'auth/email-already-in-use'){
            alert('this email is already taken');
        }else
        console.log("user creation caused an error", error);
    }
}

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFieldes({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name" 
                    // you can send in opbjects as a varible and then destructure in the component
                    // inputOptions = {{
                    //     type: 'text',
                    //     required: true,
                    //     onChange: handleChange,
                    //     name: 'displayName',
                    //     value: displayName
                    // }}
                    type="text" 
                    required 
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                    />
                    <FormInput 
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange}
                    name="email"
                    value={email}
                    />
                    <FormInput 
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange}
                    name="password"
                    value={password}
                    />
                    <FormInput 
                    label="Confirm Password" 
                    type="password" 
                    required 
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    />
                    <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    )

}

export default SignUpForm