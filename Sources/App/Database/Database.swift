//
//  Database.swift
//  App
//
//  Created by Jonathan Green on 10/4/18.
//

import Foundation
import MongoKitten

class MongoClient {
    
    var database:Database!
    var tokenCollection:MongoCollection!
    var productCollection:MongoCollection!
    static var sharedInstance:MongoClient!
    
    init(database:Database) {
        self.database = database
        tokenCollection = self.database["tokenCollection"]
        productCollection = self.database["productCollection"]
        MongoClient.sharedInstance = self
    }
}
