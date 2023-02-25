import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { BookingCreateRequest } from '@server/modules/feature/booking/infrastructure/booking.request'
import { Button, DatePicker, DatePickerProps, Form, Input, Select } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { RoomResponse } from '../../../@server/modules/feature/room/infrastructure/room.response'
import { FormContainer } from '../../Components/Organs/FormContainer'
import { Route } from '../../Enums/Route'
import { createYupSync } from '../../utils/createYupSync'
import { roomAction } from '../Room/Room.action'
import { bookingAction } from './Booking.action'

const schema: yup.Schema<any> = yup.object().shape({
  room: yup.object().required(),
  goal: yup.string().required(),
  description: yup.string().required(),
})

const BookingForm: React.FC = () => {
  const navigate = useNavigate()
  const [props, setProps] = React.useState<IPaginateResponse<RoomResponse>>()
  const yupSync = createYupSync(schema)
  const [form] = Form.useForm<BookingCreateRequest>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [date, setDate] = React.useState<Date[]>()

  React.useEffect(() => {
    ; (async () => setProps(await roomAction.fetch()))()
  }, [])

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    data.startAt = date[0]
    data.endAt = date[1]
    data.room = JSON.parse(data.room as unknown as string)

    try {
      await form.validateFields()
      const res = await bookingAction.create(data)
      res && alert('Success create booking room ' + data.room.name)
      navigate(Route.Bookings)
    } catch (e) {
      setIsLoading(false)
    }
  }

  const optionsRooms = React.useMemo(() => {
    return props?.data.map((data) => {
      return {
        label: `${data?.number} - ${data?.name} - ${data?.location}`,
        value: JSON.stringify(data),
      }
    })
  }, [props])

  const onOk = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
  ) => {
    setDate([value[0].toDate(), value[1].toDate()])
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
        <Form.Item name="Ruangan" label="Room" required>
          <Select
            showSearch
            placeholder="Pilih Ruangan"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={optionsRooms}
          />
        </Form.Item>

        <Form.Item label="Tujuan" name="goal" rules={[yupSync]} required>
          <Input />
        </Form.Item>

        <Form.Item label="Deskripsi" name="description" rules={[yupSync]} required>
          <Input />
        </Form.Item>

        <Form.Item label="Waktu" required>
          <DatePicker.RangePicker
            showTime
            onOk={onOk}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
      </FormContainer>
    </>
  )
}

export default BookingForm
