import React, { Fragment } from 'react';
import {
  Card,
  Typography,
  Alert,
  Row,
  Col,
  Upload,
  Icon,
  Modal,
  Table,
  Tooltip,
  Button,
  Divider,
} from 'antd';
import { PageHeaderWrapper, FormattedMessage } from '@ant-design/pro-layout';
import { injectIntl, intlShape } from 'react-intl';
import { Link, routerRedux } from 'dva/router';
import { connect } from 'dva';

@connect(({}) => ({}))
class DanceList extends React.Component {
  state = {};
  addDancer = () => {
    this.props.dispatch(routerRedux.push(`/dancer/detail`));
  };

  render() {
    const dataSource = [
      {
        key: '1',
        name: '广场舞第一赛区',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '班花选举',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    const columns = [
      {
        title: '投票标题',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '参与数量',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '操作',
        dataIndex: 'address',
        render: record => {
          return (
            <Fragment>
              <span>
                <a>编辑</a>
                <Divider type="vertical" />
                <a
                  onClick={() => {
                    const that = this;
                    Modal.confirm({
                      title: '确认删除该投票内容？',
                      okText: '确认',
                      cancelText: '取消',
                      onOk() {},
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
          onClick={this.addDancer}
        >
          新增
        </Button>
      </div>
    );
    return (
      <div className="clearfix">
        <Card extra={extraAction}>
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </div>
    );
  }
}
export default injectIntl(DanceList);
