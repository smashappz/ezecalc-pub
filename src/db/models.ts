import {Model} from '@nozbe/watermelondb';
import {date, field, readonly, text} from '@nozbe/watermelondb/decorators';

export class Calculator extends Model {
  static table = 'calculators';

  @text('image')
  image!: string;
  @field('height')
  height!: number;
  @field('width')
  width!: number;
}

export class Post extends Model {
  static table = 'posts';

  @text('calculation')
  calculation!: string;
  @text('result')
  result!: string;
  @readonly
  @date('created_at')
  createdAt!: number;
  @readonly
  @date('updated_at')
  updatedAt!: number;
}
