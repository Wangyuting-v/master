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
  Select,
  Table,
  Input,
  DatePicker,
} from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
import moment from 'moment';
import styles from './Welcome.less';
import { getServerByExpont } from '../services/getServerData';

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
    const { pageSize, currentPage, formValues } = this.state;
    const fieldsValue = Object.assign(
      formValues ? formValues : {},
      {
        pageSize: pageSize,
      },
      {
        currentPage: currentPage,
      },
    );
    dispatch({
      type: 'userList/search',
      payload: fieldsValue,
    });
  };

  getColumns() {
    return [
      {
        title: '姓名',
        dataIndex: 'userName',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '转发次数',
        dataIndex: 'shareCount',
      },
      {
        title: 'userCode',
        dataIndex: 'userCode',
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

  // 参数处理
  params(obj) {
    let result = '';
    let item;
    for (item in obj) {
      if ((obj[item] && String(obj[item])) || String(obj[item]) == 'false') {
        result += `&${item}=${obj[item]}`;
      }
    }
    if (result) {
      result = result.slice(1);
    }
    return result;
  }

  //导出
  handleExport = e => {
    this.setState({
      spinning: true,
    });
    const { formValues } = this.state;
    const url = `https://titian.sugercd.com/user/export?${this.params(formValues)}`;
    console.log('url----',url);
    window.open(url);
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let fieldsValues = fieldsValue;
      const values = {
        ...fieldsValues,
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
        <Row gutter={{ md: 10, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('userName')(<Input placeholder="请输入姓名" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('mobile')(<Input placeholder="请输入手机号" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="userCode">
              {getFieldDecorator('userCode')(<Input placeholder="请输入userCode" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginTop: '10px' }}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit" disabled={this.props.loading}>
                查询
              </Button>
              <Button type="primary" onClick={this.handleExport} style={{ marginLeft: 8 }}>
                导出
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
