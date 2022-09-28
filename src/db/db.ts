import {Database, Model, Q} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {APP_NAME} from '../helpers/constants';
import {Calculator, Post} from './models';
import schema from './schema';

export const database = new Database({
  adapter: new SQLiteAdapter({
    dbName: APP_NAME,
    schema,
  }),
  modelClasses: [Calculator, Post],
});

const calculatorsCollection = database.collections.get('calculators');

const postsCollection = database.collections.get('posts');

export const posts: Array<Post> = [];

export const createCalculator = (
  image: string,
  height: number,
  width: number,
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      database.write(async () => {
        calculatorsCollection.create((c: Calculator) => {
          c.height = height;
          c.image = image;
          c.width = width;
        });

        resolve(true);
      });
    } catch (e) {
      reject('db error');
    }
  });
};

export const createPost = (
  calculation: string,
  result: string,
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      database.write(async () => {
        postsCollection.create((p: Post) => {
          p.calculation = calculation;
          p.result = result;
        });

        resolve(true);
      });
    } catch (e) {
      reject('db error');
    }
  });
};

export const deletePost = (post: Post): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      database.write(async () => {
        post.destroyPermanently();
        resolve(true);
      });
    } catch (e) {
      reject('db error');
    }
  });
};
export const deleteAllPosts = (): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      database.write(async () => {
        posts.map(post => post.destroyPermanently());
        resolve(true);
      });
    } catch (e) {
      reject('db error');
    }
  });
};

export const fetchCalculators = async (sql: string): Promise<Model[]> =>
  await calculatorsCollection.query(Q.unsafeSqlQuery(sql)).fetch();

export const fetchPosts = async (sql: string): Promise<Model[]> =>
  await postsCollection.query(Q.unsafeSqlQuery(sql)).fetch();

export const updateCalculator = (
  calculator: Calculator,
  image: string,
  height: number,
  width: number,
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      database.write(async () => {
        calculator.update((c: Calculator) => {
          c.height = height;
          c.image = image;
          c.width = width;
        });
        resolve(true);
      });
    } catch (e) {
      reject('db error');
    }
  });
};
