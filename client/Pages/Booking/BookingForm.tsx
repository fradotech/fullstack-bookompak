import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { BookingRequest } from '@server/modules/feature/booking/infrastructure/booking.request'
import { RoomResponse } from '@server/modules/feature/room/infrastructure/room.response'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import React from 'react'
import * as yup from 'yup'
import { FormContainer } from '../../Components/Organs/FormContainer'
import { createYupSync } from '../../utils/createYupSync'
import { roomAction } from '../Room/Room.action'
import { bookingAction } from './Booking.action'

const schema: yup.Schema<any> = yup.object().shape({
  room: yup.object().required(),
  goal: yup.string().required(),
  description: yup.string().required(),
  startAtEndAt: yup.array()
  // startAt: yup.string().required(),
  // endAt: yup.string().required(),
})

const BookingForm: React.FC = () => {
  const [props, setProps] = React.useState<IPaginateResponse<RoomResponse>>()
  const yupSync = createYupSync(schema)
  const [form] = Form.useForm<BookingRequest>()
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    ; (async () => setProps(await roomAction.fetch()))()
  }, [])

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      await form.validateFields()
      console.log(data)
      const res = await bookingAction.create(data)
      res && alert('Success create booking room ' + data.room.name)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  const optionsRooms = React.useMemo(() => {
    return props?.data.map((data) => {
      return {
        label: `${data.number} - ${data.name} - ${data.location}`,
        value: JSON.stringify(data)
      }
    })
  }, [props])

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
        <Form.Item name="type" label="Room">
          <Select
            showSearch
            placeholder="Select Room"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={optionsRooms}
          />
        </Form.Item>

        <Form.Item label="Goal" name="goal" rules={[yupSync]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[yupSync]}>
          <Input />
        </Form.Item>

        <Form.Item label="Start At" name="startAtEndAt" rules={[yupSync]}>
          <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
      </FormContainer>
    </>
  )
}

export default BookingForm
