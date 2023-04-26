import React, {useState} from 'react';
import _ from './Form.module.css';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [checkErrorForm, setCheckErrorForm] = useState(false);
  const [save, setSave] = useState(false);
  const [isPending, setIsPending] = useState(false);
  
  const validEmail = (value) => {
    setEmailError(/^.+@.+\..+$/.test(value))
  }

  const handleEmail = ({target}) => {
    setEmail(target.value);
    validEmail(target.value)
  }
  
  const validPassword = (value) => {
    setPasswordError(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/.test(value))
  }


  const handlePassword = ({target}) => {
    setPassword(target.value);
    validPassword(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError || !passwordError) {
      setCheckErrorForm(true);
      return;
    }

    setIsPending(true);

    console.log({
      email,
      password,
      save
    });
  }

  const handleSave = ({target}) => {
    setSave(target.checked)
  }

  return (
    <form className={_.form} onSubmit={handleSubmit}>
      <div className={_.wrap}>
        <label className={_.label} htmlFor='email'>Email</label>
        <input
          className={_.input}
          type='text'
          id='email'
          name='email'
          value={email}
          onChange={handleEmail}
          onBlur={() => {
            setEmailDirty(true);
          }}
          disabled={isPending}
        />
        {!emailError && emailDirty && <p className={_.error}>Error message</p>}
      </div>

      <div className={_.wrap}>
        <label className={_.label} htmlFor='password'>Password</label>
        <input
          className={_.input}
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={handlePassword}
          onBlur={() => {
            setPasswordDirty(true);
          }}
          disabled={isPending}
        />
        {!passwordError && passwordDirty && <p className={_.error}>Error message</p>}
      </div>
      
      <div className={_.wrapCheckbox}>
      <input
        className={_.checkbox}
        type='checkbox'
        id='save'
        name='save'
        value={true}
        onChange={handleSave}
        checked={save}
        disabled={isPending}
      />
      <label className={_.labelCheckbox} htmlFor='save'>Save password</label>
      </div>

      {isPending ? (
        <p className={_.pending}>Sending</p>
        ) : (
        <button className={_.submit} type='submit'>
          Enter
        </button>
        )}
      {checkErrorForm && (!passwordError || !emailError) && (
        <p className={_.errorSubmit}>Error message</p>
      )}
    </form>
  )
};
