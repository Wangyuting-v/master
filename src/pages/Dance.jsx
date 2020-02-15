import React, { Fragment } from 'react';
import {
  Card,
  Modal,
  Table,
  Button,
  Divider,
  Form,
  Row,
  Col,
  Input,
  message,
  Icon,
  Upload,
  Pagination,
} from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

const formItem = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@connect(({ dance }) => ({ dance }))
@Form.create()
class DanceList extends React.Component {
  state = {
    loading: false,
    pageSize: 10,
    pageNumber: 1,
    sort: 'update_time desc',
    id: null,
    previewVisible: false,
    fileList: [],
    headImgUrl: null,
  };
  componentDidMount() {
    this.handleSearch(1, 10);
  }
  handleSearch = (pageNumber, pageSize) => {
    const { sort } = this.state;
    this.props.dispatch({ type: 'dance/search', payload: { pageSize, pageNumber, sort } });
  };
  handleAdd = values => {
    const { dispatch } = this.props;
    dispatch({ type: 'dance/add', payload: values }).then(res => {
      if (res.success) {
        message.success('新增成功！');
        this.setState({ visible: false });
        this.handleSearch(1, 10);
      } else {
        message.error(res.message);
      }
    });
  };

  handleEdit = values => {
    const { dispatch } = this.props;
    const { id } = this.state;

    dispatch({ type: 'dance/edit', payload: { ...values, id } }).then(res => {
      if (res.success) {
        message.success('编辑成功！');
        this.setState({ visible: false });
        this.handleSearch(1, 10);
      } else {
        message.error(res.message);
      }
    });
  };
  handleDetail = id => {
    this.props.dispatch(routerRedux.push(`/dancer/detail/${id}`));
  };
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    const { type, headImgUrl } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        values.headImgUrl = headImgUrl;
        if (type === 'add') {
          this.handleAdd(values);
        } else if (type === 'edit') {
          this.handleEdit(values);
        }
      }
    });
  };
  handleDel = id => {
    this.props.dispatch({ type: 'dance/del', payload: id }).then(res => {
      if (res.success) {
        message.success('删除成功');
        this.handleSearch(1, 10);
      } else {
        message.error(res.message);
      }
    });
  };
  showModal = formValues => {
    this.setState({ visible: true });
    if (formValues) {
      const { id, name, headImgUrl, address } = formValues;
      this.props.form.setFieldsValue({ name, address });
      const fileList = [{ uid: id, url: headImgUrl, status: 'done' }];
      this.setState({ headImgUrl, fileList });
    }
  };
  hideModal = () => {
    this.setState({ visible: false });
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ file, fileList }) => {
    this.setState({ fileList });
    if (file.response && file.status === 'done') {
      this.setState({ headImgUrl: file.response.data });
    }
  };

  handleCancel = () => this.setState({ previewVisible: false });
  pageSizeChange = (current, pageSize) => {
    this.handleSearch(current, pageSize);
  };
  render() {
    const columns = [
      {
        title: '赛区图片',
        dataIndex: 'headImgUrl',
        key: 'headImgUrl',
        render: val => <img src={val} alt="1" width="50px" height="50px" />,
      },
      {
        title: '赛区名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '描述',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (val, record) => {
          return (
            <Fragment>
              <span>
                <a
                  onClick={() => {
                    this.setState({ type: 'edit', id: val }, () => {
                      this.showModal(record);
                    });
                  }}
                >
                  编辑
                </a>
                <Divider type="vertical" />

                <a onClick={() => this.handleDetail(val)}>参赛队伍</a>
                <Divider type="vertical" />
                <a
                  onClick={() => {
                    const that = this;
                    Modal.confirm({
                      title: '确认删除该投票内容？',
                      okText: '确认',
                      cancelText: '取消',
                      onOk() {
                        that.handleDel(val);
                      },
                      onCancel() {},
                    });
                  }}
                >
                  删除
                </a>
              </span>
            </Fragment>
          );
        },
      },
    ];
    const extraAction = (
      <div>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          icon="plus-circle-o"
          onClick={() => {
            this.setState({ type: 'add' }, () => {
              this.showModal();
            });
          }}
        >
          新增
        </Button>
      </div>
    );

    const { visible, type, previewVisible, previewImage, fileList } = this.state;
    const {
      form: { getFieldDecorator },
      dance: { list, current, pageSize, total },
    } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Card extra={extraAction} title="投票列表">
          <Table
            dataSource={list}
            columns={columns}
            pagination={{
              showSizeChanger: true,
              onChange: this.pageSizeChange,
              onShowSizeChange: this.pageSizeChange,
              current: current || 1,
              pageSize: pageSize || 20,
              total: total || 0,
            }}
          />
        </Card>
        <Modal
          visible={visible}
          title={type === 'add' ? '新增赛区' : '编辑赛区'}
          onCancel={this.hideModal}
          footer={null}
        >
          <Form>
            <Form.Item label="赛区名称" {...formItem}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入赛区名称' }],
              })(<Input placeholder="请输入" />)}
            </Form.Item>
            <Form.Item label="描述" {...formItem}>
              {getFieldDecorator('address', {
                rules: [{ required: true, message: '请输入赛区描述' }],
              })(<Input.TextArea placeholder="请输入" rows={4} />)}
            </Form.Item>
            <Form.Item label="赛区图片" {...formItem}>
              {getFieldDecorator('headImgUrl', {
                rules: [{ required: false, message: '请上传赛区图片' }],
              })(
                <div>
                  <Upload
                    action="https://zcpost.cn/file/minio/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    showUploadList={{ showDownloadIcon: false }}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>,
              )}
            </Form.Item>

            <Row>
              <Col span={16} offset={8}>
                <Button onClick={this.hideModal}>取消</Button>&nbsp;&nbsp;
                <Button type="primary" onClick={this.handleSubmit}>
                  提交
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default DanceList;
