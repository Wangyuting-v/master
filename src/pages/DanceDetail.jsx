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

class DanceDetail extends React.Component {
  state = {};

  render() {
    return (
      <div className="clearfix">
        <Card>新增呀呀呀！</Card>
      </div>
    );
  }
}

export default injectIntl(DanceDetail);
