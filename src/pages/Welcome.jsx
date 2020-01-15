import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { injectIntl } from 'react-intl';
import {
  Card,
  Typography,
  Alert,
  Row,
  Col,
  Button,
  Upload,
  Icon,
  Modal,
  Table,
  Tooltip,
  Input,
  Divider,
  message,
} from 'antd';
const { TextArea } = Input;
import styles from './Welcome.less';
import {
  getServerBySsoLogout,
  getServerBydelete,
  getServerByput,
  getServerBypostImg,
} from '../services/getServerData';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@connect(({ welcome }) => ({
  welcome,
  list: welcome.list,
}))
class PicturesWall extends React.Component {
  state = {
    inputText: null,
    defaultDetail: {},
    pageSize: 10,
    currentPage: 1,
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  componentDidMount() {
    this.seachDancer();
  }

  seachDancer = () => {
    const { dispatch } = this.props;
    const { pageSize, currentPage } = this.state;
    dispatch({
      type: 'welcome/search',
      payload: { pageSize: pageSize, currentPage: currentPage },
    });
  };

  // 新增||编辑广告文本
  addInput = (type, id) => {
    const { inputText } = this.state;
    if (!inputText) {
      message.info('请输入文本内容');
    } else {
      let result;
      if (type == 'edit') {
        const params = {
          name: inputText,
          type: 'TXT',
          id,
        };
        result = getServerByput('/ads', params);
      } else {
        const params = {
          name: inputText,
          type: 'TXT',
        };
        result = getServerBySsoLogout('/ads', params);
      }

      result
        .then(res => {
          return res;
        })
        .then(json => {
          if (json.success) {
            if (type == 'edit') {
              message.info('编辑成功！');
            } else {
              message.info('新增成功！');
            }
            this.seachDancer();
          } else {
            message.info(json.message);
          }
        })
        .finally(() => {});
    }
  };

  handleCancel = () => this.setState({ previewVisible: false });

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
    console.log('fileList:', fileList);
    this.setState({ fileList });
  };

  // 广告输入框的内容
  inputBoxChage = e => {
    this.setState({ inputText: e.target.value });
  };

  // 删除广告语
  deleteDesc = id => {
    const result = getServerBydelete('/ads/' + id);
    result
      .then(res => {
        return res;
      })
      .then(json => {
        if (json) {
          if (json.success) {
            message.info('删除成功！');
            this.seachDancer();
          } else {
            message.info(json.message);
          }
        }
      });
  };
  getColumns() {
    return [
      {
        title: '内容',
        dataIndex: 'name',
        key: 'name',
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
                    const that = this;
                    that.setState(
                      {
                        defaultDetail: record,
                      },
                      () => {
                        const inputUpdate = (
                          <div>
                            <TextArea
                              rows={4}
                              defaultValue={that.state.defaultDetail.name}
                              onChange={that.inputBoxChage}
                            />
                          </div>
                        );
                        Modal.confirm({
                          title: '请编辑广告文本',
                          content: inputUpdate,
                          onOk() {
                            that.addInput('edit', val);
                          },
                          onCancel() {},
                        });
                      },
                    );
                  }}
                >
                  编辑
                </a>
                <Divider type="vertical" />
                <a
                  onClick={() => {
                    const that = this;
                    Modal.confirm({
                      title: '确认删除该广告文本？',
                      okText: '确认',
                      cancelText: '取消',
                      onOk() {
                        that.deleteDesc(val);
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
  }
  extraAction() {
    return (
      <div>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          icon="plus-circle-o"
          onClick={() => {
            const that = this;
            const inputBox = (
              <div>
                <TextArea rows={4} onChange={this.inputBoxChage} />
              </div>
            );
            Modal.confirm({
              title: '请填写广告文本',
              content: inputBox,
              onOk() {
                that.addInput();
              },
              onCancel() {},
            });
          }}
        >
          新增
        </Button>
      </div>
    );
  }

  render() {
    const { list, current, pageSize, total } = this.props.welcome;
    const { previewVisible, previewImage, fileList, defaultDetail } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Card>
          <Alert
            message="广告图片管理"
            type="success"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />

          <Upload
            action="http://122.51.140.39:2435/file/minio/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Card>
        <Card
          style={{
            marginTop: 24,
          }}
          extra={this.extraAction()}
        >
          <Alert
            message="广告文本管理"
            type="success"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />
          <Table dataSource={list} columns={this.getColumns()} />
        </Card>
      </div>
    );
  }
}

export default injectIntl(PicturesWall);
