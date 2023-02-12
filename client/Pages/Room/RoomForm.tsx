import { RoomCreateRequest } from '@server/modules/feature/room/infrastructure/room.request'
import { Button, Form, Input, Radio, Switch } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { FormContainer } from '../../Components/Organs/FormContainer'
import { Route } from '../../Enums/Route'
import { createYupSync } from '../../utils/createYupSync'
import { roomAction } from './Room.action'
import { ERoomType } from './Room.enum'

const schema: yup.Schema<any> = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().required(),
  isReady: yup.boolean(),
  type: yup.string().required(),
  location: yup.string().required(),
  description: yup.string().required(),
})

const RoomForm: React.FC = () => {
  const navigate = useNavigate()
  const yupSync = createYupSync(schema)
  const [form] = Form.useForm<RoomCreateRequest>()
  const [isLoading, setIsLoading] = React.useState(false)

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      await form.validateFields()
      const res = await roomAction.create(data)
      res && alert('Success create ' + data.name)
      navigate(Route.Rooms)
    } catch (e) {
      setIsLoading(false)
    }
  }

  return (
    <>
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
            Create
          </Button>,
        ]}
      >
        <Form.Item label="Name" name="name" rules={[yupSync]}>
          <Input />
        </Form.Item>

        <Form.Item label="Number" name="number" rules={[yupSync]}>
          <Input />
        </Form.Item>

        <Form.Item label="Is Ready" name="isReady" rules={[yupSync]}>
          <Switch />
        </Form.Item>

        <Form.Item name="type" label="Gender">
          <Radio.Group>
            <Radio.Button name="type" value={ERoomType.Biasa}>
              {ERoomType.Biasa}
            </Radio.Button>
            <Radio.Button name="type" value={ERoomType.LuarBiasa}>
              {ERoomType.LuarBiasa}
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Location" name="location" rules={[yupSync]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[yupSync]}>
          <Input />
        </Form.Item>
      </FormContainer>
    </>
  )
}

export default RoomForm
