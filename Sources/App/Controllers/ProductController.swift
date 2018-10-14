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
        productRoute.get(String.parameter,Int.parameter,use: getProducts)
        productRoute.get("description",String.parameter,use: getDescription)
        productRoute.get("platforms",use: getPlatform)
        //productRoute.get("platforms",use: getPlatform)
        productRoute.get("token", use: setToken)
        productRoute.post("orders", use: makeOrder)
        productRoute.post("update", use: updateProducts)
    }
    func updateProducts(req: Request) throws -> Response{
        let resposne = req.response()
        resposne.http.body = req.http.body
        return resposne
    }
    
    func makeOrder(req: Request) throws -> Future<Response> {
        print("boom")
        TokenStore().fetchToken()
        let orders = try req.content.decode(Orders.self)
        return orders.flatMap(to: Response.self) { object in
            print(object)
            let client = try req.make(Client.self)
            let container = req.sharedContainer
            let platforms = try self.apiClient.send(client:client, clientRoute: .orders(orders: object), container: container, response: req.response())
            return platforms.map({ orderResponse in
                print(orderResponse)
                let response = req.response()
                response.http.status = orderResponse.http.status
                response.http.body = orderResponse.http.body
                return response
            })
        }

    }
    
    func getProducts(req: Request) throws -> Response {
        let platform = try req.parameters.next(String.self)
        let marker = try req.parameters.next(Int.self)
        let jsonEncoder = JSONEncoder()
        let products = ProductStore().fetchProducts(marker: marker, platform: platform)
        let data = try jsonEncoder.encode(products)
        let repsonse = req.response()
        repsonse.http.body = HTTPBody(data: data)
        return repsonse
    }
    
    func getDescription(req: Request) throws -> Future<Response> {
        TokenStore().fetchToken()
        let client = try req.make(Client.self)
        let container = req.sharedContainer
        let id = try req.parameters.next(String.self)
        let platforms = try self.apiClient.send(client:client, clientRoute: .productDescription(id: id), container: container, response: req.response())
        return platforms.map({ object in
            let response = req.response()
            response.http.status = object.http.status
            response.http.body = object.http.body
            return response
        })
    }
    
    func getPlatform(req: Request) throws -> Future<Response> {
        TokenStore().fetchToken()
        let client = try req.make(Client.self)
        let container = req.sharedContainer
        let platforms = try self.apiClient.send(client:client, clientRoute: .platforms, container: container, response: req.response())
        return platforms.map({ object in
            let response = req.response()
            response.http.status = object.http.status
            response.http.body = object.http.body
            return response
        })
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
