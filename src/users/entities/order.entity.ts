import { Product } from 'src/products/entities/products.entity';
import { User } from './user.entity';
import { Column, OneToMany } from 'typeorm';

export class Order {
  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  user?: User;

  @OneToMany(() => Product, (products) => products.name)
  products: Product[];
}
