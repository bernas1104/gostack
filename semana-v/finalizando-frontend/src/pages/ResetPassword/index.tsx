import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';

import { useToast } from '../../hooks/ToastContext';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/apiClient';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) throw new Error();

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha resetada com sucesso',
          description:
            'Sua senha foi resetada com sucesso. Você já pode realizar login com a nova senha.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Error ao resetar senha',
            description:
              'Occoreu um erro ao resetar sua senha. Tente novamente.',
          });
        }
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              icon={FiLock}
              type="password"
              name="password"
              placeholder="Nova senha"
            />

            <Input
              icon={FiLock}
              type="password"
              name="password_confirmation"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
