import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { List, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import styled from "styled-components";
const ListMore = styled.div`
  text-align: center;
  margin: "10px 0";
`;
const FollowList = ({ header, data }) => {
  const styleList = useMemo(
    () => ({
      marginBottom: "20px",
    }),
    []
  );
  const styleListItem = useMemo(
    () => ({
      marginTop: "20px",
    }),
    []
  );

  return (
    <List
      style={styleList}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={<ListMore>더 보기</ListMore>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={styleListItem}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    ></List>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
