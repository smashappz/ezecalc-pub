import {appSchema, tableSchema} from '@nozbe/watermelondb';

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'calculators',
      columns: [
        {name: 'image', type: 'string', isOptional: true},
        {name: 'height', type: 'number', isOptional: true},
        {name: 'width', type: 'number', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'posts',
      columns: [
        {name: 'calculation', type: 'string'},
        {name: 'result', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
  ],
});

export default schema;
