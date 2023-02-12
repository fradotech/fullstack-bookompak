import { AuthLoginRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Form, Input, Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { FormContainer } from '../../Components/Organs/FormContainer'
import { Route } from '../../Enums/Route'
import { createYupSync } from '../../utils/createYupSync'
import { defaultSizeSpace } from '../../utils/theme'
import { authAction } from './Auth.action'

const schema: yup.Schema<any> = yup.object().shape({
  email: yup.string().required().email('Field Email wajib berformat email'),
  password: yup.string().required(),
})

const Login: React.FC = () => {
  const user = authAction.loggedUser()
  const navigate = useNavigate()
  const yupSync = createYupSync(schema)
  const [form] = Form.useForm<AuthLoginRequest>()
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

  user && navigate(Route.Dashboard)

  return (
    <Space
      direction="vertical"
      size={defaultSizeSpace}
      style={{ width: '100%' }}
    >      <FormContainer
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
          Login
        </Button>,
      ]}
    >
        <Form.Item label="Email" name="email" rules={[yupSync]} required>
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[yupSync]} required>
          <Input.Password type="password" />
        </Form.Item>
      </FormContainer>
    </Space>
  )
}

export default Login
