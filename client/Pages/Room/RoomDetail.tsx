import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { RoomResponse } from '@server/modules/feature/room/infrastructure/room.response'
import { Descriptions, Space, Tag } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import DescriptionContainer from '../../Components/Molecules/DescriptionContainer/DescriptionContainer'
import { Section } from '../../Components/Molecules/Section/Section'
import { defaultSizeSpace } from '../../utils/theme'
import { roomAction } from './Room.action'

const RoomDetail: React.FC = () => {
  const { id } = useParams()
  const [props, setProps] = React.useState<IApiRes<RoomResponse>>()

  React.useEffect(() => {
    ;(async () => setProps(await roomAction.findOne(id)))()
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

          <Descriptions.Item label="Number">
            {props?.data?.number}
          </Descriptions.Item>

          <Descriptions.Item label="Type">
            {props?.data?.type}
          </Descriptions.Item>

          <Descriptions.Item label="Is Ready">
            <Tag>{props?.data?.isReady ? 'Yes' : 'No'}</Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Location">
            {props?.data?.location}
          </Descriptions.Item>

          <Descriptions.Item label="Description">
            {props?.data?.description}
          </Descriptions.Item>

          <Descriptions.Item label="Updated At">
            {props?.data?.updatedAt.toString()}
          </Descriptions.Item>
        </DescriptionContainer>
      </Section>
    </Space>
  )
}

export default RoomDetail
