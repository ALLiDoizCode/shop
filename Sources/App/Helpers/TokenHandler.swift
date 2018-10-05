//
//  TokenHandler.swift
//  App
//
//  Created by Jonathan Green on 10/4/18.
//

import Foundation
import Vapor
class TokenHandler {
    var apiClient = APIClient()
    func checkoutToken(req:Request) throws -> Void {
        if Token.shared == nil  {
            var success = TokenStore().fetchToken()
            if success != true  {
                let client = try req.make(Client.self)
                let container = req.sharedContainer
                
                let tokenRequest = TokenRequest(grant_type: Constants().GRANT_TYPE, client_id: Constants().CLIENT_ID, client_secret: Constants().CLIENT_SECRET)
                let tokenReponse = try apiClient.send(client:client, clientRoute:.token(tokenRequest:tokenRequest), container: container, response: req.response())
                tokenReponse.map(to: Response.self, { object in
                    let token = try object.content.decode(Token.self)
                    token.map({ tokenObject in
                        print(tokenObject)
                        TokenStore().saveToken(token: tokenObject)
                    })
                    
                    return object
                })
            }
        }
    }
}
