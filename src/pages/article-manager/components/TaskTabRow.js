import React, { Component,Fragment } from 'react';

import ItemDialog from './ItemDialog'
import DeleteDialog from './DeleteDialog'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const TaskTabRow = (props) => {
        const { propsOb, onRefresh } = props
        return (
            <Fragment>
                  <TableRow key={propsOb._id}>
                    <TableCell >{propsOb.title}</TableCell>
                    <TableCell >{propsOb.desc}</TableCell>
                    <TableCell >{propsOb.url}</TableCell>
                    <TableCell >{propsOb.img}</TableCell>
                    <TableCell padding="none"><DeleteDialog onUpdate={onRefresh} color="secondary" article={propsOb}/></TableCell>
                    <TableCell padding="none"><ItemDialog onUpdate={onRefresh} defaultData={propsOb}/></TableCell>
                  </TableRow>
            </Fragment>
        );
}
  

