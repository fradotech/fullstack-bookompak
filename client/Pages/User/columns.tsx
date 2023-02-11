import { UserResponse } from "@server/modules/iam/user/infrastructure/user.response";
import { ColumnsType } from "antd/es/table";

export const usersColumns: ColumnsType<UserResponse> = [
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
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   width: '150px',
  //   render: (data) => {
  //     data
  //     return (
  //       <RowActionButtons
  //         actions={[
  //           {
  //             type: 'view',
  //             href: `#`,
  //             title: 'view',
  //           },
  //           {
  //             type: 'edit',
  //             href: `#`,
  //             title: 'edit',
  //           },
  //           {
  //             type: 'delete',
  //             title: 'delete',
  //             onClick: () => {
  //               // TODO : handle delete function
  //             },
  //           },
  //         ]}
  //       />
  //     )
  //   },
  // },
];