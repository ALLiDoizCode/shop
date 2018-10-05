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
        //productRoute.get("save",use: saveProducts)
        productRoute.get(use: getProducts)
        productRoute.post("token", use: setToken)
    }
    
    func getProducts(req: Request) throws -> Response {
        let products = ProductStore().fetchProducts(marker: 0, platform: "Steam")
        try req.content.encode(products)
        return req.response()
    }
    
    /*func saveProducts(req: Request) throws -> Future<Response> {
        TokenStore().fetchToken()
        let client = try req.make(Client.self)
        let container = req.sharedContainer
        
        let product = try self.apiClient.send(client:client, clientRoute: .products, container: container, response: req.response())
        
        return product.map(to: Response.self) { object in
            let products = try object.content.decode(Products.self)
            /*let jsonDecoder = JSONDecoder()
            let items = try jsonDecoder.decode(Products.self, from: object.http.body.data!)
            print(items)*/
            products.map({ productsObject in
                print(productsObject)
                let success = ProductStore().saveProducts(products: productsObject)
                print(success)
            })
            let response = req.response()
            response.http.status = object.http.status
            response.http.body = object.http.body
            return response
        }
        
    }*/
    
    func setToken(req: Request) throws -> Future<Response> {
        let client = try req.make(Client.self)
        let container = req.sharedContainer
        
        let tokenRequest = TokenRequest(grant_type: Constants().GRANT_TYPE, client_id: Constants().CLIENT_ID, client_secret: Constants().CLIENT_SECRET)
        let tokenReponse = try apiClient.send(client:client, clientRoute:.token(tokenRequest:tokenRequest), container: container, response: req.response())
        return tokenReponse.map(to: Response.self, { object in
            let token = try object.content.decode(Token.self)
            token.map({ tokenObject in
                print(tokenObject)
                TokenStore().updateToken(token: tokenObject)
            })
            let response = req.response()
            response.http.status = object.http.status
            response.http.body = object.http.body
            return response
        })
    }
}
