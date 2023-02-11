import { IPaginationMeta } from '@server/src/infrastructure/index/index.interface';
import { UserResponse } from '@server/src/modules/iam/user/infrastructure/user.response';
import type { ColumnsType } from 'antd/es/table';
import React from "react";
import { RowActionButtons } from '../../Components/Molecules/RowActionButtons/RowActionButtons';
import DataTable from '../../Components/Organs/DataTable/DataTable';
import { useTableFilter } from '../../Components/Organs/DataTable/useTableFilter';

interface IProps {
  data: UserResponse[];
  meta: IPaginationMeta
}

const Users: React.FC = () => {
  const [props, setProps] = React.useState<IProps>()
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const {
    setQueryParams,
    status: { isFetching },
  } = useTableFilter();

  const columns: ColumnsType<UserResponse> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
    },
    {
      title: 'Action',
      key: 'action',
      width: '150px',
      render: (data) => {
        data
        return (
          <RowActionButtons
            actions={[
              {
                type: 'view',
                href: `#`,
                title: 'view',
              },
              {
                type: 'edit',
                href: `#`,
                title: 'edit',
              },
              {
                type: 'delete',
                title: 'delete',
                onClick: () => {
                  // TODO : handle delete function
                },
              },
            ]}
          />
        )
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <>
      <DataTable
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        columns={columns}
        dataSource={props.data.map((item) => ({
          ...item,
          key: item.id,
        }))}
        meta={props.meta}
        onPageChange={(page, pageSize) =>
          setQueryParams({ page: page, per_page: pageSize })
        }
        loading={isFetching}
      />
    </>
  )
}

export default Users;