import { RoomCreateRequest } from '@server/modules/feature/room/infrastructure/room.request'
import { Button, Form, Input, Switch } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { FormContainer } from '../../Components/Organs/FormContainer'
import { Route } from '../../Enums/Route'
import { createYupSync } from '../../utils/createYupSync'
import { roomAction } from './Room.action'

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
            Simpan
          </Button>,
        ]}
      >
        <Form.Item label="Nama" name="name" rules={[yupSync]} required>
          <Input />
        </Form.Item>

        <Form.Item label="Nomor" name="number" rules={[yupSync]} required>
          <Input />
        </Form.Item>

        <Form.Item label="Tersedia" name="isReady" rules={[yupSync]} required>
          <Switch />
        </Form.Item>

        <Form.Item label="Lokasi" name="location" rules={[yupSync]} required>
          <Input />
        </Form.Item>

        <Form.Item label="Deskripsi" name="description" rules={[yupSync]} required>
          <Input />
        </Form.Item>
      </FormContainer>
    </>
  )
}

export default RoomForm
