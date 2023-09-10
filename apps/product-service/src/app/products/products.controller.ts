import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from '../common/interfaces/product.interface';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) : Promise<IProduct>{
    return this.productsService.create(createProductDto);
  }


  @Get()
  findAll(): Promise<IProduct[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) : Promise<IProduct> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateProductDto: UpdateProductDto) : Promise<IProduct> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id) : Promise<IProduct> {
    return this.productsService.remove(id);
  }
}
