//
//  ProductStore.swift
//  App
//
//  Created by Jonathan Green on 10/5/18.
//

import Foundation
import MongoKitten

class ProductStore {
    
    /*func saveProducts(products:Products) -> Bool {
        
        var success:Bool!
        var docs:[Document] = []
        for item in products.items {
            
            do {
                
                let document = try BSONEncoder().encode(item)
                docs.append(document)
            }catch{
                print(error.localizedDescription)
            }
            
        }

        do {
            try MongoClient.sharedInstance.productCollection.insert(contentsOf: docs)
            success = true
        }catch {
            print(error.localizedDescription)
            success = false
        }
        
        return success
    }*/
    
    func fetchProducts(marker:Int,platform:String) -> Products {
        
        var products = Products()
        var docs:CollectionSlice<Document>!
        
        let document:Document = [
            "platform":platform
        ]
        
        let query = Query(document)
        do {
            docs = try MongoClient.sharedInstance.productCollection.find(query, skipping: marker, limitedTo: 50)
            print(try docs.count())
            for doc in docs {
                let product = try BSONDecoder().decode(Product.self, from: doc)
                products.items.append(product)
            }
            
        }catch {
            print(error.localizedDescription)
            
        }
        
        return products
    }
    
    func fetchProductName(name:String) -> Products {
        
        var products = Products()
        var docs:CollectionSlice<Document>!
        
        let document:Document = [
            "name":name
        ]
        
        let query = Query(document)
        do {
            docs = try MongoClient.sharedInstance.productCollection.find(query)
            
            for doc in docs {
                let product = try BSONDecoder().decode(Product.self, from: doc)
                products.items.append(product)
            }
            
        }catch {
            print(error.localizedDescription)
            
        }
        
        return products
    }
    
    func saveProduct(product:Product) -> Bool {
        
        var success:Bool!
        
        do {
            let document = try BSONEncoder().encode(product)
            try MongoClient.sharedInstance.productCollection.insert(document)
            success = true
        }catch {
            print(error.localizedDescription)
            success = false
        }
        
        return success
    }
    
    func updateProduct(product:Product) -> Bool {
        
        var success:Bool!
        
        let document:Document = [
            "productId":product.productId ?? ""
        ]
        
        do {
            
            let update = try BSONEncoder().encode(product)
            
            let query = Query(document)
            
            try MongoClient.sharedInstance.productCollection.update(query, to: update)
            
            success = true
            
        }catch {
            success = false
        }
        
        return success
    }
    
    func deleteProduct(product:Product) -> Bool {
        var success:Bool!
        let document:Document = [
            "productId":product.productId ?? ""
        ]
        let query = Query(document)
        do {
            try MongoClient.sharedInstance.productCollection.remove(query)
            success = true
        }catch {
            success = false
        }
        
        return success
    }
}
