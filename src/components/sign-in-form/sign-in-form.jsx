import { useState } from "react"
import { 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword,
 } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component'
import './sign-in-form.scss';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { connectFirestoreEmulator } from "firebase/firestore";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFieldes] = useState(defaultFormFields);
    const { email, password } = formFields;

    //const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFieldes(defaultFormFields);
    }

    const signInWthGoogle = async () => {
        await signInWithGooglePopup();
        
    };

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
       const {user} = await signInAuthUserWithEmailAndPassword(
        email,
        password);
        //setCurrentUser(user);

    } catch (error) {
        switch(error.code) {
            case 'auth/wrong-password':
                alert('incorrect password');
                break;
            case 'auth/user-not-found':
                alert('no user associ');
                break;
                default:
                    console.log(error);
        }
    }
};

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFieldes({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
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
                    <div className="buttons-container">
                        <Button type="submit" >Sign In</Button>
                        <Button type="button" buttonType={ BUTTON_TYPE_CLASSES.google } onClick={signInWthGoogle} >Google Sign In</Button>
                    </div>
            </form>
        </div>
    )

}

export default SignInForm