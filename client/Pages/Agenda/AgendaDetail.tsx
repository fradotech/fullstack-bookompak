import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { AgendaResponse } from '@server/modules/feature/agenda/infrastructure/agenda.response'
import { Descriptions, Space } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import DescriptionContainer from '../../Components/Molecules/DescriptionContainer/DescriptionContainer'
import { Section } from '../../Components/Molecules/Section/Section'
import { defaultSizeSpace } from '../../utils/theme'
import { agendaAction } from './Agenda.action'

const AgendaDetail: React.FC = () => {
  const { id } = useParams()
  const [props, setProps] = React.useState<IApiRes<AgendaResponse>>()

  React.useEffect(() => {
    ; (async () => setProps(await agendaAction.findOne(id)))()
  }, [])

  return (
    <Space
      direction="vertical"
      size={defaultSizeSpace}
      style={{ width: '100%' }}
    >
      <Section>
        <DescriptionContainer>
          <Descriptions.Item label="ID">{props?.data?.id}</Descriptions.Item>

          <Descriptions.Item label="Name">
            {props?.data?.name}
          </Descriptions.Item>

          <Descriptions.Item label="Location">
            {props?.data?.location}
          </Descriptions.Item>

          <Descriptions.Item label="Description">
            {props?.data?.description}
          </Descriptions.Item>

          <Descriptions.Item label="Start At">
            {props?.data?.startAt.toString()}
          </Descriptions.Item>

          <Descriptions.Item label="End At">
            {props?.data?.endAt.toString()}
          </Descriptions.Item>

          <Descriptions.Item label="Updated At">
            {props?.data?.updatedAt.toString()}
          </Descriptions.Item>
        </DescriptionContainer>
      </Section>
    </Space>
  )
}

export default AgendaDetail
