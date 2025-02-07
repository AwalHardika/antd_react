import { Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import supabase from "../../supabase";
import dayjs from "dayjs";
import Chance from "chance";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const Attendances = () => {
  const chance = new Chance();
  const column = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "fullname",
      dataIndex: "fullname",
      key: "fullname",
    },

    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "created_at",
      dataIndex: "created_at",
      key: "created_at",
      render: (e) => <>{dayjs(e).format("DD/MM/YYYY HH:mm")}</>,
    },
    {
      title: "action",
      dataIndex: "id",
      key: "action",
      render: (e, record) => (
        <div className="flex gap-1 items-center">
          <Popconfirm title="yakin delete" onConfirm={() => singleDelete(e)}>
            <Button
              type="primary"
              danger
              size="small"
              icon={<AiOutlineDelete />}
            />
          </Popconfirm>

          
            <Button
              type="primary"
              size="small"
              className="bg-green-500"
              icon={<AiOutlineEdit />}
              onClick={()=>{
                handleOpenDrawer()
                setSelectedId(record)
              }}
            />
        </div>
      ),
    },
  ];


  //drawer logic area
  const [open, setOpen] = useState(false)
  const [selectId, setSelectedId] = useState(null)

  function handleOpenDrawer(){
    setOpen(true)
  }
  function handleClodeDrawer(){
    setOpen(false)
    setSelectedId(null)
  }

  function handleUpdateAttendances(e){
    console.info(e)
    setState(prev => prev={...prev, isLoading: true})
    supabase.from("attendances").update({
        fullname : e.fullname,
        phone : e.phone,
        email : e.email,
        address: e.address
    }).eq("id", e.id)
    .then(res=> {
        setState(prev=> prev={...prev, isLoading:false, refresh:true})
        handleClodeDrawer()
    })
  }


  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    refresh: false,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  function onSelectChange(newRows) {
    setSelectedRowKeys(newRows);
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    console.info(selectedRowKeys);
  }, [selectedRowKeys]);

  function genFakeData() {
    let fakeData = [];
    for (let i = 1; i <= 50; i++) {
      fakeData.push({
        fullname: chance.name(),
        phone: chance.email(),
        email: chance.email(),
        address: chance.address(),
      });
    }
    supabase
      .from("attendances")
      .insert(fakeData)
      .then((res) => {
        console.info(res);
      });
  }

  function singleDelete(id) {
    supabase
      .from("attendances")
      .delete()
      .eq("id", id)
      .then((res) => {
        setState(
          (prev) =>
            (prev = {
              ...prev,
              refresh: (prev = !prev),
            })
        );
      });
  }

  function multipleDelete() {
    supabase
      .from("attendances")
      .delete()
      .in("id", selectedRowKeys)
      .then((res) => {
        setState((prev) =>(prev = {
              ...prev,
              refresh: !prev.refresh,
            })
        );
        setSelectedRowKeys([])
      });
  }


  useEffect(() => {
    supabase
      .from("attendances")
      .select("*").order("id", "asc")
      .then((res) => {
        // console.info(res.data)
        setData(res.data);
      });
  }, [state.refresh]);
  return (
    <div>
        <Drawer 
        title="update data" onClose={handleClodeDrawer} open={open} placement="bottom"
        >
        {
            selectId ? (
                <Form 
                onFinish={handleUpdateAttendances} 
                layout="vertical" 
                className="grid grid-cols-2 gap-4 max-w-[800px] mx-auto "
                >
                <Form.Item label="id" name={'id'} initialValue={selectId?.id} hidden>
                <Input/>
                </Form.Item>

                <Form.Item label="fullname" name={"fullname"} initialValue={selectId?.fullname}>
                    <Input />
                </Form.Item>
                <Form.Item label="email" name={"email"} initialValue={selectId?.email}>
                    <Input  />
                </Form.Item>
                <Form.Item label="phone" name={"phone"} initialValue={selectId?.phone}>
                    <Input  />
                </Form.Item>
                <Form.Item label="address" name={"address"} initialValue={selectId?.address}>
                    <Input  />
                </Form.Item>

            <div>
            <Button type="ghost" htmlType="button" onClick={handleClodeDrawer}>
                Cancel
               </Button>
               <Button type="primary" htmlType="submit" loading={state.isLoading} disabled={state.isLoading}>
                Submit
            </Button>
            </div>
            </Form>
            ) : null
        }

        </Drawer>
      <h1>Attendances</h1>

      {/* <Button type="primary" size="small" onClick={genFakeData}>
            Generated Fake Data
      </Button> */}

      {
        selectedRowKeys.length>0? (
            <Popconfirm title="Yakin delete ?" onConfirm={multipleDelete} >
            <Button danger type="primary" size="small">
              Delete {selectedRowKeys.length} rows
            </Button>
          </Popconfirm>
        ) : null
      }

      <Table
        columns={column}
        dataSource={data}
        rowKey={"id"}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default Attendances;
