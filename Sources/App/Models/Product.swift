//
//  Product.swift
//  App
//
//  Created by Jonathan Green on 10/4/18.
//

import Vapor

struct Products:Content {
    var items:[Product] = []
}

struct Product:Content {
    var productId:String?
    var identifier:String?
    var name:String?
    var platform:String?
    var quantity:Int?
    var images:[Image] = []
    var regions:[String] = []
    var languages:[String] = []
    var prices:[Price] = []
    var releaseDate:String?
    var links:[Link] = []
}

struct Image:Content {
    var image:String?
    var format:String?
}

struct Price:Content {
    var value:Double?
    var from:Double?
    var to:Double?
}

struct Link:Content {
    var rel:String?
    var href:String?
    var hreflang:String?
    var media:String?
    var title:String?
    var type:String?
    var deprecation:String?
}

