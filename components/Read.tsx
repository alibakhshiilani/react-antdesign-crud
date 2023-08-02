import React, { FC } from "react";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { ICrud, ICrudRead } from "..";
import { FilterValue } from "antd/es/table/interface";

interface ITableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const getRandomuserParams = (params: ITableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Read: FC<ICrudRead> = (params) => (
  <Table bordered size="middle" {...params} />
);

export default Read;
