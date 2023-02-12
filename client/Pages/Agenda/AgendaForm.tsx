import { AgendaCreateRequest } from '@server/modules/feature/agenda/infrastructure/agenda.request'
import { Button, DatePicker, DatePickerProps, Form, Input } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { FormContainer } from '../../Components/Organs/FormContainer'
import { Route } from '../../Enums/Route'
import { createYupSync } from '../../utils/createYupSync'
import { agendaAction } from './Agenda.action'

const schema: yup.Schema<any> = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  description: yup.string().required(),
})

const AgendaForm: React.FC = () => {
  const navigate = useNavigate()
  const yupSync = createYupSync(schema)
  const [form] = Form.useForm<AgendaCreateRequest>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [date, setDate] = React.useState<Date[]>()

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    data.startAt = date[0]
    data.endAt = date[1]

    try {
      await form.validateFields()
      const res = await agendaAction.create(data)
      res && alert('Success create ' + data.name)
      navigate(Route.Agendas)
    } catch (e) {
      setIsLoading(false)
    }
  }

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
            Create
          </Button>,
        ]}
      >
        <Form.Item label="Name" name="name" rules={[yupSync]}>
          <Input />
        </Form.Item>

        <Form.Item label="Location" name="location" rules={[yupSync]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[yupSync]}>
          <Input />
        </Form.Item>

        <Form.Item label="Start At" required>
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

export default AgendaForm
