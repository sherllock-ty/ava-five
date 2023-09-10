import { Injectable } from '@nestjs/common';
import { IProduct } from '../common/interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productModel: Repository<Product>,
  ){}
  
  async create(createProductDto: CreateProductDto) : Promise<IProduct>{
    const queryBuilder = this.productModel.createQueryBuilder()
    .insert()
    .into(Product)
    .values({...createProductDto})
    .returning('*');
    
    try {
      const createdProduct = await queryBuilder.execute();
      if (createdProduct.raw.length === 0) {
        return null; 
      }

      return createdProduct.raw[0]; 
    } catch (error) {
      throw new Error();
    }
  }

  async findAll() : Promise<IProduct[]>{
    let products: IProduct[];
    try {
      products = await this.productModel.find()
    } catch (error) {
        return null;
    }
    return products;
  }

  async findOne(id) {
    let product: IProduct;
    try {
      product = await this.productModel.findOneBy({id:id});
      if(!product){
          return null;
      }
  } catch (error) {
    console.log(id);
    console.log(error);
    
      return null;
  }
  return product;
  }

  async update(id, updateProductDto: UpdateProductDto) : Promise<IProduct>{    
      const queryBuilder = this.productModel.createQueryBuilder()
        .update(Product)
        .set({ ...updateProductDto })
        .where('id = :id', { id })
        .returning('*'); 
      try {
        const updatedProduct = await queryBuilder.execute();
        if (updatedProduct.raw.length === 0) {
          return null; 
        }
        return updatedProduct.raw[0];
    } catch (error) {
      throw new Error();
    }
  }

  async remove(id) : Promise<IProduct> {
    const productToRemove = await this.productModel.findOneBy({id:id});

    if (!productToRemove) {
      return null;
    }
    try {
      await this.productModel.delete(id); 
    } catch (error) {
      throw new Error();
    }

    return productToRemove; 
  }
}
