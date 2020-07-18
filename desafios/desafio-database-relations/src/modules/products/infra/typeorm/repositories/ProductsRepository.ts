import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findName = await this.ormRepository.findOne({ where: { name } });
    return findName;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const ids = products.map(product => product.id);

    const listProducts = await this.ormRepository.find({
      where: { id: In(ids) },
    });

    return listProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const ids = products.map(product => product.id);

    const listProducts = await this.ormRepository.find({
      where: { id: In(ids) },
    });

    listProducts.forEach(product => {
      const updatedProduct = products.find(
        findProduct => findProduct.id === product.id,
      );

      if (!updatedProduct) return;

      Object.assign(product, { quantity: updatedProduct.quantity });
    });

    await this.ormRepository.save(listProducts);

    return listProducts;
  }
}

export default ProductsRepository;
