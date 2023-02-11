import { IPaginationMeta } from '@server/infrastructure/index/index.interface';
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response';
import React from "react";
import DataTable from '../../Components/Organs/DataTable/DataTable';
import { useTableFilter } from '../../Components/Organs/DataTable/useTableFilter';
import { userAction } from '../../Modules/User';
import { usersColumns } from './columns';

interface IProps {
  data: UserResponse[];
  meta: IPaginationMeta
}

const Users: React.FC = () => {
  const [props, setProps] = React.useState<IProps>()
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const { setQueryParams, status: { isFetching } } = useTableFilter();
  const onSelectChange = (selectRow: React.Key[]) => setSelectedRowKeys(selectRow);

  React.useEffect(() => {
    (async () => setProps(await userAction.fetch()))()
  })

  return (
    <>
      <DataTable
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        columns={usersColumns}
        dataSource={props?.data?.map((item) => ({
          ...item,
          key: item.id,
        }))}
        meta={props?.meta}
        onPageChange={(page, pageSize) =>
          setQueryParams({ page: page, per_page: pageSize })
        }
        loading={isFetching}
      />
    </>
  )
}

export default Users;