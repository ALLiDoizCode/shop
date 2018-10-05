//
//  ProductController.swift
//  App
//
//  Created by Jonathan Green on 10/4/18.
//

import Vapor

class ProductController {
    var router:Router?
    var apiClient = APIClient()
    init(router:Router) {
        self.router = router
        let productRoute = router.grouped("products")
        productRoute.get(use: getProducts)
        productRoute.post("token", use: setToken)
    }
    
    func getProducts(req: Request) throws -> Future<Response> {
        try TokenHandler().checkoutToken(req:req)
        let client = try req.make(Client.self)
        let container = req.sharedContainer
        
        let product = try self.apiClient.send(client:client, clientRoute: .products(platform: "Steam"), container: container, response: req.response())
        
        return product.map(to: Response.self) { response in
            let response = req.response()
            response.http.status = response.http.status
            response.http.body = response.http.body
            return response
        }
        
    }
    
    func setToken(req: Request) throws -> Future<Response> {
        let client = try req.make(Client.self)
        let container = req.sharedContainer
        
        let tokenRequest = TokenRequest(grant_type: Constants().GRANT_TYPE, client_id: Constants().CLIENT_ID, client_secret: Constants().CLIENT_SECRET)
        let tokenReponse = try apiClient.send(client:client, clientRoute:.token(tokenRequest:tokenRequest), container: container, response: req.response())
        return tokenReponse.map(to: Response.self, { object in
            let token = try object.content.decode(Token.self)
            token.map({ tokenObject in
                print(tokenObject)
                TokenStore().saveToken(token: tokenObject)
            })
            let response = req.response()
            response.http.status = object.http.status
            response.http.body = object.http.body
            return response
        })
    }
}
