import { Column, Entity, PrimaryKey, Table } from 'typecql';

@Table('links')
export class LinksEntity extends Entity {
  @PrimaryKey({ primaryKeyType: 'partition', type: 'text' })
  url: string;

  @PrimaryKey({ primaryKeyType: 'cluster', type: 'bigint' })
  userId: number;

  @PrimaryKey({ primaryKeyType: 'cluster', type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  urlName: string;
}
