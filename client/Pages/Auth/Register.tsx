import { AuthRegisterRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Form, Input, Space } from 'antd'
import React from 'react'
import * as yup from 'yup'
import { FormContainer } from '../../Components/Organs/FormContainer'
import { Route } from '../../Enums/Route'
import { createYupSync } from '../../utils/createYupSync'
import { defaultSizeSpace } from '../../utils/theme'
import { authAction } from './Auth.action'

const Register: React.FC = () => {
  const [password, setPassword] = React.useState<string>();
  const schema: yup.Schema<any> = yup.object().shape({
    email: yup.string().required().email('Field Email wajib berformat email'),
    password: yup
      .string()
      .required()
      .min(8, 'Password at least have 8 character')
      .test(
        'isFormatValid',
        'At least password has 1 Alphabet',
        (value) => {
          const hasUpperCase = /[A-Z]/.test(value);
          setPassword(value)
          if (hasUpperCase) return true;
          return false;
        },
      ),
    passwordConfirmation: yup
      .string()
      .required('Field password is required')
      .min(8, 'Password at least have 8 character')
      .test(
        'isFormatValid',
        'Password confirmation must match with password',
        (value) => password == value,
      ),
    name: yup.string().required(),

  })

  const yupSync = createYupSync(schema)
  const [form] = Form.useForm<AuthRegisterRequest>()
  const [isLoading, setIsLoading] = React.useState(false)

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      await form.validateFields()
      const user = await authAction.login(data)
      user && location.replace(Route.Dashboard)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  return (
    <Space
      direction="vertical"
      size={defaultSizeSpace}
      style={{ width: '100%' }}
    >
      <FormContainer
        onFinish={onFinish}
        form={form}
        layout="vertical"
        centered
        buttonAction={[
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              form.getFieldsError().filter(({ errors }) => errors.length)
                .length > 0 && isLoading
            }
          >
            Register
          </Button>,
        ]}
      >
        <Form.Item label="Email" name="email" rules={[yupSync]} required>
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[yupSync]} required>
          <Input.Password type="password" />
        </Form.Item>

        <Form.Item label="Password Confirmation" name="passwordConfirmation" rules={[yupSync]} required>
          <Input.Password type="password" />
        </Form.Item>

        <Form.Item label="Name" name="name" rules={[yupSync]} required>
          <Input />
        </Form.Item>

      </FormContainer>
    </Space>
  )
}

export default Register
