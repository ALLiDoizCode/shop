//
//  Order.swift
//  App
//
//  Created by Jonathan Green on 10/14/18.
//

import Vapor

struct Orders:Content {
    var allowPreOrder:Bool
    var orderId:String
    var products:[ProductInfo]
}

struct ProductInfo:Content {
    var price:Float
    var productId:String
    var quantity:Int
}
