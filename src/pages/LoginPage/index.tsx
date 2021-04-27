import React from 'react';
import clsx from 'clsx';
import styles from './LoginPage.module.scss';

import { WhiteBlock } from '../../components/WhiteBlock';
import { Button } from '../../components/Button';
import { LoginPageProps } from '../../types/user';

export const LoginPage: React.FC<LoginPageProps> = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    error,
    hasAccount,
    setHasAccount,
    registartionHandle,
    signInHandle,
    isLoading,
  } = props;

  return (
    <section className={clsx(styles.login)}>
      <WhiteBlock className={clsx('m-auto mt-30', styles.whiteBlock)}>
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <span className="loader m-auto"></span>
          </div>
        ) : (
          <div className="login__container d-flex flex-column">
            <label htmlFor="email">Email</label>
            <input
              className="field"
              type="text"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {!hasAccount && (
              <>
                <label htmlFor="name">Name</label>
                <input
                  className="field"
                  type="text"
                  required
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}

            <label htmlFor="pass">Pasword</label>
            <input
              className="field"
              type="password"
              required
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p>{error}</p>}
            {hasAccount ? (
              <Button onClick={signInHandle} className={clsx(styles.loginButton, 'm-auto mt-30')}>
                Sign in
              </Button>
            ) : (
              <Button
                onClick={registartionHandle}
                className={clsx(styles.loginButton, 'm-auto mt-30')}>
                Registartion
              </Button>
            )}

            <div className={clsx('d-flex justify-content-center mt-20', styles.sign)}>
              <span>{hasAccount ? "Don't have an account?" : 'Have an account?'}</span>
              <span
                className={clsx('ml-10', styles.signButton)}
                onClick={() => setHasAccount(!hasAccount)}>
                {hasAccount ? 'Sign Up' : 'Sign In'}
              </span>
            </div>
          </div>
        )}
      </WhiteBlock>
    </section>
  );
};
