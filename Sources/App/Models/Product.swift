//
//  Product.swift
//  App
//
//  Created by Jonathan Green on 10/4/18.
//

import Vapor

struct Product:Content {
    var platforms:[Platform] = []
}
