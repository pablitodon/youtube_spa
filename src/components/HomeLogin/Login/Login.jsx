/* eslint-disable no-unused-vars */
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, Card } from 'antd';
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginPost } from '../../redux/slices/loginSlice';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { allStartResponse } from '../../redux/slices/saveRequestSlice';



const validSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
})

const Login = () => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validSchema)
    })
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const tokenData = localStorage.getItem('myToken');
    const { status } = useSelector(state => state.login)


    useEffect(() => {
        if (tokenData) {
            navigate('/main')
        }
    }, [tokenData, navigate])

    const onSubmit = (data) => {
        if (data) {
            if (!localStorage.getItem(`${data.email}`)) {
                localStorage.setItem(`${data.email}`, '');
            } else {
                dispatch(allStartResponse(JSON.parse(localStorage.getItem(`${data.email}`))))
            }
            localStorage.setItem('user', `${data.email}`)
            dispatch(fetchLoginPost(data))
        }
    }

    return (
        <>
            <Card title="Вход" style={{ width: 400, margin: '20px auto', textAlign: 'center' }} className="login-background" >
                <form onSubmit={handleSubmit(onSubmit)} >
                    {status === 'loading' && <p>Loading...</p>}
                    {status === 'error' && <p>Error</p>}
                    <div>
                        <span style={{ fontWeight: 'bold' }}>What your Email?</span>
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='Email' />}
                        />
                        <p style={{ color: 'red', fontSize: '12px' }}>{errors.email?.message}</p>
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Your password?</span>
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => <Input.Password {...field} placeholder='Password' />}
                            style={{ width: '250px', }}
                        />
                        <p style={{ color: 'red', fontSize: '12px' }} >{errors.password?.message}</p>
                    </div>
                    <div>
                        <Button type='primary' htmlType='submit' style={{ marginTop: '20px' }}>
                            Войти
                        </Button>
                    </div>
                </form>
            </Card>

        </>
    );
};

export default Login;

