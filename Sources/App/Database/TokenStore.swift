//
//  TokenStore.swift
//  App
//
//  Created by Jonathan Green on 10/4/18.
//

import Foundation
import MongoKitten
class TokenStore {
    func saveToken(token:Token) -> Bool {
        
        var success:Bool!
        
        let document:Document = [
            "accessToken":token.access_token,
            "expiresIn":token.expires_in,
            "tokenType":token.token_type
        ]
        
        do {
            try MongoClient.sharedInstance.tokenCollection.insert(document)
            success = true
        }catch {
            
            success = false
        }
        
        return success
    }
    
    func updateToken(token:Token) -> Bool {
        
        var success:Bool!
        
        let document:Document = [
            "tokenType":token.token_type
        ]
        
        do {
            
            let update:Document = [
                "$set": [
                    "accessToken":token.access_token,
                    "expiresIn":token.expires_in,
                    "tokenType":token.token_type
                ]
            ]
            
            let query = Query(document)
            
            try MongoClient.sharedInstance.tokenCollection.update(query, to: update)
            
            success = true
            
        }catch {
            success = false
        }
        
        return success
    }
    
    func fetchToken() -> Bool {
        
        var results:Document!
        do {
            
            results = try MongoClient.sharedInstance.tokenCollection.findOne()
            
        }catch {
            
        }
        
        guard results != nil else {
            return false
        }
        
        let access_token = String(describing:results["accessToken"] ?? Document())
        let expires_in = Int(results["expiresIn"] ?? Document()) ?? 0
        let token_type = String(describing:results["tokenType"] ?? Document())
        
        Token.shared = Token(access_token: access_token, token_type: token_type, expires_in: expires_in)
        
        return true
    }
}
