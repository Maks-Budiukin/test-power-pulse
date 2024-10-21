-- AddForeignKey
ALTER TABLE "ConsumedProduct" ADD CONSTRAINT "ConsumedProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
