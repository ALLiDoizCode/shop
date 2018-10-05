//
//  Token.swift
//  App
//
//  Created by Jonathan Green on 10/4/18.
//

import Vapor

struct Token:Content {
    var access_token:String
    var token_type:String
    var expires_in:Int
    static var shared:Token!
    init(access_token:String,token_type:String,expires_in:Int) {
        self.access_token = access_token
        self.token_type = token_type
        self.expires_in = expires_in
    }
}

struct TokenRequest:Content {
    var grant_type:String
    var client_id:String
    var client_secret:String
    
    init(grant_type:String,client_id:String,client_secret:String) {
        self.grant_type = grant_type
        self.client_id = client_id
        self.client_secret = client_secret
    }
}
