import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { injectIntl } from 'react-intl';
import {
  Card,
  Typography,
  Alert,
  Row,
  Form,
  Col,
  Button,
  Upload,
  Icon,
  Select,
  Modal,
  Table,
  Tooltip,
  Input,
  Divider,
  message,
} from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
import styles from './Welcome.less';
import { getServerBySsoLogout, getServerBydelete, getServerByput } from '../services/getServerData';

@connect(({ userList }) => ({
  userList,
  list: userList.list,
}))
@Form.create()
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
      type: 'userList/search',
      payload: { pageSize: pageSize, currentPage: currentPage },
    });
  };

  getColumns() {
    return [
      {
        title: '姓名',
        dataIndex: 'username',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '网点',
        dataIndex: 'address',
      },
      {
        title: '预约时间',
        dataIndex: 'createTime',
      },
      {
        title: '10面值张数',
        dataIndex: 'tenCount',
      },
      {
        title: '20面值张数',
        dataIndex: 'twentyCount',
      },
      {
        title: '50面值张数',
        dataIndex: 'fiftyCount',
      },
      {
        title: '100面值张数',
        dataIndex: 'oneHundredCount',
      },
    ];
  }

  pageSizeChange = (current, pageSize) => {
    this.setState({ currentPage: current, pageSize }, () => {
      this.seachDancer();
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log('数据啊：', fieldsValue);
      const values = {
        ...fieldsValue,
        // updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'userList/search',
        payload: values,
      });
    });
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline" name="hahah">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('username')(<Input placeholder="请输入姓名" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('mobile')(<Input placeholder="请输入手机号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="网点">
              {getFieldDecorator('address')(
                <Select placeholder="请选择网点" style={{ width: 180 }}>
                  <Option value="文庙">文庙</Option>
                  <Option value="工业">工业</Option>
                  <Option value="春水">春水</Option>
                  <Option value="汇泉">汇泉</Option>
                  <Option value="未来">未来</Option>
                  <Option value="陈青集">陈青集</Option>
                  <Option value="起台">起台</Option>
                  <Option value="远襄">远襄</Option>
                  <Option value="慈圣">慈圣</Option>
                  <Option value="伯岗">伯岗</Option>
                  <Option value="申桥">申桥</Option>
                  <Option value="李原">李原</Option>
                  <Option value="安平">安平</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginTop: '10px' }}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit" disabled={this.props.loading}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { list, current, pageSize, total } = this.props.userList;
    const { previewVisible, previewImage, fileList, defaultDetail } = this.state;
    console.log('welcome---', this.props.welcome);
    return (
      <div>
        <div>{this.renderForm()}</div>
        <Card
          style={{
            marginTop: 24,
            padding: 0,
          }}
        >
          <Table
            dataSource={list}
            columns={this.getColumns()}
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
      </div>
    );
  }
}

export default injectIntl(PicturesWall);